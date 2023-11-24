"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Config Env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Load database models
require("./bin/model");
// Start server
const bin_1 = require("./bin");
(async () => {
    await bin_1.Db.connect();
    await bin_1.Redis.connect();
    await bin_1.App.start();
})();
