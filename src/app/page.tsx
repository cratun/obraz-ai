import { Button } from '@mui/material';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Button component={Link} href="/create">
        test
      </Button>
    </div>
  );
};

export default Home;
