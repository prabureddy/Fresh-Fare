import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useModalAction } from '@components/common/modal/modal.context';
export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  remember_me: boolean;
}
async function signUp({ email, password, name }: SignUpInputType) {
  return new Promise(async (res, rej) => {
    const { data } = await http.post(`${API_ENDPOINTS.REGISTER}`, {
      email,
      password,
      name,
    });
    if (!data.success || data.error) {
      return rej(data.error);
    }
    res({
      token: email,
    });
  });
}
export const useSignUpMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  return useMutation((input: SignUpInputType) => signUp(input), {
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
