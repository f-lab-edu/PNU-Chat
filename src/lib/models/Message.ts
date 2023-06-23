import mongoose from 'mongoose';

export interface IMessage {
  _id: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: number;
}

const messageSchema = new mongoose.Schema<IMessage>({
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  read: Boolean,
  createdAt: { type: Number, default: Date.now() },
});

const Message = mongoose.models?.Message || mongoose.model<IMessage>('Message', messageSchema);
export default Message;
