import axios from 'axios';
import { useRouter } from 'vue-router';
import { baseUrl } from '@utils';
import { useUserStore, useNotificationStore } from '@store';
import { useAuthApi } from '@api';

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const setup = () => {
  const router = useRouter();

  const user = useUserStore();
  const notification = useNotificationStore();
  const { refresh } = useAuthApi();

  api.interceptors.request.use(
    (config) => {
      if (user.accessToken) {
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 1. 400 - mean default error
      if (error.response.status === 400) {
        notification.show(error.response?.data?.message || 'Что-то пошло не так!', 'error');
      };
      // 2. 401 - token expired
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 4. try to refresh accessToken;
        try {
          const data = await refresh();

          // 5. send again original request
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          // 6. catch if refreshToken is expired throw away user from app
          if (refreshError.response.status === 401) {
            user.logout();
            notification.show('Сессия истекла. Пожалуйста, войдите заново.', 'error');
          };
          return Promise.reject(refreshError);
        };
      };
      // 3. 403 - no abilities to action
      if (error.response.status === 403) {
        router.push('/');
        notification.show(error.response?.data?.message || 'Что-то пошло не так!', 'error');
      };
      // 4. 500 - internal server
      if (error.response.status === 500) {
        notification.show('Ошибка на сервере', 'error');
      };

      // Прочие ошибки
      return Promise.reject(error);
    }
  );
};