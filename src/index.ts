import app from './app'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDocOptions from '~/swagger/swaggerJsDocOptions'
import { errHandler } from "~/middlewares"
import { discordBotConfig } from '~/configs'
import cors from "cors"

dotenv.config()
discordBotConfig()

const PORT = process.env.POST || 4000
const specs = swaggerJSDoc(swaggerJsDocOptions)
app.use(cors({
  origin: ['https://api.fashional.pro', 'https://fashional.pro', 'http://localhost:4200'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true,
  credentials: true
}))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(errHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
