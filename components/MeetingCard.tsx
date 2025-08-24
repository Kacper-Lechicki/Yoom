'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { toast } from 'sonner';

import copyIcon from '@/public/icons/copy.svg';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[256px] w-full flex-col justify-between rounded-lg bg-dark-1 p-5">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={24} height={24} />

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>

      <article className="flex justify-between">
        <div className="relative flex max-md:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={32}
              height={32}
              className={cn('rounded-full', { absolute: index > 0 })}
              style={{ top: 0, left: index * 20 }}
            />
          ))}

          <div className="flex-center absolute left-[100px] w-[32px] h-[32px] rounded-full bg-dark-2 text-sm">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2 ml-auto">
            <Button
              onClick={handleClick}
              className="rounded bg-blue-1 h-[32px] px-6"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              {buttonText}
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast('Link Copied');
              }}
              className="bg-dark-4 h-[32px]"
            >
              <Image src={copyIcon} alt="feature" width={20} height={20} />
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
