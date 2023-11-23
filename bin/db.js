"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../common");
const configs_1 = require("../configs");
class Db {
    static async connect() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set('runValidators', true);
        await mongoose_1.default.connect(configs_1.Env.DB_URI);
        common_1.Logger.info('Database connected.');
    }
}
exports.Db = Db;
