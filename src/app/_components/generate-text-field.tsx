import PaletteIcon from '@mui/icons-material/Palette';
import { Autocomplete, AutocompleteProps, ChipTypeMap, InputAdornment, TextField } from '@mui/material';

const GenerateTextField = ({
  ...props
}: Omit<AutocompleteProps<string, false, true, true, ChipTypeMap['defaultComponent']>, 'renderInput' | 'options'>) => {
  return (
    <Autocomplete<string, false, true, true, ChipTypeMap['defaultComponent']>
      {...props}
      disableClearable
      disablePortal
      freeSolo
      options={['big ben', 'eiffel tower', 'statue of liberty']}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            input: {
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
  );
};

export default GenerateTextField;
