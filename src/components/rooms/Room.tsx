import { IChatRoom } from '@/lib/models/ChatRoom';
import { IAboutReceiver } from '@/types/room';
import React from 'react';
import UnreadIcon from './UnreadIcon';

function Room({ room, receiver }: { room: IChatRoom; receiver: IAboutReceiver }) {
  return (
    <div className="hover:bg-gray-100 p-4">
      <div>
        <span className="mr-2 text-xl">{receiver.nickname}</span>
        <span className="yellowTag">{receiver.gender}</span>
        <span className="blueTag">{receiver.age}세</span>
        <span className="greenTag">{receiver.major}</span>
      </div>
      <div className="flex h-[50px] items-center">
        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap flex-1">{room.lastMessage}</div>
        <UnreadIcon room={room} receiver={receiver} />
      </div>
    </div>
  );
}

export default Room;
