import { reactive, onMounted, watch } from 'vue';
import { 
  useOrderApi, 
  useOrderSubStatusApi, 
  useOrderColumnApi 
} from '@api';
import { socket } from "@/plugins/socket";

const useOrder = () => {
  const { getOrders, changeStatus } = useOrderApi();
  const { getOrderSubStatuses } = useOrderSubStatusApi();
  const { getOrderColumns } = useOrderColumnApi();

  const orderState = reactive({
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
    orderState.page = 1;
    orderState.subStatus = +val;
    orderState.newSubStatus = +val;
    orderState.columns[0].is_checked = false;
    await handleGetOrders(orderState.limit, orderState.page, orderState.subStatus, orderState.filters);
  };

  const handleChangeOrdersSubStatus = async (val) => {
    const allUnchecked = orderState.orders.every(order => !order.is_checked);
    if (allUnchecked) return;

    const ids = orderState.orders
      .filter(order => order.is_checked)
      .map(order => order.id);

    const data = {
      sub_status_id: val,
      ids: ids
    };
    
    // await changeStatus(data);
    // await handleGetOrders(orderState.limit, orderState.page, orderState.subStatus, orderState.filters);

    // if(orderState.columns[0].is_checked === true) {
    //   orderState.columns[0].is_checked = false;
    // };

    socket.emit("sendStatus", data);
  };

  const handleChangePage = async (val) => {
    orderState.page = val;
    await handleGetOrders(orderState.limit, orderState.page, orderState.subStatus, orderState.filters);
  };

  const handleApplyFilters = async () => {
    orderState.page = 1;
    await handleGetOrders(orderState.limit, orderState.page, orderState.subStatus, orderState.filters);
  };

  const handleToggleOrders = (val) => {
    orderState.orders.forEach((order) => {
      order.is_checked = val;
    });
  };

  const handleGetSubStatuses = async () => {
    const subStatusData = await getOrderSubStatuses();
    orderState.subStatuses.splice(0, orderState.subStatuses.length, ...subStatusData);
  };
  
  const handleGetOrderColumns = async () => {
    const orderColumnsData = await getOrderColumns();
    orderState.columns.splice(0, orderState.columns.length, ...orderColumnsData);
    orderState.columns.unshift({
      id: 0,
      label: "",
      is_visible: true,
      name: "is_checked",
      is_checked: false,
    });
    orderState.filters.splice(0, orderState.filters.length, ...orderColumnsData.map((column) => ({
      ...column,
      value: null
    })));
  };
  
  const handleGetOrders = async (limit, page, subStatus, filters) => {
    const ordersData = await getOrders(limit, page, subStatus, filters);

    orderState.orders.splice(0, orderState.orders.length, ...ordersData.orders.map((order) => ({
      ...order,
      is_checked: false
    })));
    orderState.pages.splice(0, orderState.pages.length, ...ordersData.pages);
    orderState.lastPage = ordersData.lastPage;
  };

  const handleGetData = async () => {
    orderState.isDataLoaded = false;
  
    await Promise.all([
      handleGetSubStatuses(), 
      handleGetOrderColumns(), 
      handleGetOrders(orderState.limit, orderState.page, orderState.subStatus, [])
    ]);
  
    orderState.isDataLoaded = true;
  };

  const bindEvents = () => {
    socket.on("receiveStatus", (data) => {
      console.log(data);
    })
  };

  onMounted(async () => {
    await handleGetData();
  });

  return {
    orderState,
    handleChangeSubStatus,
    handleChangePage,
    handleApplyFilters,
    handleToggleOrders,
    handleChangeOrdersSubStatus,
    bindEvents
  };
};

export default useOrder;
