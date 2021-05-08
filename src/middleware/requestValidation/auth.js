import { body } from 'express-validator';
import validate from './../validate.js';

// Validate('createUser'),
export const loginValidation = validate([
  body('email', 'Expected valid email').isEmail(),
  body('password', 'Expected password of length>=8').isLength({ min: 8 }),
]);
