import { Card } from '@/components/card';
import { Layout } from '@/components/layout/layout';
import { Loader } from '@/components/loader';

interface CardLoaderProps {
  title?: string;
}

export function CardLoader({ title }: CardLoaderProps) {
  return (
    <Layout>
      <Card className="w-full h-full flex justify-center items-center gap-4">
        <Loader />
        {title ? <div>{title}</div> : null}
      </Card>
    </Layout>
  );
}
