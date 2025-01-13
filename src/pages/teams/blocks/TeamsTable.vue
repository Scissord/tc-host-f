<script setup>
import { useRouter } from "vue-router";

defineProps({
  teams: {
    type: Array,
    required: true,
    default: [],
  },
  subStatuses: {
    type: Array,
    required: true,
    default: [],
  },
  handleEditTeam: {
    type: Function,
    required: true,
  },
  handleSaveTeam: {
    type: Function,
    required: true,
  },
  handleDeleteTeam: {
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
        <tr class="bg-gray-200">
          <th class='text-left p-2 border'>ID</th>
          <th class='text-left p-2 border'>Название</th>
          <th class='text-left p-2 border'>Статусы</th>
          <th class='text-left p-2 border'>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teams in teams" :key="teams.id" class="hover:bg-gray-100">
          <td class="p-2 border w-12">
            <p
              class="text-blue-900 font-semibold cursor-pointer hover:underline"
              @click="() => router.push(`/teams/${teams.id}`)"
            >
              {{ teams.id ?? "-" }}
            </p>
          </td>
          <!-- Name Column -->
          <td class="p-2 border">
            <p v-if="!teams.is_editable">{{ teams.title ?? "-" }}</p>
            <Input
              v-else
              :id="'teams' + teams.id"
              type="text"
              v-model="teams.title"
              placeholder="Название..."
              class="text-xs p-1 border rounded-md"
            />
          </td>
          <!-- Statuses Column -->
          <td class="p-2 border">
            <div
              v-if="!teams.is_editable"
              class="flex flex-wrap items-center gap-2"
            >
              <span
                v-for="sub_status in teams.sub_status_ids"
                :key="sub_status"
                class="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
              >
                {{ sub_status }}
              </span>
            </div>
            <Select
              v-else
              v-model="teams.sub_status_ids"
              :options="subStatuses"
              value="id"
              label="name"
              multiple
              class="border rounded-md p-2"
            />
          </td>
          <!-- Actions Column -->
          <td class="p-2 border w-12">
            <div class="flex justify-start gap-2 items-center">
              <!-- Edit Button -->
              <button
                v-if="!teams.is_editable"
                @click="handleEditTeam(teams.id)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Edit Teams"
              >
                <Icon icon="fa-solid fa-pen" class="text-lg" />
              </button>
              <!-- Save Button -->
              <button
                v-else
                @click="handleSaveTeam(teams.id)"
                class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Save"
              >
                <Icon icon="fa-solid fa-save" class="text-lg" />
              </button>
              <!-- Delete Button -->
              <button
                @click="handleDeleteTeam(teams.id)"
                class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Delete Teams"
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