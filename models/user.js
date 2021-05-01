import mongoose from 'mongoose';
import { encrypt } from '../utils/encrypt.js';

const { Schema, model } = mongoose;

const UserSchema = Schema(
  {
    userName: {
      type: String
    },
    firstName: {
      type: String,
      required: true,
      minLength: 2
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2
    },
    otherNames: String,
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      minLength: 11,
      maxLength: 15
    },
    gender: String,
    dob: Date,
    countryOfResidence: String,
    countryCode: String,
    stateOfResidence: String,
    cityOfResidence: String,
    address: String,
    role: {
      user: Boolean,
      tutor: Boolean,
      admin: Boolean,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      set: pass => encrypt(pass)
    },
    emailVerificationToken: {
      type: String
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    auth: {
      authtype: String,
      accesstoken: {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        refresh: String,
        expired: Boolean,
      },
    },
  },
  { timestamps: true }
);



export default model('user', UserSchema);
