import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const fetchAddress = async () => {
  const { data } = await http.post(API_ENDPOINTS.ADDRESS, {
    email: Cookies.get('auth_token'),
  });
  return {
    data: data.address,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { useAddressQuery, fetchAddress };
