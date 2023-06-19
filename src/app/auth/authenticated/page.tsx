import Link from 'next/link';

export default function Authenticated() {
  return (
    <>
      <div>
        인증 이메일이 발송되었습니다.
        <br />
        인증 후 로그인 해주세요
      </div>
      <Link href="/auth/login">로그인하러 가기</Link>
    </>
  );
}
