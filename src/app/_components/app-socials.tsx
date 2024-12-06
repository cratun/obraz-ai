import { ReactNode } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const AppSocials = ({ className, children }: { className?: ClassNameValue; children?: ReactNode }) => {
  return (
    <div className={twMerge('flex flex-col gap-2.5', className)}>
      {children}
      <div className="flex gap-2.5">
        <IconButton href="https://www.instagram.com/obraz_ai_official/" LinkComponent={Link} target="_blank">
          <InstagramIcon className="text-3xl" />
        </IconButton>
        <IconButton href="https://www.facebook.com/profile.php?id=61566337418480" LinkComponent={Link} target="_blank">
          <FacebookIcon className="text-3xl" />
        </IconButton>
        <IconButton href="https://x.com/ObrazAI" LinkComponent={Link} target="_blank">
          <XIcon className="text-3xl" />
        </IconButton>
      </div>
    </div>
  );
};

export default AppSocials;
