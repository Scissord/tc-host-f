<script setup>
import { onMounted } from 'vue';
import { useDepartments } from '@hooks';
import DepartmentsTable from './blocks/DepartmentsTable.vue';

const { 
  state,
  handleAddDepartment,
  handleEditDepartment,
  handleSaveDepartment,
  handleDeleteDepartment,
  handleGetData
} = useDepartments();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="flex-grow min-h-screen p-6 transition-all duration-300 ease-in-out"
      :class="isSidebarExpanded ? 'ml-[20vw]' : 'ml-[5vw]'">
    <!-- Header Section -->
    <div class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded">
      <h1 class="text-2xl font-semibold">
        Отделы
      </h1>
      <div class="flex gap-2">
        <button
          @click="handleAddDepartment"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Добавить Отдел
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white mt-4 p-4 rounded shadow">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="text-left p-2 border">ID</th>
            <th class="text-left p-2 border">Название</th>
            <th class="text-left p-2 border">Статусы</th> 
            <th class="text-left p-2 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(department, index) in state.departments"
            :key="department.id"
            class="hover:bg-gray-100"
          >
            <!-- ID Column -->
            <td class="p-2 border w-12">
              <p 
                class="text-blue-900 font-semibold cursor-pointer hover:underline"
                @click="() => router.push(`/departments/${department.id}`)"
              >
                {{ department.id ?? "-" }}
              </p>
            </td>

            <!-- Name Column -->
            <td class="p-2 border">
              <p v-if="!department.is_editable">{{ department.title ?? '-' }}</p>
              <Input
                v-else
                :id="'department' + department.id"
                type="text"
                v-model="department.title"
                placeholder="Название..."
                class="text-xs p-1 border rounded-md"
              />
            </td>

            <!-- Statuses Column -->
            <td class="p-2 border">
              <div 
                v-if="!department.is_editable"  
                class="flex flex-wrap items-center gap-2"
              >
                <span 
                  v-for="sub_status in department.sub_status_ids"
                  :key="sub_status"
                  class="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                >
                  {{ sub_status }}
                </span>
              </div>
              <Select
                v-else
                v-model="department.sub_status_ids"
                :options="state.subStatuses"
                value="id"
                label="name"
                multiple
                class="border rounded-md p-2"
              />
            </td>
            <!-- Actions Column -->
            <td class="p-2 border w-12">
              <div class="flex justify-start gap-2 items-center">
                <!-- Edit Button -->
                <button
                  v-if="!department.is_editable"
                  @click="handleEditDepartment(department.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                  title="Edit Department"
                >
                  <Icon icon="fa-solid fa-pen" class="text-lg" />
                </button>

                <!-- Save Button -->
                <button
                  v-else
                  @click="handleSaveDepartment(department.id)"
                  class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                  title="Save"
                >
                  <Icon icon="fa-solid fa-save" class="text-lg" />
                </button>

                <!-- Delete Button -->
                <button
                  @click="handleDeleteDepartment(department.id)"
                  class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                  title="Delete Department"
                >
                  <Icon icon="fa-solid fa-trash" class="text-lg" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Loader -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
