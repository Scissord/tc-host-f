<script setup>

defineProps({
  operators: {
    type: Array,
    required: true,
    default: [],
  },
  handleDeleteOperator: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white mt-4 p-4 rounded shadow">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th :class="tablename">ID</th>
          <th :class="tablename">Название</th>
          <th :class="tablename">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="operator in operators" :key="operator.id" class="hover:bg-gray-100">
          <td class="p-2 border w-12">
            <p
              class="text-blue-900 font-semibold"
            >
              {{ operator.id ?? "-" }}
            </p>
          </td>
          <!-- Name Column -->
          <td class="p-2 border">
            <p v-if="!operator.is_editable">{{ operator.name ?? "-" }}</p>
            <Input
              v-else
              :id="'operator' + operator.id"
              type="text"
              v-model="operator.name"
              placeholder="Название..."
              class="text-xs p-1 border rounded-md"
            />
          </td>
          <!-- Actions Column -->
          <td class="p-2 border w-12">
            <div class="flex justify-start gap-2 items-center">
              <button
                @click="handleDeleteOperator(operator.id)"
                class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Delete Operator"
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