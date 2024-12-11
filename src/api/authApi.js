import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore } from '@store';

const baseRoute = '/auth';

const useAuthApi = () => {
  const notification = useNotificationStore();

  // LogIn / Войти
  const signin = async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}${baseRoute}/login`,
        withCredentials: true,
        data
      })
      notification.show("Успешно!", "success");

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  // LogOut / Выйти
  const logout = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, data, { withCredentials: true });
      notification.show("Успешно!", "success");
      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  // Обработка ошибки
  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return { signin, logout };
};

export default useAuthApi;
