"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const repository_1 = __importDefault(require("./repository"));
const service_1 = __importDefault(require("../game/service"));
class AccountService extends base_1.BaseService {
    getRepository() {
        return repository_1.default;
    }
    async createMainAccount(currentUser) {
        if (await this.existsMainAccount(currentUser.id))
            this.throwError(constants_1.ERROR.Account.AccountCreated);
        const secretPhrase = await this.createSecretPhrase();
        const account = await helpers_1.RenecHelper.createAccount(secretPhrase.secretPhrase, constants_1.ACCOUNT_INDEX.MainAccount);
        if (!account)
            this.throwError(constants_1.ERROR.Account.CannotCreateAccountOnRenecNetwork);
        const newAccount = await repository_1.default.createOne(currentUser, {
            name: constants_1.ACCOUNT_NAME.MainAccount,
            userId: currentUser.id,
            secretPhrase: secretPhrase.encryptedSecretPhrase,
            index: constants_1.ACCOUNT_INDEX.MainAccount,
            ...account,
        });
        newAccount.secretPhrase = secretPhrase.secretPhrase;
        return newAccount;
    }
    async createGameAccount(currentUser, gameName) {
        if (!gameName)
            this.throwError(constants_1.ERROR.Account.GameEmpty);
        const game = await service_1.default.getByName(gameName);
        if (!game)
            this.throwError(constants_1.ERROR.Account.GameNotFound);
        if (await this.existsGameAccount(currentUser.id, game.accountIndex))
            this.throwError(constants_1.ERROR.Account.AccountCreated);
        let mainAccount = await this.getMainAccount(currentUser.id);
        let secretPhrase;
        if (!mainAccount) {
            mainAccount = await this.createMainAccount(currentUser);
            secretPhrase = mainAccount.secretPhrase;
        }
        else {
            secretPhrase = helpers_1.CryptoHelper.decrypt(mainAccount.secretPhrase);
        }
        const account = await helpers_1.RenecHelper.createAccount(secretPhrase, game.accountIndex);
        if (!account)
            this.throwError(constants_1.ERROR.Account.CannotCreateAccountOnRenecNetwork);
        const newAccount = await repository_1.default.createOne(currentUser, {
            name: `${gameName} Account`,
            userId: currentUser.id,
            secretPhrase: helpers_1.CryptoHelper.encrypt(secretPhrase),
            index: game.accountIndex,
            game: gameName,
            ...account,
        });
        newAccount.secretPhrase = secretPhrase;
        return newAccount;
    }
    async getAddressesByUser(currentUser) {
        const accounts = await repository_1.default.getAll({ userId: currentUser.id }, { select: 'address' });
        if (!accounts || accounts.length == 0)
            return;
        return accounts.map((acc) => acc.address);
    }
    async getAccountByAddress(address) {
        return await repository_1.default.getOne({ address }, { select: 'secretPhrase index' });
    }
    async getAccountByUserIdAndAddress(userId, address) {
        return await repository_1.default.getOne({ userId, address }, { select: 'secretPhrase index' });
    }
    async getAccountsByUserId(userId) {
        return await repository_1.default.getAll({ userId }, { select: 'address name' });
    }
    async getAccountByUserIdAndGame(userId, game) {
        return await repository_1.default.getOne({ userId, game }, { select: 'address name secretPhrase index' });
    }
    async createSecretPhrase() {
        const secretPhrase = helpers_1.CryptoHelper.generateSecretPhrase();
        const account = await repository_1.default.getOne({
            where: {
                secretPhrase: secretPhrase.encryptedSecretPhrase,
                index: constants_1.ACCOUNT_INDEX.MainAccount,
            },
        });
        if (!account)
            return secretPhrase;
        return await this.createSecretPhrase(); // generate again if duplicated
    }
    async getMainAccount(userId) {
        return await repository_1.default.getOne({
            userId,
            index: constants_1.ACCOUNT_INDEX.MainAccount,
        });
    }
    async getGameAccount(userId, index) {
        return await repository_1.default.getOne({
            userId,
            index,
        });
    }
    async existsMainAccount(userId) {
        return !!await this.getMainAccount(userId);
    }
    async existsGameAccount(userId, index) {
        return !!await this.getGameAccount(userId, index);
    }
}
exports.AccountService = AccountService;
exports.default = new AccountService();
