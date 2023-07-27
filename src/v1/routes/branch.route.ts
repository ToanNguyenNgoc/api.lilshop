import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { branchController } from "~/v1/controllers"

const branchRoute = Router()

branchRoute.get(
  '/:id',
  asyncMiddleware(branchController.findById)
)

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
branchRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(branchController.update)
)
branchRoute.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(branchController.delete)
)

export default branchRoute