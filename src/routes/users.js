import express from 'express';
const router = express.Router();
/*
 * G import {
 *   getUserValidation,
 *   createUserValidation,
 * } from './../middleware/requestValidation/user.js';
 * import auth from './../middleware/auth.js';
 * G getUserValidation, createUserValidation,
 */

import { getUsers, getUser, createUser } from '../controllers/user.js';

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/',createUser);

export default router;
