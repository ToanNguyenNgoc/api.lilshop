export class ErrorException extends Error {
  statusCode
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}