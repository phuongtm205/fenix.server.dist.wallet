"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class TokenRepository extends base_1.BaseRepository {
    getModelName() {
        return constants_1.MODEL_NAME.Token;
    }
}
exports.TokenRepository = TokenRepository;
exports.default = new TokenRepository();
