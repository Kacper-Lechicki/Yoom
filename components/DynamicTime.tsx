'use client';

import React, { useEffect, useState } from 'react';

const DynamicTime = () => {
  const [time, setTime] = useState('');
  const [period, setPeriod] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      let hour = now.getHours();

      if (hour === 0) hour = 12;
      if (hour > 12) hour = hour - 12;

      const minute = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hour}:${minute}`;

      const periodString = now.getHours() >= 12 ? 'PM' : 'AM';

      const dateString = now
        .toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        .replace(/,(\s+\d{4})/, '$1');

      setTime(formattedTime);
      setPeriod(periodString);
      setDate(dateString);
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold lg:text-7xl">
        {time}
        <span className="text-2xl lg:text-4xl ml-2 font-medium">{period}</span>
      </h1>

      <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
    </>
  );
};

export default DynamicTime;
