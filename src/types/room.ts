import { IChatRoom } from '@/lib/models/ChatRoom';
import { Types } from 'mongoose';

export interface IAboutReceiver {
  _id: Types.ObjectId;
  age: number;
  nickname: string;
  gender: string;
  major: string;
}

export interface IRoomList {
  roomObject: IChatRoom;
  receiver: IAboutReceiver;
}
