"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContext = void 0;
const context_1 = require("./context");
class CommandContext extends context_1.Context {
    constructor(interaction, botToken, env) {
        super(interaction, botToken, env);
        this.interaction = interaction;
        this.env = env;
    }
}
exports.CommandContext = CommandContext;
//# sourceMappingURL=commandContext.js.map