import app from './app'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDocOptions from '~/swagger/swaggerJsDocOptions'
import { errHandler } from '~/middlewares'
import { discordBotConfig } from '~/configs'
import hbs from "hbs"
import path from 'path'
import express from 'express'

dotenv.config()
discordBotConfig()
///

const PORT = process.env.POST || 4001
const specs = swaggerJSDoc(swaggerJsDocOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(errHandler)
//[VIEW]
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => res.render('index'))
app.get('*', (req, res) => res.render('404'));

app.listen(PORT,() => {
  console.log(`Server is running on port: ${PORT}`)
})
