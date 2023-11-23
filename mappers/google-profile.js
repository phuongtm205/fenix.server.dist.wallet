"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleProfileMapper = void 0;
const constants_1 = require("../constants");
class GoogleProfileMapper {
    static toUser(profile) {
        return {
            externalId: profile.id,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            avatarUrl: profile.picture,
            provider: constants_1.USER_PROVIDER.Google,
            role: constants_1.USER_ROLE.User,
        };
    }
}
exports.GoogleProfileMapper = GoogleProfileMapper;
