<script setup>
import { ref } from 'vue';

defineProps({
  roles: {
    type: Array,
    required: true,
    default: [] 
  },
  users: {
    type: Array,
    required: true,
    default: [] 
  },
  permissions: {
    type: Array,
    required: true,
    default: []
  },
  handleAddPermission: {
    type: Function,
    required: true
  },
  handleDeletePermission: {
    type: Function,
    required: true
  },
  handlePermissionGetData: {
    type: Function,
    required: true
  },
});

const witch = ref(0);
const entities = [
  { value: 0, label: 'Роли' },
  { value: 1, label: 'Пользователи' },
];
const entity_id = ref(null);

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
        Выдать пользователю или роли доступ
      </h1>
      <Button 
        v-if="entity_id"
        text="Добавить"
        @click="() => handleAddPermission(entity_id, witch === 0 ? 'role' : 'user')"
      />
    </div>

    <Select
      v-model="witch"
      :options="entities"
    />

    <Select
      v-model="entity_id"
      @update:modelValue="(val) => handlePermissionGetData(val, witch === 0 ? 'role' : 'user')"
      :options="witch === 0 ? roles : users"
      value="id"
      :label="witch === 0 ? 'title' : 'name'"
    />

    <div class="w-full">
      <table class="w-full border-collapse border border-slate-200 table-fixed">
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
              Доступ
            </th>
            <th 
              :class="css.th" 
            >
              ID Сущности
            </th>
            <th 
              :class="css.th" 
            >
              Сущность
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="permission in permissions"
            :key="permission.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeletePermission(permission.id)"
                />
              </div>
            </td>
            <td :class="css.td">
              {{ permission.id ?? '-' }}
            </td>
            <td :class="css.td">
              {{ permission.ability_id ?? '-' }}
            </td>
            <td :class="css.td">
              {{ permission.entity_id ?? '-' }}
            </td>
            <td :class="css.td">
              {{ permission.entity_type ?? '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="permissions.length === 0">
    <p class="font-bold text-2xl">Доступа не найдены</p>
  </div>
</template>
