<script setup>
import { ref, computed, defineEmits } from "vue";

// Mock data
const items = ref([
  "Обработка (23)",
  "Обработка (новые)",
  "Обработка (выделенный)",
  "Обработка (WhatsApp)",
  "Перезвон (124)",
  "Недозвон (5007)",
]);

// States
const isDropdownOpen = ref(false);
const searchQuery = ref("");

// Computed: Filtered items based on search query
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectItem = (item) => {
  console.log("Selected Item:", item);
  isDropdownOpen.value = false; // Close dropdown
};

// Emit event for section change
const emit = defineEmits(["changeSection"]);

// Set initial active section
const activeSection = ref("Overview");

// Function to handle tab click
const handleTabClick = (section) => {
  emit("changeSection", section);
  activeSection.value = tab; // Update the active section
  console.log(`Active Section: ${activeSection.value}`);
};
</script>

<style scoped>
nav button {
  transition: all 0.3s ease-in-out;
}
</style>

<template>
  <header class="p-4">
    <div class="flex items-center justify-between">
      <!-- Left: Order Info -->
      <div>
        <h1 class="text-lg font-semibold text-gray-800">Order #32543</h1>
        <div class="flex gap-2 mt-1">
          <span
            class="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full"
            >Paid</span
          >
          <span
            class="text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full"
            >Ready to Pickup</span
          >
        </div>
      </div>

      <!-- Navigation Buttons -->
      <nav class="flex gap-4">
        <button
          v-for="tab in ['Overview', 'Security']"
          :key="tab"
          @click="handleTabClick(tab)"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            activeSection === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ tab }}
        </button>
      </nav>
      <div class="grid grid-flow-col gap-4 items-center">
        <!-- Dropdown Menu -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-300 rounded-lg shadow hover:bg-blue-200 hover:text-blue-700 transition flex items-center justify-between"
          >
            Обработка
            <!-- Arrow Icon -->
            <Icon
              class="ml-2 text-blue-600"
              :icon="['fas', 'chevron-down']"
            ></Icon>
          </button>

          <!-- Dropdown Content -->
          <div
            v-if="isDropdownOpen"
            class="absolute mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-64 max-h-64 overflow-y-auto z-10"
          >
            <!-- Search Input -->
            <div class="p-2">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <!-- Filtered List -->
            <ul>
              <li
                v-for="(item, index) in filteredItems"
                :key="index"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="selectItem(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Save Button -->
        <button
          class="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:bg-green-700 transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  </header>
  <!-- Main Content Area -->
</template>
