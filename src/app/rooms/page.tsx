'use client';

import { useEffect, useState } from 'react';
import { IRoomList } from '@/types/room';
import Link from 'next/link';
import Room from '@/components/Room';

async function getRoomList() {
  const res = await fetch('/api/roomList');
  return res.json();
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
      {roomList.map(({ roomObject, receiver }) => {
        if (roomList.length) {
          return (
            <Link href={`chat/${roomObject._id.toString()}`} key={roomObject.toString()}>
              <Room room={roomObject} receiver={receiver} />
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}
