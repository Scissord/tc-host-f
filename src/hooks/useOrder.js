import { useOrderApi } from '@api';

const useOrder = () => {
  const {
    getOrders, getOrder, saveOrder
  } = useOrderApi();

  const handleGetOrders = async () => {
    const orders = await getOrders();
    return orders;
  };

  const handleGetOrder = async (order_id) => {
    const order = await getOrder(order_id);
    return order;
  };

  const handleSaveOrder = async (order_id, order) => {
    await saveOrder(order_id, order);
  };

  return {
    handleGetOrders, handleGetOrder, handleSaveOrder
  }
};

export default useOrder;
