<script setup>
defineProps({
  sub_statuses: {
    type: Array,
    required: true,
    default: []
  },
  handleEditSubStatus: {
    type: Function,
    required: true
  },
  handleSaveSubStatus: {
    type: Function,
    required: true
  },
  handleDeleteSubStatus: {
    type: Function,
    required: true
  },
});

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
            :class="css.th"
          >
            Название
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sub_status in sub_statuses"
          :key="sub_status.id"
          class="bg-white z-1"
        >
          <td :class='css.td'>
            <div
              class="flex justify-center items-center space-x-2"
            >
              <Icon 
                v-if="!sub_status.is_editable"
                :icon="['fas', 'pen-to-square']" 
                :class="css.icon"
                @click="handleEditSubStatus(sub_status.id)"
              />
              <Icon 
                v-else
                :icon="['fas', 'floppy-disk']" 
                :class="css.icon"
                @click="handleSaveSubStatus(sub_status.id)"
              />
              <Icon 
                :icon="['fas', 'trash']" 
                :class="css.icon"
                @click="handleDeleteSubStatus(sub_status.id)"
              />
            </div>
          </td>
          <td :class="[css.td, 'w-[50px]']">
            {{ sub_status.id ?? "-" }}
          </td>
          <td :class="css.td">
            <p v-if="!sub_status.is_editable">{{ sub_status.name ?? '-' }}</p>
            <Input
              v-else
              :id="'sub_status' + sub_status.id"
              type="text"
              v-model="sub_status.name"
              placeholder="Введите..."
              class="text-xs p-1"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="sub_statuses.length === 0">
    <p class="font-bold text-2xl">Подстатусы не найдены</p>
  </div>
</template>