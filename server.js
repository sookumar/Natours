const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

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
  console.log('errorName:', err.name);
  console.log('UNHANDLED REJECTTION! 💥💥💥💥💥 SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});
