import { Router } from "express"
import { asyncMiddleware } from "~/middlewares"
import { provinceController } from "~/v1/controllers"

const provinceRouter = Router()

provinceRouter.get(
  '/:province_code/districts',
  asyncMiddleware(provinceController.districtsByProvince)
)
provinceRouter.get('/', asyncMiddleware(provinceController.provinces))


export default provinceRouter