import homeIcon from '@/public/icons/Home.svg';
import upcomingIcon from '@/public/icons/upcoming.svg';
import previousIcon from '@/public/icons/previous.svg';
import videoIcon from '@/public/icons/Video.svg';
import addPersonalIcon from '@/public/icons/add-personal.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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
