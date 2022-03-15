import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const fetchDetails = async () => {
  const {
    data: { data },
  } = await http.post(API_ENDPOINTS.PERSONAL_DETAILS, {
    email: Cookies.get('auth_token'),
  });
  return data;
};

const useDetailsQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchDetails);
};

export { useDetailsQuery, fetchDetails };
