import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import BenefitsSection from '@/app/_components/benefits-section';
import HomeSwiper from '@/app/_components/generate-examples-swiper';
import Typography from '@/app/_components/typography';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import ImageHistory from '@/app/generate/_components/image-history';
import { getImageHistoryFromCookie } from '@/app/generate/_utils/image-history/server';

const GalleryPage = () => {
  const imageHistory = getImageHistoryFromCookie();
  const specialPromoCookie = getSpecialPromoCookie();

  return (
    <>
      <AppContainer className="relative pt-[--save-navbar-padding-top] lg:min-h-screen">
        <AppContainer.Content className="text-text">
          <ImageHistory imageHistory={imageHistory} specialPromoCookie={specialPromoCookie}>
            {imageHistory.length > 0 ? (
              <AppButton className="self-start" href="/generate" LinkComponent={Link} variant="contained">
                Stwórz następne obrazy
              </AppButton>
            ) : null}
          </ImageHistory>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-col gap-10 text-text">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg leading-[140%] tracking-[0.5px] text-primary">Przykładowe wygenerowane obrazy</h3>
            <Typography.H2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              Brakuje Ci pomysłu?
            </Typography.H2>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <HomeSwiper />
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-wrap gap-5 text-text">
          <AppButton
            href="/generate"
            LinkComponent={Link}
            size="large"
            startIcon={<AutoAwesomeRoundedIcon />}
            variant="contained"
          >
            Przejdź do kreatora
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <BenefitsSection />
    </>
  );
};

export default GalleryPage;
