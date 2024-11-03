import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useCountdownTimer = (endDate: dayjs.ConfigType) => {
  const [displayString, setDisplayString] = useState<string | null>(null);

  useEffect(() => {
    const end = dayjs(endDate);

    const updateDisplay = () => {
      const now = dayjs();
      const diffInMs = end.diff(now);

      if (diffInMs <= 0) {
        setDisplayString(null);

        return;
      }

      const timeLeft = dayjs.duration(diffInMs);
      const days = Math.floor(timeLeft.asDays());
      const hours = timeLeft.hours();
      const minutes = timeLeft.minutes();
      const seconds = timeLeft.seconds();

      const displayParts: string[] = [];

      if (days > 0) {
        displayParts.push(`${days}d`);
      }

      if (days > 0 || hours > 0) {
        displayParts.push(`${hours.toString().padStart(2, '0')}h`);
      }

      if (days > 0 || hours > 0 || minutes > 0) {
        displayParts.push(`${minutes.toString().padStart(2, '0')}m`);
      } else {
        // When minutes are not present but seconds are, show '00m'
        displayParts.push(`00m`);
      }

      displayParts.push(`${seconds.toString().padStart(2, '0')}s`);

      setDisplayString(displayParts.join(' : '));
    };

    // Initial display update
    updateDisplay();

    // Set up interval to update every second
    const intervalId = window.setInterval(updateDisplay, 1000);

    // Cleanup on unmount or when endDate changes
    return () => {
      clearInterval(intervalId);
    };
  }, [endDate]);

  return displayString;
};

export default useCountdownTimer;
