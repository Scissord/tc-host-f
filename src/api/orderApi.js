import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useOrderApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getOrders = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_orders/`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const getOrder = async (order_id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/get_order/${order_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const saveOrder = async (order_id, data) => {
    if(data.additional1) {
      const parsedDate = new Date(data.additional1);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      data.additional1 = `${year}-${month}-${day}`;
    }

    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/update_order/${order_id}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
        data
      })
      notification.show('Заказ успешно обновлён!', 'success');

      return response.data;
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getOrders,
    getOrder, saveOrder
  };
};

export default useOrderApi;
