<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeams } from '@hooks';
import TeamsTable from './blocks/TeamsTable.vue';
import TeamsHeader from './blocks/TeamsHeader.vue';

const route = useRoute();
const department_id = route.params.department_id;
const { 
  state,
  handleAddTeam,
  handleEditTeam,
  handleSaveTeam,
  handleDeleteTeam,
  handleGetData 
} = useTeams(department_id);

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <TeamsHeader
      :handleAddTeam="handleAddTeam"
    />
    <TeamsTable
      :teams="state.teams"
      :subStatuses="state.subStatuses"
      :handleEditTeam="handleEditTeam"
      :handleSaveTeam="handleSaveTeam"
      :handleDeleteTeam="handleDeleteTeam"
    />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
