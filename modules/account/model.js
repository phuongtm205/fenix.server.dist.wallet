"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class AccountModel extends base_1.BaseModel {
    getModelName() {
        return constants_1.MODEL_NAME.Account;
    }
    getSchema() {
        return {
            name: {
                type: String,
                maxLength: 100,
                required: true,
            },
            userId: {
                type: mongoose_1.Types.ObjectId,
            },
            secretPhrase: {
                type: String,
                require: true,
            },
            index: {
                type: Number,
                require: true,
            },
            address: {
                type: String,
                require: true,
            },
            game: {
                type: String,
            },
            transactionId: {
                type: String,
            }
        };
    }
}
exports.AccountModel = AccountModel;
exports.default = new AccountModel();
