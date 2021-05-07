export default class ErrorResponse {
  constructor(err) {
    if (err instanceof Error) {
      this.name = err.name;
        this.message = err.message;
        this.stack = err.stack;

        return
    }
    this.message = err;
  }
}
