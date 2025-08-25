import { cn } from '@/lib/utils';
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const router = useRouter();

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;

      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;

      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-[calc(100% - 6rem)] overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center m-3">
          <CallLayout />
        </div>

        <div
          className={cn(
            'absolute top-3 right-6 w-[calc(100%-3rem)] h-[calc(100%-150px)] max-w-[350px] max-h-[500px] ml-2 bg-dark-1 min-w-[264px] p-6 rounded-2xl z-50',
            {
              hidden: !showParticipants,
              block: showParticipants,
            },
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-6 flex w-full items-center justify-center gap-x-4 gap-y-1 flex-wrap">
        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232D] p-2 hover:bg-[#4D535B]">
              <LayoutList size={17.5} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#4D535B]"
                  onClick={() => {
                    setLayout(item.toLocaleLowerCase() as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-full  bg-[#19232D] p-2 hover:bg-[#4D535B]">
            <Users size={17.5} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
