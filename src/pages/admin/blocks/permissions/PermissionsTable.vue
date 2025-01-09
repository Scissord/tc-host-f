<script setup>
import { ref, computed } from 'vue';

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

// const witch = ref(0);
 const entities = [
   { value: 0, label: 'По ролям' },
   { value: 1, label: 'По пользователям' },
];
// const entity_id = ref(null);
const witch = ref(0); // 0 for roles, 1 for users
const entity_id = ref(null); // Selected role or user ID

// Helper method to check if an ability is assigned to the selected role/user
const isAbilityAssigned = (abilityId) => {
  return permissions.some(
    (permission) =>
      permission.ability_id === abilityId &&
      permission.entity_id === entity_id.value &&
      permission.entity_type === (witch.value === 0 ? 'role' : 'user')
  );
};

// Handle checkbox change
const handleCheckboxChange = (abilityId, hasPermission) => {
  if (hasPermission) {
    handleDeletePermission(abilityId);
  } else {
    handleAddPermission(entity_id.value, witch.value === 0 ? 'role' : 'user', abilityId);
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
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center bg-zinc-600 text-white p-4 rounded-lg">
      <h1 class="font-bold text-2xl">
        Выдать пользователю или роли доступ
      </h1>
    </div>

    <!-- Dropdown Menus -->
    <div class="grid grid-cols-2 gap-4 mt-6">
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
        class="w-full"
      />
    </div>

    <!-- Permissions Table -->
    <div class="w-full bg-white shadow-md rounded-lg mt-4 p-4">
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
              <input
                type="checkbox"
                :checked="isAbilityAssigned(ability.id)"
                @change="handleCheckboxChange(
                  ability.id, 
                  isAbilityAssigned(ability.id)
                )"
                class="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
