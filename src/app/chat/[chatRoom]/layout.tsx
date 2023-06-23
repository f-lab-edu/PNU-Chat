import Navbar from '@/components/Navbar';

function chatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}

export default chatLayout;
