import { api } from '@api';

const useOrderItemApi = () => {
  const createOrderItem = async () => {
    const response = await api({
      method: 'POST',
      url: '/order_item',
    });

    return response.data;
  };

  const deleteOrderItem = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/order_item/${id}`,
    });

    return response.data;
  };

  return {
    createOrderItem,
    deleteOrderItem
  };
};

export default useOrderItemApi;
