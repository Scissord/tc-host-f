<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDepartmentApi } from '@api';

const router = useRouter();

const { getDepartments } = useDepartmentApi();

const state = reactive({
  isDataLoaded: false,
  departments: [],
});

const handleGetData = async () => {
  state.isDataLoaded = false;
  state.departments = await getDepartments();
  state.isDataLoaded = true;
};

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div class="min-h-screen p-6 grid grid-cols-3" v-if="state.isDataLoaded">
    <div class="flex flex-col gap-3 text-black">
      <p 
        v-for="department in state.departments" 
        :key="department.id"
        class="cursor-pointer hover:bg-gray-300"
        @click="router.push(`/departments/${department.id}`)"
      >
        {{ department.title }}
      </p>
    </div>
  </div>
</template>