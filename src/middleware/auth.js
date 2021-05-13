import { Response } from 'http-status-codez';
import { ErrorResponse } from './../utils/appResponse.js';
import JWT from 'jsonwebtoken';

export default function auth(req, res, next) {
  try {
    const accessToken =
      req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return res
        .status(Response.HTTP_FORBIDDEN)
        .send(new ErrorResponse('No Authorization headers'));
    }

    JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(Response.HTTP_UNAUTHORIZED)
          .send(new ErrorResponse(err));
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
