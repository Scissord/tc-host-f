import { api } from '@api';

const useOrderColumnApi = () => {
  const getOrderColumns = async () => {
    const response = await api({
      method: 'GET',
      url: '/order_columns',
    });

    return response.data.orderColumns;
  };

  return {
    getOrderColumns,
  };
};

export default useOrderColumnApi;
