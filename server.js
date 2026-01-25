const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err.name);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

// console.log(process.env);

// 4) Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTTION! 💥💥💥💥💥 SHUTTING DOWN...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
