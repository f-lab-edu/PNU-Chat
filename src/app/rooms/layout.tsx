import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import React from 'react';

function roomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="채팅 목록" />
      {children}
      <Navbar />
    </>
  );
}

export default roomsLayout;
