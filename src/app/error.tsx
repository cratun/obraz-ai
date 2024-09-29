'use client';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Link from 'next/link';
import AppButton from './_components/app-button';

const AppError = ({ reset }: { reset: () => void }) => {
  return (
    <div className="mt-[5vh] flex items-center justify-center p-5 lg:mt-[15vh]">
      <div className="flex flex-col items-center gap-10 text-center">
        <ErrorOutlineRoundedIcon className="size-48 text-error" />
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="text-2xl font-bold text-text lg:text-4xl">Wystąpił nieoczekiwany błąd</h2>
          <p className="text-base text-text lg:text-2xl">Spróbuj ponownie lub skontaktuj się z nami.</p>
          <p></p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <AppButton href="/generate" LinkComponent={Link} size="large" variant="contained">
            Przejdź do generatora
          </AppButton>
          <AppButton size="large" variant="outlined" onClick={reset}>
            Spróbuj ponownie
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AppError;
