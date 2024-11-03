import Link from 'next/link';
import { CONTACT_EMAIL } from '@/app/_utils/constants';
import { SerachParams } from '@/app/types';
import ContactForm from './contact-form';

const ContactPage = ({ searchParams }: { searchParams: SerachParams }) => {
  return (
    <div className="flex flex-col justify-between gap-10 self-center text-text lg:flex-row lg:self-auto">
      <div className="flex max-w-md flex-1 flex-col gap-5">
        <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
          {searchParams.review === 'true' ? 'Podziel się z nami swoją opinią' : 'Formularz kontaktowy'}
        </h2>
        <ContactForm />
      </div>
      <div className="flex max-w-xl flex-1 flex-col gap-5 text-sm">
        <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
          Skontaktuj się z nami - Twoja opinia ma dla nas ogromne znaczenie!
        </h2>
        <p className="leading-[150%] tracking-[0.5px]">
          Cześć!
          <br />
          <br />W ObrazAi ciągle dążymy do doskonałości i wiemy, że zawsze istnieje przestrzeń na rozwój i ulepszenia.
          Dlatego też Twoje spostrzeżenia i opinie są dla nas niezwykle cenne!
          <br />
          <br />
          Jeśli napotkałeś jakiekolwiek błędy, problemy techniczne, czy masz jakiekolwiek sugestie, jak możemy poprawić
          naszą stronę lub usługi, prosimy o kontakt. Każda uwaga jest dla nas ważna i każdą traktujemy bardzo poważnie.
          <br />
          <br />
          <strong>Jak możesz się z nami skontaktować?</strong>
        </p>
        <ul className="flex list-disc flex-col gap-2.5">
          <li>
            <strong>Formularz Kontaktowy:</strong> Wystarczy, że wypełnisz formularz na tej stronie. Odpowiemy
            najszybciej jak to możliwe!
          </li>
          <li>
            <strong>E-mail:</strong> Możesz także wysłać do nas wiadomość bezpośrednio na{' '}
            <Link className="text-yellow-400 text-nowrap font-bold" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </Link>
            .
          </li>
        </ul>

        <p className="leading-[150%] tracking-[0.5px]">
          Każdy zgłoszony problem jest dla nas okazją do ulepszenia, a każda sugestia może być iskrą potrzebną do
          stworzenia czegoś wyjątkowego. Pamiętaj, że Twoja opinia jest dla nas cenna i stanowi ważną część naszej
          społeczności.
          <br />
          <br />Z góry dziękujemy za każdy kontakt i każdą uwagę. Razem tworzymy lepsze miejsce w sieci!
          <br /> <br />
          Serdecznie pozdrawiamy,
          <br />
          Zespół ObrazAI
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
