import { Router } from "express"
import { join } from "path"

const mediaRoute = Router()
mediaRoute.get('/:file_name', (req, res) => {
  const file_name = req.params.file_name
  return res.sendFile(join(process.cwd(), '/uploads/' + file_name))
})
export default mediaRoute