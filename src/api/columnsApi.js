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
      handleError(err.response.data.detail);
    }
  };

  const updateColumn = async (column_id, data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/update_column/${column_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
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
    getColumns, updateColumn
  };
};

export default useColumnsApi;
