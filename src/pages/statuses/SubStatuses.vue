<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSubStatus } from "@hooks";
import SubStatusesTable from "./blocks/SubStatusesTable.vue";
import SubStatusesHeader from "./blocks/SubStatusesHeader.vue";

const route = useRoute();
const status_id = route.params.status_id;
const {
  state,
  handleAddSubStatus,
  handleEditSubStatus,
  handleSaveSubStatus,
  handleDeleteSubStatus,
  handleGetData,
} = useSubStatus(status_id);

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div
    v-if="state.isDataLoaded"
    class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <SubStatusesHeader :handleAddSubStatus="handleAddSubStatus" />
    <div class="min-h-screen flex flex-col gap-6">
      <SubStatusesTable
        :sub_statuses="state.sub_statuses"
        :handleEditSubStatus="handleEditSubStatus"
        :handleSaveSubStatus="handleSaveSubStatus"
        :handleDeleteSubStatus="handleDeleteSubStatus"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
