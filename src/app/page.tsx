import Link from 'next/link';
import AppButton from './_components/app-button';

const Home = () => {
  return (
    <div>
      <AppButton href="/create" LinkComponent={Link}>
        test
      </AppButton>
    </div>
  );
};

export default Home;
