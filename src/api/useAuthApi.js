import axios from 'axios';
import { baseUrl } from '@utils';
import { useUserStore, useNotificationStore } from '@store';

const useAuthApi = () => {
  const user = useUserStore();
  const notification = useNotificationStore();

  // SignIn / Войти
  const signin = async (login, password, entity) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/auth/${entity}`,
        withCredentials: true,
        data: {
          login,
          password
        },
      });

      user.setUser(response.data.user);
      user.setAccessToken(response.data.accessToken);
      notification.show("Успешно!", "success");

      return response.status;
    } catch (err) {
      handleError(err.response.data.message);
      return err.status;
    }
  };

  // LogOut / Выйти
  const logout = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/auth/logout`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data,
      });

      user.clearUser();
      notification.show("Успешно!", "success");

      return response.data;
    } catch (err) {
      handleError(err.response?.data?.error);
    }
  };

  // Обработка ошибки
  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return { signin, logout };
};

export default useAuthApi;
