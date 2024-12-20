import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useDepartmentApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getDepartments = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/departments`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response?.data?.message);
    }
  }

  const getHeadAbility = async (department_id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/departments/head_ability/${department_id}`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response?.data?.message);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getDepartments,
    getHeadAbility
  };
};

export default useDepartmentApi;
