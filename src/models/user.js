import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
      select: false
    },
    emailVerificationToken: {
      type: String,
      select: false
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
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function(reqPassword) {
  return bcrypt.compare(reqPassword, this.password);

}



export default model('user', UserSchema);
