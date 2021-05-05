import HttpResponse from './http-response-codes/httpResponse.js';

const HTTP_OK = new HttpResponse(200, 'OK');
const HTTP_CREATED = new HttpResponse(201, 'CREATED');
const HTTP_SE_500 = new HttpResponse(500, 'INTERNAL SERVER ERROR');

const HTTP_CE_400 = new HttpResponse(400, 'BAD REQUEST');
const HTTP_CE_406 = new HttpResponse(406, 'NOT ACCEPTABLE');
const HTTP_CE_422 = new HttpResponse(422, 'NOT ACCEPTABLE');

export {
  HTTP_OK,
  HTTP_SE_500,
  HTTP_CREATED,
  HTTP_CE_400,
  HTTP_CE_406,
  HTTP_CE_422,
};
