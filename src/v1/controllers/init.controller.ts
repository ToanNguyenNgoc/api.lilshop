import { Request, Response } from "express"

class InitController {
  async findAll(req: Request, res: Response) {
    return res.send('findAll')
  }

  async findById(req: Request, res: Response) {
    return res.send('findById')
  }

  async create(req: Request, res: Response) {
    return res.send('create')
  }

  async update(req: Request, res: Response) {
    return res.send('update')
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}