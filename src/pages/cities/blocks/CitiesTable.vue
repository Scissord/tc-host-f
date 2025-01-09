<script setup>
defineProps({
  cities: {
    type: Array,
    required: true,
    default: []
  },
  handleEditCity: {
    type: Function,
    required: true
  },
  handleSaveCity: {
    type: Function,
    required: true
  },
  handleDeleteCity: {
    type: Function,
    required: true
  },
});

const css = {
  icon: 'text-white p-2 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ease-in-out',
};
</script>

<template>
  <div class="bg-white mt-4 p-4 rounded shadow">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="text-left p-2 border">#</th>
          <th class="text-left p-2 border">Название</th>
          <th class="text-left p-2 border">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="city in cities"
          :key="city.id"
          class="hover:bg-gray-100"
        >
          <td class="p-2 border w-12">{{ city.id }}</td> 

          <td class="p-2 border">
            <p v-if="!city.is_editable">{{ city.name ?? '-' }}</p>
            <Input
              v-else
              :id="'city' + city.id"
              type="text"
              v-model="city.name"
              placeholder="Название..."
              class="text-xs p-1"
            />
          </td>

          <td class="p-2 border w-10">
            <div class="flex justify-end gap-2 items-center">
              <button
                v-if="!city.is_editable"
                @click="handleEditCity(city.id)"
                :class="[css.icon, 'bg-yellow-500 hover:bg-yellow-600']"
                title="Edit City"
              >
                <Icon icon="fa-solid fa-pen" class="text-lg" />
              </button>

              <button
                v-else
                @click="handleSaveCity(city.id)"
                :class="[css.icon, 'bg-green-500 hover:bg-green-600']"
                title="Save"
              >
                <Icon icon="fa-solid fa-save" class="text-lg" />
              </button>

              <button
                @click="handleDeleteCity(city.id)"
                :class="[css.icon, 'bg-red-500 hover:bg-red-600']"
                title="Delete City"
              >
                <Icon icon="fa-solid fa-trash" class="text-lg" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>