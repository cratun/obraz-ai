'use client';

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dialog, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { twJoin } from 'tailwind-merge';
import AppButton from '@/app/_components/app-button';
import { GENERATION_TOKEN_DAILY_LIMIT, GENERATION_TOKEN_RETENTION_HOURS } from '@/app/generate/_utils/common';
import { ParsedGenerationTokenCookie } from '@/app/generate/_utils/generation-token';

const GenerateInfoLimit = ({
  generationTokenCountCookie,
}: {
  generationTokenCountCookie: ParsedGenerationTokenCookie;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={twJoin(
          'flex w-fit flex-wrap items-center gap-1 text-[12px] leading-[150%] tracking-[0.5px]',
          generationTokenCountCookie.value > 5 && 'text-text',
          generationTokenCountCookie.value <= 5 && 'text-[#f57c00]',
        )}
      >
        <div>
          <InfoOutlinedIcon className="mr-1 text-base" />
          <span>
            Pozostało <strong>{generationTokenCountCookie.value}</strong> generowań.{' '}
            {generationTokenCountCookie.value === 0 &&
              `Następne odnowienie: ${dayjs(generationTokenCountCookie.timestamp).add(24, 'hours').format('DD.MM.YYYY HH:mm')}`}
          </span>
        </div>
        <AppButton classes={{ root: 'p-0 text-[12px] underline' }} onClick={() => setOpen(true)}>
          Co to znaczy?
        </AppButton>
      </div>
      <Dialog classes={{ paper: 'w-full max-w-lg p-5 rounded-xl gap-5' }} open={open} onClose={() => setOpen(false)}>
        <IconButton className="absolute right-0 top-0" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <div className="flex flex-col gap-2.5">
          <div className="text-xl font-semibold leading-[120%] tracking-[1px]">
            Ilość pozostałych generowań: <span className="text-primary">{generationTokenCountCookie.value}</span>
          </div>
          <div className="text-xl font-semibold leading-[120%] tracking-[1px]">
            Następne odnowienie:{' '}
            <span className="text-primary">
              {dayjs(generationTokenCountCookie.timestamp).add(24, 'hours').format('DD.MM.YYYY HH:mm')}
            </span>
          </div>
        </div>
        <span className="leading-[150%] tracking-[0.5px]">
          Limit <strong>{GENERATION_TOKEN_DAILY_LIMIT}</strong> generowań na <strong>24</strong> godziny
        </span>
        <p className="leading-[150%] tracking-[0.5px]">
          Z powodu ograniczeń API oraz w celu ochrony przed nadużyciami, każde konto ma przyznany limit{' '}
          {GENERATION_TOKEN_DAILY_LIMIT} generowań na {GENERATION_TOKEN_RETENTION_HOURS} godziny. Dzięki temu zapewniamy
          płynność działania serwisu i zapobiegamy generowaniu obrazów przez boty oraz inne niepożądane skrypty.
          Generowania odnawiają się automatycznie po upływie doby, więc możesz kontynuować tworzenie swoich dzieł
          następnego dnia!
        </p>
      </Dialog>
    </>
  );
};

export default GenerateInfoLimit;
