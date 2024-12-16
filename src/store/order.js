import { defineStore } from 'pinia';
import { ref, reactive, onMounted, watch } from 'vue';
import { useOrder, useOrderColumn, useOrderSubStatus } from '@hooks';

const useOrderStore = defineStore('order', () => {
  const { fetchOrders } = useOrder();
  const { fetchSubStatuses } = useOrderSubStatus();
  const { fetchOrderColumns } = useOrderColumn();

  const isDataLoaded = ref(true);
  const isOrdersFetching = ref(false);

  const limit = reactive({ value: 20 });
  const page = reactive({ value: 1 });
  const lastPage = reactive({ value: null });
  const pages = reactive([]);

  const subStatus = reactive({ value: 1 });
  const subStatuses = reactive([]);
  const columns = reactive([]);
  const filters = reactive([]);
  const orders = reactive([]);

  const handleGetSubStatuses = async () => {
    const subStatusData = await fetchSubStatuses();
    subStatuses.splice(0, subStatuses.length, ...subStatusData);
  };
  
  const handleGetOrderColumns = async () => {
    const orderColumnsData = await fetchOrderColumns();
    columns.splice(0, columns.length, ...orderColumnsData);
    filters.splice(0, filters.length, ...orderColumnsData.map((column) => ({
      ...column,
      value: null
    })));
  };
  
  const handleGetOrders = async (limit, page, filters, subStatus) => {
    if (isOrdersFetching.value) return;
    isOrdersFetching.value = true;

    const ordersData = await fetchOrders(limit, page, filters, subStatus);
    orders.splice(0, orders.length, ...ordersData.orders);
    pages.splice(0, pages.length, ...ordersData.pages);
    lastPage.value = ordersData.lastPage;

    isOrdersFetching.value = false;
  };

  const handleGetData = async () => {
    isDataLoaded.value = false;
  
    await Promise.all([
      handleGetSubStatuses(), 
      handleGetOrderColumns(), 
      handleGetOrders(limit.value, page.value, [], subStatus.value)
    ]);
  
    isDataLoaded.value = true;
  };

  const handleChangeSubStatus = async (val) => {
    subStatus.value = val;
    page.value = 1;
    await handleGetOrders(limit.value, page.value, filters, subStatus.value)
  };

  const handleApplyFilters = async () => {
    page.value = 1;
    await handleGetOrders(limit.value, page.value, filters);
  };

  onMounted(async () => {
    await handleGetData();
  });

  watch(page, async () => {
    await handleGetOrders(limit.value, page.value, filters, subStatus.value)
  });

  return {
    limit, page, pages, lastPage,
    subStatus, subStatuses, 
    columns, orders, isDataLoaded,
    handleChangeSubStatus, filters,
    handleApplyFilters
  };
});

export default useOrderStore;
