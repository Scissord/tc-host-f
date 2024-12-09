import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useStatisticApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getStatistic = async (queries) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/statistic${queries}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  const getStatisticForWebmaster = async (queries) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/statistic/webmaster${queries}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  const getStatisticForOperator = async (queries) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/statistic/operator${queries}`,
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
    getStatistic, 
    getStatisticForWebmaster,
    getStatisticForOperator
  };
};

export default useStatisticApi;
