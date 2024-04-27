import { APIMessageComponentInteraction } from "discord-api-types/v10";
import { Context } from "./context";
export declare class ComponentContext extends Context {
    interaction: APIMessageComponentInteraction;
    env: any;
    constructor(interaction: APIMessageComponentInteraction, botToken: string, env: any);
}
//# sourceMappingURL=componentContext.d.ts.map