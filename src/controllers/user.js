import User from '../models/user.js';
/*
 * Import { createRequire } from 'module';
 * Const require = createRequire(import.meta.url);
 */
import { body, param, validationResult } from 'express-validator';
import httpResponseOk from './../utils/httpResponseCodes.js';
import encrypt from '../utils/encrypt.js';

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
const fieldSelect =`userName firstName lastName otherNames 
                    email phone gender dob countryOfResidence countryCode 
                    stateOfResidence cityOfResidence address role 
                    emailVerified accountStatus avatar auth`;

// Get all and return all users.
export async function getUsers(req, res) {
  try {
    const users = await User.find().select(fieldSelect).exec();
    if (!users.length) {

      httpResponseOk.message = 'There are no registered users at the moment.';
    }
    httpResponseOk.data = users;
    res.send(httpResponseOk.response());
  } catch (err) {
    res.status(500).send({
      statusCode: res.statusCode,
      message: err.message || 'Some error occurred while retrieving users.',
    });
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
      return res.status(400).send({
        statusCode: 400,
        message: errors.array(),
      });
    }
    //Validation passed, handle request
    const user = await User.findById(req.params.id, fieldSelect).exec();
    res.send({
      statusCode: 200,
      message: 'successful',
      data: user,
    });
  } catch (err) {
    res.send({
      statusCode: 500,
      message: err.message || 'An internal error occurred. Try again in 15secs',
    });
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
      return res.status(422).send({
        statusCode: 422,
        message: errors.array(),
      });
    }

    //Check if email already exist
    const user = await User.findOne({ email: req.body.email }, fieldSelect)
    .exec();

    //406 Not Acceptable
    if (user) {
      return res.status(406).send({
        statusCode: 406,
        message: 'User account already exist',
        data: user,
      });
    }

    //Create user
    const newUser = await User.create(prepareUser(req.body));

    res.status(201).send({
      statusCode: 201,
      message: 'User created successfully',
      data: selectField(newUser),
    });
  } catch (err) {
    return res.status(500).send({
      statusCode: 500,
      message: err.message || 'An internal error occurred. Try again in 15secs',
    });
  }
}
