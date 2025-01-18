<script setup>
import Column from "./blocks/column.vue";
import DataTable from "./blocks/DataTable.vue";
import OrdersFilters from "../orders/user/blocks/OrdersFilters.vue";
import TagBlock from "./blocks/TagBlock.vue";
import ExtendedSearch from "./blocks/ExtendedSearch.vue";
</script>

<script>
export default {
  data() {
    return {
      blocks: [
        {
          id: 0,
          title: "В обработке",
          value: 77,
          icon: "fa-solid fa-circle",
        },
        {
          id: 1,
          title: "Принятые",
          value: 1234,
          icon: "fa-solid fa-check-circle",
        },
        {
          id: 2,
          title: "Отмененные",
          value: 277,
          icon: "fa-brands fa-instagram",
        },
        {
          id: 3,
          title: "Выкуплено",
          value: 427,
          icon: "fa-brands fa-tiktok",
        },
      ],
      tableData: [
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
      ],
    };
  },
};
</script>

<template>
  <div
    class="p-6 bg-gray-50 flex flex-col items-center transition-all duration-300 ease-in-out ml-[15vw]"
  >
    <!-- Header Section -->
    <div class="w-full max-w-4xl border-b-2 pb-4 mb-4">
      <h1 class="text-2xl font-bold text-gray-700">Dashboard Overview</h1>
    </div>

    <!-- Blocks Section -->
    <!-- <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl"
    >
      <div
        v-for="block in blocks"
        :key="block.id"
        class="bg-white shadow-lg rounded-md p-4"
      >
        <Column :icon="block.icon" :title="block.title" :value="block.value" />
      </div>
    </div> -->
  </div>
  <div
    class="min-h-screen p-6 bg-gray-50 flex flex-col items-center transition-all duration-300 ease-in-out ml-[15vw]"
  >
    <div class=" bg-gray-50">
      <TagBlock />
    </div>
    <!-- Data Table -->
    <DataTable :data="tableData" />
  </div>
</template>
