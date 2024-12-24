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
};
</script>

<template>
  <div class="z-1 w-full">
    <table class="z-1 w-full border-collapse border border-slate-200 table-fixed">
      <thead>
        <tr>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
          </th>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
            ID
          </th>
          <th 
            :class="[css.th, 'w-[150px]']"
          >
            Название
          </th>
          <th 
            :class='css.th'
          >
            Статусы
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="department in departments"
          :key="department.id"
          class="bg-white z-1"
        >
          <td :class='css.td'>
            <div
              class="flex justify-center items-center space-x-2"
            >
              <Icon 
                v-if="!department.is_editable"
                :icon="['fas', 'pen-to-square']" 
                :class="css.icon"
                @click="handleEditDepartment(department.id)"
              />
              <Icon 
                v-else
                :icon="['fas', 'floppy-disk']" 
                :class="css.icon"
                @click="handleSaveDepartment(department.id)"
              />
              <Icon 
                :icon="['fas', 'trash']" 
                :class="css.icon"
                @click="handleDeleteDepartment(department.id)"
              />
            </div>
          </td>
          <td :class="[css.td, 'w-[50px]']">
            <p 
              class="text-blue-900 font-semibold cursor-pointer hover:underline"
              @click="() => router.push(`/departments/${department.id}`)"
            >
              {{ department.id ?? "-" }}
            </p>
          </td>
          <td :class="[css.td, 'w-[200px]']">
            <p v-if="!department.is_editable">{{ department.title ?? '-' }}</p>
            <Input
              v-else
              :id="'department' + department.id"
              type="text"
              v-model="department.title"
              placeholder="Название..."
              class="text-xs p-1"
            />
          </td>
          <td :class="[css.td, 'w-[200px]']">
            <div 
              v-if="!department.is_editable"  
              class="flex items-center gap-3"
            >
              <p 
                v-for="sub_status in department.sub_status_ids"
                :key="sub_status"
              >
                {{ sub_status }}
              </p>
            </div>
            <Select
              v-else
              v-model="department.sub_status_ids"
              :options="subStatuses"
              value="id"
              label="name"
              multiple
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="departments.length === 0">
    <p class="font-bold text-2xl">Отделы не найдены</p>
  </div>
</template>