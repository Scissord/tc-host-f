import { api } from '@api';

const useOrderApi = () => {
  const getUserOrders = async (limit = 20, page = 1, subStatus = 1, filters = []) => {
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

    const response = await api({
      method: 'GET',
      url: `/orders/user${queries}`,
    });

    return response.data;
  };

  const getWebmasterOrders = async (limit = 20, page = 1) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}`;

    const response = await api({
      method: 'GET',
      url: `/orders/webmaster${queries}`,
    });

    return response.data;
  };

  const getOperatorOrders = async (queries) => {
    const response = await api({
      method: 'GET',
      url: `/orders/operator${queries}`,
    });

    return response.data;
  };

  const getOrder = async (order_id) => {
    const response = await api({
      method: 'GET',
      url: `/orders/${order_id}`,
    });

    return response.data;
  };

  const changeStatus = async (data) => {
    const response = await api({
      method: 'PATCH',
      url: `/orders/update_status`,
      data
    });

    return response.data;
  };

  const saveOrder = async (order_id, data) => {
    if(data.additional1) {
      const parsedDate = new Date(data.additional1);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      data.additional1 = `${year}-${month}-${day}`;
    }

    const response = await api({
      method: 'PATCH',
      url: `/orders/update_order/${order_id}`,
      data
    });

    return response.data;
  };

  return {
    getOrder,
    getUserOrders, 
    getWebmasterOrders,
    getOperatorOrders,
    changeStatus,
    getOrder, 
    saveOrder
  };
};

export default useOrderApi;
