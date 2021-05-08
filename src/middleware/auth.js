import { Response } from 'http-status-codez';
import { ErrorResponse } from './../utils/appResponse.js';
import JWT from 'jsonwebtoken';

export function auth(req,res,next) {
    const accessToken = req.headers["x-access-token"] ||
    req.headers.authorization;
    if (!accessToken) {
        return res.status(Response.HTTP_FORBIDDEN)
        .send(new ErrorResponse("No Authorization headers"));
    }

    JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(Response.HTTP_UNAUTHORIZED)
            .send(new ErrorResponse("Unauthorized!"));
          }
          req.userId = decoded.id;
          req.role = decoded.role;
          next();
    });
}