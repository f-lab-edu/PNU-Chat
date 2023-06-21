'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="text-center mb-8">
      <Image alt="backIcon" src="/backIcon.svg" width={16} height={16} className="absolute top-4 left-4" onClick={() => router.back()} />
      <h1 className="font-bold">{title}</h1>
    </div>
  );
}
