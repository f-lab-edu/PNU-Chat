'use client';

import { useEffect, useState } from 'react';
import { IChatRoom } from '@/lib/models/ChatRoom';
import Link from 'next/link';

async function getRoomList() {
  const res = await fetch('/api/roomList');
  return res.json();
}

interface IRoomList {
  roomObject: IChatRoom;
  receiver: { age: number; nickname: string; gender: string; major: string };
}
export default function RoomList() {
  const [roomList, setRoomList] = useState<IRoomList[]>([]);
  useEffect(() => {
    (async () => {
      const data: IRoomList[] = await getRoomList();
      setRoomList([...data]);
    })();
  }, []);

  return (
    <div>
      this is roomList page
      {roomList.map(({ roomObject, receiver }) => {
        if (roomList.length) {
          return (
            <Link href={`chat/${roomObject._id.toString()}`} key={roomObject.toString()}>
              <div>
                {receiver.nickname}/{receiver.gender}/{receiver.age}/{receiver.major}
              </div>
              <div>{roomObject.lastMessage}</div>
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}
