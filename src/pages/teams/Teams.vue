<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeams } from '@hooks';
import TeamsTable from './blocks/TeamsTable.vue';

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
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Команды отдела {{ department_id }}
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddTeam"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <TeamsTable
        :teams="state.teams"
        :subStatuses="state.subStatuses"
        :handleEditTeam="handleEditTeam"
        :handleSaveTeam="handleSaveTeam"
        :handleDeleteTeam="handleDeleteTeam"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
