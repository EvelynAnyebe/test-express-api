export default class SuccessResponse {
    constructor(data, message="Request Successful") {
      this.message= message;
      this.data = data;
    }
  }