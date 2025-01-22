<template>
  <section class="p-6 bg-gray-50">
    <!-- Order History Header -->
    <div class="mb-4">
      <h1 class="text-xl font-bold text-gray-800">
        История изменений заказа
        <span class="text-blue-600 cursor-pointer hover:underline"
          >#1695432</span
        >
      </h1>
      <div class="flex items-center justify-between mt-2">
        <label class="flex items-center text-sm text-gray-600">
          <input type="checkbox" class="form-checkbox mr-2" />
          Показать все записи с SMS
        </label>
        <p class="text-sm text-gray-500">Элементы 1—4 из 4</p>
      </div>
    </div>

    <!-- Enhanced Table Block -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Operator Info -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold text-gray-700">
              Оператор:
              <span class="text-blue-600 cursor-pointer hover:underline"
                >erhan.bekboevyn_Logistics</span
              >
            </p>
            <p class="text-sm text-red-500">213.157.51.108</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">
              Открыт: 30.11.2024, 20:56:34
              <span class="text-gray-500">(2 месяца назад)</span>
            </p>
            <p class="text-sm text-gray-600">
              Сохранён: 30.11.2024, 20:58:35
              <span class="text-gray-500">(2 месяца назад)</span>
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Затрачено: --</p>
          </div>
        </div>
      </div>

      <!-- Field Table -->
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-gray-700 font-semibold">Поле</th>
            <th class="px-4 py-3 text-gray-700 font-semibold">Было</th>
            <th class="px-4 py-3 text-gray-700 font-semibold">Стало</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-600">Статус</td>
            <td class="px-4 py-3 text-gray-500">Подтвержден ПД</td>
            <td class="px-4 py-3 text-gray-700">Отменён</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-600">Время переноса</td>
            <td class="px-4 py-3 text-gray-500">[пусто]</td>
            <td class="px-4 py-3 text-gray-700">0000-00-00 00:00:00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <!-- Operator Info -->
      <div class="flex justify-between mb-6">
        <div>
          <p class="font-semibold text-gray-800">
            Оператор:
            <span class="text-blue-600 cursor-pointer hover:underline"
              >eOkenabaDinmuhammed_Logistics</span
            >
          </p>
          <p class="text-sm text-red-500">213.157.51.108</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">
            Открыт: 30.11.2024, 13:44:12
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
          <p class="text-sm text-gray-600">
            Сохранён: 30.11.2024, 13:45:08
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Затрачено: 56 секунд</p>
        </div>
      </div>

      <!-- Field Table -->
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-gray-700 font-semibold">Поле</th>
            <th class="px-4 py-3 text-gray-700 font-semibold">Было</th>
            <th class="px-4 py-3 text-gray-700 font-semibold">Стало</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-600">Комментарий</td>
            <td class="px-4 py-3 text-gray-500">[пусто]</td>
            <td class="px-4 py-3 text-gray-700">отказ отпр а гр</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <!-- Operator Info -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <p class="font-semibold text-gray-800">
            Оператор:
            <span class="text-blue-600 cursor-pointer hover:underline"
              >«AdybtekAdilet_V1»</span
            >
          </p>
          <p class="text-sm text-red-500">213.157.51.108</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">
            Открыт: 30.11.2024, 18:46:26
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
          <p class="text-sm text-gray-600">
            Сохранён: 30.11.2024, 18:47:26
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Затрачено: 1 минута</p>
        </div>
      </div>

      <!-- No Changes Info -->
      <div
        class="border border-gray-300 rounded-lg bg-gray-50 p-4 text-gray-600 text-center"
      >
        Изменений не было
      </div>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <!-- Operator Info -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <p class="font-semibold text-gray-800">
            Оператор:
            <span class="text-blue-600 cursor-pointer hover:underline"
              >«AdybtekAdilet_V1»</span
            >
          </p>
          <p class="text-sm text-red-500">213.157.51.108</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">
            Открыт: 30.11.2024, 18:46:25
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
          <p class="text-sm text-gray-600">
            Сохранён: 30.11.2024, 18:46:26
            <span class="text-gray-500">(2 месяца назад)</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Затрачено: —</p>
        </div>
      </div>

      <!-- Table -->
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800"
            >
              Поле
            </th>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800"
            >
              Было
            </th>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800"
            >
              Стало
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Статус</td>
            <td class="border border-gray-300 px-4 py-2">Обработана</td>
            <td class="border border-gray-300 px-4 py-2">Подтверждён ПД</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Товары</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2 text-green-600">
              +LibidoFortis, 2 шт. за 43000
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Итого</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">43000</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Оператор</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">AdybtekAdilet_V1</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">ФИО</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">Рахим Егембердиев</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Телефон</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">872027515116</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Возраст</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">43</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Адрес</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">
              Актюбинская область, Карасайский район, с. Жибек-Жолы
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Индекс</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2">049090</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Комментарий</td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
            <td class="border border-gray-300 px-4 py-2 text-gray-400">
              [пусто]
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
// This skeleton does not include dynamic data yet. Mocking functionality can be added later.
</script>

<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
}
table th,
table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb; /* Light gray border for rows */
}
table th {
  background-color: #f9fafb; /* Subtle gray for header background */
  font-weight: 600;
}
table tbody tr:hover {
  background-color: #f1f5f9; /* Light hover effect */
}
</style>
