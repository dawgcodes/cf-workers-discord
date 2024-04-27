"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const types_1 = require("./types");
class Permissions {
    constructor(types) {
        this.types = types;
    }
    compute() {
        let permission = 0n;
        this.types.forEach((type) => (permission += types_1.PermissionFlagsBits[type]));
        return String(permission);
    }
}
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.js.map