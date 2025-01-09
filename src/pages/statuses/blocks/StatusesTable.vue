<script setup>
import { useRouter } from "vue-router";

defineProps({
  statuses: {
    type: Array,
    required: true,
    default: [],
  },
  handleEditStatus: {
    type: Function,
    required: true,
  },
  handleSaveStatus: {
    type: Function,
    required: true,
  },
  handleDeleteStatus: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
</script>

<template>
  <div class="bg-white mt-4 p-4 rounded shadow">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="text-left p-2 border w-12">ID</th>
          <th class="text-left p-2 border">Название</th>
          <th class="text-left p-2 border">Цвет</th>
          <th class="text-left p-2 border w-12">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="status in statuses"
          :key="status.id"
          class="hover:bg-gray-100 transition-colors duration-300"
        >
          <!-- ID Column -->
          <td class="p-2 border w-12">
            <p
              class="text-blue-500 font-semibold cursor-pointer hover:underline"
              @click="router.push(`/statuses/${status.id}`)"
            >
              {{ status.id ?? "-" }}
            </p>
          </td>

          <!-- Name Column -->
          <td class="p-2 border">
            <p v-if="!status.is_editable">{{ status.name ?? "-" }}</p>
            <Input
              v-else
              :id="'status' + status.id"
              type="text"
              v-model="status.name"
              placeholder="Введите название..."
              class="border rounded px-2 py-1 text-gray-700"
            />
          </td>

          <!-- Color Column -->
          <td class="p-2 border">
            <div class="flex items-center gap-2">
              <span
                :style="{ backgroundColor: status.color }"
                class="w-4 h-4 rounded-full border"
              >
              </span>
              <p>{{ status.color ?? "-" }}</p>
            </div>
          </td>
          <!-- Actions Column -->
          <td class="p-2 border w-12">
            <div class="flex justify-center gap-2">
              <button
                v-if="!status.is_editable"
                @click="handleEditStatus(status.id)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow flex items-center justify-center"
                title="Редактировать"
              >
                <Icon icon="fa-solid fa-pen" class="text-lg" />
              </button>
              <button
                v-else
                @click="handleSaveStatus(status.id)"
                class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow flex items-center justify-center"
                title="Сохранить"
              >
                <Icon icon="fa-solid fa-save" class="text-lg" />
              </button>
              <button
                @click="handleDeleteStatus(status.id)"
                class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow flex items-center justify-center"
                title="Удалить"
              >
                <Icon icon="fa-solid fa-trash" class="text-lg" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
