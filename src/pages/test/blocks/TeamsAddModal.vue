<script setup>
import { ref } from "vue";
import { MultiSelect } from "primevue"; // PrimeVue Components

// Props for modal visibility
defineProps({
  isVisible: Boolean,
});

// Emit event to close modal
const emit = defineEmits(["close", "teamAdded"]);

// Form data
const teamName = ref("");
const selectedUsers = ref([]);
const selectedStatuses = ref([]);

// Mock dropdown data
const users = ref([
  { name: "Иван Иванов", id: 1 },
  { name: "Анна Петрова", id: 2 },
  { name: "Сергей Смирнов", id: 3 },
  { name: "Наталья Ивлева", id: 4 },
  { name: "Максим Тарасов", id: 5 },
]);

const statuses = ref([
  { name: "Активный", id: "active" },
  { name: "Заблокированный", id: "blocked" },
  { name: "Ожидание", id: "pending" },
]);

// Methods
const closeModal = () => {
  emit("close");
};

const addTeam = () => {
  // Emitting the data of the new team
  emit("teamAdded", {
    teamName: teamName.value,
    users: selectedUsers.value,
    statuses: selectedStatuses.value,
  });

  // Clearing the form and closing the modal
  teamName.value = "";
  selectedUsers.value = [];
  selectedStatuses.value = [];
  emit("close");
};

const removeUser = (index) => {
  selectedUsers.value.splice(index, 1);
};

const removeStatus = (index) => {
  selectedStatuses.value.splice(index, 1);
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-96 max-w-full p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">
          Добавить новую команду
        </h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="addTeam">
        <!-- Team Name -->
        <div class="mb-4">
          <label for="teamName" class="block text-sm font-medium text-gray-700"
            >Название команды</label
          >
          <input
            v-model="teamName"
            id="teamName"
            type="text"
            placeholder="Введите название команды"
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        <!-- User Selection -->
        <div class="mb-4">
          <label for="users" class="block text-sm font-medium text-gray-700"
            >Пользователи</label
          >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(user, index) in selectedUsers"
              :key="index"
              class="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
            >
              {{ user.name }}
              <button
                @click.prevent="removeUser(index)"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          </div>
          <MultiSelect
            v-model="selectedUsers"
            :options="users"
            optionLabel="name"
            display="chip"
            placeholder="Выберите пользователей"
            panelClass="custom-multiselect-panel"
            class="w-full mt-2"
          />
        </div>

        <!-- Status Selection -->
        <div class="mb-4">
          <label for="statuses" class="block text-sm font-medium text-gray-700"
            >Статусы</label
          >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(status, index) in selectedStatuses"
              :key="index"
              class="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm cursor-pointer"
            >
              {{ status.name }}
              <button
                @click.prevent="removeStatus(index)"
                class="ml-2 text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          </div>
          <MultiSelect
            v-model="selectedStatuses"
            :options="statuses"
            optionLabel="name"
            display="chip"
            placeholder="Выберите статусы"
            class="w-full mt-2"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end mt-6">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 mr-2"
          >
            Отмена
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.custom-multiselect-panel {
  max-height: 300px;
  overflow-y: auto;
}

.custom-multiselect-panel .p-multiselect-item {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-multiselect-panel img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.flex-wrap > div {
  word-break: break-word;
}
</style>
