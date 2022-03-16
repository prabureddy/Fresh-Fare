import { Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

export const fetchOrder = async (_id: string) => {
  const { data } = await http.post(`${API_ENDPOINTS.ORDER}`, {
    email: Cookies.get('auth_token'),
    orderId: _id,
  });
  const { order: rawDetails } = data;
  const { order, ...personalDetails } = rawDetails;
  const { email } = personalDetails;
  const { orderId, items, total, createdAt , instruction} = order;
  const modifiedOrder: Order = {
    customer: {
      email,
    },
    id: orderId,
    payment_gateway: 'Razorpay',
    instruction,
    products: items.map((item: any) => ({
      id: item?.id,
      name: item?.name,
      price: item?.price,
      quantity: item?.quantity,
    })),
    total: total,
    createdAt: createdAt,
  };
  return modifiedOrder;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
    id ? fetchOrder(id) : Promise.reject(null)
  );
};
