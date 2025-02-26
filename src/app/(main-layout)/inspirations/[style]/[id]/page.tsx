import { Suspense } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { sizeToPrice } from '@/app/(main-layout)/generate/_utils/common';
import { inspirationData, InspirationStyle, MOCKUP_BUCKET_NAME, styles } from '@/app/(main-layout)/inspirations/utils';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import BenefitsSection from '@/app/_components/benefits-section';
import Typography from '@/app/_components/typography';
import { getBucketImgUrl } from '@/app/_utils/common';
import BreadCrumbsInspirationDetails from './_components/back-button';
import ImagesMockups from './_components/images-mockups';
import Prompt from './_components/prompt';

export async function generateMetadata({ params }: { params: { style: InspirationStyle; id: string } }) {
  return {
    title: `${params.style === 'portrait' ? 'PortretAI' : 'ObrazAI'} - ${params.id} - ${styles[params.style]} - Inspiracja`,
    description: `Odkryj inspirację ${params.id} w stylu ${styles[params.style]}. Stwórz i zamów ten unikalny obraz na płótnie z ObrazAI, który doda charakteru Twojemu wnętrzu.
`,
  };
}

const RandomInspirations = dynamic(
  () => import('@/app/(main-layout)/inspirations/[style]/[id]/_components/random-inspirations'),
  { ssr: false },
);
const InspirationPage = ({ params }: { params: { style: InspirationStyle; id: string } }) => {
  const inspiration = inspirationData.find((el) => el.id === params.id);
  if (!inspiration) throw new Error('Inspiration not found');
  const isPortrait = params.style === 'portrait';
  const initialImageSrc = getBucketImgUrl(params.id, MOCKUP_BUCKET_NAME, '.jpg');

  return (
    <>
      <AppContainer className="pb-20 pt-[--save-navbar-padding-top]">
        <AppContainer.Content className="flex-col gap-10 overflow-auto text-text lg:gap-20">
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <BreadCrumbsInspirationDetails className="md:hidden" style={params.style} />
            <Suspense>
              <ImagesMockups
                generatedImgSrc={`/inspirations/${params.style}/${params.id}${params.style === 'impressionism' ? '.webp' : '.jpg'}`}
                initialImageSrc={initialImageSrc}
              />
            </Suspense>

            <div className="flex flex-col gap-5 md:my-auto md:pb-24">
              <BreadCrumbsInspirationDetails className="hidden md:flex" style={params.style} />
              <div className="flex flex-col gap-2.5">
                <Typography.H2 className="text-2xl md:text-3xl">
                  {params.style === 'portrait' ? 'PortretAI' : 'ObrazAI'} na płótnie
                </Typography.H2>
                <Prompt prompt={inspiration.prompt} />
              </div>
              {!isPortrait && (
                <Typography.Body>
                  Styl:{' '}
                  <Link className="font-bold uppercase text-primary" href={`/inspirations/${inspiration.style}`}>
                    {styles[inspiration.style]}
                  </Link>
                </Typography.Body>
              )}
              <Typography.H4 className="font-semibold text-accent">
                Od {isPortrait ? sizeToPrice.portrait.S : sizeToPrice.square.S} zł
              </Typography.H4>
              {!isPortrait ? (
                <AppButton
                  href={`/generate?prompt=${inspiration.prompt}&generationStyle=${inspiration.style}`}
                  size="large"
                  startIcon={<AutoAwesomeRoundedIcon />}
                  variant="contained"
                >
                  Stwórz ObrazAI
                </AppButton>
              ) : (
                <AppButton
                  href={`/generate/portrait?template_id=${params.id}`}
                  size="large"
                  startIcon={<AutoAwesomeRoundedIcon />}
                  variant="contained"
                >
                  Stwórz PortretAI
                </AppButton>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography.H3>Zobacz też...</Typography.H3>
            <RandomInspirations id={params.id} style={params.style} />
          </div>
        </AppContainer.Content>
      </AppContainer>
      <BenefitsSection />
    </>
  );
};

export default InspirationPage;

export async function generateStaticParams() {
  return inspirationData.map((el) => ({ style: el.style, id: el.id }));
}
