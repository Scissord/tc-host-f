import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useAnswersApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const createAnswer = async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/create_answer`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
      })
      notification.show('Ответ успешно создан!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const updateAnswer = async (id, data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/update_answer/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
      })
      notification.show('Ответ успешно обновлен!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const deleteAnswer = async (id) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/delete_answer/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })
      notification.show('Ответ успешно удалён!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    createAnswer, updateAnswer,
    deleteAnswer
  };
};

export default useAnswersApi;
