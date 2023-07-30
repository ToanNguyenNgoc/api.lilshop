import { REST } from '@discordjs/rest'
import { WebSocketManager } from '@discordjs/ws'
import { GatewayDispatchEvents, GatewayIntentBits, Client } from '@discordjs/core'

export const discordBotConfig = () => {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '')
  const gateway = new WebSocketManager({
    token: process.env.DISCORD_BOT_TOKEN || '',
    intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
    rest
  })

  const client = new Client({ rest, gateway })
  client.once(GatewayDispatchEvents.Ready, () => console.log('Discord BOT is ready!'))
  gateway.connect().then().catch(() => console.log('Discord BOT is disconnect!'));
  return {
    client
  }
}
