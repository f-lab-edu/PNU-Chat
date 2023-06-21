import { IChatRoom } from '@/lib/models/ChatRoom';
import { IAboutReceiver } from '@/types/room';
import React from 'react';

function Room({ room, receiver }: { room: IChatRoom; receiver: IAboutReceiver }) {
  return (
    <div className="hover:bg-gray-100">
      <div>
        <span className="mr-2 text-xl">{receiver.nickname}</span>
        <span className="yellowTag">{receiver.gender}</span>
        <span className="blueTag">{receiver.age}세</span>
        <span className="greenTag">{receiver.major}</span>
      </div>
      <div className="flex h-[50px]">
        <div className="overflow-ellipsis flex-1">{room.lastMessage}</div>
        <span className="rounded-full bg-red-400 p-1 w-[30px] h-[30px] text-center text-white">
          {room.from.toString() === receiver._id.toString() ? room.unreadTo : room.unreadFrom}
        </span>
      </div>
    </div>
  );
}

export default Room;
