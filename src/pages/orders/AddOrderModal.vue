<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createOrder: {
    type: Function,
    required: true
  },
  orders: {
    type: Array,
    required: true,
    default: []
  },
  changeState: {
    type: Function,
    required: true
  }
})

const order = reactive({
  fio: "",
  phone: ""
});

const handleCreateOrder = async () => {
  if(!order.fio || !order.phone){
    notification.show('Заполните все поля!', 'warning');
    return;
  };  
  const data = await props.createOrder(order);
  
  data.order.is_checked = false;
  data.order.is_disabled = false;
  data.order.reserved_by = null;

  props.orders.unshift(data.order);
  props.changeState();

  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>ФИО</h1>
      <Input
        id="add_order_fio"
        type="text"
        v-model="order.fio"
        placeholder="..."
      />
      <h1>Номер телефона</h1>
      <PhoneInput
        v-model="order.phone"
        class="bg-gray-100"
      >
      </PhoneInput>
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateOrder"
        class="bg-green-500 hover:bg-green-400"
      />
      <Button
        text="Закрыть"
        @click="modal.hide"
        class="bg-red-500 hover:bg-red-400"
      />
    </div>

  </div>
</template>