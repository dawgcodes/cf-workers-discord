import { DictCommands, DictComponents } from './handler';
interface InteractionArgs {
    botToken: string;
    publicKey: Uint8Array;
    commands: DictCommands;
    components?: DictComponents;
    env?: any;
}
export declare const interaction: ({ botToken, publicKey, commands, components, env, }: InteractionArgs) => (request: Request, ...extra: any) => Promise<Response>;
export {};
//# sourceMappingURL=interaction.d.ts.map