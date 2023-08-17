export class NotFoundError extends Error {
  constructor(message: 'error!!!') {
    super(message)
    this.name = 'NotFoundError'
  }
}