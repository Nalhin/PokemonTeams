import * as mongoose from 'mongoose';

export interface Team extends mongoose.Document {
  ownerId: string;
  name: string;
  description: string;
  roster: string[];
}
