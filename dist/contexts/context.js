"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const v10_1 = require("discord-api-types/v10");
const respond_1 = __importDefault(require("../respond"));
class Context {
    constructor(interaction, botToken, env) {
        this.respond = respond_1.default;
        this.interaction = interaction;
        this.botToken = botToken;
        this.env = env;
    }
    get guildId() {
        return this.interaction.guild_id;
    }
    async editReply(content) {
        return await fetch(`${v10_1.RouteBases.api}${v10_1.Routes.webhookMessage(this.interaction.application_id, this.interaction.token)}`, {
            method: "PATCH",
            body: JSON.stringify(content),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${this.botToken}`,
            },
        });
    }
    async showModal(content) {
        return await fetch(`${v10_1.RouteBases.api}${v10_1.Routes.interactionCallback(this.interaction.id, this.interaction.token)}`, {
            method: "POST",
            body: JSON.stringify({
                type: v10_1.InteractionResponseType.Modal,
                data: content,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${this.botToken}`,
            },
        });
    }
    async returnModal(content) {
        return (0, respond_1.default)({
            type: v10_1.InteractionResponseType.Modal,
            data: content,
        });
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map