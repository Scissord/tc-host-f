<script setup>
import { defineProps } from "vue";

// Props for order details data
defineProps({
  order: {
    type: Object,
    required: true,
    default: () => ({
      id: "12345",
      phone: "+7 707 475 847",
      createdAt: "16.01.2025, 00:33:30",
      updatedAt: "16.01.2025, 09:24:24",
      deliveryDate: "-",
      approveDate: "-",
      cancelDate: "-",
      status: "Спам/Ошибки",
    }),
  },
});
</script>

<template>
  <div
    class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    <!-- Header -->
    <h2 class="text-lg font-semibold mb-4 text-gray-700">Детали заказа</h2>

    <!-- Two-Column Layout -->
    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
      <!-- Left Column -->
      <div class="space-y-4">
        <!-- ID -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-id-card text-blue-500 mr-3"></i>
          <span class="font-bold">ID:</span>
          <span class="ml-2">1</span>
        </div>

        <!-- Phone -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-phone text-green-500 mr-3"></i>
          <span class="font-bold">Телефон:</span>
          <span class="ml-2">+7 707 475 847</span>
        </div>

        <!-- Creation Date -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-calendar text-purple-500 mr-3"></i>
          <span class="font-bold">Дата создания:</span>
          <span class="ml-2">16.01.2025, 00:33:30</span>
        </div>

        <!-- Last Update -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-clock text-yellow-500 mr-3"></i>
          <span class="font-bold">Последнее обновление:</span>
          <span class="ml-2">20.01.2025, 13:30:33</span>
        </div>

        <!-- Items -->
        <div class="flex items-start text-gray-600">
          <i class="fa-solid fa-box text-orange-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Товары:</span>
            <ul class="ml-6 list-disc text-gray-500">
              <li>LibidoFortis, 1 шт. за 1650</li>
              <li>LibidoFortis, 1 шт. за 1650</li>
            </ul>
          </div>
        </div>

        <!-- Operator -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-user-tie text-indigo-500 mr-3"></i>
          <span class="font-bold">Оператор:</span>
          <span class="ml-2">K.Osken_Paris</span>
        </div>
      </div>

      <!-- Column 2 -->
      <div class="space-y-6">
        <!-- Full Name -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-user text-blue-500 mr-3"></i>
          <span class="font-bold">ФИО:</span>
          <span class="ml-2">Test</span>
        </div>

        <!-- Region -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-map-marker-alt text-red-500 mr-3"></i>
          <span class="font-bold">Регион:</span>
          <span class="ml-2">-</span>
        </div>

        <!-- Age -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-birthday-cake text-pink-500 mr-3"></i>
          <span class="font-bold">Возраст:</span>
          <span class="ml-2">0</span>
        </div>

        <!-- Email -->
        <div class="flex items-center text-gray-600">
          <i class="fa-solid fa-envelope text-green-500 mr-3"></i>
          <span class="font-bold">Почта:</span>
          <span class="ml-2">-</span>
        </div>

        <!-- Additional Info -->
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 1:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 2:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 3:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 4:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 5:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 6:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 7:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 8:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
        <div class="flex items-start text-gray-600 mt-4">
          <i class="fa-solid fa-info-circle text-gray-500 mr-3 mt-1"></i>
          <div>
            <span class="font-bold">Дополнительное 9:</span>
            <span class="ml-2">insta</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Customize hover effect */
.bg-white:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
