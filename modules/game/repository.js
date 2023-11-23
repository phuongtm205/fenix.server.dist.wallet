"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepository = void 0;
const base_1 = require("../../base");
const constants_1 = require("../../constants");
class GameRepository extends base_1.BaseRepository {
    getModelName() {
        return constants_1.MODEL_NAME.Game;
    }
}
exports.GameRepository = GameRepository;
exports.default = new GameRepository();
