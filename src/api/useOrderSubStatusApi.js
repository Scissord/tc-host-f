import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useOrderSubStatus = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getOrderSubStatuses = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/order_sub_statuses`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data.orderSubStatuses;
    } catch (err) {
      handleError(err.response?.data?.error);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getOrderSubStatuses,
  };
};

export default useOrderSubStatus;
