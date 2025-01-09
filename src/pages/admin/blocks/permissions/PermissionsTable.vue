<script setup>
import { ref } from 'vue';

const props = defineProps({
  permissions: {
    type: Array,
    required: true,
    default: []
  },
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
  abilities: {
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
  { value: 0, label: 'По ролям' },
  { value: 1, label: 'По пользователям' },
];

const entity_id = ref(null);

const isChecked = (abilityId) => {
  return !!props.permissions.find((p) => +p.ability_id === abilityId);
};

const togglePermission = (abilityId) => {
  if (isChecked(abilityId)) {
    props.handleDeletePermission(abilityId);
  } else {
    props.handleAddPermission(abilityId);
  }
};

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
        Выдать пользователю или роли доступ
      </h1>
    </div>

    <div class="flex items-center gap-3">
      <Select
        v-model="witch"
        :options="entities"
        class="w-full"
      />
      <Select
        v-model="entity_id"
        @update:modelValue="(val) => handlePermissionGetData(val, witch === 0 ? 'role' : 'user')"
        :options="witch === 0 ? roles : users"
        value="id"
        :label="witch === 0 ? 'title' : 'name'"
      />
    </div>

    <div class="w-full bg-white shadow-md rounded-lg p-4">
      <table class="w-full border-collapse border border-slate-200">
        <thead>
          <tr class="bg-gray-100">
            <th :class="css.th">Доступ</th>
            <th :class="[css.th, 'text-center']">Выбрано</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ability in abilities"
            :key="ability.id"
            class="hover:bg-gray-50"
          >
            <td :class="css.td">
              {{ ability.title }}
            </td>
            <td :class="[css.td, 'text-center']">
              <Checkbox
                :modelValue="isChecked(ability.id)"
                @update:modelValue="() => togglePermission(ability.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
