<script setup>
import { useRouter } from 'vue-router';

defineProps({
  statuses: {
    type: Array,
    required: true,
    default: []
  },
  handleEditStatus: {
    type: Function,
    required: true
  },
  handleSaveStatus: {
    type: Function,
    required: true
  },
  handleDeleteStatus: {
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
            :class="css.th"
          >
            Цвет
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="status in statuses"
          :key="status.id"
          class="bg-white z-1"
        >
          <td :class='css.td'>
            <div
              class="flex justify-center items-center space-x-2"
            >
              <Icon 
                v-if="!status.is_editable"
                :icon="['fas', 'pen-to-square']" 
                :class="css.icon"
                @click="handleEditStatus(status.id)"
              />
              <Icon 
                v-else
                :icon="['fas', 'floppy-disk']" 
                :class="css.icon"
                @click="handleSaveStatus(status.id)"
              />
              <Icon 
                :icon="['fas', 'trash']" 
                :class="css.icon"
                @click="handleDeleteStatus(status.id)"
              />
            </div>
          </td>
          <td :class="[css.td, 'w-[50px]']">
            <p 
              class="text-blue-900 font-semibold cursor-pointer hover:underline"
              @click="() => router.push(`/statuses/${status.id}`)"
            >
              {{ status.id ?? "-" }}
            </p>
          </td>
          <td :class="[css.td, 'w-[150px]']">
            <p v-if="!status.is_editable">{{ status.name ?? '-' }}</p>
            <Input
              v-else
              :id="'status' + status.id"
              type="text"
              v-model="status.name"
              placeholder="Введите..."
              class="text-xs p-1"
            />
          </td>
          <td :class="css.td">
            <p v-if="!status.is_editable">{{ status.color ?? '-' }}</p>
            <Input
              v-else
              :id="'status' + status.id"
              type="text"
              v-model="status.color"
              placeholder="Хэш..."
              class="text-xs p-1"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="statuses.length === 0">
    <p class="font-bold text-2xl">Статусы не найдены</p>
  </div>
</template>