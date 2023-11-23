"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const base_1 = require("../../base");
const repository_1 = __importDefault(require("./repository"));
class GameService extends base_1.BaseService {
    getRepository() {
        return repository_1.default;
    }
    async getByName(name) {
        return await repository_1.default.getOne({ name });
    }
}
exports.GameService = GameService;
exports.default = new GameService();
