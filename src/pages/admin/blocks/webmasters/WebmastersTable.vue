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
  handleEditWebmaster: {
    type: Function,
    required: true
  },
  handleSaveWebmaster: {
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
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Вебмастеры
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddWebmaster"
      />
    </div>
    <div class="w-full">
      <table class="w-full border-collapse border border-slate-200 table-fixed">
        <thead>
          <tr>
            <th 
              :class="[css.th, 'w-[50px]']" 
            >
            </th>
            <th 
              :class="[css.th, 'w-[100px]']" 
            >
              webmaster_id
            </th>
            <th
              :class="css.th"
            >
              user_id
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
                  v-if="!webmaster.is_editable"
                  :icon="['fas', 'pen-to-square']" 
                  :class="css.icon"
                  @click="handleEditWebmaster(webmaster.id)"
                />
                <Icon 
                  v-else
                  :icon="['fas', 'floppy-disk']" 
                  :class="css.icon"
                  @click="handleSaveWebmaster(webmaster.id)"
                />
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteWebmaster(webmaster.id)"
                />
              </div>
            </td>
            <td :class="css.td">{{ webmaster.id ?? '-' }}</td>
            <td :class="css.td">
              <p v-if="!webmaster.is_editable">{{ webmaster.user_id ?? '-' }}</p>
              <Select
                v-else
                v-model="webmaster.user_id"
                :options="free_webmasters"
                value="id"
                label="name"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="webmasters.length === 0">
    <p class="font-bold text-2xl">Вебмастеры не найдены</p>
  </div>
</template>