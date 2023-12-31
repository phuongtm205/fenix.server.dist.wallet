"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
const repository_1 = __importDefault(require("./repository"));
class TokenService extends base_1.BaseService {
    getRepository() {
        return repository_1.default;
    }
    async getTokenByMint(mint) {
        if (!mint)
            return;
        const token = await repository_1.default.getOneActive({ mint });
        return {
            _id: token._id,
            mint: token.mint,
            code: token.code,
            name: token.name,
        };
    }
    async getTokenByCode(code) {
        if (!code)
            return;
        const token = await repository_1.default.getOneActive({ code });
        return {
            _id: token._id,
            mint: token.mint,
            code: token.code,
            name: token.name,
        };
    }
    async getPplToken() {
        return await this.getTokenByCode(constants_1.TOKEN_CODE.Ppl);
    }
    async getTokens() {
        return await repository_1.default.getAll({}, { select: 'name code mint' });
    }
}
exports.TokenService = TokenService;
exports.default = new TokenService();
