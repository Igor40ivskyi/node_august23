export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super();
    this.status = status;
  }
}
