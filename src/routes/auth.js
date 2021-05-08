import express from 'express';
const router = express.Router();
import {
    loginValidation
} from './../middleware/requestValidation/auth.js';

import { login } from '../controllers/auth.js';


router.post('/', loginValidation, login);


export default router;
