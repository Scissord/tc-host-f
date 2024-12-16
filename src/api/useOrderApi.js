import axios from 'axios';
import { baseUrl } from '@utils';
import { useNotificationStore, useUserStore } from '@store';

const useOrderApi = () => {
  const userStore = useUserStore();
  const notification = useNotificationStore();

  const getOrders = async (limit = 20, page = 1, subStatus = 1, filters = []) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&sub_status=${subStatus}`;

    if(filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      if(queryParams !== "") {
        queries += `&${queryParams}`;
      }
    };

    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/orders${queries}`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  const changeStatus = async (data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/orders/update_status`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
        data
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
    }
  };

  const getOrderForWebmaster = async (queries) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/webmaster/get_orders${queries}`,
        headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.detail);
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
      handleError(err.response.data.detail);
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
      handleError(err.response.data.detail);
    }
  };

  const handleError = (error) => {
    notification.show(error || 'Что-то пошло не так!', 'error');
  };

  return {
    getOrders, 
    changeStatus,
    getOrderForWebmaster,
    getOrder, 
    saveOrder
  };
};

export default useOrderApi;
