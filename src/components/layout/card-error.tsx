import { Card } from '@/components/card';
import { Layout } from '@/components/layout/layout';

interface CardLoaderProps {
  title?: string;
}

export function CardError({ title }: CardLoaderProps) {
  return (
    <Layout>
      <Card className="w-full h-full flex justify-center items-center gap-4">
        {title}
      </Card>
    </Layout>
  );
}
