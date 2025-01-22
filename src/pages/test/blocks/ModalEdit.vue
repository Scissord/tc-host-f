<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-1/2 p-6 shadow-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">Edit Role</h2>
        <button
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>

      <!-- Role Name -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-600 mb-2">
          Role Name
        </label>
        <input
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter role name"
        />
      </div>

      <!-- Role Permissions -->
      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-4">
          Role Permissions
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <!-- Administrator Access -->
          <div
            class="col-span-2 flex items-center justify-between border-b pb-2 mb-4"
          >
            <span class="text-gray-600">Administrator Access</span>
            <div class="flex items-center gap-4">
              <span class="text-gray-400 text-sm">
                <i class="fa fa-info-circle"></i>
              </span>
              <input type="checkbox" />
            </div>
          </div>

          <!-- Permissions Table -->
          <div v-for="(permission, index) in permissions" :key="index">
            <p class="text-sm font-medium text-gray-700 mb-2">
              {{ permission.name }}
            </p>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" />
                <span class="text-gray-600">Read</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" />
                <span class="text-gray-600">Write</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" />
                <span class="text-gray-600">Create</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-6 gap-4">
        <button
          @click="closeModal"
          class="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props to toggle modal visibility
const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close"]);

// Permissions Data
const permissions = [
  { name: "User Management" },
  { name: "Content Management" },
  { name: "Disputes Management" },
  { name: "Database Management" },
  { name: "Financial Management" },
  { name: "Reporting" },
  { name: "API Control" },
  { name: "Repository Management" },
  { name: "Payroll" },
];

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Add optional styles */
</style>
