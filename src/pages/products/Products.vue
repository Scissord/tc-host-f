<script setup>
import { onMounted } from 'vue';
import { useProducts } from '@hooks';
import ProductsTable from './blocks/ProductsTable.vue';

const { 
  state,
  handleAddProduct,
  handleEditProduct,
  handleSaveProduct,
  handleDeleteProduct,
  handleGetData 
} = useProducts();

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Продукты
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddProduct"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <ProductsTable
        :products="state.products"
        :handleEditProduct="handleEditProduct"
        :handleSaveProduct="handleSaveProduct"
        :handleDeleteProduct="handleDeleteProduct"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>