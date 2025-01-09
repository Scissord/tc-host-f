<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTeam } from "@hooks";
import TeamTable from "./blocks/TeamTable.vue";
import TeamHeader from "./blocks/TeamHeader.vue";

const route = useRoute();
const team_id = route.params.team_id;
const { 
  state, 
  handleAddOperator, 
  handleDeleteOperator, 
  handleGetData 
  } =
  useTeam(team_id);

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div
    v-if="state.isDataLoaded"
    class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <TeamHeader :handleAddOperator="handleAddOperator" />
    <TeamTable
      :operators="state.operators"
      :handleDeleteOperator="handleDeleteOperator"
    />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>