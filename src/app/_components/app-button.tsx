import { forwardRef, PropsWithoutRef } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { twMerge } from 'tailwind-merge';

const AppButton = forwardRef(
  ({ className, ...props }: PropsWithoutRef<LoadingButtonProps>, ref: LoadingButtonProps['ref']) => {
    return (
      <LoadingButton disableElevation {...props} ref={ref} className={twMerge('rounded-full normal-case', className)} />
    );
  },
);

AppButton.displayName = 'AppButton';

export default AppButton;
