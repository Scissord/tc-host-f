<script setup>
import { useRouter } from 'vue-router';

defineProps({
  departments: {
    type: Array,
    required: true,
    default: []
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  handleEditDepartment: {
    type: Function,
    required: true
  },
  handleSaveDepartment: {
    type: Function,
    required: true
  },
  handleDeleteDepartment: {
    type: Function,
    required: true
  },
});

const router = useRouter();

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1',
  icon: 'hover:text-gray-300 cursor-pointer',
  tablename: 'text-left p-2 border',
};
</script>

<template>
  <div class="bg-white mt-4 p-4 rounded shadow">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th :class="css.tablename">ID</th>
          <th :class="css.tablename">Название</th>
          <th :class="css.tablename">Статусы</th> 
          <th :class="css.tablename">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="department in departments"
          :key="department.id"
          class="hover:bg-gray-100"
        >
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
</template>