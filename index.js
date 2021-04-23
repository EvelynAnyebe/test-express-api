import express from 'express';
import mongoose from 'mongoose';
import { HOSTNAME, PORT, DB_URL } from './config.js';
//Import routes
import { usersRoutes } from './routes/index.js';

//Initialize express application
const app = express();

//Initialize the body parser middleware
app.use(express.json({}));

//MongoDB
mongoose.Promise=global.Promise;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database up and running.");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("[TEST]!");
  res.send("Hello from homepage in develop branch");
});

app.listen(PORT, HOSTNAME, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
