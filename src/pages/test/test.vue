<script setup>
import HeaderOrder from "./blocks/HeaderOrder.vue";
import CustomerDetails from "./blocks/CustomerDetails.vue";
import OrderDetails from "./blocks/OrderDetails.vue";
import ProductInformation from "./blocks/ProductInformation.vue";

const orderData = {
  id: "12345",
  phone: "+7 707 475 847",
  createdAt: "16.01.2025, 00:33:30",
  updatedAt: "16.01.2025, 09:24:24",
  status: "Спам/Ошибки",
};


</script>

<template>
  <div
    class="p-6 bg-gray-50 min-h-screen transition-all duration-300 ease-in-out ml-[5vw]"
  >
    <HeaderOrder />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
      <!-- Left Side: Order and Shipping Details -->
      <div class="lg:col-span-2 space-y-6">
        <div class="p-6 bg-gray-50">
          <OrderDetails :order="orderData" />
        </div>
        <ProductInformation />
      </div>
      <!-- Right Side: Customer Details -->
      <CustomerDetails />
    </div>
  </div>
</template>
