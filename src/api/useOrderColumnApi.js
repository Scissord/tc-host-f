import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useOrderColumnApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getOrderColumns = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/order_columns`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data.orderColumns;
    } catch (err) {
      handleError(err.response?.data?.error);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getOrderColumns,
  };
};

export default useOrderColumnApi;
