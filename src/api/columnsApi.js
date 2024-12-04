import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useColumnsApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getColumns = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_columns`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getColumns
  };
};

export default useColumnsApi;
