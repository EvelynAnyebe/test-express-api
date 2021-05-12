import User from '../models/user.js';
import { Response } from 'http-status-codez';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';

/*
 *  Prepare the user object for insert
 */
 function prepareUser(body) {
  const { firstName, lastName, email, password } = body;
  const authtype = 'auth';
  return {
    firstName,
    lastName,
    email,
    password,
    authtype,
  };
}

// GET ALL USERS
export async function getUsers(req, res) {
  try {
    const users = await User.find();
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


// GET A SINGLE USER BY ID
export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    res.send(new SuccessResponse(user));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// CREATE A USER - SIGNUP USING LOGIN FORM
export async function createUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(Response.HTTP_NOT_ACCEPTABLE)
        .send(new ErrorResponse('User already exist'));
    }

    const userObj = new User(prepareUser(req.body));
    const newUser = await userObj.save();

    res
      .status(Response.HTTP_CREATED)
      .send(
        new SuccessResponse(newUser, 'User created successfully')
      );
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
