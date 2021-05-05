import HttpResponse from './httpResponse.js';

class HttpResponseOk extends HttpResponse {
  constructor(data=null, message="OK") {
    super(200);
    this.message = message;
    this.data = data;
  }

  get data() {
      return this._data;
  }

  set data(data) {
      this._data = data;
  }

  response() {
    return {
      statusCode: this._statusCode,
      message: this._message,
      data: this._data
    }
  }

}

const httpResponseOk = new HttpResponseOk();

export default httpResponseOk;

