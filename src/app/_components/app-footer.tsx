'use client';
import { ReactNode } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import XIcon from '@mui/icons-material/X';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { footerLinks } from '@/app/_utils/constants';
import AppContainer from './app-container';
import AppLogo from './app-logo';
import PaymentMethodsList from './payments-methods-list';
import Typography from './typography';
const couriers = ['dhl.svg', 'inpost.svg', 'pp.svg', 'fedex.svg', 'ups.svg', 'gls.svg'];

const BenefitBox = ({
  Icon,
  title,
  description,
  children,
}: {
  Icon: SvgIconComponent;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <div className="flex w-full flex-col items-center gap-5 rounded-lg border border-solid border-text/20 bg-white p-5 text-center text-text lg:p-10">
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-center gap-2.5">
        <Icon />
        <Typography.H4>{title}</Typography.H4>
      </div>
      <Typography.Body className="text-sm">{description}</Typography.Body>
    </div>
    {children}
  </div>
);

const AppFooter = () => {
  return (
    <>
      <AppContainer className="pb-10">
        <AppContainer.Content className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <BenefitBox
            description=" 100% bezpieczna płatność z szyfrowaniem SSL 256-bit"
            Icon={LockOutlinedIcon}
            title="Bezpieczne płatności"
          >
            <PaymentMethodsList
              classes={{ container: 'justify-center gap-2.5', iconContainer: 'w-20 h-10 p-1.5 bg-neutral/40' }}
            />
          </BenefitBox>
          <BenefitBox description="U Ciebie w ciągu kilku dni" Icon={LocalShippingOutlinedIcon} title="Szybka dostawa">
            <div className="flex flex-wrap justify-center gap-2.5">
              {couriers.map((courier) => (
                <div
                  key={courier}
                  className="flex h-10 w-20 items-center justify-center rounded-lg border border-text/20 bg-neutral/40 p-1.5"
                >
                  <div className="relative h-full w-full">
                    <Image
                      fill
                      alt={`${courier.split('.')[0]} ikonka - firma kurierska`}
                      className="object-contain"
                      sizes="75px"
                      src={`/couriers-icons/${courier}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </BenefitBox>
        </AppContainer.Content>
      </AppContainer>
      <footer className={'flex items-center justify-center border-t border-solid border-t-text/20 bg-white p-5'}>
        <AppContainer.Content className="grid grid-cols-1 flex-wrap justify-between gap-10 text-text md:flex md:gap-5">
          <AppLogo />
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-2.5">
              <Typography.Body className="font-bold">{title}</Typography.Body>
              {Object.entries(links).map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2.5">
            <Typography.Body className="font-bold">Nasze sociale</Typography.Body>
            <div className="flex gap-2.5">
              <IconButton href="https://www.instagram.com/obraz_ai_official/" LinkComponent={Link} target="_blank">
                <InstagramIcon className="text-3xl" />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61566337418480"
                LinkComponent={Link}
                target="_blank"
              >
                <FacebookIcon className="text-3xl" />
              </IconButton>
              <IconButton href="https://x.com/ObrazAI" LinkComponent={Link} target="_blank">
                <XIcon className="text-3xl" />
              </IconButton>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <hr className="w-full text-text/20" />
            <Typography.Body className="text-xs text-text/60">
              © 2024 ObrazAI. Wszelkie prawa zastrzeżone.
            </Typography.Body>
          </div>
        </AppContainer.Content>
      </footer>
    </>
  );
};

export default AppFooter;
