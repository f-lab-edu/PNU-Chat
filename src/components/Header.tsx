'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 p-2 bg-white text-center">
      <Image
        alt="backIcon"
        src="/backIcon.svg"
        width={16}
        height={16}
        className="absolute inline left-4 cursor-pointer"
        onClick={() => router.back()}
      />
      <h1 className="inline font-bold ">{title}</h1>
    </div>
  );
}
