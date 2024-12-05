'use client';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/navigation';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import AppButton from '@/app/_components/app-button';

const BackButton = ({ className }: { className?: ClassNameValue }) => {
  const router = useRouter();

  return (
    <AppButton className={twMerge('w-fit', className)} startIcon={<ArrowBackRoundedIcon />} onClick={router.back}>
      Powrót
    </AppButton>
  );
};

export default BackButton;
