<script setup>
defineProps({
  roles: {
    type: Array,
    required: true,
    default: []
  },
  handleAddRole: {
    type: Function,
    required: true
  },
  handleEditRole: {
    type: Function,
    required: true
  },
  handleSaveRole: {
    type: Function,
    required: true
  },
  handleDeleteRole: {
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
        Роли
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddRole"
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
              :class="[css.th, 'w-[50px]']" 
            >
              ID
            </th>
            <th 
              :class="[css.th, 'w-[200px]']" 
            >
              Название
            </th>
            <th 
              :class="css.th" 
            >
              Описание
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="role in roles"
            :key="role.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  v-if="!role.is_editable"
                  :icon="['fas', 'pen-to-square']" 
                  :class="css.icon"
                  @click="handleEditRole(role.id)"
                />
                <Icon 
                  v-else
                  :icon="['fas', 'floppy-disk']" 
                  :class="css.icon"
                  @click="handleSaveRole(role.id)"
                />
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteRole(role.id)"
                />
              </div>
            </td>
            <td :class="css.td">{{ role.id ?? '-' }}</td>
            <td :class="css.td">
              <p v-if="!role.is_editable">{{ role.name ?? '-' }}</p>
              <Input
                v-else
                :id="'role' + role.id"
                type="text"
                v-model="role.name"
                placeholder="..."
                class="text-xs p-1"
              />
            </td>
            <td :class="css.td">
              <p v-if="!role.is_editable">{{ role.title ?? '-' }}</p>
              <Input
                v-else
                :id="'role' + role.id"
                type="text"
                v-model="role.title"
                placeholder="..."
                class="text-xs p-1"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center" v-if="roles.length === 0">
    <p class="font-bold text-2xl">Роли не найдены</p>
  </div>
</template>