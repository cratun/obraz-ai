'use client';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import actionSendContactForm from './action-send-contact-form';

const ContactForm = () => {
  const isReview = useSearchParams().get('review') === 'true';

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { message: '', email: '' },
    mode: 'onTouched',
  });

  const sendContactFormMutation = useMutation({
    mutationFn: actionSendContactForm,
    onSuccess: () => {
      reset();
      toast.success('Wiadomość została wysłana.');
    },
    onError: () => toast.error('Wystąpił nieoczekiwany błąd, spróbuj ponownie później lub skontaktuj się z nami.'),
  });

  return (
    <form
      className="flex max-w-md grow flex-col items-start gap-5"
      onSubmit={handleSubmit((data) => sendContactFormMutation.mutate({ ...data }))}
    >
      {!isReview && (
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Email"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{ input: { classes: { root: 'rounded-xl' } } }}
            />
          )}
          rules={{
            required: 'To pole jest wymagane',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Niepoprawny email' },
          }}
        />
      )}
      <Controller
        control={control}
        name="message"
        rules={{ required: 'To pole jest wymagane' }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            multiline
            label="Wiadomość"
            minRows={5}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ input: { classes: { root: 'rounded-xl' } } }}
          />
        )}
      />
      <AppButton loading={sendContactFormMutation.isPending} type="submit" variant="contained">
        Wyślij
      </AppButton>
    </form>
  );
};

export default ContactForm;
