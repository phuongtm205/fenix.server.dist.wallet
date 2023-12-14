"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const service_1 = __importDefault(require("../token/service"));
const service_2 = __importDefault(require("../account/service"));
const helpers_1 = require("../../helpers");
const base_1 = require("../../base");
const constants_1 = require("../../constants");
const web3_js_1 = require("@solana/web3.js");
const configs_1 = require("../../configs");
const common_1 = require("../../common");
const service_3 = __importDefault(require("../transaction/service"));
class WalletService extends base_1.Service {
    async getAccountInfoByTokens(acc, tokens = []) {
        const renec = await helpers_1.RenecHelper.getBalance(acc.address);
        const tokenAccounts = [];
        for (let token of tokens) {
            const account = await helpers_1.RenecHelper.getTokenAccount(acc.address, token);
            tokenAccounts.push(account);
        }
        return {
            name: acc.name,
            address: acc.address,
            renec,
            tokens: tokenAccounts
        };
    }
    async getWallet(currentUser) {
        if (!currentUser.id)
            return;
        const tokens = await service_1.default.getTokens();
        const accounts = await service_2.default.getAccountsByUserId(currentUser.id);
        const wallet = [];
        for (let acc of accounts) {
            const accInfo = await this.getAccountInfoByTokens(acc, tokens);
            wallet.push(accInfo);
        }
        return wallet;
    }
    async getWalletAccount(currentUser, game) {
        if (!currentUser.id)
            return;
        const tokens = await service_1.default.getTokens();
        const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
        return await this.getAccountInfoByTokens(account, tokens);
        ;
    }
    async getPplBalance(currentUser, game) {
        if (!currentUser.id)
            return;
        const pplToken = await service_1.default.getPplToken();
        const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
        return await helpers_1.RenecHelper.getTokenAccount(account.address, pplToken);
    }
    async buy(currentUser, game, pkg) {
        if (!pkg || !pkg.price || pkg.price.renec <= 0)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const transId = await service_3.default.startBuy(currentUser, { campaignId: pkg.campaignId, promotionId: pkg.promotionId, packageId: pkg.packageId });
        try {
            // Check account
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const fenixPubkey = helpers_1.RenecHelper.getFenixPublicKey();
            const shopKeypair = helpers_1.RenecHelper.getShopKeypair();
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            // Check balance
            const userRenecBalance = await helpers_1.RenecHelper.getBalance(account.address);
            if (userRenecBalance.amount < pkg.price.renec + configs_1.Env.MIN_RENEC_BALANCE) {
                this.throwError(constants_1.ERROR.Account.InsufficientBalance);
            }
            // Check stock
            if (pkg.limit > 0) {
                const bought = await service_3.default.countNumOfBoughtPackages(currentUser, pkg.packageId, pkg.promotionId, pkg.campaignId);
                if (bought >= pkg.limit) {
                    this.throwError(constants_1.ERROR.Wallet.OutOfStock);
                }
            }
            const transTokens = [];
            const signature = await helpers_1.RenecHelper.transferRenec(userKeypair, fenixPubkey, pkg.price.renec);
            transTokens.push({
                signature,
                code: constants_1.TOKEN_CODE.Renec,
                amount: -pkg.price.renec,
                beforeBalance: 0,
                afterBalance: 0,
            });
            const tokens = await service_1.default.getTokens();
            if (pkg.tokens.ppl > 0) {
                const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
                const signature = await helpers_1.RenecHelper.transferToken(shopKeypair, userKeypair.publicKey, mint, pkg.tokens.ppl);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Ppl,
                    amount: pkg.tokens.ppl,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else {
                await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            }
            throw err;
        }
    }
    async claimsDailyReward(currentUser, game, bonus) {
        if (!bonus)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const transId = await service_3.default.startClaimDailyReward(currentUser, { campaignId: bonus.campaignId, configId: bonus.configId, week: bonus.week, day: bonus.day });
        try {
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const fenixPubkey = helpers_1.RenecHelper.getFenixPublicKey();
            const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
            const dailyBonusKeypair = helpers_1.RenecHelper.getDailyBonusKeypair();
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            const transTokens = [];
            if (bonus.price && bonus.price.renec > 0) {
                const signature = await helpers_1.RenecHelper.transferRenec(userKeypair, fenixPubkey, bonus.price.renec);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Renec,
                    amount: bonus.tokens.renec,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            const tokens = await service_1.default.getTokens();
            if (bonus.tokens.ppl > 0) {
                const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
                const signature = await helpers_1.RenecHelper.transferToken(dailyBonusKeypair, userKeypair.publicKey, mint, bonus.tokens.ppl);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Ppl,
                    amount: bonus.tokens.ppl,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            if (bonus.tokens.renec > 0) {
                const signature = await helpers_1.RenecHelper.transferRenec(fenixKeypair, userKeypair.publicKey, bonus.tokens.renec);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Renec,
                    amount: bonus.tokens.renec,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else {
                await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            }
            throw err;
        }
    }
    async claimsReferralReward(currentUser, game, reward) {
        if (!reward)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const transId = await service_3.default.startClaimReferralReward(currentUser, { campaignId: reward.campaignId, configId: reward.configId, rewardId: reward.rewardId, numOfReferredFriends: reward.numOfReferredFriends });
        try {
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
            const dailyBonusKeypair = helpers_1.RenecHelper.getDailyBonusKeypair();
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            const transTokens = [];
            const tokens = await service_1.default.getTokens();
            if (reward.tokens.ppl > 0) {
                const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
                const signature = await helpers_1.RenecHelper.transferToken(dailyBonusKeypair, userKeypair.publicKey, mint, reward.tokens.ppl);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Ppl,
                    amount: reward.tokens.ppl,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            if (reward.tokens.renec > 0) {
                const signature = await helpers_1.RenecHelper.transferRenec(fenixKeypair, userKeypair.publicKey, reward.tokens.renec);
                transTokens.push({
                    signature,
                    code: constants_1.TOKEN_CODE.Renec,
                    amount: reward.tokens.renec,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else {
                await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            }
            throw err;
        }
    }
    async withdraw(currentUser, game, body) {
        if (!body || !body.address || !body.token || body.amount <= 0)
            return;
        const transId = await service_3.default.startWithdraw(currentUser, body.address);
        try {
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            const toPubKey = new web3_js_1.PublicKey(body.address);
            const transTokens = [];
            if (body.token == constants_1.TOKEN_CODE.Renec) {
                const transToken = await this.withdrawRenec(body.amount, userKeypair, toPubKey);
                transTokens.push(transToken);
            }
            const tokens = await service_1.default.getTokens();
            if (body.token == constants_1.TOKEN_CODE.Ppl) {
                const token = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl);
                const trans1 = await this.addMinimumRenec(userKeypair.publicKey);
                if (trans1)
                    transTokens.push(trans1);
                const trans2 = await this.withdrawPpl(body.amount, token, userKeypair, toPubKey);
                transTokens.push(trans2);
            }
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
            }
            else {
                await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            }
            throw err;
        }
    }
    async withdrawRenec(amount, userKeypair, toPubKey) {
        if (Number.parseFloat(amount.toString()) < configs_1.Env.MIN_RENEC_WITHDRAW) {
            const message = constants_1.ERROR.Account.InsufficientMinimumRenec.message + configs_1.Env.MIN_RENEC_WITHDRAW + " RENEC.";
            this.throwError(constants_1.ERROR.Account.InsufficientMinimumRenec, message);
        }
        const minBalance = Number.parseFloat(amount.toString()) + configs_1.Env.MIN_RENEC_BALANCE;
        const renecBalance = await helpers_1.RenecHelper.getBalance(userKeypair.publicKey);
        if (renecBalance.amount < minBalance) {
            this.throwError(constants_1.ERROR.Account.InsufficientBalance);
        }
        const signature = await helpers_1.RenecHelper.transferRenec(userKeypair, toPubKey, amount);
        return {
            signature,
            code: constants_1.TOKEN_CODE.Renec,
            amount: -amount,
            beforeBalance: 0,
            afterBalance: 0,
        };
    }
    async withdrawPpl(amount, token, userKeypair, toPubKey) {
        if (!token)
            this.throwError(constants_1.ERROR.Wallet.TokenNotFound);
        console.log(configs_1.Env.MIN_PPL_WITHDRAW);
        if (Number.parseFloat(amount.toString()) < configs_1.Env.MIN_PPL_WITHDRAW) {
            const message = constants_1.ERROR.Account.InsufficientMinimumPpl.message + configs_1.Env.MIN_PPL_WITHDRAW + " PPL.";
            this.throwError(constants_1.ERROR.Account.InsufficientMinimumPpl, message);
        }
        const minBalance = Number.parseFloat(amount.toString()) + configs_1.Env.MIN_PPL_BALANCE;
        const tokenBalance = await helpers_1.RenecHelper.getTokenAccount(userKeypair.publicKey, token);
        if (tokenBalance.amount < minBalance) {
            this.throwError(constants_1.ERROR.Account.InsufficientBalance);
        }
        const signature = await helpers_1.RenecHelper.transferToken(userKeypair, toPubKey, token.mint, amount);
        return {
            signature,
            code: constants_1.TOKEN_CODE.Ppl,
            amount: -amount,
            beforeBalance: 0,
            afterBalance: 0,
        };
    }
    async addMinimumRenec(toPubKey) {
        const renec = await helpers_1.RenecHelper.getBalance(toPubKey);
        if (renec.amount > 0)
            return;
        const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
        const signature = await helpers_1.RenecHelper.transferRenec(fenixKeypair, toPubKey, constants_1.MIN_RENEC);
        return {
            signature,
            code: constants_1.TOKEN_CODE.Renec,
            amount: constants_1.MIN_RENEC,
            beforeBalance: 0,
            afterBalance: 0,
        };
    }
}
exports.WalletService = WalletService;
exports.default = new WalletService();
