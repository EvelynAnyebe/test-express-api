import express from 'express';
const router = express.Router();
import {
  getUserValidation,
  createUserValidation,
} from './../middleware/requestValidation/user.js';

import auth from './../middleware/auth.js';

import { getUsers, getUser, createUser } from '../controllers/user.js';

router.get('/', auth, getUsers);

router.get('/:id',auth, getUserValidation, getUser);

router.post('/', auth, createUserValidation, createUser);

export default router;
