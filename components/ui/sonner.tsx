'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className=" bg-dark-1 text-white"
      position="top-right"
      closeButton={true}
      {...props}
    />
  );
};

export { Toaster };
