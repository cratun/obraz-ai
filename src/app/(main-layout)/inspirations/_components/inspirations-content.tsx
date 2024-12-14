import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { shuffle } from 'remeda';
import { twJoin } from 'tailwind-merge';
import { inspirationData, styles } from '@/app/(main-layout)/inspirations/utils';
import AppContainer from '@/app/_components/app-container';
import ScrollToTopButton from '@/app/_components/scroll-to-top-button';
import Typography from '@/app/_components/typography';
import { GenerationStyle } from '@/app/_utils/constants';
import FiltersDrawer from './filters-drawer';
import InspirationCard from './inspiration-card';

const InspirationsContent = ({ style }: { style?: GenerationStyle }) => {
  return (
    <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top] lg:min-h-screen">
      <ScrollToTopButton />
      <AppContainer.Content className="flex grid-cols-6 items-start gap-5 text-text md:grid md:gap-10">
        <div className="sticky top-[--save-navbar-padding-top] hidden flex-col gap-5 md:flex">
          <Typography.H4>Inspiracje</Typography.H4>
          <hr className="text-text/20" />
          <Link className={twJoin(!style ? 'font-bold text-primary' : 'hover:underline')} href={`/inspirations`}>
            <Typography.Body>Wszystkie</Typography.Body>
          </Link>
          {Object.keys(styles).map((el) => (
            <Link
              key={el}
              className={twJoin(style === el ? 'font-bold text-primary' : 'hover:underline')}
              href={`/inspirations/${el}`}
            >
              <Typography.Body>{styles[el as GenerationStyle]}</Typography.Body>
            </Link>
          ))}
        </div>
        <div className="col-span-5 flex flex-col gap-10">
          <div className="flex flex-col gap-2.5">
            <Breadcrumbs>
              <Link href="/inspirations">
                <Typography.Body className={twJoin(style && 'hover:underline')}>Inspiracje</Typography.Body>
              </Link>
              <Typography.Body className="font-bold">{style ? styles[style] : 'Wszystkie'}</Typography.Body>
            </Breadcrumbs>
            <Typography.H1 className="text-3xl md:text-4xl">
              Zainspiruj się i stwórz <span className="text-primary">swój</span> idealny{' '}
              <span className="text-primary">ObrazAI</span> na płótnie<span className="text-primary">!</span>
            </Typography.H1>
          </div>
          <FiltersDrawer style={style} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {shuffle(inspirationData).map((item) => {
              if (style !== item.style && style) return null;

              return <InspirationCard key={item.id} id={item.id} prompt={item.prompt} style={item.style} />;
            })}
          </div>
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default InspirationsContent;
