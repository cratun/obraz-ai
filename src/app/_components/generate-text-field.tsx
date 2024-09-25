import { ReactNode } from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import { Autocomplete, AutocompleteProps, ChipTypeMap, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const GenerateTextField = ({
  className,
  children,
  TextFieldProps,
  ...props
}: Omit<AutocompleteProps<string, false, true, true, ChipTypeMap['defaultComponent']>, 'renderInput' | 'options'> & {
  TextFieldProps?: TextFieldProps;
  children?: ReactNode;
}) => {
  return (
    <div className={twMerge(className, 'flex flex-col gap-1')}>
      <Autocomplete<string, false, true, true, ChipTypeMap['defaultComponent']>
        {...props}
        disableClearable
        disablePortal
        freeSolo
        options={[
          'Romantyczny zachód słońca nad oceanem',
          'Nowoczesne miasto nocą pełne świateł',
          'Dzieci bawiące się na plaży w letni dzień',
          'Kompozycja kolorów i kształtów',
          'Portret eleganckiej kobiety',
          'Safari z dzikimi zwierzętami na afrykańskiej sawannie',
          'Świat z latającymi wyspami',
        ]}
        renderInput={(params) => (
          <TextField
            {...params}
            slotProps={{
              input: {
                ...TextFieldProps?.slotProps?.input,
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PaletteIcon />
                  </InputAdornment>
                ),
                classes: { root: 'rounded-full px-5' },
              },
            }}
          />
        )}
      />
      {children}
    </div>
  );
};

export default GenerateTextField;
