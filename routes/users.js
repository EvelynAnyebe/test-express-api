import express from 'express';
const router = express.Router();

import {
  validate,
  getUsers,
  getUser,
  createUser,
} from '../controllers/user.js';

router.get('/', getUsers);

router.get('/:id', validate('getUser'), getUser);

router.post('/', validate('createUser'), createUser);

export default router;
