import { roleController } from "~/v1/controllers";
import { Router } from "express";
import { authMiddleware, asyncMiddleware } from "~/middlewares";

const roleRoute = Router()

roleRoute.get(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(roleController.findAll)
)
roleRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(roleController.create)
)
roleRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(roleController.update)
)
roleRoute.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(roleController.delete)
)
export default roleRoute