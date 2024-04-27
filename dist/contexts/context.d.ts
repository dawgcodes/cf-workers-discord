import { APIInteraction, APIInteractionResponseCallbackData, APIModalInteractionResponseCallbackData } from "discord-api-types/v10";
import respond from "../respond";
export declare class Context {
    interaction: APIInteraction;
    botToken: string;
    env: any;
    constructor(interaction: APIInteraction, botToken: string, env: any);
    get guildId(): string | undefined;
    respond: typeof respond;
    editReply(content: APIInteractionResponseCallbackData): Promise<Response>;
    showModal(content: APIModalInteractionResponseCallbackData): Promise<Response>;
    returnModal(content: APIModalInteractionResponseCallbackData): Promise<Response>;
}
//# sourceMappingURL=context.d.ts.map