'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type HomeCardProps = {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
};

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        'px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-lg cursor-pointer',
        className,
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-lg">
        <Image src={img} alt="meeting" width={24} height={24} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
