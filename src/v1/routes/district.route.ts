import {Router} from "express"
import { asyncMiddleware } from "~/middlewares"
import { provinceController } from "~/v1/controllers"

const districtRoute = Router()

districtRoute.get(
  '/:district_code/wards',
  asyncMiddleware(provinceController.getWardsByDistrict)
)
export default districtRoute