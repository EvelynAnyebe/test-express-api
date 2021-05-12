import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

// IMPORT ROUTES
import usersRoutes from './src/routes/users.js';
import authRoutes from './src/routes/auth.js';

// INITIALIZE EXPRESS APP
const app = express();

// ADDING CORS MIDDLEWARE
const corsOptions = {
  origin: ['http://localhost'],
};

app.use(cors(corsOptions));

app.use(morgan('tiny'));

// INITIALIZE BODY PARSER MIDDLEWARE
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/users', usersRoutes);

app.use('/auth',authRoutes);

app.all('*', (req, res) => {
  res.status(404).send(`can't find ${req.originalUrl} on this server`);
});

export default app;
