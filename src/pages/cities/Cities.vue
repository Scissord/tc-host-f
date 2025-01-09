<script setup>
import { onMounted } from 'vue';
import { useCities } from '@hooks';
import CitiesTable from './blocks/CitiesTable.vue';

const { 
  state,
  handleAddCity,
  handleEditCity,
  handleSaveCity,
  handleDeleteCity,
  handleGetData
} = useCities();

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <!-- Header Section -->
    <div class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded">
      <h1 class="text-2xl font-semibold">
        Города
      </h1>
      <div class="flex gap-2">
        <button
          @click="handleAddCity"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Добавить Город
        </button>
      </div>
    </div>

    <!-- Table Section -->
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
            v-for="city in state.cities"
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
                  class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ease-in-out"
                  title="Edit City"
                >
                  <Icon icon="fa-solid fa-pen" class="text-lg" />
                </button>

                <button
                  v-else
                  @click="handleSaveCity(city.id)"
                  class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ease-in-out"
                  title="Save"
                >
                  <Icon icon="fa-solid fa-save" class="text-lg" />
                </button>

                <button
                  @click="handleDeleteCity(city.id)"
                  class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ease-in-out"
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
  </div>

  <!-- Loader -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
