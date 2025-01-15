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
  handleAddOperatorWithUser: {
    type: Function,
    required: true
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
    <div class="flex flex-wrap justify-between items-center bg-zinc-600 text-white p-4 rounded-lg">
      <h1 class="font-bold text-2xl">
        Операторы
      </h1>
      <div class="flex items-center gap-3"> 
        <Button 
          text="Добавить, пользователя с учеткой"
          @click="handleAddOperator"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        />
        <Button 
          text="Добавить, пользователя и учетку"
          @click="handleAddOperatorWithUser"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        />
      </div>
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
              :class="[css.th, 'w-[150px]']" 
            >
              operator_id
            </th>
            <th 
              :class="[css.th, 'w-[200px]']" 
            >
              Команда
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
            <td :class="css.td">{{ operator.name ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="operators.length === 0">
    <p class="font-bold text-2xl">Операторы не найдены</p>
  </div>
</template>