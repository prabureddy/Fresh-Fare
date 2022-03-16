import { useMutation } from 'react-query';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

async function updateOrder(input: any) {
  return new Promise(async (res, rej) => {
    http
      .post(`${API_ENDPOINTS.SAVE_ORDER}`, {
        ...input,
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
export const useUpdateOrderMutation = () => {
  return useMutation((input: any) => updateOrder(input), {
    onSuccess: (data) => {
      toast('Order Successfully Saved', {
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
