import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { twMerge } from 'tailwind-merge';

const AppButton = ({ className, ...props }: LoadingButtonProps) => {
  return <LoadingButton disableElevation {...props} className={twMerge('rounded-full normal-case', className)} />;
};

export default AppButton;
