import app from './app';
import * as mongoose from 'mongoose';

const port = process.env.PORT;
const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'Connection error:'));

conn.once('open', () => {
  console.log('Connected to db');
  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});
