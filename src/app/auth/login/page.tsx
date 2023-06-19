'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      email: idRef.current?.value,
      password: pwRef.current?.value,
    };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      router.push(response.url);
    } catch (error) {
      throw new Error('로그인 실패');
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="id"
          type="email"
          ref={idRef}
          pattern="^[a-zA-Z0-9_\-]+@pusan\.ac\.kr$"
          required
          placeholder="이메일을 입력해주세요. *****@pusan.ac.kr"
          title="이메일 형식에 맞춰 입력해주세요."
        />
        <input
          name="pw"
          type="password"
          ref={pwRef}
          pattern="^.{3,}$"
          required
          placeholder="비밀번호를 입력해주세요"
          title="비밀번호를 입력해주세요."
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
