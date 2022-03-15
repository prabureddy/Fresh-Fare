import { useMutation } from 'react-query';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}
async function updateUser(input: UpdateUserType) {
  return new Promise(async (res, rej) => {
    http
      .post(`${API_ENDPOINTS.SAVE_PERSONAL_DETAILS}`, {
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
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      toast('Details Successfully Saved', {
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
