import { body, param } from 'express-validator';
import validate from './../validate.js';


/*
 * Validate requests middleware
 */
export const getUserValidation = validate([
    param('id', 'Expected identifier of length>=24')
  .exists()
  .isLength({
    min: 24,
  })
]);


// Validate('createUser'),
export const createUserValidation = validate([
        body('firstName', 'Expected firstname of length > 2').isLength({
          min: 2,
        }),
        body('lastName', 'Expected lastname of length>=2').isLength({ min: 2 }),
        body('email', 'Expected valid email').isEmail(),
        body('password', 'Expected password of length>=8').isLength({ min: 8 }),
      ]);
