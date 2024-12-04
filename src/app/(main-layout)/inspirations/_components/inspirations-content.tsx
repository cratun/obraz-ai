import { Breadcrumbs, ButtonBase } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import { inspirationData, InspirationStyle, styles } from '@/app/(main-layout)/inspirations/utils';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import FiltersDrawer from './filters-drawer';

const InspirationsContent = ({ style }: { style?: InspirationStyle }) => {
  return (
    <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top] lg:min-h-screen">
      <div className="bg-white"></div>
      <AppContainer.Content className="flex grid-cols-6 gap-5 text-text md:grid md:gap-10">
        <div className="hidden flex-col gap-5 md:flex">
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
              <Typography.Body>{styles[el as InspirationStyle]}</Typography.Body>
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
            {inspirationData.map((item) => {
              if (style !== item.style && style) return null;

              return (
                <ButtonBase
                  key={item.id}
                  className="flex flex-col gap-2.5 rounded-sm text-left"
                  href={`/inspirations/${item.style}/${item.id}`}
                  LinkComponent={Link}
                >
                  <div className="aspect-square w-full bg-white p-[12%]">
                    <div className="inspiration-shadow relative aspect-square overflow-hidden">
                      <Image
                        fill
                        alt={item.prompt}
                        className="h-full w-full object-cover"
                        src={`/inspirations/${item.style}/${item.id}.webp`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Typography.Body className="text-xs font-bold uppercase text-primary">
                      {styles[item.style]}
                    </Typography.Body>
                    <Typography.Body className="line-clamp-2">{item.prompt}</Typography.Body>
                    <Typography.Body className="text-sm font-semibold text-accent">Od 89 zł</Typography.Body>
                  </div>
                </ButtonBase>
              );
            })}
          </div>
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default InspirationsContent;
