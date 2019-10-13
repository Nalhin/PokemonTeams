import * as mongoose from 'mongoose';
import { Team } from './team.interface';

const TeamSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  type: { type: Number },
  name: { type: String },
  description: { type: String },
  roster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' }],
});

TeamSchema.pre('save', async function(next) {
  await this.populate({
    path: 'roster',
  }).execPopulate();
  next();
});

const Team = mongoose.model<Team & mongoose.Document>('team', TeamSchema);

export default Team;
