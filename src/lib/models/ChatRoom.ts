import mongoose from 'mongoose';

export interface IChatRoom {
  _id: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  unreadFrom: number;
  unreadTo: number;
  lastMessage: string;
  messages: mongoose.Types.ObjectId[];
}

const chatRoomSchema = new mongoose.Schema<IChatRoom>({
  messages: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], default: [] },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  unreadFrom: { type: Number, default: 0 },
  unreadTo: { type: Number, default: 0 },
  lastMessage: String,
});

const ChatRoom = mongoose.models.ChatRoom || mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);
export default ChatRoom;
