import express from 'express';
import morgan from 'morgan';


// IMPORT ROUTES
import usersRoutes from './src/routes/users.js';

// INITIALIZE EXPRESS APP
const app = express();

app.use(morgan('tiny'));

// INITIALIZE BODY PARSER MIDDLEWARE
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRoutes);

app.all('*', (req, res) => {
  res.status(404).send(`can't find ${req.originalUrl} on this server`);
});

export default app;

