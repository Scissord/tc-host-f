<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStatus } from "@hooks";
import StatusesHeader from "./blocks/StatusesHeader.vue";
import StatusesTable from "./blocks/StatusesTable.vue";

const router = useRouter();

const {
  state,
  handleAddStatus,
  handleEditStatus,
  handleSaveStatus,
  handleDeleteStatus,
  handleGetData,
} = useStatus();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div
    v-if="state.isDataLoaded"
    class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <StatusesHeader :handleAddStatus="handleAddStatus" />

    <StatusesTable
      :statuses="state.statuses"
      :handleDeleteStatus="handleDeleteStatus"
      :handleEditStatus="handleEditStatus"
      :handleSaveStatus="handleSaveStatus"
    />
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
