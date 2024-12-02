import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useGoodsApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  // Получить товары
  const getGoods = async () => {
    try {
      const response = await axios.get(`${baseUrl}/get_goods`);
      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const getScript = async (text_id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_script_text/${text_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true
      });

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
    getGoods,
    getScript,
  };
};

export default useGoodsApi;
