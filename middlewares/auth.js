"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const constants_1 = require("../constants");
const configs_1 = require("../configs");
class Auth {
    static authorize(req, res, next) {
        if (!req.headers.authorization)
            return res.error(constants_1.ERROR.Auth.TokenNotFound);
        if (req.headers.authorization != configs_1.Env.SERVER_API_KEY)
            return res.error(constants_1.ERROR.Auth.InvalidToken);
        if (!req.headers.user_id)
            return res.error(constants_1.ERROR.Auth.CurrentUserNotFound);
        next();
    }
    static authorizeSystem(req, res, next) {
        if (!req.headers.authorization)
            return res.error(constants_1.ERROR.Auth.TokenNotFound);
        if (req.headers.authorization != configs_1.Env.SERVER_API_KEY)
            return res.error(constants_1.ERROR.Auth.InvalidToken);
        req.headers.user_id = "654096489ef63cf50c6e4c2d";
        next();
    }
}
exports.Auth = Auth;
