import PaletteIcon from '@mui/icons-material/Palette';
import { Autocomplete, AutocompleteProps, ChipTypeMap, InputAdornment, TextField } from '@mui/material';
import AppButton from './app-button';

const GenerateTextField = ({
  onGenerate,
  ...props
}: { onGenerate?: () => void } & Omit<
  AutocompleteProps<string, false, false, true, ChipTypeMap['defaultComponent']>,
  'renderInput' | 'options'
>) => {
  return (
    <Autocomplete<string, false, false, true, ChipTypeMap['defaultComponent']>
      {...props}
      autoSelect
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
              endAdornment: (
                <InputAdornment className="hidden lg:flex" position="end">
                  <AppButton
                    variant="contained"
                    onClick={(event) => {
                      event.stopPropagation();
                      onGenerate?.();
                    }}
                  >
                    Generuj
                  </AppButton>
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
