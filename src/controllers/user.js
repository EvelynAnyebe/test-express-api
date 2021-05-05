/*
 * Import { createRequire } from 'module';
 * Const require = createRequire(import.meta.url);
 */
import User from '../models/user.js';
import { body, param, validationResult } from 'express-validator';
import encrypt from './../../utils/encrypt.js';

import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_SE_500,
  HTTP_CE_400,
  HTTP_CE_406,
  HTTP_CE_422,
} from './../../utils/httpResponseCodes.js';

/*
 *Controller helpers
 *  Prepare the user object for insert
 */
function prepareUser(body) {
  const { firstName, lastName, email, password } = body;
  const emailVerificationToken = encrypt(firstName);
  const role = { user: true };
  const auth = { authtype: 'auth' };
  return {
    firstName,
    lastName,
    email,
    password,
    emailVerificationToken,
    role,
    auth,
  };
}

// Select attribute to return
function selectField(newUser) {
  return (({
    userName,
    firstName,
    lastName,
    email,
    role,
    emailVerified,
    emailVerificationToken,
    accountStatus,
    auth,
  }) => ({
    userName,
    firstName,
    lastName,
    email,
    role,
    emailVerified,
    emailVerificationToken,
    accountStatus,
    auth,
  }))(newUser);
}

/*
 * Validate requests middleware
 */
export function validate(method) {
  switch (method) {
    case 'getUser': {
      return param('id', 'Expected identifier of length>=24')
        .exists()
        .isLength({
          min: 24,
        });
    }
    case 'createUser': {
      return [
        body('firstName', 'Expected firstname of length>2').isLength({
          min: 2,
        }),
        body('lastName', 'Expected lastname of length>=2').isLength({ min: 2 }),
        body('email', 'Expected valid email').isEmail(),
        body('password', 'Expected password of length>=8').isLength({ min: 8 }),
      ];
    }
    default:
  }
}

//Specifies the fields to return
const fieldSelect = `userName firstName lastName otherNames 
                    email phone gender dob countryOfResidence countryCode 
                    stateOfResidence cityOfResidence address role 
                    emailVerified accountStatus avatar auth`;

// Get all and return all users.
export async function getUsers(req, res) {
  try {
    const users = await User.find().select(fieldSelect).exec();
    if (!users.length) {
      return HTTP_OK.response('There are no registered users at the moment.');
    }
    res.send(HTTP_OK.response(null, users));
  } catch (err) {
    res.status(HTTP_SE_500.statusCode).send(HTTP_SE_500.response(err.message));
  }
}

/*
 * @api {get} /users/:id Get single user
 * @apiName
 * @apiPermission [user,admin]
 * @apiGroup user
 *
 * @apiParam {String} [id] _id
 *
 *@apiSuccess (200) {Object} mixed User object
 */
export async function getUser(req, res) {
  /*
   *Finds the validation errors in this request and wraps
   *them in an object with handy functions
   *400 Bad Request error
   */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_CE_400.statusCode)
        .send(HTTP_CE_400.response(errors.array()));
    }
    //Validation passed, handle request
    const user = await User.findById(req.params.id, fieldSelect).exec();
    res.send(HTTP_OK.response(null, user));
  } catch (err) {
    res.status(HTTP_SE_500.statusCode).send(HTTP_SE_500.response(err.message));
  }
}

/*
 * @api {get} /users Create a user
 * @apiName
 * @apiPermission
 * @apiGroup user
 *
 * @apiParam {String} [firstName] firstName len>=2
 * @apiParam {String} [lastName] lastName len>=2
 * @apiParam {String} [email] email
 * @apiParam {String} [password] password len>=8
 * @apiParam {String} [confirmPassword] confirmPassword
 *
 *@apiSuccess (200) {Object} mixed User object
 */
export async function createUser(req, res) {
  try {
    //Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_CE_422.statusCode)
        .send(HTTP_CE_422.response(errors.array()));
    }

    //Check if email already exist
    const user = await User.findOne(
      { email: req.body.email },
      fieldSelect
    ).exec();
    //406 Not Acceptable
    if (user) {
      return res
        .status(HTTP_CE_406.statusCode)
        .send(HTTP_CE_406.response('User account already exist', user));
    }

    //Create user
    const newUser = await User.create(prepareUser(req.body));

    res
      .status(HTTP_CREATED.statusCode)
      .send(
        HTTP_CREATED.response('User created successfully', selectField(newUser))
      );
  } catch (err) {
    res.status(HTTP_SE_500.statusCode).send(HTTP_SE_500.response(err.message));
  }
}
