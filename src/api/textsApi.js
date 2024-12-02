import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useTextsApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getTexts = async (good_id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_text_list/${good_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const createTextName = async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/create_script_text`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
      })
      notification.show('Подраздел успешно создан!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const updateTextName = async (id, data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/update_script_text/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
      })
      notification.show('Подраздел успешно обновлен!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const deleteText = async (id) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/delete_script_text/${id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })
      notification.show('Подраздел успешно удалён!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };


  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getTexts,
    createTextName,
    updateTextName,
    deleteText
  };
};

export default useTextsApi;
