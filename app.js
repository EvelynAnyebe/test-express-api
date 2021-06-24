import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

// IMPORT ROUTES
import usersRoutes from './src/routes/users.js';
import authRoutes from './src/routes/auth.js';
import noteRoutes from './src/routes/notes.js';
// INITIALIZE EXPRESS APP
const app = express();

// ADDING CORS MIDDLEWARE
const corsOptions = {};

app.use(cors(corsOptions));

app.use(morgan('tiny'));

// INITIALIZE BODY PARSER MIDDLEWARE
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/users', usersRoutes);

app.use('/auth',authRoutes);
app.use('/notes',noteRoutes);

app.all('*', (req, res) => {
  res.status(404).send(`can't find ${req.originalUrl} on this server`);
});

export default app;
