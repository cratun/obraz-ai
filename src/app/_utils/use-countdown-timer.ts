import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useCountDownTimer = (endDate: dayjs.ConfigType) => {
  const [displayString, setDisplayString] = useState<string | null>(null);

  useEffect(() => {
    const end = dayjs(endDate);

    const updateDisplay = () => {
      const now = dayjs();
      const diffInMs = end.diff(now);

      if (diffInMs <= 0) {
        // Time has passed
        setDisplayString(null);

        return;
      }

      const diffInDays = end.diff(now, 'day', true);

      if (diffInDays > 2) {
        // More than 2 days in the future, display the day of the week
        setDisplayString(end.format('dddd')); // e.g., "piątek" for Friday
      } else if (diffInDays > 1) {
        // Between 1 and 2 days, display hours:minutes
        const timeLeft = dayjs.duration(diffInMs);
        const hours = Math.floor(timeLeft.asHours()).toString().padStart(2, '0');
        const minutes = timeLeft.minutes().toString().padStart(2, '0');
        setDisplayString(`${hours}h ${minutes}m`);
      } else {
        // Less than 1 day, display hours:minutes:seconds
        const timeLeft = dayjs.duration(diffInMs);
        const hours = Math.floor(timeLeft.asHours()).toString().padStart(2, '0');
        const minutes = timeLeft.minutes().toString().padStart(2, '0');
        const seconds = timeLeft.seconds().toString().padStart(2, '0');
        setDisplayString(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateDisplay(); // Initial call to set display

    let timerId: number;

    const scheduleNextUpdate = () => {
      const now = dayjs();
      const diffInMs = end.diff(now);
      const diffInDays = end.diff(now, 'day', true);

      if (diffInMs <= 0) {
        // Time has passed, no further updates
        setDisplayString(null);

        return;
      } else if (diffInDays > 2) {
        // Schedule next update when crossing 2 days
        const nextUpdate = end.subtract(2, 'day');
        const nextUpdateInMs = nextUpdate.diff(now);
        timerId = window.setTimeout(() => {
          updateDisplay();
          scheduleNextUpdate();
        }, nextUpdateInMs);
      } else if (diffInDays > 1) {
        // Update every minute
        timerId = window.setInterval(updateDisplay, 60 * 1000);
      } else {
        // Update every second
        timerId = window.setInterval(updateDisplay, 1000);
      }
    };

    scheduleNextUpdate();

    // Cleanup on unmount or when endDate changes
    return () => {
      clearTimeout(timerId);
      clearInterval(timerId);
    };
  }, [endDate]);

  return displayString;
};

export default useCountDownTimer;
