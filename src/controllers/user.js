/*
 * Import { createRequire } from 'module';
 * Const require = createRequire(import.meta.url);
 */
import User from '../models/user.js';
import { Response } from 'http-status-codez';
import encrypt from './../utils/encrypt.js';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';

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
      return res.status(Response.HTTP_NOT_FOUND).send(
        new ErrorResponse(
          'There are no registered users at the moment'
        )
      );
    }
    return res.send(new SuccessResponse(users));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
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
    //Validation passed, handle request
    const user = await User.findById(req.params.id, fieldSelect).exec();

    if (!user) {
     return res
        .status(Response.HTTP_NOT_FOUND)
        .send(new ErrorResponse('USER NOT FOUND'));
    }
    res.send(new SuccessResponse(user));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
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
    //Check if email already exist
    const user = await User.findOne(
      { email: req.body.email },
      fieldSelect
    ).exec();
    //406 Not Acceptable
    if (user) {
      return res
        .status(Response.HTTP_NOT_ACCEPTABLE)
        .send(new ErrorResponse('User already exist'));
    }

    //Create user
    const newUser = await User.create(prepareUser(req.body));

    res
      .status(Response.HTTP_CREATED)
      .send(
        new SuccessResponse(selectField(newUser), 'User created successfully')
      );
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
