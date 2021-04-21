import express from "express";

//Import routes
import usersRoutes from './routes/users.js';


//Initialize express application
const app = express();
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOST || "0.0.0.0";

//Initialize the body parser middleware
app.use(express.json({}));

app.use('/users',usersRoutes);

app.get('/',(req,res)=>{
    console.log('[TEST]!');
    res.send('Hello from homepage');
});

app.listen(PORT, HOSTNAME, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
