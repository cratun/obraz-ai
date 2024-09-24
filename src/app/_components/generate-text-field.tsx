import { ReactNode } from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import { Autocomplete, AutocompleteProps, ChipTypeMap, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const GenerateTextField = ({
  className,
  children,
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
          'Poranna kawa na balkonie ',
          'Zielona roślina w słonecznym oknie',
          'Spacer po parku w jesienny dzień',
          'Wieża Eiffla o zachodzie słońca',
          'Latarnia morska przy klifach',
        ]}
        renderInput={(params) => (
          <TextField
            {...props.TextFieldProps}
            {...params}
            slotProps={{
              input: {
                ...props?.TextFieldProps?.slotProps?.input,
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
