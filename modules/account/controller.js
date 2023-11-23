"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const base_1 = require("../../base");
const service_1 = __importDefault(require("./service"));
class AccountController extends base_1.BaseController {
    async createMainAccount(req, res) {
        try {
            const rs = await service_1.default.createMainAccount(req.currentUser());
            res.success(rs);
        }
        catch (err) {
            res.error(err);
        }
    }
    async createGameAccount(req, res) {
        try {
            const game = req.query.game;
            const rs = await service_1.default.createGameAccount(req.currentUser(), game);
            return res.success(rs);
        }
        catch (err) {
            res.error(err);
        }
    }
    async getAddressesByUser(req, res) {
        try {
            const rs = await service_1.default.getAddressesByUser(req.currentUser());
            res.success(rs);
        }
        catch (err) {
            res.error(err);
        }
    }
}
exports.AccountController = AccountController;
exports.default = new AccountController();
