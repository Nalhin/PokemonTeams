import * as mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
