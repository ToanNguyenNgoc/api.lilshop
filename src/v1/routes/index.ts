import express from "express"
import authRoute from "~/v1/routes/auth.route"
import bannerRoute from "~/v1/routes/banner.route"
import initialRoute from "~/v1/routes/initial.route"

const initializeRouteV1 = (app: express.Application) => {
  app.use('/v1/auth', authRoute)
  app.use('/v1/banners', bannerRoute)
  app.use('/v1/initial', initialRoute)
}
export default initializeRouteV1