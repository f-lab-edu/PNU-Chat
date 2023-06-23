'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// client사이드 렌더링 why => 유저 검증을 위해 토큰이 필요함
export default function Match() {
  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  async function sendHandler(message: string) {
    try {
      setIsLoad(true);
      const result = await fetch(`/api/match/`, { method: 'POST', body: JSON.stringify({ message }) });
      if (result.redirected) {
        router.push(result.url);
      }
    } catch (e) {
      setIsLoad(false);
      alert('매칭에 실패하였습니다.');
      console.log(e);
    }
  }

  if (isLoad) return <div>메시지 전송중</div>;
  return (
    <div className="contentCenter">
      <span className="text-5xl">📬</span>
      <p>새로운 상대에게 첫 메시지를 전달해보세요</p>
      <div className="flex">
        <input
          className="pl-5 flex-1 focus:outline-none bg-blue-100 rounded mr-2"
          type="text"
          placeholder="메시지를 입력해주세요"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendHandler(text);
            }
          }}
        />
        <button type="button" className="bg-blue-400 rounded text-white p-2 w-[100px]" onClick={() => sendHandler(text)}>
          보내기
        </button>
      </div>
    </div>
  );
}
