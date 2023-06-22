'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navData = [
  { id: 'match', name: '매칭', path: '/match', icon: '/paperAirplaneIcon.svg' },
  { id: 'chatRooms', name: '채팅방', path: '/rooms', icon: '/messageIcon.svg' },
  { id: 'profile', name: '프로필', path: '/profile', icon: '/personIcon.svg' },
];

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="h-[10%] bg-white bottom-0 list-none flex justify-around items-center">
      {navData.map((data) => (
        <Link href={data.path}>
          <div
            key={data.id}
            className={`${
              pathName === data.path ? 'border-b-4 border-b-blue-400 w-[100px] flex flex-col items-center' : 'w-[100px] flex items-center flex-col'
            }`}
          >
            <Image src={data.icon} width={30} height={30} alt={`${data.name}아이콘`} />
            <span>{data.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
