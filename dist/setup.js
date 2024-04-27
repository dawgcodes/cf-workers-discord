"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const types_1 = require("./types");
const resolveCommandsEndpoint = (applicationId, guildId) => {
    if (guildId !== undefined)
        return types_1.RouteBases.api + types_1.Routes.applicationGuildCommands(applicationId, guildId);
    return types_1.RouteBases.api + types_1.Routes.applicationCommands(applicationId);
};
const deleteExistingCommands = async (applicationId, botToken, guildId) => {
    const url = resolveCommandsEndpoint(applicationId, guildId);
    const commands = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bot ${botToken}` },
    }).then(async (res) => await res.json());
    await Promise.all(commands.map(async (command) => await fetch(`${url}/${command.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bot ${botToken}` },
    })));
};
const createCommands = async ({ applicationId, guildId, commands }, botToken) => {
    const url = resolveCommandsEndpoint(applicationId, guildId);
    const promises = commands.map(async ({ command }) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(command),
                headers: { 'Content-Type': 'application/json', Authorization: `Bot ${botToken}` },
            });
            return { [command.name]: await response.json() };
        }
        catch (e) {
            /*
             * e is typeof unknown due to error handling. We expect it to be a Error,
             * if its not then the message and stack properties should be undefined and not used.
             */
            const { message, stack } = e;
            return {
                [command.name]: {
                    message,
                    stack,
                    info: `Setting command ${command.name} failed!`,
                },
            };
        }
    });
    return await Promise.all(promises)
        .then((result) => new Response(JSON.stringify(result.reduce((acc, cur) => ({ ...acc, ...cur }), {}))))
        .catch((e) => new Response(e.message, { status: 502 }));
};
const setup = ({ applicationId, botToken, guildId, commands }) => {
    return async () => {
        try {
            await deleteExistingCommands(applicationId, botToken, guildId);
            return await createCommands({ applicationId, guildId, commands }, botToken);
        }
        catch {
            return new Response(JSON.stringify({
                error: 'Failed to authenticate with Discord. Are the Application ID and secret set correctly?',
            }), {
                status: 407,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    };
};
exports.setup = setup;
//# sourceMappingURL=setup.js.map