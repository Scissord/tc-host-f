<script setup>
import { onMounted } from "vue";
import { useCities } from "@hooks";
import CitiesTable from "./blocks/CitiesTable.vue";
import CitiesHeader from "./blocks/CitiesHeader.vue";

const {
  state,
  handleAddCity,
  handleEditCity,
  handleSaveCity,
  handleDeleteCity,
  handleGetData,
} = useCities();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div
    v-if="state.isDataLoaded"
    class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <CitiesHeader :handleAddCity="handleAddCity" />

    <CitiesTable
      :cities="state.cities"
      :handleDeleteCity="handleDeleteCity"
      :handleEditCity="handleEditCity"
      :handleSaveCity="handleSaveCity"
    />
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
