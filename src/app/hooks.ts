'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useLocalStorage } from 'usehooks-ts';

const DAILY_LIMIT = 20;

export const useGenerationDailyLimit = () => {
  const today = dayjs().format('YYYY-MM-DD');

  const [storageData, setStorageData] = useLocalStorage(
    'creation-daily-limit',
    {
      remainingTries: DAILY_LIMIT,
      lastResetDate: today,
    },
    { initializeWithValue: false },
  );

  useEffect(() => {
    if (storageData.lastResetDate !== today) {
      setStorageData({ remainingTries: DAILY_LIMIT, lastResetDate: today });
    }
  }, [storageData, today, setStorageData]);

  const consume = () => {
    console.log(storageData.remainingTries);
    if (storageData.remainingTries > 0) {
      setStorageData({ remainingTries: storageData.remainingTries - 1, lastResetDate: today });
    }
  };

  return { remainingTries: storageData.remainingTries, consume, lastResetDate: storageData.lastResetDate };
};

export const usePromptState = () => {
  return useState('');
};
