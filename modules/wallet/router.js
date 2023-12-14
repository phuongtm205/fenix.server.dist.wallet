"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRouter = void 0;
const base_1 = require("../../base");
const middlewares_1 = require("../../middlewares");
const controller_1 = __importDefault(require("./controller"));
class WalletRouter extends base_1.BaseRouter {
    route(router) {
        router.get('', middlewares_1.Auth.authorize, controller_1.default.getWallet);
        router.get('/account', middlewares_1.Auth.authorize, controller_1.default.getWalletAccount);
        router.get('/ppl', middlewares_1.Auth.authorize, controller_1.default.getPplBalance);
        router.post('/buy', middlewares_1.Auth.authorize, controller_1.default.buy);
        router.post('/claims-daily-reward', middlewares_1.Auth.authorize, controller_1.default.claimsDailyReward);
        router.post('/claims-referral-reward', middlewares_1.Auth.authorize, controller_1.default.claimsReferralReward);
        router.post('/withdraw', middlewares_1.Auth.authorize, controller_1.default.withdraw);
    }
}
exports.WalletRouter = WalletRouter;
