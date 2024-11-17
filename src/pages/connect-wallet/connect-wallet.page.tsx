import { t } from 'i18next';
import { Layout } from '@/components/layout/layout';
import { Card } from '@/components/card';
import { Button } from '@/components/button';

export function ConnectWalletPage() {
  return (
    <Layout>
      <Card className="w-full h-full flex flex-col items-center justify-start md:justify-center gap-10">
        <div className="text-lg font-roboto">
          {t('connectWalletPage.title')}
        </div>
        <Button>{t('connectWalletPage.button')}</Button>
      </Card>
    </Layout>
  );
}
