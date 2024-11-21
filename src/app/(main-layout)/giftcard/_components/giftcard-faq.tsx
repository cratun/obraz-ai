'use client';

import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@/app/_components/typography';
const FAQ_KEYS = [
  {
    question: 'Can I redeem my Gift Card for any products available on Displate.com?',
    answer: 'You can only redeem your Gift Card for a M size Displate in matt finish without frames',
  },
  {
    question: 'Can I redeem my Gift Card for any products available on Displate.com?',
    answer: 'You can only redeem your Gift Card for a M size Displate in matt finish without frames',
  },
  {
    question: 'Can I redeem my Gift Card for any products available on Displate.com?',
    answer: 'You can only redeem your Gift Card for a M size Displate in matt finish without frames',
  },
  {
    question: 'Can I redeem my Gift Card for any products available on Displate.com?',
    answer: 'You can only redeem your Gift Card for a M size Displate in matt finish without frames',
  },
];

const GiftcardFaq = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full max-w-lg">
      <Typography.H2>Pytania i odpowiedzi</Typography.H2>
      {FAQ_KEYS.map(({ question, answer }, i) => (
        <Accordion
          key={question}
          disableGutters
          expanded={expanded === i}
          classes={{
            root: 'text-text bg-transparent shadow-none before:hidden [&:not(:last-child)]:border-b border-b-text/20 py-2.5',
          }}
          onChange={(_: unknown, newExpanded: boolean) => setExpanded(newExpanded ? i : null)}
        >
          <AccordionSummary className="p-0" expandIcon={<ArrowDropDownIcon className="text-primary" />}>
            <Typography.H4 className="text-md">{question}</Typography.H4>
          </AccordionSummary>
          <AccordionDetails className="p-0">
            <Typography.Body className="text-sm">{answer}</Typography.Body>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default GiftcardFaq;
