import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
function login({ email, password }: LoginInputType) {
  return new Promise(async (res, rej) => {
    http
      .post(`${API_ENDPOINTS.LOGIN}`, {
        email,
        password,
      })
      .then(({ data: { success } }: any) => {
        if (!success) return rej('Invalid Credientials');
        return res({
          token: email,
        });
      })
      .catch(({ error }) => {
        return rej(error);
      });
  });
}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data: any) => {
      if (!data?.token) return;
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
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
