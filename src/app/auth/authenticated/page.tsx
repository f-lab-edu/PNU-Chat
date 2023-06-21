import Link from 'next/link';

export default function Authenticated() {
  return (
    <>
      <div className="contentCenter">
        <span className="block text-5xl mb-9">✅</span>
        인증 이메일이 발송되었습니다.
        <br />
        인증 후 로그인 해주세요
      </div>
      <Link href="/auth/login">
        <button type="button" className="authBtn">
          로그인하러 가기
        </button>
      </Link>
    </>
  );
}
