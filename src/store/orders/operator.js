import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
  useOrderApi, 
  useSubStatusApi, 
  useOrderColumnApi 
} from '@api';
import { socket } from "@/plugins/socket";

const useOperatorOrdersStore = defineStore('operator_order', () => {
  const router = useRouter();

  const { getOperatorOrders, changeStatus } = useOrderApi();
  const { getSubStatuses, getOperatorSubStatuses } = useSubStatusApi();
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
    newSubStatusLength: 0,
    // arrays
    operatorSubStatuses: [],
    subStatuses: [],
    columns: [],
    orders: [],
  });

  const handleChangeSubStatus = async (val) => {
    state.page = 1;
    state.subStatus = +val;
    state.newSubStatus = +val;
    state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +val)?.orders_count ?? 0 
    state.columns[0].is_checked = false;
    await handleGetOrders(state.limit, state.page, state.subStatus);
  };

  const handleChangeOrdersSubStatus = async (val) => {
    // 1. means need to send all orders to another status
    const allUnchecked = state.orders.every(order => order.is_checked);
    if (!allUnchecked) return;

    // 2. if some, than take ids, and send to changeStatus 
    const ids = state.orders
      .filter(order => order.is_checked)
      .map(order => order.id);

    const data = {
      sub_status_id: val,
      ids: ids
    };

    await changeStatus(data);
    await handleGetOrders(state.limit, state.page, state.subStatus);

    if(state.columns[0].is_checked === true) {
      state.columns[0].is_checked = false;
    };

    socket.emit("sendStatus", data);
  };

  const handleChangePage = async (val) => {
    state.page = val;
    await handleGetOrders(state.limit, state.page, state.subStatus);
  };

  const handleToggleOrder = async (val) => {
    const currentLength = state.orders.filter(order => order.is_checked === true).length
    if(currentLength === 0) {
      state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)?.orders_count ?? 0 
      return;
    };

    state.newSubStatusLength = currentLength;
  };

  const handleToggleOrders = (val) => {
    if(val) {
      state.newSubStatusLength = state.orders.length;
    } else {
      state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)?.orders_count ?? 0;
    }
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
    const subStatusData = await getSubStatuses();
    state.subStatuses.splice(0, state.subStatuses.length, ...subStatusData.subStatuses);
    const operatorSubStatusData = await getOperatorSubStatuses();
    state.subStatus = +operatorSubStatusData.subStatuses[0].id;
    state.newSubStatus = +operatorSubStatusData.subStatuses[0].id;
    state.newSubStatusLength = +operatorSubStatusData.subStatuses[0].orders_count;
    state.operatorSubStatuses.splice(0, state.operatorSubStatuses.length, ...operatorSubStatusData.subStatuses);
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
  };

  const handleGetOrders = async (limit, page, subStatus) => {
    const ordersData = await getOperatorOrders(limit, page, subStatus);

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

    await handleGetSubStatuses(), 
    await handleGetOrderColumns(), 
    await handleGetOrders(state.limit, state.page, state.subStatus, [])
  
    state.isDataLoaded = true;
  };

  return {
    state,
    handleChangeSubStatus,
    handleChangePage,
    bindEvents,
    handleEntryOrder,
    handleToggleOrder,
    handleToggleOrders,
    handleChangeOrdersSubStatus,
    handleGetData,
  };
});

export default useOperatorOrdersStore;
