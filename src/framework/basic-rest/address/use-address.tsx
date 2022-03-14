import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

function saveAddress(address = []) {
  return new Promise(async (res, rej) => {
    http
      .post(`${API_ENDPOINTS.SAVE_ADDRESS}`, {
        address,
        email: Cookies.get('auth_token'),
      })
      .then(({ data: { success } }: any) => {
        if (!success) return rej('Invalid Credientials');
        return res({
          success: true,
        });
      })
      .catch(({ error }) => {
        return rej(error);
      });
  });
}
export const useAddressMutation = () => {
  return useMutation(({ address }: any) => saveAddress(address), {
    onSuccess: (data: any) => {
      toast('Address Successfully Saved', {
        progressClassName: 'fancy-progress-bar',
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error: string) => {
      console.log(error, 'login error response');
      toast(error, {
        progressClassName: 'fancy-progress-bar',
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};
