import { accountController } from "~/v1/controllers";
import { Router } from "express";
import { authMiddleware, asyncMiddleware } from "~/middlewares";

const accountRoute = Router()

accountRoute.get(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(accountController.findAll)
)
accountRoute.get(
  '/:id',
  asyncMiddleware(accountController.findById)
)

accountRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(accountController.update)
)

export default accountRoute