"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction = void 0;
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
const tweetnacl_1 = require("tweetnacl");
const handler_1 = require("./handler");
const types_1 = require("./types");
const commandContext_1 = require("./contexts/commandContext");
const componentContext_1 = require("./contexts/componentContext");
const respond_1 = __importDefault(require("./respond"));
class InvalidRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
const validateRequest = async (request, publicKey) => {
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    if (signature === null || timestamp === null) {
        console.error(`Signature and/or timestamp are invalid: ${signature}, ${timestamp}`);
        throw new InvalidRequestError(`Request signature is ${signature} and timestamp is ${timestamp}`);
    }
    const encoder = new TextEncoder();
    const isValid = tweetnacl_1.sign.detached.verify(encoder.encode(timestamp + (await request.text())), (0, handler_1.fromHexString)(signature), publicKey);
    if (!isValid) {
        throw new InvalidRequestError("Request didn't comply with the correct signature.");
    }
};
const jsonResponse = (data) => {
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
const interaction = ({ botToken, publicKey, commands, components = {}, env, }) => async (request, ...extra) => {
    try {
        await validateRequest(request.clone(), publicKey);
        const interaction = (await request.json());
        switch (interaction.type) {
            case types_1.InteractionType.Ping: {
                return (0, respond_1.default)({
                    type: types_1.InteractionResponseType.Pong,
                });
            }
            case types_1.InteractionType.ApplicationCommand: {
                const ctx = new commandContext_1.CommandContext(interaction, botToken, env);
                const options = interaction;
                if (options.data?.name === undefined) {
                    throw Error('Interaction name is undefined');
                }
                const handler = commands[options.data?.name].handler;
                return jsonResponse(await handler(ctx));
            }
            case types_1.InteractionType.MessageComponent: {
                const ctx = new componentContext_1.ComponentContext(interaction, botToken, env);
                const options = interaction;
                if (options.data === undefined) {
                    throw Error('Interaction custom_id is undefined');
                }
                const handler = components[options.data?.custom_id].handler;
                return jsonResponse(await handler(ctx));
            }
            default: {
                return new Response(null, { status: 404 });
            }
        }
    }
    catch (e) {
        console.error(e);
        if (e instanceof InvalidRequestError) {
            return new Response(e.message, { status: 401 });
        }
        return new Response('Internal server error!', { status: 500 });
    }
};
exports.interaction = interaction;
//# sourceMappingURL=interaction.js.map