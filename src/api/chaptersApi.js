import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useChaptersApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getChapters = async (good_id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_chapters/${good_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const createChapter = async (name) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/create_chapters`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data: {
          name,
          department_id: userStore.data.department_id
        }
      });
      notification.show('Раздел успешно создан!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const updateChapter = async (id, name) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/update_chapters/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data: {
          name,
        }
      });
      notification.show('Раздел успешно обновлён!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const deleteChapter = async (id) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/delete_chapters/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data: {
          department_id: userStore.data.department_id
        }
      });
      notification.show('Раздел успешно удалён!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  // Обработка ошибки
  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getChapters,
    createChapter,
    updateChapter,
    deleteChapter
  };
};

export default useChaptersApi;
