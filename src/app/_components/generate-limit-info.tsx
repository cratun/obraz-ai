'use client';

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dialog, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { twJoin } from 'tailwind-merge';
import { useGenerationDailyLimit } from '@/app/hooks';
import AppButton from './app-button';
const GenerateInfoLimit = () => {
  const [open, setOpen] = useState(false);
  const { lastResetDate, remainingTries } = useGenerationDailyLimit();

  const formattedDate = dayjs(lastResetDate).format('DD.MM.YYYY');

  return (
    <>
      <div
        className={twJoin(
          'flex w-fit items-center justify-center gap-1 text-[12px] leading-[150%] tracking-[0.5px]',
          remainingTries > 5 && 'text-text',
          remainingTries === 0 && 'text-[#d32f2f]',
          remainingTries <= 5 && remainingTries > 0 && 'text-[#f57c00]',
        )}
      >
        <InfoOutlinedIcon className="text-base" />
        <span>
          Pozostało <strong>{remainingTries}</strong> generowań.
        </span>
        <AppButton classes={{ root: 'p-0 text-[12px] underline' }} onClick={() => setOpen(true)}>
          Co to znaczy?
        </AppButton>
      </div>
      <Dialog classes={{ paper: 'w-full max-w-lg p-5 rounded-xl gap-5' }} open={open} onClose={() => setOpen(false)}>
        <IconButton className="absolute right-0 top-0" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <div className="flex flex-col gap-2.5">
          <h4 className="text-2xl font-semibold leading-[120%] tracking-[1px]">
            Ilość pozostałych kredytów: <span className="text-primary">{remainingTries}</span>
          </h4>
          <h4 className="text-2xl font-semibold leading-[120%] tracking-[1px]">
            Ostatni reset: <span className="text-primary">{formattedDate}</span>
          </h4>
        </div>
        <span className="leading-[150%] tracking-[0.5px]">
          Limit <strong>20</strong> kredytów na <strong>24</strong> godziny
        </span>
        <p className="leading-[150%] tracking-[0.5px]">
          Z powodu ograniczeń API oraz w celu ochrony przed nadużyciami, każde konto ma przyznany limit 20 kredytów na
          24 godziny. Dzięki temu zapewniamy płynność działania serwisu i zapobiegamy generowaniu obrazów przez boty
          oraz inne niepożądane skrypty. Kredyty odnawiają się automatycznie po upływie doby, więc możesz kontynuować
          tworzenie swoich dzieł następnego dnia!
        </p>
      </Dialog>
    </>
  );
};

export default GenerateInfoLimit;
