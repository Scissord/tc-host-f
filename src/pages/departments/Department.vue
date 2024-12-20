<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDepartmentApi } from '@api';
import { useUserStore } from '@store';

const route = useRoute();
const department_id = route.params.department_id;

const user = useUserStore();

const { getHeadAbility } = useDepartmentApi();

const state = reactive({
  isDataLoaded: false,
  head_ability_id: null,
});

const handleGetData = async (department_id) => {
  state.isDataLoaded = false;
  state.head_ability_id = await getHeadAbility(department_id);
  console.log(state.head_ability_id)
  state.isDataLoaded = true;
};

onMounted(async () => {
  await handleGetData(department_id);
});
</script>

<template>
  <div class="min-h-screen p-6">
    <Button 
      v-if="user.data.abilities.includes(state.head_ability_id)"
      text="Добавить команду" 
    />
  </div>
</template>