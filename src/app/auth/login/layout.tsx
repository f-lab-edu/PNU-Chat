import Header from '../../../components/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="로그인" />
      {children}
    </>
  );
}
