"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class GameModel extends base_1.BaseModel {
    getModelName() {
        return constants_1.MODEL_NAME.Game;
    }
    getSchema() {
        return {
            name: {
                type: String,
                maxLength: 100,
                required: true,
                unique: true,
            },
            accountIndex: {
                type: Number,
                require: true,
                unique: true,
            },
            tokenId: {
                type: mongoose_1.Types.ObjectId,
            },
        };
    }
}
exports.default = new GameModel();
