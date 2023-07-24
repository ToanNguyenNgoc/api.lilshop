import { Router } from "express"
import { authMiddleware, uploadMiddleware, asyncMiddleware } from "~/middlewares"
import { uploadController } from "~/v1/controllers"

const uploadRoute = Router()

uploadRoute.post(
  '/media',
  authMiddleware.authentication,
  uploadMiddleware.single('file'),
  asyncMiddleware(uploadController.media)
)


export default uploadRoute