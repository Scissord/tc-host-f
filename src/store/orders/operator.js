import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  useOrderApi,
  useSubStatusApi,
  useOrderColumnApi,
  useOperatorApi,
  useProductApi,
  useCityApi,
  usePaymentMethodApi,
  useDeliveryMethodApi,
  useOrderCancelReasonApi,
  useKetApi,
} from '@api';
import { socket } from "@/plugins/socket";

const useOperatorOrdersStore = defineStore('operator_order', () => {
  const router = useRouter();

  const { getOperatorOrders, changeStatus, unloadingOrders } = useOrderApi();
  const { getSubStatuses, getOperatorSubStatuses } = useSubStatusApi();
  const { getOrderColumns } = useOrderColumnApi();
  const { getOperators } = useOperatorApi();
  const { getProducts } = useProductApi();
  const { getCities } = useCityApi();
  const { getPaymentMethods } = usePaymentMethodApi();
  const { getDeliveryMethods } = useDeliveryMethodApi();
  const { getOrderCancelReasons } = useOrderCancelReasonApi();
  const { sendKet } = useKetApi();

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
    is_filtered: false,
    // arrays
    operatorSubStatuses: [],
    subStatuses: [],
    columns: [],
    orders: [],
    operators: [],
    products: [],
    cities: [],
    paymentMethods: [],
    deliveryMethods: [],
    orderCancelReasons: [],
    filters: [],
    sort_by: [],
    range: [],
  });

  const handleChangeStateAfterAddOrder = async () => {
    // checkboxes
    const allChecked = state.orders.every(order => order.is_checked);
    if (!allChecked) {
      state.columns[0].is_checked = false;
      state.orders = state.orders.map((order) => ({
        ...order,
        is_checked: false,
      }))
    }

    // in header
    const currentStatus = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)
    const newLength = +currentStatus.orders_count + 1;
    // statuses
    currentStatus.orders_count = newLength;
    // under table
    state.newSubStatusLength = newLength;
  };

  const handleChangeSubStatus = async (val) => {
    state.page = 1;
    state.subStatus = +val;
    state.newSubStatus = +val;
    state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +val)?.orders_count ?? 0
    state.columns[0].is_checked = false;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);
  };

  const handleChangeOrdersSubStatus = async (val) => {
    if (state.is_filtered) {
      alert('Уберите фильтры из расширенного поиска, чтобы переместить заказы!');
      return;
    };

    const ids = state.orders
      .filter(order => order.is_checked)
      .map(order => order.id);

    const old_status = state.subStatuses.find((ss) => +ss.id === state.subStatus);
    const new_status = state.subStatuses.find((ss) => +ss.id === +val);

    const message = !ids.length
      ? `Вы уверены, что хотите перенести все заказы из ${old_status.name} в ${new_status.name}?`
      : `Вы уверены, что хотите перенести ${ids.length} заказов из ${old_status.name} в ${new_status.name}?`;

    const confirm = window.confirm(message);

    if (!confirm) return;

    const data = {
      old_sub_status_id: state.subStatus,
      new_sub_status_id: val,
      ids: ids
    };

    socket.emit("sendStatus", data);

    await changeStatus(data);
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters);

    if (state.columns[0].is_checked === true) {
      state.columns[0].is_checked = false;
    };

    if (ids.length === 0) {
      const currentStatus = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)
      const newStatus = state.operatorSubStatuses.find((oss) => +oss.id === +val)
      // new_status
      if (newStatus) {
        newStatus.orders_count = +newStatus.orders_count + +currentStatus.orders_count;
      };
      // current_status
      const newLength = 0;
      currentStatus.orders_count = newLength;
      state.newSubStatusLength = newLength;
    } else {
      const currentStatus = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus);
      const newStatus = state.operatorSubStatuses.find((oss) => +oss.id === +val);
      // new_status
      if (newStatus !== null && newStatus !== undefined) {
        newStatus.orders_count = +newStatus.orders_count + ids.length;
      };
      // current_status
      const newLength = +currentStatus.orders_count - ids.length;
      currentStatus.orders_count = newLength;
      state.newSubStatusLength = newLength;
    };
  };

  const handleChangePage = async (val) => {
    state.page = val;
    await handleGetOrders(state.limit, state.page, state.subStatus, state.filters, state.sort_by[0], state.sort_by[1], state.range[0], state.range[1]);
  };

  const handleApplyFilters = async () => {
    state.page = 1;
    let isFiltered = false;
    for (const filter of state.filters) {
      const value = filter.value;
      if (
        value === null ||
        value === "" ||
        value === undefined ||
        (Array.isArray(value) && !value.length) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
      ) continue;

      isFiltered = true;
      break;
    };
    state.is_filtered = isFiltered;
    const data = await handleGetOrders(state.limit, state.page, state.subStatus, state.filters, null, null, null, null, state.is_filtered);
    state.newSubStatusLength = data.total;
  };

  const handleChangeSelectSort = async (field, order_by) => {
    state.range = []
    state.sort_by[0] = field;
    state.sort_by[1] = order_by;
    await handleGetOrders(state.limit, state.page, state.subStatus, [], field, order_by, null, null)
  };

  const handleChangeDateSort = async (range) => {
    state.sort_by = [];
    if (!range) {
      state.range = [];
      await handleGetOrders(state.limit, state.page, state.subStatus, [])
    } else {
      state.range[0] = range[0];
      state.range[1] = range[1];
      await handleGetOrders(state.limit, state.page, state.subStatus, [], null, null, range[0], range[1])
    };
  };

  const handleToggleDoubles = async (order_id) => {
    const order = state.orders.find((o) => +o.id === +order_id);
    order.is_doubles_open = !order.is_doubles_open;
  };

  const handleToggleOrder = async (val) => {
    const currentLength = state.orders.filter(order => order.is_checked === true).length
    if (currentLength === 0) {
      state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)?.orders_count ?? 0
      return;
    };

    state.newSubStatusLength = currentLength;
  };

  const handleToggleOrders = (val) => {
    if (val) {
      state.newSubStatusLength = state.orders.filter(order => !order.is_disabled).length;
    } else {
      state.newSubStatusLength = state.operatorSubStatuses.find((oss) => +oss.id === +state.subStatus)?.orders_count ?? 0;
    }
    state.orders.forEach((order) => {
      if (!order.is_disabled) {
        order.is_checked = val;
      };
    });
  };

  const handleBlockOrder = (order_id, name) => {
    const order = state.orders.find((order) => +order.id === +order_id);

    if (order) {
      order.is_disabled = true;
      order.reserved_by = name;
      if (order.is_checked) {
        state.newSubStatusLength = state.newSubStatusLength - 1;
        order.is_checked = false;
      };
    };

    state.orders = [...state.orders];
  };

  const handleOpenOrder = (order_id, name) => {
    const order = state.orders.find((order) => +order.id === +order_id);

    if (order) {
      order.is_disabled = false;
      order.reserved_by = name;
    };

    state.orders = [...state.orders];
  };

  const bindEvents = () => {
    socket.on("receiveStatus", (data) => {
      // find old status
      const oldStatus = state.operatorSubStatuses.find((oss) => +oss.id === +data.old_sub_status_id);
      // find new status
      const newStatus = state.operatorSubStatuses.find((oss) => +oss.id === +data.new_sub_status_id);

      const newLength = data.ids.length === 0 ? data.total : data.ids.length;
      // remove from old length
      if (oldStatus) {
        oldStatus.orders_count = +oldStatus.orders_count - newLength;
      };

      // add to new length
      if (newStatus) {
        newStatus.orders_count = +newStatus.orders_count + newLength;
      };

      // under table value
      if (+data.old_sub_status_id === +state.newSubStatus) {
        state.newSubStatusLength = +state.newSubStatusLength - newLength;
      };

      if (+data.new_sub_status_id === +state.newSubStatus) {
        state.newSubStatusLength = +state.newSubStatusLength + newLength;
      };

      // if current page === oldStatus
      if (+data.old_sub_status_id === +state.subStatus) {
        if (!data.ids.length) {
          state.orders = [];
        } else {
          state.orders = state.orders.filter((order) => !data.ids.includes(order.id));
        };
      };

      // if current page === newStatus
      if (+data.new_sub_status_id === +state.subStatus) {
        state.orders = [...data.orders.map((order) => ({
          ...order,
          is_checked: false,
          is_disabled: false,
          reserved_by: null
        })), ...state.orders];
      };
    });

    socket.on("blockOrder", (data) => {
      handleBlockOrder(data.order_id, data.name);
    });

    socket.on("openOrder", (data) => {
      handleOpenOrder(data.order_id, null);
    });
  };

  const handleUnloadOrder = async () => {
    state.excel_loading = true;
    const ids = state.orders
      .filter(order => order.is_checked)
      .map(order => order.id);
    await unloadingOrders(state.is_filtered, state.subStatus, state.filters, ids);
    state.excel_loading = false;
  };

  const handleSendKet = async () => {
    const ids = state.orders
      .filter(order => order.is_checked)
      .map(order => order.id);

    if (!ids.length) {
      window.alert('Выберите заказы для выгрузки!');
      return;
    };

    const confirm = window.confirm(`Вы уверены, что хотите отправить ${ids.length} заказов в ketkz?`);
    if (!confirm) return;

    await sendKet({
      order_ids: ids,
    });
  };

  const handleEntryOrder = (order_id) => {
    router.push(`/orders/${order_id}`)
  };

  const handleMiddleClick = (order_id) => {
    window.open(`/orders/${order_id}`, '_blank');

    // make socket to push to every one;
  };

  const handleGetOperators = async () => {
    const data = await getOperators();
    state.operators = data.operators;
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
    state.columns.splice(0, state.columns.length, ...orderColumnsData.map((column) => ({
      ...column,
      sort: null,
    })));
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

  const handleGetProducts = async () => {
    const productData = await getProducts();
    state.products = productData.products;
  };

  const handleGetCities = async () => {
    const cityData = await getCities();
    state.cities = cityData.cities;
  };

  const handleGetOrders = async (limit, page, subStatus, filters, sort_by, order_by, start, end, is_filtered) => {
    const ordersData = await getOperatorOrders(limit, page, subStatus, filters, sort_by, order_by, start, end, is_filtered);

    state.orders = ordersData.orders;
    state.pages.splice(0, state.pages.length, ...ordersData.pages);
    state.lastPage = ordersData.lastPage;

    return ordersData;
  };

  const handleGetPaymentMethods = async () => {
    const paymentData = await getPaymentMethods();
    state.paymentMethods = paymentData.paymentMethods;
  };

  const handleGetDeliveryMethods = async () => {
    const deliveryData = await getDeliveryMethods();
    state.deliveryMethods = deliveryData.deliveryMethods;
  };

  const handleGetOrderCancelReasons = async () => {
    const orderCancelReasonData = await getOrderCancelReasons();
    state.orderCancelReasons = orderCancelReasonData.orderCancelReasons;
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;

    await Promise.all([
      handleGetSubStatuses(),
      handleGetOrderColumns(),
      handleGetOrders(state.limit, state.page, state.subStatus, []),
      handleGetOperators(),
      handleGetProducts(),
      handleGetCities(),
      handleGetPaymentMethods(),
      handleGetDeliveryMethods(),
      handleGetOrderCancelReasons(),
    ]);

    state.isDataLoaded = true;
  };

  return {
    state,
    handleChangeStateAfterAddOrder,
    handleChangeSubStatus,
    handleChangePage,
    handleApplyFilters,
    bindEvents,
    handleUnloadOrder,
    handleSendKet,
    handleMiddleClick,
    handleChangeSelectSort,
    handleChangeDateSort,
    handleEntryOrder,
    handleToggleDoubles,
    handleToggleOrder,
    handleToggleOrders,
    handleChangeOrdersSubStatus,
    handleGetData,
  };
});

export default useOperatorOrdersStore;
