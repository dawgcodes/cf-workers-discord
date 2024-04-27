import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import { Context } from "./context";


export class CommandContext extends Context {
    public interaction: APIApplicationCommandInteraction;
    public env: any;
    constructor(interaction: APIApplicationCommandInteraction, botToken: string, env: any) {
        super(interaction, botToken, env);
        this.interaction = interaction;
        this.env = env;
    }
}