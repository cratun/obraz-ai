'use client';

import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Drawer, IconButton } from '@mui/material';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import { InspirationStyle, styles } from '@/app/(main-layout)/inspirations/utils';
import AppButton from '@/app/_components/app-button';
import Typography from '@/app/_components/typography';

const FiltersDrawer = ({ style }: { style?: InspirationStyle }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <AppButton
        className="w-fit md:hidden"
        size="large"
        startIcon={<FilterAltOutlinedIcon />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Filtry
      </AppButton>
      <Drawer
        anchor="left"
        classes={{ paper: 'w-full max-w-[300px] flex flex-col gap-5 p-2.5' }}
        open={open}
        onClose={handleClose}
      >
        <div className="flex items-center justify-between">
          <Typography.H4>Inspiracje</Typography.H4>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <hr className="text-text/20" />
        <Link className={twJoin(!style && 'font-bold text-primary')} href={`/inspirations`}>
          <Typography.Body>Wszystkie</Typography.Body>
        </Link>
        {Object.keys(styles).map((el) => (
          <Link key={el} className={twJoin(style === el && 'font-bold text-primary')} href={`/inspirations/${el}`}>
            <Typography.Body>{styles[el as InspirationStyle]}</Typography.Body>
          </Link>
        ))}
      </Drawer>
    </>
  );
};

export default FiltersDrawer;
