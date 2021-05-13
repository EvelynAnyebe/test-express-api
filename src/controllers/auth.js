import User from '../models/user.js';
import { Response } from 'http-status-codez';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';
import generateAccessToken from './../utils/generateAccessToken.js';


export async function login(req, res) {
  // CHECK THAT USER EXIST AND PASSWORD MATCH
  try {
    const user = await User.findOne({ email: req.body.email })
    .select('+password');
    if (
      !user ||
      user.authtype !== 'auth' ||
      !user.comparePassword(req.body.password)) {
      return res
        .status(Response.HTTP_NOT_FOUND)
        .send(new ErrorResponse('Wrong email or password provided'));
    }

    if (!user.emailVerified || !user.accountStatus) {
      return res
        .status(Response.HTTP_FORBIDDEN)
        .send(new ErrorResponse('User account is inactive'));
    }

    const accessToken = generateAccessToken(user.id,user.role);
    res.send(new SuccessResponse({ user,
        accessToken }));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

export function googleLogin(req, res) {
  // PASSPORT AUTHENTICATE RETURNS res.user
  try {
    const user=req.user;
    const accessToken = generateAccessToken(user.id,user.role);
    res.send(new SuccessResponse({ user,
      accessToken }));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
