import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderApi, useOperatorApi, useSubStatusApi, useCityApi } from '@api';
import { socket } from "@/plugins/socket";

const useOrderStore = defineStore('order', () => {
  const router = useRouter();
  const { getOrder, updateOrder } = useOrderApi();
  const { getOperators } = useOperatorApi();
  const { getSubStatuses } = useSubStatusApi();
  const { getCities } = useCityApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    // arrays
    order: {},
    operators: [],
    subStatuses: [],
    cities: [],
  });

  const toggleOrder = () => {
    state.order.is_editable = !state.order.is_editable;
  };

  const saveOrder = async () => {
    delete state.order.is_editable;
    const data = await updateOrder(state.order.id, state.order);
    state.order = data.order;
    state.order.is_editable = false;
  };

  const handleGetOrder = async (order_id) => {
    const orderData = await getOrder(order_id);
    const operatorData = await getOperators();
    const subStatusData = await getSubStatuses();
    const cityData = await getCities();
    state.order = orderData.order;
    state.operators = operatorData.operators;
    state.subStatuses = subStatusData.subStatuses;
    state.cities = cityData.cities;
    state.order.is_editable = false;
  };

  const handleGetData = async (order_id) => {
    state.isDataLoaded = false;

    await Promise.all([
      handleGetOrder(order_id)
    ]);

    state.isDataLoaded = true;
  };

  const bindEvents = () => {
    socket.on("receiveEntryOrder", (data) => {
      router.push(`/orders/${data.order_id}`);
    });

    socket.on("reservedOrder", () => {
      router.push('/');
    });
  };

  return {
    state,
    bindEvents,
    toggleOrder,
    saveOrder,
    handleGetData,
  };
});

export default useOrderStore;
