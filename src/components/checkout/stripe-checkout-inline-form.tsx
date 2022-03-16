import RazorpayForm from '@components/common/form/razorpay-form';
import StripePaymentForm from '@components/common/form/stripe-inline-form';
import { useCart } from '@contexts/cart/cart.context';
import { useTranslation } from 'next-i18next';
import React from 'react';

const StripeCheckoutInlineForm = () => {
  const { t } = useTranslation();
  const { total } = useCart();
  return (
    <RazorpayForm
      item={{ price: (total * 10).toFixed(2), buttonText: t('text-pay-now') }}
    />
  );
};

export default StripeCheckoutInlineForm;
