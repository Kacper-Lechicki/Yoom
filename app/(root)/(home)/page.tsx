import DynamicTime from '@/components/DynamicTime';
import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react';

const Home = () => {
  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-lg bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] w-fit rounded py-2 px-4 text-base font-normal overflow-hidden unde">
            Upcoming Meeting at: <strong className="underline">12:30 PM</strong>
          </h2>

          <div className="flex flex-col gap-2">
            <DynamicTime />
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
