import app from './app'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDocOptions from '~/swagger/swaggerJsDocOptions'
import { errHandler } from '~/middlewares'
import { discordBotConfig } from '~/configs'
import helmet from 'helmet'

dotenv.config()
discordBotConfig()

const PORT = process.env.POST || 4000
const specs = swaggerJSDoc(swaggerJsDocOptions)
app.use(helmet())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(errHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
