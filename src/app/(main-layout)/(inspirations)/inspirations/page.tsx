import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';

const data = [
  {
    imgSrc: '/inspirations/hiperrealism/1.webp',
    style: '',
    prompt: 'prompt1',
  },
  // {
  //   imgSrc: 'image2.jpg',
  //   style: 'style2',
  //   prompt: 'prompt2',
  // },
  // Add more items as needed
];

const InspirationsPage = () => {
  return (
    <AppContainer className="relative pt-[--save-navbar-padding-top] lg:min-h-screen">
      <AppContainer.Content className="flex flex-col text-text">
        <Typography.H1 className="text-3xl md:text-4xl">
          Zainspiruj się i stwórz <span className="text-primary">swój</span> idealny{' '}
          <span className="text-primary">ObrazAI</span> na płótnie<span className="text-primary">!</span>
        </Typography.H1>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((item, index) => (
            <ButtonBase key={index} className="block rounded-sm">
              <div className="flex flex-col">
                <div className="bg-white p-[12%]">
                  <div className="inspiration-shadow relative aspect-square overflow-hidden">
                    <Image fill alt={item.prompt} className="h-full w-full object-cover" src={item.imgSrc} />
                  </div>
                </div>
                <div>

                </div>
              </div>
            </ButtonBase>
          ))}
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default InspirationsPage;
