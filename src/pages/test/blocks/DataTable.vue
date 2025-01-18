<script setup>
import { ref, computed } from "vue";

const fields = ref([
  [
    { label: "ID", value: "..." },
    { label: "Оператор", value: "..." },
    { label: "Товары", value: "..." },
    { label: "Вебмастер", value: "..." },
    { label: "Домен", value: "..." },
  ],
  [
    { label: "Дата", value: "..." },
    { label: "Последнее изменение", value: "..." },
    { label: "Дата апрува", value: "..." },
    { label: "Дата отправки", value: "..." },
    { label: "Дата отмены", value: "..." },
  ],
  [
    { label: "Дата выкупа", value: "..." },
    { label: "Дата доставки", value: "..." },
    { label: "Комментарий", value: "..." },
    { label: "Цена", value: "..." },
    { label: "Итого", value: "..." },
  ],
  [
    { label: "Время перезвона", value: "..." },
    { label: "Количество", value: "..." },
    { label: "ФИО", value: "..." },
    { label: "Телефон", value: "..." },
    { label: "Регион", value: "..." },
  ],
  [
    { label: "Город", value: "..." },
    { label: "Адрес", value: "..." },
    { label: "Почтовый индекс", value: "..." },
    { label: "Возраст", value: "..." },
    { label: "utm_term", value: "..." },
  ],
]);

// Sample Data
const tableData = ref([
  {
    id: "138947932789",
    operator: "Operator A",
    products: "Product X",
    webmaster: "Webmaster Y",
    domain: "example.com",
    date: "2025-01-01",
    lastChange: "2025-01-10",
    approveDate: "2025-01-05",
    sendDate: "2025-01-06",
    cancelDate: "2025-01-07",
    buyoutDate: "2025-01-08",
    deliveryDate: "2025-01-09",
    comment: "No issues",
    price: "$100",
    total: "$120",
    callTime: "12:30 PM",
    quantity: 2,
    fullName: "John Doe",
    phone: "+1-234-567-890",
    region: "California",
    city: "Los Angeles",
    address: "123 Elm Street",
    zipCode: "90001",
    age: 32,
    utmTerm: "Campaign123",
    status: "Delivered",
    gender: "Male",
    paymentMethod: "Credit Card",
    deliveryMethod: "Courier",
    cancelReason: "N/A",
    timeSpent: "15 mins",
    externalWebmaster: "Webmaster Z",
    trackCode: "TRK123456",
    returnDate: "2025-01-15",
    pixel: "Pixel123",
    returnReason: "Damaged item",
    language: "English",
    hold: "5 days",
    designerId: "D001",
  },
  {
    id: "2",
    operator: "Operator B",
    products: "Product Y",
    webmaster: "Webmaster X",
    domain: "example.org",
    date: "2025-02-01",
    lastChange: "2025-02-05",
    approveDate: "2025-02-03",
    sendDate: "2025-02-04",
    cancelDate: "2025-02-06",
    buyoutDate: "2025-02-08",
    deliveryDate: "2025-02-09",
    comment: "Delayed delivery",
    price: "$200",
    total: "$240",
    callTime: "11:00 AM",
    quantity: 1,
    fullName: "Jane Smith",
    phone: "+1-345-678-901",
    region: "Texas",
    city: "Austin",
    address: "456 Oak Street",
    zipCode: "73301",
    age: 28,
    utmTerm: "AdCampaign456",
    status: "Returned",
    gender: "Female",
    paymentMethod: "PayPal",
    deliveryMethod: "Postal Service",
    cancelReason: "Customer request",
    timeSpent: "10 mins",
    externalWebmaster: "Webmaster W",
    trackCode: "TRK789012",
    returnDate: "2025-02-15",
    pixel: "Pixel789",
    returnReason: "Wrong item",
    language: "Spanish",
    hold: "7 days",
    designerId: "D002",
  },
  {
    id: "3",
    operator: "Operator C",
    products: "Product Z",
    webmaster: "Webmaster Y",
    domain: "example.net",
    date: "2025-03-01",
    lastChange: "2025-03-08",
    approveDate: "2025-03-05",
    sendDate: "2025-03-06",
    cancelDate: "2025-03-10",
    buyoutDate: "2025-03-12",
    deliveryDate: "2025-03-14",
    comment: "Package damaged",
    price: "$150",
    total: "$180",
    callTime: "03:45 PM",
    quantity: 3,
    fullName: "Mike Johnson",
    phone: "+1-456-789-012",
    region: "New York",
    city: "New York City",
    address: "789 Pine Avenue",
    zipCode: "10001",
    age: 45,
    utmTerm: "Promo789",
    status: "In Transit",
    gender: "Male",
    paymentMethod: "Bank Transfer",
    deliveryMethod: "Courier",
    cancelReason: "N/A",
    timeSpent: "20 mins",
    externalWebmaster: "Webmaster V",
    trackCode: "TRK345678",
    returnDate: "N/A",
    pixel: "Pixel345",
    returnReason: "N/A",
    language: "French",
    hold: "N/A",
    designerId: "D003",
  },
]);

// Mock data for filters
const filterOptions = ref([
  { label: "Обработка (23)", options: ["Обработка", "Обработка (новые)"] },
  { label: "Недозвон (рус.яз)", options: ["Недозвон (рус.яз)"] },
  { label: "Подтвержден КД (438)", options: ["Подтвержден КД"] },
]);

// State to manage the visibility of the dropdown
const showFilters = ref(false);

// Method to toggle dropdown visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};
// State to manage the visibility of the extended search block
const showExtendedSearch = ref(false);
// Pagination State
const rowsPerPage = ref(10);
const currentPage = ref(1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return tableData.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / rowsPerPage.value)
);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
// State for selected rows
const selectedRows = ref([]);

// Method to toggle row selection
const toggleRowSelection = (id) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
};

// Method to check if a row is selected
const isRowSelected = (id) => selectedRows.value.includes(id);
</script>

<template>
  <div class="flex justify-center items-center bg-gray-100 ml-[15vw]">
    <div class="bg-white shadow-lg rounded-lg p-6 w-[110rem]">
      <!-- Search and Controls -->
      <!-- <div class="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Order"
          class="px-4 py-2 w-1/3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <div class="flex items-center gap-4">
          <select
            v-model="rowsPerPage"
            class="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Export
          </button>
        </div>
      </div> -->
      <div class="p-6 bg-gray-50 shadow-lg rounded-lg">
        <!-- Search Header -->
        <div class="flex justify-between items-center mb-4">
          <!-- Toggle Button -->
          <button
            @click="showExtendedSearch = !showExtendedSearch"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          >
            <i class="fas fa-search text-gray-500"></i>
            <span class="text-gray-600">Расширенный поиск</span>
          </button>
        </div>

        <!-- Extended Search Block -->
        <div
          v-if="showExtendedSearch"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 bg-white border border-gray-200 shadow-md rounded-lg transition-all duration-300"
        >
          <div
            v-for="(group, groupIndex) in fields"
            :key="groupIndex"
            class="bg-gray-50 p-4 shadow rounded-md border border-gray-200"
          >
            <div
              v-for="(field, index) in group"
              :key="index"
              class="mb-2 last:mb-0"
            >
              <label class="block font-medium text-sm text-gray-600">
                {{ field.label }}
              </label>
              <div class="px-2 py-1 bg-gray-100 rounded text-sm text-gray-500">
                {{ field.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="overflow-auto">
        <table class="w-full table-auto text-xs font-medium">
          <thead
            class="bg-gray-100 text-gray-600 uppercase text-sm font-semibold"
          >
            <tr>
              <th class="p-4">
                <input type="checkbox" class="form-checkbox" />
              </th>
              <th class="p-4 border-gray-300">ID</th>
              <th class="p-4 border-gray-300">Оператор</th>
              <th class="p-4 border-gray-300">Товары</th>
              <th class="p-4 border-gray-300">Вебмастер</th>
              <th class="p-4 border-gray-300">Домен</th>
              <th class="p-4 border-gray-300">Дата</th>
              <th class="p-4 border-gray-300">Последнее изменение</th>
              <th class="p-4 border-gray-300">Дата апрува</th>
              <th class="p-4 border-gray-300">Дата отправки</th>
              <th class="p-4 border-gray-300">Дата отмены</th>
              <th class="p-4 border-gray-300">Дата выкупа</th>
              <th class="p-4 border-gray-300">Дата доставки</th>
              <th class="p-4 border-gray-300">Комментарий</th>
              <th class="p-4 border-gray-300">Цена</th>
              <th class="p-4 border-gray-300">Итого</th>
              <th class="p-4 border-gray-300">Время перезвона</th>
              <th class="p-4 border-gray-300">Количество</th>
              <th class="p-4 border-gray-300">ФИО</th>
              <th class="p-4 border-gray-300">Телефон</th>
              <th class="p-4 border-gray-300">Регион</th>
              <th class="p-4 border-gray-300">Город</th>
              <th class="p-4 border-gray-300">Адрес</th>
              <th class="p-4 border-gray-300">Почтовый индекс</th>
              <th class="p-4 border-gray-300">Возраст</th>
              <th class="p-4 border-gray-300">utm_term</th>
              <th class="p-4 border-gray-300">Статус</th>
              <th class="p-4 border-gray-300">Пол</th>
              <th class="p-4 border-gray-300">Способ оплаты</th>
              <th class="p-4 border-gray-300">Способ доставки</th>
              <th class="p-4 border-gray-300">Причина отмены</th>
              <th class="p-4 border-gray-300">Затраченное время</th>
              <th class="p-4 border-gray-300">Внешний вебмастер</th>
              <th class="p-4 border-gray-300">Трек код</th>
              <th class="p-4 border-gray-300">Дата возврата</th>
              <th class="p-4 border-gray-300">Pixel</th>
              <th class="p-4 border-gray-300">Причина возврата</th>
              <th class="p-4 border-gray-300">Язык</th>
              <th class="p-4 border-gray-300">HOLD</th>
              <th class="p-4 border-gray-300">ID дизайнера</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedData"
              :key="row.id"
              class="border-b hover:bg-gray-50 transition-colors"
            >
              <td class="p-4">
                <input
                  type="checkbox"
                  class="form-checkbox"
                  :checked="selectedRows.includes(row.id)"
                  @change="toggleRowSelection(row.id)"
                />
              </td>
              <td class="p-4 border-gray-300">{{ row.id }}</td>
              <td class="p-4 border-gray-300">{{ row.operator }}</td>
              <td class="p-4 border-gray-300">{{ row.products }}</td>
              <td class="p-4 border-gray-300">{{ row.webmaster }}</td>
              <td class="p-4 border-gray-300">{{ row.domain }}</td>
              <td class="p-4 border-gray-300">{{ row.date }}</td>
              <td class="p-4 border-gray-300">{{ row.lastChange }}</td>
              <td class="p-4 border-gray-300">{{ row.approveDate }}</td>
              <td class="p-4 border-gray-300">{{ row.sendDate }}</td>
              <td class="p-4 border-gray-300">{{ row.cancelDate }}</td>
              <td class="p-4 border-gray-300">{{ row.buyoutDate }}</td>
              <td class="p-4 border-gray-300">{{ row.deliveryDate }}</td>
              <td class="p-4 border-gray-300">{{ row.comment }}</td>
              <td class="p-4 border-gray-300">{{ row.price }}</td>
              <td class="p-4 border-gray-300">{{ row.total }}</td>
              <td class="p-4 border-gray-300">{{ row.callTime }}</td>
              <td class="p-4 border-gray-300">{{ row.quantity }}</td>
              <td class="p-4 border-gray-300">{{ row.fullName }}</td>
              <td class="p-4 border-gray-300">{{ row.phone }}</td>
              <td class="p-4 border-gray-300">{{ row.region }}</td>
              <td class="p-4 border-gray-300">{{ row.city }}</td>
              <td class="p-4 border-gray-300">{{ row.address }}</td>
              <td class="p-4 border-gray-300">{{ row.zipCode }}</td>
              <td class="p-4 border-gray-300">{{ row.age }}</td>
              <td class="p-4 border-gray-300">{{ row.utmTerm }}</td>
              <td class="p-4 border-gray-300">{{ row.status }}</td>
              <td class="p-4 border-gray-300">{{ row.gender }}</td>
              <td class="p-4 border-gray-300">{{ row.paymentMethod }}</td>
              <td class="p-4 border-gray-300">{{ row.deliveryMethod }}</td>
              <td class="p-4 border-gray-300">{{ row.cancelReason }}</td>
              <td class="p-4 border-gray-300">{{ row.timeSpent }}</td>
              <td class="p-4 border-gray-300">{{ row.externalWebmaster }}</td>
              <td class="p-4 border-gray-300">{{ row.trackCode }}</td>
              <td class="p-4 border-gray-300">{{ row.returnDate }}</td>
              <td class="p-4 border-gray-300">{{ row.pixel }}</td>
              <td class="p-4 border-gray-300">{{ row.returnReason }}</td>
              <td class="p-4 border-gray-300">{{ row.language }}</td>
              <td class="p-4 border-gray-300">{{ row.hold }}</td>
              <td class="p-4 border-gray-300">{{ row.designerId }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div class="flex justify-end items-center mt-4 relative">
          <!-- Filters Button -->
          <button
            @click="toggleFilters"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100"
          >
            Обработка (23)
          </button>

          <!-- Filters Dropdown -->
          <div
            v-if="showFilters"
            class="absolute top-[-220px] right-0 bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-64 transition-all duration-300"
          >
            <ul>
              <li
                v-for="(filter, index) in filterOptions"
                :key="index"
                class="mb-2"
              >
                <span class="font-medium text-gray-700">{{
                  filter.label
                }}</span>
                <ul class="ml-4 text-sm text-gray-500">
                  <li
                    v-for="(option, optIndex) in filter.options"
                    :key="optIndex"
                  >
                    {{ option }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button
            class="px-9 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Export
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 border rounded-md"
            :class="
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            "
          >
            {{ page }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
