import express from "express"
import accountRoute from "~/v1/routes/account.route"
import authRoute from "~/v1/routes/auth.route"
import bannerRoute from "~/v1/routes/banner.route"
import initialRoute from "~/v1/routes/initial.route"
import roleRoute from "~/v1/routes/role.route"
import permissionRoute from "~/v1/routes/permission.route"
import uploadRoute from "~/v1/routes/upload.route"
import mediaRoute from "~/v1/routes/media.route"

const initializeRouteV1 = (app: express.Application) => {
  app.use('/v1/accounts', accountRoute)
  app.use('/v1/auth', authRoute)
  app.use('/v1/banners', bannerRoute)
  app.use('/v1/initial', initialRoute)
  app.use('/v1/roles', roleRoute)
  app.use('/v1/permissions', permissionRoute)
  app.use('/v1/upload', uploadRoute)
  app.use('/media', mediaRoute)
}
export default initializeRouteV1