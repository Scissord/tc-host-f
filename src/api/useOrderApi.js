import { api } from '@api';

const useOrderApi = () => {
  const getUserOrders = async (limit = 20, page = 1, subStatus = 1, filters = [], sort_by = null, order_by = null, start = null, end = null, is_filtered = false) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&is_filtered=${encodeURIComponent(is_filtered)}`;

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
      queries += `&start=${encodeURIComponent(start.toISOString().slice(0, 10))}&end=${encodeURIComponent(end.toISOString().slice(0, 10))}`;
    };

    const response = await api({
      method: 'POST',
      url: `/orders/user${queries}`,
      data,
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

  const getOperatorOrders = async (limit = 20, page = 1, subStatus = 1, filters = [], sort_by = null, order_by = null, start = null, end = null, is_filtered = false) => {
    let queries = `?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&is_filtered=${encodeURIComponent(is_filtered)}`;

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
      data,
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

  const unloadingOrders = async (is_filtered = false, subStatus = 1, filters = [], ids = []) => {
    let queries = `?is_filtered=${encodeURIComponent(is_filtered)}`;

    const data = {};

    if (is_filtered) {
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
    };

    if (!Object.keys(data).length) {
      queries += `&sub_status=${subStatus}`
    };

    const response = await api({
      method: 'POST',
      url: `/orders/unloading${queries}`,
      data: {
        filters: data,
        ids: ids,
      },
      responseType: "blob",
    });

    const href = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", `orders.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

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
    unloadingOrders,
  };
};

export default useOrderApi;
