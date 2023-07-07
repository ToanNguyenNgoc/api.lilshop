import { Response } from 'express'

export class HttpException {
  Success<DataType>(res: Response, data: DataType) {
    return res.status(200).json({
      statusCode: 200,
      data: data
    })
  }
  NotFound(res: Response, message?: string) {
    return res.status(404).json({
      statusCode: 404,
      message: message ?? 'Not found',
      error: 'Not Found'
    })
  }
  ServerError(res: Response) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: 'Not Found'
    })
  }
}
