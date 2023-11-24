"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHelper = void 0;
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importStar(require("axios"));
const configs_1 = require("../configs");
const constants_1 = require("../constants");
const common_1 = require("../common");
class HttpHelper {
    static async get(options) {
        const opts = options;
        opts.method = 'GET';
        return await this.send(opts);
    }
    static async post(options) {
        const opts = options;
        opts.method = 'POST';
        return await this.send(opts);
    }
    static async put(options) {
        const opts = options;
        opts.method = 'PUT';
        return await this.send(opts);
    }
    static async delete(options) {
        const opts = options;
        opts.method = 'DELETE';
        return await this.send(opts);
    }
    static authorize(options) {
        let finalizedHeaders = { ...options.headers };
        if (finalizedHeaders) {
            delete finalizedHeaders.host;
            delete finalizedHeaders['accept-encoding'];
            delete finalizedHeaders['content-length'];
            delete finalizedHeaders.connection;
            delete finalizedHeaders.accept;
            delete finalizedHeaders['content-type'];
            delete finalizedHeaders.cookie;
            finalizedHeaders.authorization = configs_1.Env.SERVER_API_KEY;
            finalizedHeaders.user_id = options.currentUser?.id;
        }
        else {
            finalizedHeaders = {
                authorization: configs_1.Env.SERVER_API_KEY,
                user_id: options.currentUser?.id,
            };
        }
        return finalizedHeaders;
    }
    static async send(options) {
        try {
            const authorizedHeaders = this.authorize(options);
            const axiosOptions = {
                url: options.url,
                method: options.method,
                timeout: options.timeout || constants_1.HTTP_TIMEOUT,
                data: options.data,
                headers: authorizedHeaders,
                json: true,
            };
            const result = await (0, axios_1.default)(axiosOptions);
            return lodash_1.default.get(result, 'data', { success: false });
        }
        catch (err) {
            common_1.Logger.error(err);
            if (err instanceof axios_1.AxiosError) {
                if (err.code == 'ECONNREFUSED') {
                    return {
                        success: false,
                    };
                }
                return err.response.data;
            }
            else if (err instanceof Error) {
                common_1.Logger.error(err.message);
            }
            else {
                common_1.Logger.error(err);
            }
            return { success: false };
        }
    }
}
exports.HttpHelper = HttpHelper;
