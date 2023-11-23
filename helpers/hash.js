"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashHelper = void 0;
const crypto_1 = __importDefault(require("crypto"));
class HashHelper {
    static hash(algorithm, text) {
        return crypto_1.default.createHash(algorithm).update(text).digest('hex');
    }
    static md5(text) {
        return this.hash('md5', text);
    }
    static sha256(text) {
        return this.hash('sha256', text);
    }
    static sha512(text) {
        return this.hash('sha512', text);
    }
}
exports.HashHelper = HashHelper;
