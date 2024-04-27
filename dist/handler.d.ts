import { Permissions } from './permissions';
import { APIButtonComponentWithCustomId, APIInteractionResponse, APISelectMenuComponent, PartialWithRequiredAPIApplicationCommand } from './types';
import { ComponentContext } from './contexts/componentContext';
import { CommandContext } from './contexts/commandContext';
export interface Command {
    command: PartialWithRequiredAPIApplicationCommand;
    handler: (interaction: CommandContext) => Promise<APIInteractionResponse> | APIInteractionResponse;
}
export interface MessageComponent {
    component: MessageComponentWithCustomId;
    handler: (interaction: ComponentContext) => Promise<APIInteractionResponse> | APIInteractionResponse;
}
export interface Application {
    applicationId: string;
    botToken: string;
    publicKey: string;
    commands: Command[];
    permissions: Permissions;
    guildId?: string;
    env?: any;
    components?: MessageComponent[];
}
export type DictComponents = Record<string, MessageComponent>;
export type DictCommands = Record<string, Command>;
export type MessageComponentWithCustomId = APIButtonComponentWithCustomId | APISelectMenuComponent;
export declare const fromHexString: (hexString: string) => Uint8Array;
export type ApplicationCommandHandler = (request: Request, ...extra: any) => Promise<any>;
export declare const createApplicationCommandHandler: (application: Application) => ApplicationCommandHandler;
//# sourceMappingURL=handler.d.ts.map