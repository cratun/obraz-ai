import Image from 'next/image';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const paymentMethods = [
  'blik.png',
  'apple-pay.svg',
  'google-pay.svg',
  'p-24.svg',
  'mastercard.svg',
  'visa.svg',
  'klarna.png',
];

const PaymentMethodsList = ({
  classes,
}: {
  classes?: { container?: ClassNameValue; iconContainer?: ClassNameValue };
}) => {
  return (
    <div className={twMerge('flex flex-wrap gap-1', classes?.container)}>
      {paymentMethods.map((method) => (
        <div
          key={method}
          className={twMerge(
            'flex h-8 w-14 items-center justify-center rounded-lg border border-text/20 bg-white p-1',
            classes?.iconContainer,
          )}
        >
          <div className="relative h-full w-full">
            <Image
              fill
              alt={`${method.split('.')[0]} metoda płatności ikonka`}
              className="object-contain"
              sizes="75px"
              src={`/payment-icons/${method}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsList;
