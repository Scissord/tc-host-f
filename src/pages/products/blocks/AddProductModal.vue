<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createProduct: {
    type: Function,
    required: true
  },
  products: {
    type: Array,
    required: true,
    default: []
  },
})

const product = reactive({
  name: "",
  price: 0
});

const handleCreateProduct = async () => {
  if(!product.name || !product.price){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createProduct(product);
  props.products.push(data.product);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название товара</h1>
      <Input
        id="add_product_name"
        type="text"
        v-model="product.name"
        placeholder="Название..."
      />
      <h1>Цена товара</h1>
      <Input
        id="add_product_price"
        type="text"
        v-model="product.price"
        placeholder="Цена..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateProduct"
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