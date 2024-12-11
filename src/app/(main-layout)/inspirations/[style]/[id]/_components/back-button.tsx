import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { styles } from '@/app/(main-layout)/inspirations/utils';
import Typography from '@/app/_components/typography';
import { GenerationStyle } from '@/app/_utils/constants';

const BreadCrumbsInspirationDetails = ({ className, style }: { className?: string; style: GenerationStyle }) => {
  return (
    <Breadcrumbs className={className}>
      <Link href="/inspirations">
        <Typography.Body className="hover:underline">Inspiracje</Typography.Body>
      </Link>
      <Link href={`/inspirations/${style}`}>
        <Typography.Body className="hover:underline">{styles[style]}</Typography.Body>
      </Link>
    </Breadcrumbs>
  );
};

export default BreadCrumbsInspirationDetails;
