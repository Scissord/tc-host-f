<script setup>
import { ref } from "vue";

// Tabs data
const tabs = ref([
  { label: "Overview", icon: "fa fa-home", active: true },
  { label: "Security", icon: "fa fa-lock", active: false },
  { label: "Address & Billing", icon: "fa fa-credit-card", active: false },
  { label: "Notifications", icon: "fa fa-bell", active: false },
]);

// Tab click handler
const onTabClick = (selectedTab) => {
  tabs.value.forEach((tab) => (tab.active = false));
  selectedTab.active = true;
  console.log(`Switched to tab: ${selectedTab.label}`);
};

// Save button placeholder
const onSave = () => {
  console.log("Save clicked!");
};
</script>

<style scoped>
/* Add subtle hover and transition effects */
nav button {
  transition: all 0.3s ease-in-out;
}
</style>

<template>
  <header class="bg-white p-4 shadow-md">
    <!-- Page Title -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-lg font-semibold text-gray-800">Order #32543</h1>
        <div class="flex gap-2">
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
      <button
        class="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:bg-red-700 transition"
      >
        Сохранить
      </button>
    </div>

    <!-- Navigation Buttons -->
    <nav class="flex gap-4 border-b border-gray-300 pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.label"
        @click="onTabClick(tab)"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition',
          tab.active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        <i :class="tab.icon" class="mr-2"></i> {{ tab.label }}
      </button>
    </nav>
  </header>
</template>
