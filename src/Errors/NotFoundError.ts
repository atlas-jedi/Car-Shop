class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }

  public statusCode = 404;
}

export default NotFoundError;