import './config/config.js';
import express from 'express';
import mongoose from 'mongoose';
import devConfig from './config/devConfig.js';
import prodConfig from './config/prodConfig.js';

let HOSTNAME=devConfig.HOST;
let PORT=devConfig.PORT;
let DB_URL=devConfig.DB_URL;

if (process.env.NODE_ENV !== "development") {
  HOSTNAME=prodConfig.HOST;
  PORT=prodConfig.PORT;
  DB_URL=prodConfig.DB_URL;
}

//Import routes
import usersRoutes from "./routes/users.js";

//Initialize express application
const app = express();

//Initialize the body parser middleware
app.use(express.json({}));
app.use(express.urlencoded({extended: false}));


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
