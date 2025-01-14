import { defineStore } from 'pinia';
import {
  useOrderApi,
  useOrderColumnApi
} from '@api';
import { reactive } from 'vue';

const useWebmasterOrdersStore = defineStore('webmaster_order', () => {
  const { getWebmasterOrders } = useOrderApi();
  const { getOrderColumns } = useOrderColumnApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    limit: 20,
    page: 1,
    lastPage: null,
    pages: [],
    // arrays
    columns: [],
    orders: [],
  });

  const handleChangePage = async (val) => {
    state.page = val;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);
  };

  const handleGetOrderColumns = async () => {
    const orderColumnsData = await getOrderColumns();
    state.columns.splice(0, state.columns.length, ...orderColumnsData);
  };

  const handleGetOrders = async (limit, page) => {
    const ordersData = await getWebmasterOrders(limit, page);
    state.orders.splice(0, state.orders.length, ...ordersData.orders.map((order) => ({
      ...order,
      is_checked: false,
      is_disabled: false,
      reserved_by: ''
    })));
    state.pages.splice(0, state.pages.length, ...ordersData.pages);
    state.lastPage = ordersData.lastPage;
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;

    await Promise.all([
      handleGetOrderColumns(),
      handleGetOrders(state.limit, state.page)
    ]);

    state.isDataLoaded = true;
  };

  return {
    state,
    handleChangePage,
    handleGetData
  };
});

export default useWebmasterOrdersStore;
