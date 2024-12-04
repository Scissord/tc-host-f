import { useOrderApi } from '@api';

const useOrder = () => {
  const {
    getOrders, getOrder, saveOrder
  } = useOrderApi();

  const handleGetOrders = async (filters) => {
    let queries = "";

    if(filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.column_name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      queries = `?${queryParams}`;
    };

    const orders = await getOrders(queries);
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
