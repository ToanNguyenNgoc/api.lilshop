import { Router } from "express";
import { accountController } from "~/v1/controllers";

const accountRoute = Router()

accountRoute.get('/register', accountController.register)
accountRoute.get('/', accountController.findAll)
export default accountRoute