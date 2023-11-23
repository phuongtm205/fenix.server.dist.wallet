"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const game_1 = require("../modules/game");
const token_1 = require("../modules/token");
const router_1 = require("../modules/account/router");
const router_2 = require("../modules/wallet/router");
class Routes {
    static init(app) {
        app.use('/games', new game_1.GameRouter().getRouter());
        app.use('/tokens', new token_1.TokenRouter().getRouter());
        app.use('/accounts', new router_1.AccountRouter().getRouter());
        app.use('/wallets', new router_2.WalletRouter().getRouter());
    }
}
exports.Routes = Routes;
