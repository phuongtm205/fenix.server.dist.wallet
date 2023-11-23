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
        const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
        if (!account)
            this.throwError(constants_1.ERROR.Account.AccountNotFound);
        const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
        const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
        await helpers_1.RenecHelper.transferRenec(userKeypair, fenixKeypair.publicKey, pkg.price.renec);
        const tokens = await service_1.default.getTokens();
        if (pkg.tokens.ppl > 0) {
            const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
            await helpers_1.RenecHelper.transferToken(fenixKeypair, userKeypair.publicKey, mint, pkg.tokens.ppl);
        }
    }
    async claims(currentUser, game, bonus) {
        if (!bonus)
            this.throwError(constants_1.ERROR.Wallet.PackageNotFound);
        const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
        if (!account)
            this.throwError(constants_1.ERROR.Account.AccountNotFound);
        const fenixKeypair = helpers_1.RenecHelper.getFenixKeypair();
        const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
        if (bonus.price && bonus.price.renec > 0) {
            await helpers_1.RenecHelper.transferRenec(userKeypair, fenixKeypair.publicKey, bonus.price.renec);
        }
        const tokens = await service_1.default.getTokens();
        if (bonus.tokens.ppl > 0) {
            const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
            await helpers_1.RenecHelper.transferToken(fenixKeypair, userKeypair.publicKey, mint, bonus.tokens.ppl);
        }
        if (bonus.tokens.renec > 0) {
            await helpers_1.RenecHelper.transferRenec(fenixKeypair, userKeypair.publicKey, bonus.tokens.renec);
        }
    }
    async withdraw(currentUser, game, body) {
        if (!body || !body.address || !body.token || body.amount <= 0)
            return;
        const account = await service_2.default.getAccountByUserIdAndGame(currentUser.id, game.name);
        if (!account)
            this.throwError(constants_1.ERROR.Account.AccountNotFound);
        const userKeypair = helpers_1.CryptoHelper.generateKeypairFromEncryptedSecretPhrase(account.secretPhrase, account.index);
        const toPubKey = new web3_js_1.PublicKey(body.address);
        if (body.token == constants_1.TOKEN_CODE.Renec) {
            await helpers_1.RenecHelper.transferRenec(userKeypair, toPubKey, body.amount);
        }
        const tokens = await service_1.default.getTokens();
        if (body.token == constants_1.TOKEN_CODE.Ppl) {
            const mint = tokens.find(t => t.code == constants_1.TOKEN_CODE.Ppl).mint;
            await helpers_1.RenecHelper.transferToken(userKeypair, toPubKey, mint, body.amount);
        }
    }
}
exports.WalletService = WalletService;
exports.default = new WalletService();
