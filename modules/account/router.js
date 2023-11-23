"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRouter = void 0;
const base_1 = require("../../base");
const middlewares_1 = require("../../middlewares");
const controller_1 = __importDefault(require("./controller"));
class AccountRouter extends base_1.BaseRouter {
    route(router) {
        router.post('/main', middlewares_1.Auth.authorize, controller_1.default.createMainAccount);
        router.post('/game', middlewares_1.Auth.authorize, controller_1.default.createGameAccount);
        router.get('/addresses', middlewares_1.Auth.authorize, controller_1.default.getAddressesByUser);
    }
}
exports.AccountRouter = AccountRouter;
