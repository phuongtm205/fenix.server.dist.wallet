"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Config Env
require("dotenv/config");
// Load database models
require("./bin/model");
// Start server
const bin_1 = require("./bin");
(async () => {
    await bin_1.Db.connect();
    await bin_1.Redis.connect();
    await bin_1.App.start();
})();
