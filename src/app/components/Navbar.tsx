'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navData = [
  { id: 'match', name: '매칭', path: '/match' },
  { id: 'chatRooms', name: '채팅방', path: '/rooms' },
  { id: 'profile', name: '프로필', path: '/profile' },
];
export default function Navbar() {
  const pathName = usePathname();

  return (
    <div>
      <ul>
        {navData.map((data) => (
          <li key={data.id} className={pathName === data.path ? '' : ''}>
            <Link href={data.path}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
