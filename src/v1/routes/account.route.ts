import { accountController } from "~/v1/controllers";
import { Router } from "express";
import { authMiddleware, asyncMiddleware, protectedMiddleware } from "~/middlewares";

const accountRoute = Router()

accountRoute.get(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(accountController.findAll)
)
accountRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(accountController.create)
)
accountRoute.get(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(accountController.findById)
)

accountRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  protectedMiddleware.superAdmin,
  asyncMiddleware(accountController.update)
)

accountRoute.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  protectedMiddleware.superAdmin,
  asyncMiddleware(accountController.delete)
)

export default accountRoute