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
    async buy(currentUser, game, pkg) {
        if (!pkg || !pkg.price || pkg.price.renec <= 0)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const transId = await service_3.default.startBuy(currentUser, pkg.itemId);
        try {
            // Check account
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            // Check balance
            const userRenecBalance = await helpers_1.RenecHelper.getBalance(account.address);
            if (userRenecBalance.amount < pkg.price.renec + Number.parseFloat(configs_1.Env.MIN_RENEC_BALANCE)) {
                this.throwError(constants_1.ERROR.Account.InsufficientBalance);
            }
            // Check stock
            if (pkg.limit > 0) {
                const bought = await service_3.default.countBoughtItem(currentUser, pkg.itemId);
                if (bought >= pkg.limit) {
                    this.throwError(constants_1.ERROR.Wallet.OutOfStock);
                }
            }
            await helpers_1.RenecHelper.transferRenec(userKeypair, fenixKeypair.publicKey, pkg.price.renec);
            const tokens = await service_1.default.getTokens();
            if (pkg.tokens.ppl > 0) {
                const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
                await helpers_1.RenecHelper.transferToken(fenixKeypair, userKeypair.publicKey, mint, pkg.tokens.ppl);
            }
            const transTokens = [
                {
                    code: constants_1.TOKEN_CODE.Renec,
                    amount: -pkg.price.renec,
                    beforeBalance: 0,
                    afterBalance: 0,
                },
                {
                    code: constants_1.TOKEN_CODE.Ppl,
                    amount: pkg.tokens.ppl,
                    beforeBalance: 0,
                    afterBalance: 0,
                },
            ];
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
                this.throwError(err);
            }
            if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
                throw err;
            }
            await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            throw err;
        }
    }
    async claims(currentUser, game, bonus) {
        if (!bonus)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const transId = await service_3.default.startClaim(currentUser, { configId: bonus.configId, week: bonus.week, day: bonus.day });
        try {
            const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
            if (!account)
                this.throwError(constants_1.ERROR.Account.AccountNotFound);
            const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
            const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
            if (bonus.price && bonus.price.renec > 0) {
                await helpers_1.RenecHelper.transferRenec(userKeypair, fenixKeypair.publicKey, bonus.price.renec);
            }
            const transTokens = [];
            const tokens = await service_1.default.getTokens();
            if (bonus.tokens.ppl > 0) {
                const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
                await helpers_1.RenecHelper.transferToken(fenixKeypair, userKeypair.publicKey, mint, bonus.tokens.ppl);
                transTokens.push({
                    code: constants_1.TOKEN_CODE.Ppl,
                    amount: bonus.tokens.ppl,
                    beforeBalance: 0,
                    afterBalance: 0,
                });
            }
            if (bonus.tokens.renec > 0) {
                await helpers_1.RenecHelper.transferRenec(fenixKeypair, userKeypair.publicKey, bonus.tokens.renec);
                transTokens.push({
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
                this.throwError(err);
            }
            if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
                throw err;
            }
            await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
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
            if (body.token == constants_1.TOKEN_CODE.Renec) {
                const minBalance = Number.parseFloat(body.amount.toString()) + Number.parseFloat(configs_1.Env.MIN_RENEC_BALANCE);
                const renecBalance = await helpers_1.RenecHelper.getBalance(account.address);
                if (renecBalance.amount < minBalance) {
                    this.throwError(constants_1.ERROR.Account.InsufficientBalance);
                }
                await helpers_1.RenecHelper.transferRenec(userKeypair, toPubKey, body.amount);
            }
            const tokens = await service_1.default.getTokens();
            if (body.token == constants_1.TOKEN_CODE.Ppl) {
                const token = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl);
                if (!token)
                    this.throwError(constants_1.ERROR.Wallet.TokenNotFound);
                const minBalance = Number.parseFloat(body.amount.toString()) + Number.parseFloat(configs_1.Env.MIN_PPL_BALANCE);
                const tokenBalance = await helpers_1.RenecHelper.getTokenAccount(account.address, token);
                if (tokenBalance.amount < minBalance) {
                    this.throwError(constants_1.ERROR.Account.InsufficientBalance);
                }
                await helpers_1.RenecHelper.transferToken(userKeypair, toPubKey, token.mint, body.amount);
            }
            const transTokens = [
                {
                    code: body.token,
                    amount: -body.amount,
                    beforeBalance: 0,
                    afterBalance: 0,
                },
            ];
            await service_3.default.updateSuccess(currentUser, transId, transTokens);
        }
        catch (err) {
            if (err instanceof common_1.FenixError) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
                this.throwError(err);
            }
            if (err instanceof Error) {
                await service_3.default.updateFailed(currentUser, transId, err.message);
                throw err;
            }
            await service_3.default.updateFailed(currentUser, transId, constants_1.ERROR.System.Unknown.message);
            throw err;
        }
    }
}
exports.WalletService = WalletService;
exports.default = new WalletService();
