'use client';

import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';
import ReactDatepicker from 'react-datepicker';

import addMeetingIcon from '@/public/icons/add-meeting.svg';
import scheduleIcon from '@/public/icons/schedule.svg';
import recordingIcons from '@/public/icons/recordings.svg';
import joinMeetingIcon from '@/public/icons/join-meeting.svg';
import checkedIcon from '@/public/icons/checked.svg';
import copyIcon from '@/public/icons/copy.svg';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
        handleClick={() => router.push('/recordings')}
        className="bg-purple-1"
      />

      <HomeCard
        img={joinMeetingIcon}
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-5 mb-5">
            <div className="flex flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-sky-2">
                Add a description
              </label>

              <Textarea
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>

            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-sky-2">
                Select date and time
              </label>

              <ReactDatepicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-lg bg-dark-3 p-2 focus:outline-none"
                minDate={new Date()}
                minTime={new Date()}
                maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => {
            setMeetingState(undefined);
            setCallDetails(undefined);
          }}
          title="Meeting Created"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast('Link copied');
          }}
          className="text-center"
          image={checkedIcon}
          buttonIcon={copyIcon}
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <div className="mb-5">
          <Input
            placeholder="Meeting Link"
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
          />
        </div>
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
