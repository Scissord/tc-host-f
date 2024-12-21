import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
  useOrderApi, 
  useOrderSubStatusApi, 
  useOrderColumnApi 
} from '@api';
import { socket } from "@/plugins/socket";

const useOrdersStore = defineStore('orders', () => {
  const router = useRouter();

  const { getOrders, changeStatus } = useOrderApi();
  const { getOrderSubStatuses } = useOrderSubStatusApi();
  const { getOrderColumns } = useOrderColumnApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    limit: 20,
    page: 1,
    lastPage: null,
    pages: [],
    subStatus: 1,
    newSubStatus: 1,
    // arrays
    subStatuses: [],
    columns: [],
    filters: [],
    orders: [],
  });

  const handleChangeSubStatus = async (val) => {
    state.page = 1;
    state.subStatus = +val;
    state.newSubStatus = +val;
    state.columns[0].is_checked = false;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);
  };

  const handleChangeOrdersSubStatus = async (val) => {
    const allUnchecked = state.orders.every(order => !order.is_checked);
    if (allUnchecked) return;

    const ids = state.orders
      .filter(order => order.is_checked)
      .map(order => order.id);

    const data = {
      sub_status_id: val,
      ids: ids
    };

    await changeStatus(data);
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);

    if(state.columns[0].is_checked === true) {
      state.columns[0].is_checked = false;
    };

    socket.emit("sendStatus", data);
  };

  const handleChangePage = async (val) => {
    state.page = val;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);
  };

  const handleApplyFilters = async () => {
    state.page = 1;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);
  };

  const handleToggleOrders = (val) => {
    state.orders.forEach((order) => {
      if(!order.is_disabled) {
        order.is_checked = val;
      };
    });
  };

  const handleBlockOrder = (order_id, name) => {
    const order = state.orders.find((order) => order.id === order_id);
    
    if (order) {
      order.is_disabled = true;
      order.reserved_by = name;
    };
    
    state.orders = [...state.orders];
  };

  const handleOpenOrder = (order_id, name) => {
    const order = state.orders.find((order) => order.id === order_id);
    
    if (order) {
      order.is_disabled = false;
      order.reserved_by = name;
    };
    
    state.orders = [...state.orders];
  };

  const bindEvents = () => {
    socket.on("receiveStatus", (data) => {
      console.log(data);
    });

    socket.on("blockOrder", (data) => {
      handleBlockOrder(data.order_id, data.name);
    });

    socket.on("openOrder", (data) => {
      handleOpenOrder(data.order_id, null);
    });
  };

  const handleEntryOrder = (order_id) => {
    router.push(`/orders/${order_id}`)
  };

  const handleGetSubStatuses = async () => {
    const subStatusData = await getOrderSubStatuses();
    state.subStatuses.splice(0, state.subStatuses.length, ...subStatusData);
  };
  
  const handleGetOrderColumns = async () => {
    const orderColumnsData = await getOrderColumns();
    state.columns.splice(0, state.columns.length, ...orderColumnsData);
    state.columns.unshift({
      id: 0,
      label: "",
      is_visible: true,
      name: "is_checked",
      is_checked: false,
    });
    state.filters.splice(0, state.filters.length, ...orderColumnsData.map((column) => ({
      ...column,
      value: null
    })));
  };

  const handleGetOrders = async (limit, page, subStatus, filters) => {
    const ordersData = await getOrders(limit, page, subStatus, filters);

    state.orders.splice(0, state.orders.length, ...ordersData.orders.map((order) => ({
      ...order,
      is_checked: false,
      is_disabled: false,
      reserved_by: null
    })));
    state.pages.splice(0, state.pages.length, ...ordersData.pages);
    state.lastPage = ordersData.lastPage;
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;
  
    await Promise.all([
      handleGetSubStatuses(), 
      handleGetOrderColumns(), 
      handleGetOrders(state.limit, state.page, state.subStatus, [])
    ]);
  
    state.isDataLoaded = true;
  };

  return {
    state,
    handleChangeSubStatus,
    handleChangePage,
    handleApplyFilters,
    bindEvents,
    handleEntryOrder,
    handleToggleOrders,
    handleChangeOrdersSubStatus,
    handleGetData,
  };
});

export default useOrdersStore;
