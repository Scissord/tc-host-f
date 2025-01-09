<script setup>
import { ref } from 'vue';

defineProps({
  roles: {
    type: Array,
    required: true,
    default: []
  },
  assigned_roles: {
    type: Array,
    required: true,
    default: []
  },
  handleAddAssignedRole: {
    type: Function,
    required: true
  },
  handleDeleteAssignedRole: {
    type: Function,
    required: true
  },
  handleAssignedRoleGetData: {
    type: Function,
    required: true
  },
});

const role_id = ref(null);

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
        Выдать пользователю роль
      </h1>
      <Button 
        v-if="role_id"
        text="Добавить"
        @click="() => handleAddAssignedRole(role_id)"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      />
    </div>

    <Select
      v-model="role_id"
      @update:modelValue="(val) => handleAssignedRoleGetData(val)"
      :options="roles"
      value="id"
      label="title"
    />

    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-slate-200 table-fixed">
        <thead>
          <tr>
            <th 
              :class="[css.th, 'w-[50px]']" 
            >
            </th>
            <th 
              :class="css.th" 
            >
              Пользователь
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="assigned_role in assigned_roles"
            :key="assigned_role.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteAssignedRole(assigned_role.id)"
                />
              </div>
            </td>
            <td :class="css.td">{{ assigned_role.name ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="assigned_roles.length === 0">
    <p class="font-bold text-2xl">Пользователи не найдены</p>
  </div>
</template>
