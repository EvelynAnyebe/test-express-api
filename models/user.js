import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = Schema(
  {
    userName: String,
    firstName: String,
    lastName: String,
    otherNames: String,
    email: String,
    phone: String,
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
    password: String,
    emailVerified: Boolean,
    accountStatus: Boolean,
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

export default model("user", UserSchema);
