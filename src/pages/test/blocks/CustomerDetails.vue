<script setup>
// No interactivity yet; this file focuses on layout and mock data
</script>

<style scoped>
/* Optional styling for any custom needs */
</style>

<template>
  <div class="space-y-4">
    <!-- Card 1: Customer Profile -->
    <div
      class="bg-white rounded-lg mt-4 shadow p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div class="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Customer Icon"
          class="rounded-full w-12 h-12"
        />
        <div>
          <p class="text-lg font-bold text-gray-700">MANBALANCE</p>
          <p class="text-sm text-gray-500">Customer ID: #58909</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm font-semibold text-gray-700 mb-2">12 Дубли</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="n in 5"
            :key="n"
            class="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-200"
          >
            #{{ n }} Дубли
          </span>
        </div>
      </div>
      <div class="mt-4 text-right">
        <a href="#" class="text-blue-500 text-sm hover:underline">Edit</a>
      </div>
    </div>

    <!-- Card 2: Metadata -->
    <div
      class="bg-white rounded-lg shadow p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div class="text-sm">
        <p class="font-semibold text-gray-700">Время клиента:</p>
        <p class="text-gray-500 mb-2">21:20</p>
        <p class="font-semibold text-gray-700">
          Время последней смены статуса:
        </p>
        <p class="text-gray-500 mb-2">2 месяца назад</p>
        <p class="font-semibold text-gray-700">
          Время последнего редактирования:
        </p>
        <p class="text-gray-500 mb-2">2 месяца назад</p>
        <p class="font-semibold text-gray-700">Домен:</p>
        <p class="text-gray-500">204120 wa</p>
      </div>
      <div class="mt-4 text-right">
        <a href="#" class="text-blue-500 text-sm hover:underline">Edit</a>
      </div>
    </div>

    <!-- Card 3: Billing Information -->
    <div
      class="bg-white rounded-lg shadow p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div class="text-sm">
        <p class="font-semibold text-gray-700">Billing Address:</p>
        <p class="text-gray-500 mb-2">45 Roker Terrace, Latheronwheel, UK</p>
        <p class="font-semibold text-gray-700">Last 4 digits of card:</p>
        <p class="text-gray-500">****4291</p>
      </div>
      <div class="mt-4 text-right">
        <a href="#" class="text-blue-500 text-sm hover:underline">Edit</a>
      </div>
    </div>
  </div>
</template>
