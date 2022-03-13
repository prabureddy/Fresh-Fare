import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}
async function changePassword({
  newPassword,
  oldPassword,
}: ChangePasswordInputType) {
  return new Promise(async (res, rej) => {
    const { data } = await http.post(`${API_ENDPOINTS.CHANGE_PASSWORD}`, {
      newPassword,
      oldPassword,
      email: Cookies.get('auth_token'),
    });
    if (!data.success || data.error) {
      return rej(data.error);
    }
    res({
      newPassword,
      oldPassword,
    });
  });
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: (data) => {
        console.log(data, 'ChangePassword success response');
        toast('Password Successfully Changed', {
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
        console.log(error, 'ChangePassword error response');
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
    }
  );
};
