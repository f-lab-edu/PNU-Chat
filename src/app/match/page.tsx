'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// client사이드 렌더링 why => 유저 검증을 위해 토큰이 필요함
export default async function Match() {
  const router = useRouter();
  useEffect(() => {
    try {
      (async () => {
        const result = await fetch('/api/match');
        if (result.redirected) {
          router.push(result.url);
        }
      })();
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  return <div>종이 비행기 날아가는 애니메이션?</div>;
}
