import { api } from '@api';

const useOrderApi = () => {
  const getUserOrders = async (limit = 20, page = 1, subStatus = 1, filters = [], sort_by = null, order_by = null, start = null, end = null) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&sub_status=${subStatus}`;

    if (filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      if (queryParams !== "") {
        queries += `&${queryParams}`;
      }
    };

    if (sort_by && order_by) {
      queries += `&sort_by=${encodeURIComponent(sort_by)}&order_by=${encodeURIComponent(order_by)}`;
    };

    if (start && end) {
      queries += `&start=${encodeURIComponent(start.toISOString().slice(0, 10))}&end=${encodeURIComponent(end.toISOString().slice(0, 10))}`;
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

  const getOperatorOrders = async (limit = 20, page = 1, subStatus = 1, filters = [], sort_by = null, order_by = null, start = null, end = null) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}`;

    const data = {};

    for (const filter of filters) {
      const value = filter.value;
      if (
        value === null ||
        value === "" ||
        value === undefined ||
        (Array.isArray(value) && !value.length) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
      ) continue;

      data[filter.name] = value;
    };

    if (!Object.keys(data).length) {
      queries += `&sub_status=${subStatus}`
    };

    if (sort_by && order_by) {
      queries += `&sort_by=${encodeURIComponent(sort_by)}&order_by=${encodeURIComponent(order_by)}`;
    };

    if (start && end) {
      queries += `&start=${new Date(start)}&end=${new Date(end)}`;
    };

    const response = await api({
      method: 'POST',
      url: `/orders/operator${queries}`,
      data: data,
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

  const createOrder = async (data) => {
    const response = await api({
      method: 'POST',
      url: `/orders`,
      data
    });

    return response.data;
  };

  const updateOrder = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/orders/${id}`,
      data
    });

    return response.data;
  };

  const changeStatus = async (data) => {
    const response = await api({
      method: 'PATCH',
      url: '/orders/status/update',
      data
    });

    return response.data;
  };

  return {
    getOrder,
    getUserOrders,
    getWebmasterOrders,
    getOperatorOrders,
    createOrder,
    updateOrder,
    changeStatus,
    getOrder,
  };
};

export default useOrderApi;
