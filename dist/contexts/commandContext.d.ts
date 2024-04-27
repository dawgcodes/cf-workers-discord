import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import { Context } from "./context";
export declare class CommandContext extends Context {
    interaction: APIApplicationCommandInteraction;
    env: any;
    constructor(interaction: APIApplicationCommandInteraction, botToken: string, env: any);
}
//# sourceMappingURL=commandContext.d.ts.map