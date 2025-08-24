'use client';

import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';

import addMeetingIcon from '@/public/icons/add-meeting.svg';
import scheduleIcon from '@/public/icons/schedule.svg';
import recordingIcons from '@/public/icons/recordings.svg';
import joinMeetingIcon from '@/public/icons/join-meeting.svg';

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) {
      return;
    }

    try {
      if (!values.dateTime) {
        toast('Please select a date and a time');

        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) {
        throw new Error('Failed to create call');
      }

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast('Meeting created');
    } catch (error) {
      console.error(error);

      toast('Failed to create meeting');
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">
      <HomeCard
        img={addMeetingIcon}
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />

      <HomeCard
        img={scheduleIcon}
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-blue-1"
      />

      <HomeCard
        img={recordingIcons}
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-purple-1"
      />

      <HomeCard
        img={joinMeetingIcon}
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-yellow-1"
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
