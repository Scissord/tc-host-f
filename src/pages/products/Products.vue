<script setup>
import { reactive, onMounted, h } from 'vue';
import { useModalStore } from '@store';
import { useProductApi } from '@api';
import AddProductModal from './blocks/AddProductModal.vue';
import ProductsTable from './blocks/ProductsTable.vue';

const modal = useModalStore();

const { 
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct 
} = useProductApi(); 

const state = reactive({
  isDataLoaded: false,
  products: []
});

const handleAddProduct = () => {
  modal.show({
    title: 'Добавление товара',
    children: h(AddProductModal, { 
      createProduct, 
      products: state.products 
    }),
  })
}; 

const handleEditProduct = (id) => {
  const product = state.products.find((p) => +p.id === +id)
  if(product) {
    product.is_editable = !product.is_editable;
  };
};

const handleSaveProduct = async (id) => {
  const product = state.products.find((product) => +product.id === +id)
  if(product) {
    await updateProduct(id, {
      name: product.name,
      price: product.price
    }); 
  };
  product.is_editable = false;
};

const handleDeleteProduct = async (id) => {
  const confirm = window.confirm('Вы уверены?'); 
  if(confirm) {
    await deleteProduct(id);
    state.products = state.products.filter((product) => +product.id !== +id);
  };
};

const handleGetData = async () => {
  state.isDataLoaded = false;
  const data = await getProducts();
  state.products = data.products.map(product => ({
    ...product,
    is_editable: false
  }));
  state.isDataLoaded = true; 
};

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Управление продуктами
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddProduct"
      />
    </div>
    <div v-if="state.isDataLoaded" class="min-h-screen flex flex-col gap-6">
      <ProductsTable
        :products="state.products"
        :handleEditProduct="handleEditProduct"
        :handleSaveProduct="handleSaveProduct"
        :handleDeleteProduct="handleDeleteProduct"
      />
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>
</template>