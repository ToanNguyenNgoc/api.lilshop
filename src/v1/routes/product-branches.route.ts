import { Router } from "express";
import { productBranchesController } from "../controllers";
import { asyncMiddleware, authMiddleware } from "~/middlewares";

const productBranchesRoute = Router()

productBranchesRoute.get(
    '/:id/branches',
    asyncMiddleware(productBranchesController.findAll)
)

productBranchesRoute.post(
    '/:id/branches',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(productBranchesController.create)
)

productBranchesRoute.put(
    '/:id/branches/:child_id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(productBranchesController.update)
)

productBranchesRoute.delete(
    '/:id/branches/:child_id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(productBranchesController.delete)
)

export default productBranchesRoute