import express from "express"
import accountsRoute from "~/v1/routes/accounts.route"
import authRoute from "~/v1/routes/auth.route"

const initializeRouteV1 = (app: express.Application) => {
  app.use('/v1/accounts', accountsRoute)
  app.use('/v1/auth', authRoute)
}
export default initializeRouteV1