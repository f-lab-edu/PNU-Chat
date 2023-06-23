import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

function matchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="매칭" />
      {children}
      <Navbar />
    </>
  );
}

export default matchLayout;
