import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { branchController } from "~/v1/controllers"

const branchRoute = Router()

branchRoute.get(
  '/',
  asyncMiddleware(branchController.findAll)
)

branchRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(branchController.create)
)

export default branchRoute