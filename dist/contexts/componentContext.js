"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentContext = void 0;
const context_1 = require("./context");
class ComponentContext extends context_1.Context {
    constructor(interaction, botToken, env) {
        super(interaction, botToken, env);
        this.interaction = interaction;
        this.env = env;
    }
}
exports.ComponentContext = ComponentContext;
//# sourceMappingURL=componentContext.js.map