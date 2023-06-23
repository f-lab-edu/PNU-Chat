import Navbar from './components/Navbar';

export const metadata = {
  title: 'PNU-CHAT',
  description: '랜덤 채팅 서비스를 제공합니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <body>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
