import { Request } from "express"
import { discordBotConfig } from "~/configs"
import { APIEmbed } from "@discordjs/core"

export const pushLogErrorDiscord = (req: Request, statusCode: number, message: string) => {
  const { client } = discordBotConfig()
  const exampleEmbed: APIEmbed = {
    color: statusCode === 500 ? 0xFF0000 : 0xFFFF00,
    title: message,
    url: 'https://discord.js.org/',
    author: {
      name: req.headers["user-agent"] || 'NONAME'
    },
    description: 'Some description here',
    fields: [
      { name: 'Host', value: req.headers.host || '' },
      { name: 'Header referer', value: req.headers.referer || '' },
      { name: 'Path', value: req.url },
      { name: 'Method', value: req.method },
      { name: 'Body', value: req.body ? JSON.stringify(req.body) : 'NO BODY' },
      { name: 'IP address', value: req.connection.remoteAddress || req.socket.remoteAddress || '' }
    ],
    footer: { text: 'By Swatcat BOT', icon_url: 'https://i.imgur.com/mliFXKq.jpg' }
  }
  client.api.channels.createMessage(process.env.DISCORD_CHANEL_ID_LOG || '', {
    content: `STATUS CODE: ${statusCode}`,
    embeds: [exampleEmbed]
  })
}