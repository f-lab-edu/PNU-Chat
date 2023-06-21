'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="contentCenter">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="id">
          <span className="inputTitle">아이디</span>
          <input
            name="id"
            id="id"
            type="email"
            ref={idRef}
            pattern="^[a-zA-Z0-9_\-]+@pusan\.ac\.kr$"
            required
            placeholder="*******@pusan.ac.kr"
            title="이메일 형식에 맞춰 입력해주세요."
            className="authInput w-[100%] "
          />
        </label>
        <label htmlFor="pw">
          <span className="inputTitle">비밀번호</span>
          <input
            id="pw"
            name="pw"
            type="password"
            ref={pwRef}
            pattern="^.{3,}$"
            required
            placeholder="비밀번호를 입력해주세요"
            title="비밀번호를 입력해주세요."
            className="authInput w-[100%]"
          />
        </label>
        <button type="submit" className="authBtn">
          로그인
        </button>
        <Link href="/auth/signup" className="text-gray-500 text-sm">
          회원가입 하러가기
        </Link>
      </form>
    </div>
  );
}

export default Login;
