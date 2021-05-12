import express from 'express';
import passport from 'passport';

const router = express.Router();
import { loginValidation } from './../middleware/requestValidation/auth.js';

import { login, googleLogin } from '../controllers/auth.js';
import '../controllers/googleAuth.js';

router.post('/login', loginValidation, login);

router.get('/google', passport.authenticate('google', { scope: [
      'profile',
      'email'
    ] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleLogin
);

export default router;
