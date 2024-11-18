import { Card } from '@/components/card';
import { Layout } from '@/components/layout/layout';
import { Loader } from '@/components/loader';

export function CardLoader() {
  return (
    <Layout>
      <Card className="w-full h-full flex justify-center items-center">
        <Loader />
      </Card>
    </Layout>
  );
}
