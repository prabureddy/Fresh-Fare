import { useRouter } from 'next/router';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import OrderInformation from '@components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import { useEffect } from 'react';
import { useCart } from '@contexts/cart/cart.context';
import Seo from '@components/seo/seo';
import { useOrderQuery } from '@framework/order/get-order';

export default function Order() {
  const router = useRouter();
  const { orderId = '' } = router.query;

  return (
    <>
      <Container>
        <OrderInformation id={orderId as string} />
      </Container>
    </>
  );
}

Order.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
