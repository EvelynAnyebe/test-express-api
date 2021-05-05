export default class HttpResponse {
  constructor(statusCode, message = null) {
    this.statusCode = statusCode;
    this.message = message;
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

  response(message = null, data = null) {
    return {
      statusCode: this._statusCode,
      message: message || this._message,
      data,
    };
  }
}
