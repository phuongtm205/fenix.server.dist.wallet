"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const base_1 = require("../../base");
const service_1 = __importDefault(require("./service"));
class WalletController extends base_1.BaseController {
    async getWallet(req, res) {
        try {
            const wallet = await service_1.default.getWallet(req.currentUser());
            res.success(wallet);
        }
        catch (err) {
            res.error(err);
        }
    }
    async getWalletAccount(req, res) {
        try {
            const wallet = await service_1.default.getWalletAccount(req.currentUser(), req.game());
            res.success(wallet);
        }
        catch (err) {
            res.error(err);
        }
    }
    async buy(req, res) {
        try {
            await service_1.default.buy(req.currentUser(), req.game(), req.body);
            res.success();
        }
        catch (err) {
            res.error(err);
        }
    }
    async claims(req, res) {
        try {
            await service_1.default.claims(req.currentUser(), req.game(), req.body);
            res.success();
        }
        catch (err) {
            res.error(err);
        }
    }
    async withdraw(req, res) {
        try {
            await service_1.default.withdraw(req.currentUser(), req.game(), req.body);
            res.success();
        }
        catch (err) {
            res.error(err);
        }
    }
}
exports.WalletController = WalletController;
exports.default = new WalletController();
