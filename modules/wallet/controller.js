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
    async getPplBalance(req, res) {
        try {
            const account = await service_1.default.getPplBalance(req.currentUser(), req.game());
            res.success(account);
        }
        catch (err) {
            res.error(err);
        }
    }
    async buyPromotionPackage(req, res) {
        try {
            await service_1.default.buyPromotionPackage(req.currentUser(), req.game(), req.body);
            res.success();
        }
        catch (err) {
            res.error(err);
        }
    }
    async claimsDailyReward(req, res) {
        try {
            await service_1.default.claimsDailyReward(req.currentUser(), req.game(), req.body);
            res.success();
        }
        catch (err) {
            res.error(err);
        }
    }
    async claimsReferralReward(req, res) {
        try {
            await service_1.default.claimsReferralReward(req.currentUser(), req.game(), req.body);
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
    async bet(req, res) {
        try {
            const transId = await service_1.default.bet(req.currentUser(), req.game(), req.body);
            res.success({ transId });
        }
        catch (err) {
            res.error(err);
        }
    }
    async refundBet(req, res) {
        try {
            const transId = await service_1.default.refundBet(req.currentUser(), req.game(), req.body);
            res.success({ transId });
        }
        catch (err) {
            res.error(err);
        }
    }
    async splitReward(req, res) {
        try {
            const transId = await service_1.default.splitReward(req.currentUser(), req.game(), req.body);
            res.success({ transId });
        }
        catch (err) {
            res.error(err);
        }
    }
    async receivePoolReward(req, res) {
        try {
            const transId = await service_1.default.receivePoolReward(req.currentUser(), req.game(), req.body);
            res.success({ transId });
        }
        catch (err) {
            res.error(err);
        }
    }
    async shareFacebook(req, res) {
        try {
            await service_1.default.shareFacebook(req.currentUser(), req.game(), req.body);
            res.success([]);
        }
        catch (err) {
            res.error(err);
        }
    }
    async refer(req, res) {
        try {
            await service_1.default.refer(req.currentUser(), req.game(), req.body);
            res.success([]);
        }
        catch (err) {
            res.error(err);
        }
    }
}
exports.WalletController = WalletController;
exports.default = new WalletController();
