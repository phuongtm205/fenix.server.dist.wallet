"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisHelper = void 0;
const redis_1 = require("redis");
const common_1 = require("../common");
const configs_1 = require("../configs");
class RedisHelper {
    static async connect() {
        this.client = (0, redis_1.createClient)({
            password: configs_1.Env.REDIS_PASSWORD,
            socket: {
                host: configs_1.Env.REDIS_HOST,
                port: configs_1.Env.REDIS_PORT,
            }
        });
        this.client.on('error', err => {
            common_1.Logger.error(err);
        });
        await this.client.connect();
        common_1.Logger.info('Redis connected.');
    }
    static async getClient() {
        if (!this.client || !this.client.isReady) {
            common_1.Logger.error('Lost connection to redis!');
            return;
        }
        return this.client;
    }
}
exports.RedisHelper = RedisHelper;
