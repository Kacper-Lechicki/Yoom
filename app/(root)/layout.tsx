import React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return <main>{children}</main>;
};

export default RootLayout;
