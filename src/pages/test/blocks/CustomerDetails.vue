<script setup>
const totalAmount = 2 * 1650; // 2 products at 1650 тг each
</script>

<style scoped>
/* Optional styling for any custom needs */
</style>

<template>
  <div class="space-y-4">
    <!-- Card 1: Customer Profile -->
    <div
      class="bg-white rounded-lg shadow p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div class="flex justify-between items-center">
        <!-- Left Column: Operator Name Dropdown -->
        <div class="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Customer Icon"
            class="rounded-full w-12 h-12"
          />
          <div>
            <label
              for="operator"
              class="block text-sm font-bold text-gray-700 mb-1"
              >Operator:</label
            >
            <select
              id="operator"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="K.Osken_Paris">K.Osken_Paris</option>
              <option value="A.Dilnoza_Tokyo">A.Dilnoza_Tokyo</option>
              <option value="J.Smith_London">J.Smith_London</option>
            </select>
          </div>
        </div>

        <!-- Right Column: Price (Removed) -->
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
    </div>

    <!-- Card 3: Billing Information -->
    <div
      class="bg-white rounded-lg shadow p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <!-- Dropdown Input -->
      <div>
        <label for="product-name" class="text-sm font-semibold text-gray-700"
          >Введите название товара:</label
        >
        <select
          id="product-name"
          class="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="LibidoFortis">LibidoFortis</option>
          <option value="ProductB">Product B</option>
          <option value="ProductC">Product C</option>
        </select>
      </div>

      <!-- Already in Order Section -->
      <div class="mt-4">
        <p class="text-sm font-semibold text-gray-700">Уже в заказе:</p>
        <div class="flex items-center gap-4 mt-2">
          <!-- Checkbox -->
          <input
            type="checkbox"
            id="libidoFortis"
            class="form-checkbox h-5 w-5 text-blue-600"
            checked
          />
          <label for="libidoFortis" class="text-gray-700 text-sm"
            >LibidoFortis</label
          >
          <!-- Quantity Input -->
          <input
            type="number"
            value="2"
            class="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <!-- Price Display -->
          <input
            type="text"
            value="1440"
            class="w-20 px-2 py-1 border border-gray-300 rounded-md text-right bg-gray-100"
            readonly
          />
        </div>
      </div>

      <!-- Total Price Section -->
      <div class="mt-4 border-t pt-4">
        <p class="text-sm font-semibold text-gray-700">
          Итого на сумму (было 1440):
        </p>
        <input
          type="text"
          value="1440"
          class="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100"
          readonly
        />
      </div>
    </div>
  </div>
</template>
