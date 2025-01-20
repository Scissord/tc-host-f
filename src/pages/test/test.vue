<script setup>
import { ref } from "vue";
import HeaderOrder from "./blocks/HeaderOrder.vue";
import CustomerDetails from "./blocks/CustomerDetails.vue";
import OrderDetails from "./blocks/OrderDetails.vue";
import HistoryProduct from "./blocks/HistoryProduct.vue";

const orderData = {
  id: "12345",
  phone: "+7 707 475 847",
  createdAt: "16.01.2025, 00:33:30",
  updatedAt: "16.01.2025, 09:24:24",
  status: "Спам/Ошибки",
};
// State to track the active section
const activeSection = ref("Overview");

// Function to handle section change
const changeSection = (section) => {
  activeSection.value = section;
};
</script>

<template>
  <div
    class="p-6 bg-gray-50 min-h-screen transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <HeaderOrder @changeSection="changeSection" />

    <div
      v-if="activeSection === 'Overview'"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <!-- Left Side: Order and Shipping Details -->
      <div class="lg:col-span-2">
        <div class="bg-gray-50">
          <OrderDetails :order="orderData" />
        </div>
        <!-- HistoryProduct -->
      </div>
      <!-- Right Side: Customer Details -->
      <CustomerDetails />
    </div>
  </div>
  <div v-if="activeSection === 'Security'" class="mt-4">
    <HistoryProduct />
  </div>
</template>
