<script setup>
defineProps({
  free_webmasters: {
    type: Array,
    required: true,
    default: []
  },
  webmasters: {
    type: Array,
    required: true,
    default: []
  },
  handleAddWebmaster: {
    type: Function,
    required: true
  },
  handleDeleteWebmaster: {
    type: Function,
    required: true
  },
});

const css = {
  th: 'text-left border border-slate-200 p-1',
  td: 'border border-slate-200 p-1',
  icon: 'hover:text-gray-300 cursor-pointer',
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap justify-between items-center bg-zinc-600 text-white p-4 rounded-lg">
      <h1 class="font-bold text-2xl">
        Вебмастеры
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddWebmaster"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-slate-200 table-fixed">
        <thead>
          <tr>
            <th 
              :class="[css.th, 'w-[50px]']" 
            >
            </th>
            <th 
              :class="[css.th, 'w-[200px]']" 
            >
              webmaster_id
            </th>
            <th
              :class="[css.th, 'w-[200px]']"
            >
              Имя
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="webmaster in webmasters"
            :key="webmaster.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteWebmaster(webmaster.id)"
                />
              </div>
            </td>
            <td :class="css.td">{{ webmaster.id ?? '-' }}</td>
            <td :class="css.td">{{ webmaster.name ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="webmasters.length === 0">
    <p class="font-bold text-2xl">Вебмастеры не найдены</p>
  </div>
</template>