<script setup>
const activities = [
  {
    title: "Order Placed",
    description: "Your order has been placed successfully",
    date: "2025-01-16, 09:00 AM",
    icon: "fa-check-circle",
    status: "completed",
  },
  {
    title: "Pick-up Scheduled",
    description: "Pick-up scheduled with courier",
    date: "2025-01-17, 11:00 AM",
    icon: "fa-calendar-alt",
    status: "in-progress",
  },
  {
    title: "Dispatched",
    description: "Item has been picked up by courier",
    date: "2025-01-18, 02:00 PM",
    icon: "fa-truck",
    status: "pending",
  },
];

// Get color class based on activity status
const getIconColor = (status) => {
  switch (status) {
    case "completed":
      return "text-green-500";
    case "in-progress":
      return "text-blue-500";
    case "pending":
      return "text-gray-400";
    default:
      return "";
  }
};
</script>

<style scoped>
/* Optional: Customize hover effect */
.bg-white:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>

<template>
  <div class="w-full bg-white p-6 rounded-lg shadow-md mt-4">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Shipping Activity</h2>
    <div class="relative">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="flex items-start mb-6"
      >
        <!-- Timeline line -->
        <div class="relative">
          <div
            class="w-2 h-2 rounded-full"
            :class="{
              'bg-green-500': activity.status === 'completed',
              'bg-blue-500': activity.status === 'in-progress',
              'bg-gray-400': activity.status === 'pending',
            }"
          ></div>
          <div
            v-if="index < activities.length - 1"
            class="absolute left-1/2 top-2 w-0.5 bg-gray-300 h-6"
          ></div>
        </div>
        <!-- Activity details -->
        <div class="ml-4">
          <div class="flex items-center gap-2">
            <i
              :class="[
                'fas',
                activity.icon,
                'text-lg',
                getIconColor(activity.status),
              ]"
            ></i>
            <h3 class="font-semibold text-gray-800">{{ activity.title }}</h3>
          </div>
          <p class="text-sm text-gray-600">{{ activity.description }}</p>
          <span class="text-xs text-gray-400">{{ activity.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
