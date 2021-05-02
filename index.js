import './src/config/config.js';
import http from 'http';
import './src/config/mongoDb.js';
import app from './app.js';

// HANDLING UNCAUGHT EXCEPTION ERRORS
process.on('uncaughtException', (err) => {
  console.log(
    `UNCAUGHT EXCEPTION! Server Shutting down...\n
    ${err.name} \n ${err.message} `
  );
  process.exit(1);
});

let HOSTNAME = process.env.DEV_HOST;
const PORT = process.env.PORT;

if (process.env.NODE_ENV !== 'development') {
  HOSTNAME = process.env.HOST;
}

const server = http.createServer(app);

server.listen(PORT, HOSTNAME, () =>
  console.log(`Server running on port: ${HOSTNAME}:${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(
    `UNHANDLED REJECTION!! Shutting down Server...\n
    ${err.name} \n ${err.message}`
  );
  server.close(() => {
    process.exit(1);
  });
});
