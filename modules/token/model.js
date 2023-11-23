"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class TokenModel extends base_1.BaseModel {
    getModelName() {
        return constants_1.MODEL_NAME.Token;
    }
    getSchema() {
        return {
            name: {
                type: String,
                maxLength: 100,
                required: true,
            },
            code: {
                type: String,
                maxLength: 5,
                require: true,
            },
            mint: {
                type: String,
                require: true,
                unique: true,
            },
        };
    }
}
exports.TokenModel = TokenModel;
exports.default = new TokenModel();
