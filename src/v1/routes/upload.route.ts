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

uploadRoute.post(
  '/media_multiple',
  authMiddleware.authentication,
  uploadMiddleware.array('files', 10),
  asyncMiddleware(uploadController.media_multiple)
)


export default uploadRoute