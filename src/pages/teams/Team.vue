<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeam } from '@hooks';
import TeamTable from './blocks/TeamTable.vue';

const route = useRoute();
const team_id = route.params.team_id;
const { 
  state,
  handleAddOperator,
  handleDeleteOperator,
  handleGetData 
} = useTeam(team_id);

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Операторы команды {{ team_id }}
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddOperator"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <TeamTable
        :operators="state.operators"
        :handleDeleteOperator="handleDeleteOperator"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
