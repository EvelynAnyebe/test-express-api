import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('crypto');


// Creating salt
const salt = process.env.encrypt_salt;

export default function encrypt(value) {

    // Hash user password and salt using 1000 iterations
    return crypto.pbkdf2Sync(value, salt, 1000, 64, `sha512`).toString(`hex`);
}