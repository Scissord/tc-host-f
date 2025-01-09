<script setup>
import { onMounted } from "vue";
import { useProducts } from "@hooks";
import ProductsHeader from "./blocks/ProductsHeader.vue";
import ProductsTable from "./blocks/ProductsTable.vue";

const {
  state,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleSaveProduct,
  handleGetData,
} = useProducts();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <ProductsHeader 
      :handleAddProduct="handleAddProduct"
    />

    <ProductsTable
      :products="state.products"
      :handleEditProduct="handleEditProduct"
      :handleDeleteProduct="handleDeleteProduct"
      :handleSaveProduct="handleSaveProduct"
    />
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
