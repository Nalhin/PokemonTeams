import * as mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options);
