import { useMemo } from 'react';
import { useDetailsQuery } from '@framework/customer/details';
import Cookies from 'js-cookie';
import Button from '@components/ui/button';
import { useUpdateOrderMutation } from '@framework/order/use-order';
import { useCart } from '@contexts/cart/cart.context';
import { useLocalStorage } from '@utils/use-local-storage';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY || '';

const RazorpayForm = ({
  item: { price, buttonText },
}: {
  item: { price: string; buttonText: string };
}) => {
  const { data: personalDetails } = useDetailsQuery();
  const [instruction = ''] = useLocalStorage('freshfare-delivery-instruction');
  const { mutateAsync: saveOrder } = useUpdateOrderMutation();
  const { total, items, totalItems, totalUniqueItems, resetCart, isEmpty } =
    useCart();
  const PRICE = (price as any) * 100;

  //   const order = await createOrder(params);
  const options: any = useMemo(
    () => ({
      key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: PRICE, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      //   order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async (response: any) => {
        // alert(response.razorpay_payment_id); // pay_J7fruvSFRvYPNZ
        // alert(response.razorpay_order_id); // undefined
        // alert(response.razorpay_signature); // undefined
        const orderId = Math.random().toString(16).slice(2);
        const paymentId = response.razorpay_payment_id;
        await saveOrder({
          orderId,
          paymentId,
          instruction,
          total: total * 10,
          items: items.map((i) => ({
            ...i,
            price: i?.price * 10,
            itemTotal: i?.itemTotal * 10,
          })),
          totalItems,
          totalUniqueItems,
        });
        Router.push(`${ROUTES.ORDER}/${orderId}`);
        resetCart();
      },
      prefill: {
        name: `${personalDetails?.first_name} ${personalDetails?.last_name}`,
        email: Cookies.get('auth_token'),
        contact: personalDetails?.phoneNumber,
      },
    }),
    [personalDetails]
  );
  const rzp1 =
    typeof window === 'undefined'
      ? undefined
      : (window as any).Razorpay(options);
  const handlerPayRazorpay = async () => {
    if (!rzp1) return;
    await rzp1.open();
  };
  return (
    <div>
      {/* Pay {price} */}
      <Button onClick={handlerPayRazorpay}>Pay with Razorpay</Button>
    </div>
  );
};

export default RazorpayForm;
