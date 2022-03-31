import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.post(API_ENDPOINTS.ORDERS, {
    email: Cookies.get('auth_token'),
  });
  return {
    data: data.orders,
  };
};

const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery([API_ENDPOINTS.ORDERS, options], fetchOrders);
};

export { useOrdersQuery, fetchOrders };
