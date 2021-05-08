/*
 * Import { createRequire } from 'module';
 * Const require = createRequire(import.meta.url);
 */
import User from '../models/user.js';
import { Response } from 'http-status-codez';
import {selectField, prepareUser } from './../utils/userHelper.js';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';


// SPECIFIES THE FIELDS TO RETURN
const fieldSelect = `userName firstName lastName otherNames 
                    email phone gender dob countryOfResidence countryCode 
                    stateOfResidence cityOfResidence address role 
                    emailVerified accountStatus avatar authtype`;

// GET ALL USERS
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


// GET A SINGLE USER BY ID
export async function getUser(req, res) {
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

// CREATE A USER - SIGNUP USING LOGIN FORM
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
