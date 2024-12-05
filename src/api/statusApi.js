import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useStatusApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getStatuses = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_statuses`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getStatuses
  };
};

export default useStatusApi;
