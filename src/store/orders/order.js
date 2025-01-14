import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  useOrderApi,
  useOperatorApi,
  useSubStatusApi,
  useCityApi,
  useGenderApi,
  useDeliveryMethodApi,
  usePaymentMethodApi,
  useOrderCancelReasonApi
} from '@api';
import { socket } from "@/plugins/socket";

const useOrderStore = defineStore('order', () => {
  const router = useRouter();
  const { getOrder, updateOrder } = useOrderApi();
  const { getOperators } = useOperatorApi();
  const { getSubStatuses } = useSubStatusApi();
  const { getCities } = useCityApi();
  const { getGenders } = useGenderApi();
  const { getDeliveryMethods } = useDeliveryMethodApi();
  const { getPaymentMethods } = usePaymentMethodApi();
  const { getOrderCancelReasons } = useOrderCancelReasonApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    // arrays
    order: {},
    operators: [],
    subStatuses: [],
    cities: [],
    genders: [],
    paymentMethods: [],
    deliveryMethods: [],
    orderCancelReasons: [],
  });

  const toggleOrder = () => {
    state.order.is_editable = !state.order.is_editable;
  };

  const saveOrder = async () => {
    delete state.order.is_editable;
    await updateOrder(state.order.id, {
      fio: state.order.fio,
      region: state.order.region,
      city_id: state.order.city_id,
      address: state.order.address,
      postal_code: state.order.postal_code,
      comment: state.order.comment,
      age: state.order.age,
      operator_id: state.order.operator_id,
      sub_status_id: state.order.sub_status_id,
      gender_id: state.order.gender_id,
      payment_method_id: state.order.payment_method_id,
      delivery_method_id: state.order.delivery_method_id,
      order_cancel_reason_id: state.order.order_cancel_reason_id,
      additional1: state.order.additional1,
      additional2: state.order.additional2,
      additional3: state.order.additional3,
      additional4: state.order.additional4,
      additional5: state.order.additional5,
      additional6: state.order.additional6,
      additional7: state.order.additional7,
      additional8: state.order.additional8,
      additional9: state.order.additional9,
      additional10: state.order.additional10,
    });
    state.order.is_editable = false;
  };

  const handleGetOrder = async (order_id) => {
    const orderData = await getOrder(order_id);
    const operatorData = await getOperators();
    const subStatusData = await getSubStatuses();
    const cityData = await getCities();
    const genderData = await getGenders();
    const deliveryMethodData = await getDeliveryMethods();
    const paymentMethodData = await getPaymentMethods();
    const orderCancelReasonData = await getOrderCancelReasons();
    state.order = orderData.order;
    state.operators = operatorData.operators;
    state.subStatuses = subStatusData.subStatuses;
    state.cities = cityData.cities;
    state.genders = genderData.genders;
    state.deliveryMethods = deliveryMethodData.deliveryMethods;
    state.paymentMethods = paymentMethodData.paymentMethods;
    state.orderCancelReasons = orderCancelReasonData.orderCancelReasons;
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
