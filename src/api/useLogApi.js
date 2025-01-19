import { api } from '@api';

const useLogApi = () => {
  const getOrderLogs = async (order_id) => {
    const response = await api({
      method: 'GET',
      url: `/logs/orders/${order_id}`,
    })

    return response.data;
  };

  return {
    getOrderLogs,
  };
};

export default useLogApi;
