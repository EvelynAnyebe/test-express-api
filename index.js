import express from "express";

//Import routes
import { usersRoutes } from './routes/index.js';


//Initialize express application
const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST;

//Initialize the body parser middleware
app.use(express.json({}));

app.use('/users',usersRoutes);

app.get('/',(req,res)=>{
    console.log('[TEST]!');
    res.send('Hello from homepage in develop branch');
});

app.listen(PORT, HOSTNAME, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
