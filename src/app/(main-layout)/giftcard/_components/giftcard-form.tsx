'use client';

import { useTransition } from 'react';
import { Control, Controller, FieldValues, Path, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonBase, TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { sizeToPrice } from '@/app/(main-layout)/generate/_utils/common';
import actionBuyGiftCard from '@/app/(main-layout)/giftcard/action-buy-giftcard';
import { GiftCardSchema, giftCardSchema } from '@/app/(main-layout)/giftcard/utils';
import AppButton from '@/app/_components/app-button';
import Typography from '@/app/_components/typography';
import { canvasSizes } from '@/app/_utils/sizes-utils';

const AppTextField = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      className="font-medium [&_.Mui-disabled]:font-bold [&_:not(.Mui-error).Mui-focused_fieldset]:border-primary"
      variant="outlined"
      slotProps={{
        inputLabel: { className: 'font-medium' },
        input: {
          classes: {
            root: '[&.MuiInputBase-root:not(.Mui-error)_fieldset]:hover:border-primary rounded-xl bg-white',
            notchedOutline: 'rounded-xl',
          },
        },
      }}
      {...props}
    />
  );
};

interface AppTextFieldFormProps<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'inputRef'> {
  name: Path<T>;
  control: Control<T>;
}

const AppTextFieldForm = <T extends FieldValues>({ name, control, ...props }: AppTextFieldFormProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <AppTextField
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...props}
    />
  );
};

const GiftCardForm = () => {
  const form = useForm<GiftCardSchema>({
    defaultValues: {
      canvasSize: '60',
      giverName: '',
      recipientEmail: '',
      recipientName: '',
      message: '',
    },
    resolver: zodResolver(giftCardSchema),
  });

  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit((values) => {
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'begin_checkout' });
        }
        startTransition(() => actionBuyGiftCard({ body: values, cancelUrl: window.location.href }));
      })}
    >
      <div className="flex flex-col gap-5">
        <Controller
          control={form.control}
          name="canvasSize"
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2.5">
              {canvasSizes.map((size) => (
                <ButtonBase
                  key={size}
                  className={twMerge(
                    'flex h-[80px] flex-col gap-2 rounded-xl border border-solid border-[#cbcbcb] bg-white p-1',
                    field.value === size && 'border-primary shadow-[0_0_0_1px_#3BAE89]',
                  )}
                  onClick={() => field.onChange(size)}
                >
                  <span className="text-base font-semibold tracking-[1px] sm:text-lg lg:text-2xl">
                    {size}x{size}cm
                  </span>
                  <span className="text-base font-bold text-primary lg:text-xl">{sizeToPrice[size]} zł</span>
                </ButtonBase>
              ))}
            </div>
          )}
        />
        <AppTextFieldForm control={form.control} label="Imię odbiorcy prezentu" name="recipientName" />
        <AppTextFieldForm control={form.control} label="Twoje imię" name="giverName" />
        <AppTextFieldForm control={form.control} label="E-mail do wysyłki karty" name="recipientEmail" />
        <AppTextFieldForm multiline control={form.control} label="Personalizowana wiadomość" name="message" rows={3} />
      </div>
      <div className="flex flex-col gap-1">
        <AppButton className="py-3" color="accent" loading={isPending} size="large" type="submit" variant="contained">
          Kup teraz
        </AppButton>
        <Typography.Body className="text-center text-[14px] font-medium">
          Natychmiastowa dostawa na adres email
        </Typography.Body>
      </div>
    </form>
  );
};

export default GiftCardForm;
