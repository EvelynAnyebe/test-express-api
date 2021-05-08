import User from '../models/user.js';
import { Response } from 'http-status-codez';
import encrypt from './../utils/encrypt.js';
import { selectField } from './../utils/userHelper.js';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';
import JWT from 'jsonwebtoken';

function generateAccessToken(userId, role) {
  return JWT.sign({ userId: userId,
    role: role }, process.env.JWT_SECRET, {
    expiresIn: 43200,
  });
}

export async function login(req, res) {
  // CHECK THAT USER EXIST AND PASSWORD MATCH
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (
      !user ||
      user.authtype !== 'auth' ||
      encrypt(req.body.password) !== user.password
    ) {
      return res
        .status(Response.HTTP_NOT_FOUND)
        .send(new ErrorResponse('Wrong email or password provided'));
    }

    if (!user.emailVerified && !user.accountStatus) {
      return res
        .status(Response.HTTP_FORBIDDEN)
        .send(new ErrorResponse('User account is inactive'));
    }

    const accessToken = generateAccessToken(user.id,user.role);
    res.send(new SuccessResponse({ user: selectField(user),
        accessToken }));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
