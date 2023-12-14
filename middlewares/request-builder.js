"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBuilder = void 0;
const common_1 = require("../common");
class RequestBuilder {
    static extends() {
        return (req, res, next) => {
            res.success = (data = {}) => {
                res.json({ success: true, data });
            };
            res.error = (error = new common_1.FenixError()) => {
                if (!(error instanceof common_1.FenixError)) {
                    error = new common_1.FenixError(error);
                }
                next(error);
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
