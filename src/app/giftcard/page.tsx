'use client';

import AppButton from '@/app/_components/app-button';
import actionBuyGiftCard from './action-buy-giftcard';

const GitCardPage = () => {
  return (
    <AppButton
      onClick={() =>
        actionBuyGiftCard({
          body: {
            giverName: 'Andrzej',
            recipientName: 'Jakub',
            recipientEmail: 'kacper.zabielski05@gmail.com',
            canvasSize: '30',
          },
          cancelUrl: window.location.origin + '/giftcard',
        })
      }
    >
      test
    </AppButton>
  );
};

export default GitCardPage;
