"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordBotConfig = void 0;
const rest_1 = require("@discordjs/rest");
const ws_1 = require("@discordjs/ws");
const core_1 = require("@discordjs/core");
const discordBotConfig = () => {
    const rest = new rest_1.REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');
    const gateway = new ws_1.WebSocketManager({
        token: process.env.DISCORD_BOT_TOKEN || '',
        intents: core_1.GatewayIntentBits.GuildMessages | core_1.GatewayIntentBits.MessageContent,
        rest,
    });
    const client = new core_1.Client({ rest, gateway });
    client.once(core_1.GatewayDispatchEvents.Ready, () => console.log('Discord BOT is ready!'));
    gateway.connect();
    return {
        client
    };
};
exports.discordBotConfig = discordBotConfig;
