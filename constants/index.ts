import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import homeIcon from '@/public/icons/Home.svg';
import upcomingIcon from '@/public/icons/upcoming.svg';
import previousIcon from '@/public/icons/previous.svg';
import videoIcon from '@/public/icons/Video.svg';
import addPersonalIcon from '@/public/icons/add-personal.svg';

import avatar1Image from '@/public/images/avatar-1.jpeg';
import avatar2Image from '@/public/images/avatar-2.jpeg';
import avatar3Image from '@/public/images/avatar-3.png';
import avatar4Image from '@/public/images/avatar-4.png';
import avatar5Image from '@/public/images/avatar-5.png';

export type SidebarLink = {
  image: StaticImport;
  route: string;
  label: string;
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    image: homeIcon,
    route: '/',
    label: 'Home',
  },
  {
    image: upcomingIcon,
    route: '/upcoming',
    label: 'Upcoming',
  },
  {
    image: previousIcon,
    route: '/previous',
    label: 'Previous',
  },
  {
    image: videoIcon,
    route: '/recordings',
    label: 'Recordings',
  },
  {
    image: addPersonalIcon,
    route: '/personal-room',
    label: 'Personal Room',
  },
];

export const avatarImages: StaticImport[] = [
  avatar1Image,
  avatar2Image,
  avatar3Image,
  avatar4Image,
  avatar5Image,
];
