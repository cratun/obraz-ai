'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import { Autocomplete, AutocompleteProps, ChipTypeMap, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const options = [
  'Romantyczny zachód słońca nad oceanem',
  'Superbohater przytulający swojego wroga',
  'Abstrakcyjna kompozycja kolorów i kształtów',
  'Portret eleganckiej kobiety',
  'Astronauta grający na skrzypcach na powierzchni księżyca',
  'Safari z dzikimi zwierzętami na afrykańskiej sawannie',
  'Świat z latającymi wyspami',
];

const placeholders = [
  'Opisz swój obraz...',
  'Zachód słońca',
  'Superbohater i wróg',
  'Opisz swój obraz...',
  'Abstrakcyjne kolory',
  'Portret kobiety',
  'Opisz swój obraz...',
  'Astronauta na księżycu',
  'Safari na sawannie',
];

const typingSpeed = 150;
const pauseAfterTyping = 3000;

const GenerateTextField = ({
  className,
  children,
  TextFieldProps,
  ...props
}: Omit<AutocompleteProps<string, false, true, true, ChipTypeMap['defaultComponent']>, 'renderInput' | 'options'> & {
  TextFieldProps?: TextFieldProps;
  children?: ReactNode;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      const fullText = placeholders[placeholderIndex];
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setDisplayedText('');
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, pauseAfterTyping);
      }
    }
  }, [isTyping, displayedText, placeholderIndex]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      handleTyping();
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [handleTyping]);

  return (
    <div className={twMerge(className, 'flex flex-col gap-1')}>
      <Autocomplete<string, false, true, true, ChipTypeMap['defaultComponent']>
        {...props}
        disableClearable
        disablePortal
        freeSolo
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            {...TextFieldProps}
            inputRef={TextFieldProps?.inputRef}
            slotProps={{
              input: {
                ...TextFieldProps?.slotProps?.input,
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PaletteIcon />
                  </InputAdornment>
                ),
                classes: { root: 'rounded-full px-5 ' },
                placeholder: displayedText || ' ',
              },
            }}
            sx={{
              input: {
                '&::placeholder': {
                  fontSize: '14px',
                  opacity: 0.6,
                },
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
