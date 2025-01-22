import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, useNotificationStore } from '@store';
import {
  useOrderApi,
  useOperatorApi,
  useSubStatusApi,
  useCityApi,
  useGenderApi,
  useDeliveryMethodApi,
  usePaymentMethodApi,
  useOrderCancelReasonApi,
  useProductApi,
  useOrderItemApi,
} from '@api';
import { socket } from "@/plugins/socket";

const useOrderStore = defineStore('order', () => {
  const router = useRouter();

  const user = useUserStore();
  const notification = useNotificationStore();

  const { getOrder, updateOrder } = useOrderApi();
  const { getOperators } = useOperatorApi();
  const { getSubStatuses } = useSubStatusApi();
  const { getCities } = useCityApi();
  const { getGenders } = useGenderApi();
  const { getDeliveryMethods } = useDeliveryMethodApi();
  const { getPaymentMethods } = usePaymentMethodApi();
  const { getOrderCancelReasons } = useOrderCancelReasonApi();
  const { getProducts } = useProductApi();
  const { deleteOrderItem } = useOrderItemApi();

  const state = reactive({
    // primitive
    isDataLoaded: false,
    // arrays
    order: {},
    products: [],
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

    const orderData = {
      status_id: state.order.status.id,
      sub_status_id: state.order.sub_status_id,
      fio: state.order.fio,
      age: state.order.age,
      address: state.order.address,
      region: state.order.region,
      postal_code: state.order.postal_code,
      additional4: state.order.additional4,
      comment: state.order.comment,
      total_sum: state.order.total_sum,
    };

    if (state.order.gender?.id) {
      orderData.gender_id = state.order.gender.id;
    };

    if (state.order.delivery_method?.id) {
      orderData.delivery_method_id = state.order.delivery_method.id;
    };

    if (state.order.city?.id) {
      orderData.city_id = state.order.city.id;
    };

    if (state.order.payment_method?.id) {
      orderData.payment_method_id = state.order.payment_method.id;
    };

    if (state.order.delivery_at !== null) {
      const date = new Date(state.order.delivery_at)
      orderData.delivery_at = date;
    };

    if (state.order.logist_recall_at !== null) {
      const date = new Date(state.order.logist_recall_at)
      orderData.logist_recall_at = date;
    };

    if (+user.data.id === 1) {
      orderData.phone = state.order.phone;
    };

    if (+user.data.id === 1 || user.data.abilities.includes(64)) {
      orderData.operator_id = state.order.operator.id;
    }

    await updateOrder(state.order.id, {
      order: orderData,
      items: state.order.items,
    });
    await handleGetOrder(state.order.id)

    notification.show("Заказ успешно обновлён!", 'success');
  };

  const handleDeleteProduct = async (order_item_id) => {
    await deleteOrderItem(order_item_id);
    state.order.items = state.order.items.filter((oi) => +oi.id !== +order_item_id);
  };

  const handleAddProduct = (product) => {
    state.order.items.push({
      id: new Date().getTime(),
      name: product.name,
      order_id: state.order.id,
      price: 1650.00,
      product_id: product.id,
      product_name: product.name,
      quantity: 1
    });
  };

  const handleUpdateTotal = () => {
    const newTotal = state.order.items.reduce((acc, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;

      const tmp = quantity * price;
      return acc + tmp;
    }, 0);

    state.order.total_sum = newTotal;
  };

  const handleGetOrder = async (order_id) => {
    const orderData = await getOrder(order_id);
    state.order = orderData.order;
    state.order.is_editable = false;
  };

  const handleGetArrays = async (order_id) => {
    const operatorData = await getOperators();
    const subStatusData = await getSubStatuses();
    const cityData = await getCities();
    const genderData = await getGenders();
    const deliveryMethodData = await getDeliveryMethods();
    const paymentMethodData = await getPaymentMethods();
    const orderCancelReasonData = await getOrderCancelReasons();
    const productData = await getProducts();
    state.operators = operatorData.operators;
    state.subStatuses = subStatusData.subStatuses;
    state.cities = cityData.cities;
    state.genders = genderData.genders;
    state.deliveryMethods = deliveryMethodData.deliveryMethods;
    state.paymentMethods = paymentMethodData.paymentMethods;
    state.orderCancelReasons = orderCancelReasonData.orderCancelReasons;
    state.products = productData.products;
    await handleGetOrder(order_id);
  };

  const handleGetData = async (order_id) => {
    state.isDataLoaded = false;

    await Promise.all([
      handleGetArrays(order_id)
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
    handleDeleteProduct,
    handleAddProduct,
    handleUpdateTotal,
    bindEvents,
    toggleOrder,
    saveOrder,
    handleGetData,
  };
});

export default useOrderStore;
