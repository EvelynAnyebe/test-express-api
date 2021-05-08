import encrypt from './../utils/encrypt.js';

// SELECT ATTRIBUTES TO RETURN TO CLIENT AFTER CREATE USER
export function selectField(newUser) {
    return (({
      userName,
      firstName,
      lastName,
      email,
      role,
      emailVerified,
      emailVerificationToken,
      accountStatus,
      authtype,
    }) => ({
      userName,
      firstName,
      lastName,
      email,
      role,
      emailVerified,
      emailVerificationToken,
      accountStatus,
      authtype,
    }))(newUser);
  }

/*
 *  Controller HELPERS
 *  PREPARE USER OBJECT FOR INSERT
 */
export function prepareUser(body) {
    const { firstName, lastName, email, password } = body;
    const emailVerificationToken = encrypt(firstName);
    const role = { user: true };
    const authtype = 'auth';
    return {
      firstName,
      lastName,
      email,
      password,
      emailVerificationToken,
      role,
      authtype,
    };
  }