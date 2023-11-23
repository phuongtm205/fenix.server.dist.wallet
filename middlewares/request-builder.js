"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBuilder = void 0;
const common_1 = require("../common");
class RequestBuilder {
    static extends() {
        return (req, res, next) => {
            res.success = function (data = {}) {
                res.json({ success: true, data });
            };
            res.error = function (error = new common_1.FenixError()) {
                next(new common_1.FenixError(error));
            };
            req.currentUser = () => {
                return { id: req.headers.user_id };
            };
            req.game = () => {
                return { name: req.headers.game };
            };
            next();
        };
    }
}
exports.RequestBuilder = RequestBuilder;
