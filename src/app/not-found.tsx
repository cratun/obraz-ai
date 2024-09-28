import Link from 'next/link';
import AppButton from './_components/app-button';

const NotFoundPage = () => {
  return (
    <div className="mt-[5vh] flex items-center justify-center p-5 text-text lg:mt-[15vh]">
      <div className="flex flex-col gap-10">
        <h1 className="text-9xl font-bold md:text-[200px]">404</h1>
        <div className="flex flex-col gap-2.5">
          <h2 className="text-3xl font-bold lg:text-5xl">Uuups!</h2>
          <p className="text-base lg:text-2xl">Strona, której szukasz nie została odnaleziona.</p>
        </div>
        <AppButton className="self-start" href={'/generate'} LinkComponent={Link} size="large" variant="contained">
          Przejdź do generatora
        </AppButton>
      </div>
    </div>
  );
};
export default NotFoundPage;
