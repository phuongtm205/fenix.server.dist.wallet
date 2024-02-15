"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
class JwtHelper {
    static generateToken(data, options = {}) {
        const defaultOptions = {
            // algorithm: 'RS256',
            expiresIn: '24h',
        };
        const newOptions = { ...defaultOptions, ...options };
        return jsonwebtoken_1.default.sign(data, configs_1.Env.JWT_KEY, newOptions);
    }
    static verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, configs_1.Env.JWT_KEY);
        }
        catch (err) {
            // Do nothing
        }
    }
}
exports.JwtHelper = JwtHelper;
