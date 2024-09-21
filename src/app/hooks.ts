'use client';

import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useQueryState } from 'nuqs';
import { useLocalStorage } from 'usehooks-ts';

const DAILY_LIMIT = 20;

export const useCreationDailyLimit = () => {
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
    if (storageData.remainingTries > 0) {
      setStorageData({ remainingTries: storageData.remainingTries - 1, lastResetDate: today });
    }
  };

  return { remainingTries: storageData.remainingTries, consume };
};

export const usePromptState = () => {
  return useQueryState('prompt', { history: 'replace', defaultValue: '' });
};
