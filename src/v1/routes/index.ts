import express from "express"
import accountRoute from "~/v1/routes/account.route"
import authRoute from "~/v1/routes/auth.route"
import bannerRoute from "~/v1/routes/banner.route"
import initialRoute from "~/v1/routes/initial.route"
import roleRoute from "~/v1/routes/role.route"
import permissionRoute from "~/v1/routes/permission.route"
import uploadRoute from "~/v1/routes/upload.route"
import mediaRoute from "~/v1/routes/media.route"
import provinceRouter from "~/v1/routes/province.route"
import districtRoute from "~/v1/routes/district.route"
import branchRoute from "~/v1/routes/branch.route"
import tagRoute from "~/v1/routes/tag.route"
import productRoute from "~/v1/routes/product.route"
import productBranchesRoute from "./product-branches.route"
import productMediaRoute from "~/v1/routes/product-media.route"
import productSizeRoute from "~/v1/routes/product-size.route"
import categoryRoute from "~/v1/routes/category.route"
import customerRoute from "./customer.route"
import paymentMethodRoute from "./payment-method.route"
import paymentGatewayRoute from "./payment-gateway.route"
import orderRoute from "./order.route"

const initializeRouteV1 = (app: express.Application) => {
  app.use('/v1/accounts', accountRoute)
  app.use('/v1/auth', authRoute)
  app.use('/v1/banners', bannerRoute)
  app.use('/v1/branches', branchRoute)
  app.use('/v1/tags', tagRoute)
  app.use('/v1/categories', categoryRoute)
  app.use('/v1/customer', customerRoute)
  app.use('/v1/products', productRoute)
  app.use('/v1/products', productBranchesRoute)
  app.use('/v1/products', productMediaRoute)
  app.use('/v1/products', productSizeRoute)
  app.use('/v1/initial', initialRoute)
  app.use('/v1/roles', roleRoute)
  app.use('/v1/permissions', permissionRoute)
  app.use('/v1/paymentmethods', paymentMethodRoute)
  app.use('/v1/paymentgateways', paymentGatewayRoute)
  app.use('/v1/upload', uploadRoute)
  app.use('/v1/provinces', provinceRouter)
  app.use('/v1/districts', districtRoute)
  app.use('/v1/orders', orderRoute)
  app.use('/media', mediaRoute)
}
export default initializeRouteV1