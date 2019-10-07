import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';
import { Schema, Model } from 'mongoose';

export interface IUser extends User {
  generateAuthenticationToken: () => Promise<string>;
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(): string;
}

const UserSchema: Schema = new Schema({
  login: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  tokens: [{ type: String }],
});

UserSchema.pre<IUserModel>('save', async function(next) {
  await this.hashPassword();
  next();
});

UserSchema.method('comparePassword', function(password: string): boolean {
  return !!bcrypt.compareSync(password, this.password);
});

UserSchema.static('hashPassword', () => {
  const hash = bcrypt.hashSync(this.password);
  this.password = hash;
});

UserSchema.method('generateAuthenticationToken', async function(): Promise<
  string
> {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET);

  this.tokens = this.tokens.concat(token);
  await this.save();

  return token;
});

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>(
  'user',
  UserSchema,
);

export default UserModel;
