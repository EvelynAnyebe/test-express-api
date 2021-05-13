import { validationResult } from 'express-validator';
import { Response } from 'http-status-codez';
import { ErrorResponse } from './../utils/appResponse.js';

// Parallel processing
export default function validate(validations) {
    return async (req, res, next) => {
      try {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(Response.HTTP_BAD_REQUEST)
            .send(new ErrorResponse(errors));
        }
          next();
        } catch (err) {
          res
            .status(Response.HTTP_INTERNAL_SERVER_ERROR)
            .send(new ErrorResponse(err));
        }
      };
}
