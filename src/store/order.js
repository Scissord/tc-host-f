import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderApi } from '@api';
import { socket } from "@/plugins/socket";

const useOrderStore = defineStore('order', () => {
  const router = useRouter();
  const { getOrder } = useOrderApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    // arrays
    order: {},
  });
  
  const handleGetOrder = async (order_id) => {
    const orderData = await getOrder(order_id);
    Object.assign(state.order, orderData.order);
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
  };

  return {
    state,
    bindEvents,
    handleGetData
  };
});

export default useOrderStore;
