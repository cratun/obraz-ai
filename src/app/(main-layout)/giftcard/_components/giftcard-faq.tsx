'use client';

import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@/app/_components/typography';

const FAQ_KEYS = [
  {
    question: 'Czy mogę wręczyć kartę podarunkową w formie fizycznej?',
    answer:
      'Tak, wystarczy, że podasz swój mail, a my wyślemy Ci gotowy do wydruku plik z kodem karty podarunkowej. Możesz go włożyć do koperty i wręczyć bliskiej osobie samodzielnie.',
  },
  {
    question: 'Co to jest ObrazAI i dlaczego warto?',
    answer:
      'ObrazAI to platforma, która pozwala obdarowanym spełniać ich marzenia! Dzięki sztucznej inteligencji mogą stworzyć dowolny obraz, jaki sobie wymarzą - od kosmicznego kota w garniturze po epicką bitwę z robo T-Rexem - i zamówić go na płótnie, gotowym do powieszenia. \n\nDlaczego warto? Bo to prezent zawsze trafiony - nie wybierasz za kogoś, tylko dajesz możliwość stworzenia tego, co siedzi w ich głowie!',
  },
  {
    question: 'Czy mogę wręczyć kartę podarunkową elektronicznie?',
    answer:
      'Tak, oczywiście! Wystarczy, że w formularzu zakupu podasz adres e-mail osoby, do której ma trafić karta podarunkowa. Otrzymają ją w formie elektronicznej, a Ty dostaniesz potwierdzenie zakupu. \n\nCo więcej, na karcie znajdzie się dedykowana wiadomość od Ciebie oraz informacja, że prezent jest od Ciebie – to idealny sposób na wręczenie wyjątkowego upominku na odległość! 🎁',
  },
  {
    question: 'Czy mogę zwrócić kartę podarunkową?',
    answer:
      'Tak, kartę podarunkową można zwrócić w ciągu 14 dni od daty zakupu, o ile nie została jeszcze użyta. W celu dokonania zwrotu prosimy o kontakt z naszym działem obsługi klienta, podając numer zamówienia i adres e-mail użyty przy zakupie. Kwota zostanie zwrócona tą samą metodą płatności, którą użyto przy zakupie.',
  },
];

const GiftCardFaq = () => {
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
            <Typography.Body className="whitespace-pre-wrap text-sm">{answer}</Typography.Body>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default GiftCardFaq;
