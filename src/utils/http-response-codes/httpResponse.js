export default class HttpResponse {
  constructor(statusCode) {
    this.statusCode = statusCode;
    this.message = 'Subclasses have to implement response';
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(statusCode) {
    this._statusCode = statusCode;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  response() {
    throw new Error(this._message);
  }
}
