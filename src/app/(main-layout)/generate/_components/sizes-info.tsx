'use client';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dialog, IconButton } from '@mui/material';
import Typography from '@/app/_components/typography';
const SizesInfo = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <InfoOutlinedIcon className={className} />
      </IconButton>
      <Dialog
        classes={{ paper: 'w-full max-w-lg p-5 rounded-xl gap-10', root: 'z-[3000]' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <IconButton className="absolute right-0 top-0" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <Typography.H2 className="text-center">Rozmiary</Typography.H2>
        <div className="flex justify-around gap-10">
          <div className="flex flex-col gap-2.5">
            <Typography.H3>Obrazy</Typography.H3>
            <div className="flex flex-col gap-1">
              <Typography.Body>
                S - <strong>30x30</strong> cm
              </Typography.Body>
              <Typography.Body>
                M - <strong>60x60</strong> cm
              </Typography.Body>
              <Typography.Body>
                L - <strong>100x100</strong> cm
              </Typography.Body>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Typography.H3>Portrety</Typography.H3>
            <div className="flex flex-col gap-1">
              <Typography.Body>
                S - <strong>30x40</strong> cm
              </Typography.Body>
              <Typography.Body>
                M - <strong>60x80</strong> cm
              </Typography.Body>
              <Typography.Body>
                L - <strong>90x120</strong> cm
              </Typography.Body>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SizesInfo;
