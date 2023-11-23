"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class AccountRepository extends base_1.BaseRepository {
    getModelName() {
        return constants_1.MODEL_NAME.Account;
    }
}
exports.AccountRepository = AccountRepository;
exports.default = new AccountRepository();
