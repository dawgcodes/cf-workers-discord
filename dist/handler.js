"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationCommandHandler = exports.fromHexString = void 0;
const itty_router_1 = require("itty-router");
const setup_1 = require("./setup");
const authorize_1 = require("./authorize");
const interaction_1 = require("./interaction");
const router = (0, itty_router_1.Router)();
const fromHexString = (hexString) => Uint8Array.from((hexString.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)));
exports.fromHexString = fromHexString;
const toDictComponents = (application) => {
    return application.components?.reduce((result, c) => {
        result[c.component.custom_id] = { component: c.component, handler: c.handler };
        return result;
    }, {});
};
const toDictCommands = (application) => {
    return application.commands.reduce((result, c) => {
        result[c.command.name] = { command: c.command, handler: c.handler };
        return result;
    }, {});
};
const createApplicationCommandHandler = (application) => {
    const components = toDictComponents(application);
    const commands = toDictCommands(application);
    const publicKey = (0, exports.fromHexString)(application.publicKey);
    router.get('/', (0, authorize_1.authorize)(application.applicationId, application.permissions));
    router.post('/interaction', (0, interaction_1.interaction)({ botToken: application.botToken, publicKey, commands, components, env: application.env }));
    router.get('/setup', (0, setup_1.setup)(application));
    return router.handle;
};
exports.createApplicationCommandHandler = createApplicationCommandHandler;
//# sourceMappingURL=handler.js.map