<template>
    <section class="p-6 bg-gray-50">
      <div class="mb-6">
        <!-- Header -->
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          Статистика по конверсиям
        </h2>
        <div class="flex items-center justify-between gap-4">
          <!-- Date Pickers -->
          <div class="flex items-center gap-4">
            <FloatLabel variant="on">
              <DatePicker
                v-model="startDate"
                inputId="start_date"
                showIcon
                :value="new Date().toISOString().slice(0, 10)"
              />
              <label for="start_date">Начало периода</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <DatePicker
                v-model="endDate"
                inputId="end_date"
                showIcon
                :value="new Date().toISOString().slice(0, 10)"
              />
              <label for="end_date">Конец периода</label>
            </FloatLabel>
            <Dropdown
              v-model="selectedPeriod"
              :options="periods"
              optionLabel="label"
              class="w-48"
              placeholder="Период"
            />
            <!-- Filters -->
            <div class="flex items-center gap-4">
              <Dropdown
                v-model="selectedGroup"
                :options="groupOptions"
                optionLabel="label"
                class="w-60"
                placeholder="Не группировать"
              />
              <InputText
                v-model="operatorSearch"
                placeholder="Выберите оператора"
                class="w-60"
              />
            </div>
          </div>
  
          <!-- Actions -->
          <div class="flex gap-2">
            <button class="btn bg-green-500 hover:bg-green-600 text-white">
              Сохранить шаблон
            </button>
            <button class="btn bg-red-500 hover:bg-red-600 text-white">
              Сбросить
            </button>
            <button class="btn bg-blue-500 hover:bg-blue-600 text-white">
              Показать
            </button>
          </div>
        </div>
      </div>
  
      <!-- Table -->
      <div class="bg-white shadow rounded-lg overflow-x-auto mx-24">
        <table
          class="w-full table-auto border-collapse border border-gray-300 text-sm"
        >
          <thead class="bg-gray-100">
            <tr>
              <!-- General Columns -->
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Логика с группировкой 
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Новых заказов
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Обработано лидов
              </th>
  
              <!-- Parent Columns -->
              <th
                colspan="4"
                class="border border-gray-300 px-4 py-2 text-center bg-green-50"
              >
                Принято
              </th>
              <th
                colspan="3"
                class="border border-gray-300 px-4 py-2 text-center bg-green-100"
              >
                Выкуплено
              </th>
              <th
                colspan="2"
                class="border border-gray-300 px-4 py-2 text-center bg-red-50"
              >
                Отменено
              </th>
  
              <!-- Remaining Columns -->
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Совершено звонков
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Дл-ть звонков
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Ср. время обработки заказа
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Общее время на обработку заказов
              </th>
              <th rowspan="2" class="border border-gray-300 px-4 py-2 text-left">
                Время вне звонков
              </th>
            </tr>
            <tr>
              <!-- Subcolumns for Принято -->
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-50">
                Кол-во
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-50">
                Апрув 1
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-50">
                Апрув 2
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-50">
                Ср. чек
              </th>
  
              <!-- Subcolumns for Выкуплено -->
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-100">
                Кол-во
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-100">
                %
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-green-100">
                Ср. чек
              </th>
  
              <!-- Subcolumns for Отменено -->
              <th class="border border-gray-300 px-4 py-2 text-left bg-red-50">
                Кол-во
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left bg-red-50">
                %
              </th>
            </tr>
          </thead>
  
          <tbody>
            <tr
              v-for="operator in operators"
              :key="operator.operator"
              :class="
                operator.operator === 'Итого' ? 'font-bold bg-gray-100' : ''
              "
              class="hover:bg-gray-50"
            >
              <!-- General Columns -->
              <td class="border border-gray-300 px-4 py-2">
                Логика с группировкой 
              </td>
              <td class="border border-gray-300 px-4 py-2">
                9 
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.processedLeads }}
              </td>
  
              <!-- Accepted Subcolumns -->
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.accepted.count }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.accepted.approve1 }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.accepted.approve2 }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.accepted.avgCheck }}
              </td>
  
              <!-- Purchased Subcolumns -->
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.purchased.count }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.purchased.percentage }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.purchased.avgCheck }}
              </td>
  
              <!-- Canceled Subcolumns -->
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.canceled.count }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.canceled.percentage }}
              </td>
  
              <!-- Remaining Columns -->
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.callsMade }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.callDuration }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.avgProcessingTime }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.totalProcessingTime }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ operator.timeOutsideCalls }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { DatePicker, FloatLabel, Dropdown, InputText } from "primevue"; // PrimeVue components
  
  const operators = [
    {
      operator: "Администратор",
      processedLeads: "15 (10)",
      accepted: {
        count: 10,
        approve1: 8,
        approve2: 5,
        avgCheck: "1500",
      },
      purchased: {
        count: 7,
        percentage: "70%",
        avgCheck: "1200",
      },
      canceled: {
        count: 3,
        percentage: "30%",
      },
      callsMade: "30 (25)",
      callDuration: "01:25:30",
      avgProcessingTime: "00:05:30",
      totalProcessingTime: "02:30:00",
      timeOutsideCalls: "01:00:00",
    },
    {
      operator: "Иван Иванов",
      processedLeads: "12 (8)",
      accepted: {
        count: 8,
        approve1: 6,
        approve2: 4,
        avgCheck: "1400",
      },
      purchased: {
        count: 5,
        percentage: "62.5%",
        avgCheck: "1100",
      },
      canceled: {
        count: 3,
        percentage: "37.5%",
      },
      callsMade: "25 (20)",
      callDuration: "00:50:45",
      avgProcessingTime: "00:06:15",
      totalProcessingTime: "02:10:30",
      timeOutsideCalls: "00:45:30",
    },
    {
      operator: "Мария Смирнова",
      processedLeads: "10 (7)",
      accepted: {
        count: 6,
        approve1: 4,
        approve2: 3,
        avgCheck: "1350",
      },
      purchased: {
        count: 4,
        percentage: "66.7%",
        avgCheck: "1250",
      },
      canceled: {
        count: 2,
        percentage: "33.3%",
      },
      callsMade: "20 (18)",
      callDuration: "00:45:20",
      avgProcessingTime: "00:07:00",
      totalProcessingTime: "01:55:00",
      timeOutsideCalls: "00:35:20",
    },
    {
      operator: "Сергей Тарасов",
      processedLeads: "20 (15)",
      accepted: {
        count: 14,
        approve1: 12,
        approve2: 10,
        avgCheck: "1700",
      },
      purchased: {
        count: 12,
        percentage: "85.7%",
        avgCheck: "1600",
      },
      canceled: {
        count: 2,
        percentage: "14.3%",
      },
      callsMade: "40 (35)",
      callDuration: "01:45:30",
      avgProcessingTime: "00:04:30",
      totalProcessingTime: "03:30:00",
      timeOutsideCalls: "01:15:00",
    },
    {
      operator: "Анна Петрова",
      processedLeads: "8 (5)",
      accepted: {
        count: 5,
        approve1: 4,
        approve2: 3,
        avgCheck: "1250",
      },
      purchased: {
        count: 3,
        percentage: "60%",
        avgCheck: "1100",
      },
      canceled: {
        count: 2,
        percentage: "40%",
      },
      callsMade: "18 (15)",
      callDuration: "00:35:20",
      avgProcessingTime: "00:06:50",
      totalProcessingTime: "01:40:00",
      timeOutsideCalls: "00:30:20",
    },
    {
      operator: "Михаил Воронков",
      processedLeads: "18 (14)",
      accepted: {
        count: 12,
        approve1: 10,
        approve2: 8,
        avgCheck: "1550",
      },
      purchased: {
        count: 9,
        percentage: "75%",
        avgCheck: "1400",
      },
      canceled: {
        count: 3,
        percentage: "25%",
      },
      callsMade: "35 (30)",
      callDuration: "01:15:10",
      avgProcessingTime: "00:05:15",
      totalProcessingTime: "03:00:30",
      timeOutsideCalls: "01:00:20",
    },
    {
      operator: "Ольга Соколова",
      processedLeads: "14 (10)",
      accepted: {
        count: 10,
        approve1: 8,
        approve2: 6,
        avgCheck: "1450",
      },
      purchased: {
        count: 6,
        percentage: "60%",
        avgCheck: "1350",
      },
      canceled: {
        count: 4,
        percentage: "40%",
      },
      callsMade: "28 (24)",
      callDuration: "00:55:15",
      avgProcessingTime: "00:06:00",
      totalProcessingTime: "02:10:45",
      timeOutsideCalls: "00:40:30",
    },
    {
      operator: "Павел Кузнецов",
      processedLeads: "16 (12)",
      accepted: {
        count: 11,
        approve1: 9,
        approve2: 7,
        avgCheck: "1600",
      },
      purchased: {
        count: 8,
        percentage: "72.7%",
        avgCheck: "1500",
      },
      canceled: {
        count: 3,
        percentage: "27.3%",
      },
      callsMade: "32 (28)",
      callDuration: "01:10:45",
      avgProcessingTime: "00:05:45",
      totalProcessingTime: "02:50:15",
      timeOutsideCalls: "01:05:30",
    },
    {
      operator: "Екатерина Иванова",
      processedLeads: "9 (6)",
      accepted: {
        count: 6,
        approve1: 5,
        approve2: 4,
        avgCheck: "1300",
      },
      purchased: {
        count: 4,
        percentage: "66.7%",
        avgCheck: "1200",
      },
      canceled: {
        count: 2,
        percentage: "33.3%",
      },
      callsMade: "22 (19)",
      callDuration: "00:50:00",
      avgProcessingTime: "00:06:30",
      totalProcessingTime: "02:05:00",
      timeOutsideCalls: "00:40:00",
    },
    {
      operator: "Дмитрий Сидоров",
      processedLeads: "11 (8)",
      accepted: {
        count: 8,
        approve1: 6,
        approve2: 5,
        avgCheck: "1400",
      },
      purchased: {
        count: 6,
        percentage: "75%",
        avgCheck: "1300",
      },
      canceled: {
        count: 2,
        percentage: "25%",
      },
      callsMade: "24 (21)",
      callDuration: "00:55:10",
      avgProcessingTime: "00:05:50",
      totalProcessingTime: "02:20:10",
      timeOutsideCalls: "00:50:20",
    },
  
    {
      operator: "Итого",
      processedLeads: "151 (115)", // Sum of processedLeads
      accepted: {
        count: 90, // Sum of accepted.count
        approve1: 72, // Sum of accepted.approve1
        approve2: 57, // Sum of accepted.approve2
        avgCheck: "1472", // Weighted average of avgCheck for accepted
      },
      purchased: {
        count: 64, // Sum of purchased.count
        percentage: "69.6%", // Overall percentage
        avgCheck: "1357", // Weighted average of avgCheck for purchased
      },
      canceled: {
        count: 29, // Sum of canceled.count
        percentage: "30.4%", // Overall percentage
      },
      callsMade: "284 (235)", // Sum of callsMade
      callDuration: "09:48:05", // Total time of callDuration
      avgProcessingTime: "00:05:38", // Weighted average of avgProcessingTime
      totalProcessingTime: "24:12:10", // Total time of totalProcessingTime
      timeOutsideCalls: "09:23:50", // Total time of timeOutsideCalls
    },
  ];
  
  // State
  const startDate = ref("");
  const endDate = ref("");
  const selectedPeriod = ref(null);
  const selectedGroup = ref(null);
  const operatorSearch = ref("");
  
  // Period Options
  const periods = [
    { label: "За сегодня", value: "today" },
    { label: "За вчера", value: "yesterday" },
    { label: "За эту неделю", value: "this_week" },
    { label: "За прошлую неделю", value: "last_week" },
    { label: "За 7 дней", value: "last_7_days" },
    { label: "За этот месяц", value: "this_month" },
    { label: "За прошлый месяц", value: "last_month" },
  ];
  
  // Group Options
  const groupOptions = [
    { label: "Группировать по оператору", value: "operator" },
    { label: "Группировать по статусу", value: "status" },
    { label: "Группировать по дате", value: "date" },
  ];
  </script>
  
  <style scoped>
  /* Styling for buttons */
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    font-weight: 600;
    color: white;
    transition: background-color 0.2s;
  }
  </style>
  