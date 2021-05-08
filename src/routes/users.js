import express from 'express';
const router = express.Router();
import {
  getUserValidation,
  createUserValidation,
} from './../middleware/requestValidation/user.js';

import { getUsers, getUser, createUser } from '../controllers/user.js';

router.get('/', getUsers);

router.get('/:id', getUserValidation, getUser);

router.post('/', createUserValidation, createUser);

export default router;
