import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  nickname: string;
  password: string;
  age: number;
  gender: string;
  major: string;
  isAuthenticated: boolean;
  uuid: string;
  chatRooms: mongoose.Types.ObjectId[];
}
const userSchema = new mongoose.Schema<IUser>({
  email: String,
  nickname: String,
  password: String,
  age: Number,
  gender: String,
  major: String,
  isAuthenticated: Boolean,
  uuid: String,
  chatRooms: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }], default: [] },
});

const User = mongoose.models.USER || mongoose.model('USER', userSchema);
export default User;
