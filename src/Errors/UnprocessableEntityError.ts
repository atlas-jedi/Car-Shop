class UnprocessableEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }

  public statusCode = 422;
}

export default UnprocessableEntityError;