import { IChatRoom } from '@/lib/models/ChatRoom';
import { IAboutReceiver } from '@/types/room';
import React from 'react';

function UnreadIcon({ room, receiver }: { room: IChatRoom; receiver: IAboutReceiver }) {
  if (room.from.toString() === receiver._id.toString()) {
    if (room.unreadFrom) return <span className="rounded-full bg-red-400 p-1 w-[30px] h-[30px] text-center text-white">{room.unreadFrom}</span>;
    return null;
  }
  if (room.unreadTo) return <span className="rounded-full bg-red-400 p-1 w-[30px] h-[30px] text-center text-white">{room.unreadTo}</span>;
  return null;
}

export default UnreadIcon;
