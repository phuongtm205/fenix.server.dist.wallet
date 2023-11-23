"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const configs_1 = require("../configs");
const common_1 = require("../common");
const routes_1 = require("./routes");
const middlewares_1 = require("../middlewares");
class App {
    static { this.app = (0, express_1.default)(); }
    static useCors() {
        this.app.use((0, cors_1.default)({
            origin: '*',
            // credentials: false,
        }));
    }
    static loadParser() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    static extendsRequestBuilder() {
        this.app.use(middlewares_1.RequestBuilder.extends());
    }
    static loadRouters() {
        this.app.use((req, res, next) => {
            req.headers['if-none-match'] = 'no-match-for-this';
            next();
        });
        routes_1.Routes.init(this.app);
    }
    static handleError() {
        this.app.use(middlewares_1.ErrorHandler.handle());
    }
    static healthCheck() {
        this.app.get('/health', (req, res) => {
            res.json({ success: true, status: 'healthy' });
        });
    }
    static run() {
        console.log(process.env.PORT);
        this.app.listen(configs_1.Env.PORT, () => {
            common_1.Logger.info(`Server is running on port ${configs_1.Env.PORT}.`);
        }).on('error', (err) => {
            if (err.code == 'EADDRINUSE') {
                common_1.Logger.error(`Port ${configs_1.Env.PORT} is already in use.`);
            }
            else {
                common_1.Logger.error(err.message);
            }
            process.exit(1);
        });
    }
    static async start() {
        this.useCors();
        this.loadParser();
        this.extendsRequestBuilder();
        this.loadRouters();
        this.handleError();
        this.healthCheck();
        this.run();
    }
}
exports.App = App;
