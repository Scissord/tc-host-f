<script setup>
defineProps({
  free_operators: {
    type: Array,
    required: true,
    default: []
  },
  teams: {
    type: Array,
    required: true,
    default: []
  },
  operators: {
    type: Array,
    required: true,
    default: []
  },
  handleAddOperator: {
    type: Function,
    required: true
  },
  handleEditOperator: {
    type: Function,
    required: true
  },
  handleSaveOperator: {
    type: Function,
    required: true
  },
  handleDeleteOperator: {
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
        Операторы
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddOperator"
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
              operator_id
            </th>
            <th 
              :class="[css.th, 'w-[200px]']" 
            >
              Команда
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
            v-for="operator in operators"
            :key="operator.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  v-if="!operator.is_editable"
                  :icon="['fas', 'pen-to-square']" 
                  :class="css.icon"
                  @click="handleEditOperator(operator.id)"
                />
                <Icon 
                  v-else
                  :icon="['fas', 'floppy-disk']" 
                  :class="css.icon"
                  @click="handleSaveOperator(operator.id)"
                />
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteOperator(operator.id)"
                />
              </div>
            </td>
            <td :class="css.td">{{ operator.id ?? '-' }}</td>
            <td :class="css.td">
              <p v-if="!operator.is_editable">{{ operator.team_id ?? '-' }}</p>
              <Select
                v-else
                v-model="operator.team_id"
                :options="teams"
                value="id"
                label="title"
              />
            </td>
            <td :class="css.td">
              <p v-if="!operator.is_editable">{{ operator.user_id ?? '-' }}</p>
              <Select
                v-else
                v-model="operator.user_id"
                :options="free_operators"
                value="id"
                label="name"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="operators.length === 0">
    <p class="font-bold text-2xl">Операторы не найдены</p>
  </div>
</template>