import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

function saveAddress(message: any) {
  return new Promise(async (res, rej) => {
    http
      .post(`${API_ENDPOINTS.MESSAGE}`, {
        message,
      })
      .then(({ data: { success } }: any) => {
        if (!success) return rej('Something went wrong');
        return res({
          success: true,
        });
      })
      .catch(({ error }) => {
        return rej(error);
      });
  });
}
export const useMessageMutation = () => {
  return useMutation((message: any) => saveAddress(message), {
    onSuccess: (data: any) => {
      toast('Request sent!', {
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
