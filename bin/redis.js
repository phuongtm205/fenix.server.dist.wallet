"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const helpers_1 = require("../helpers");
class Redis {
    static async connect() {
        await helpers_1.RedisHelper.connect();
    }
}
exports.Redis = Redis;
