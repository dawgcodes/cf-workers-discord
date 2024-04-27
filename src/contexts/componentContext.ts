import { APIMessageComponentInteraction } from "discord-api-types/v10";
import { Context } from "./context";

export class ComponentContext extends Context {
    public interaction: APIMessageComponentInteraction;
    public env: any;
    constructor(interaction: APIMessageComponentInteraction, botToken: string, env: any) {
        super(interaction, botToken, env);
        this.interaction = interaction;
        this.env = env;
    }
}