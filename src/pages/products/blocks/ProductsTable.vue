<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
    default: [],
  },
  handleEditProduct: {
    type: Function,
    required: true,
  },
  handleDeleteProduct: {
    type: Function,
    required: true,
  },
  handleSaveProduct: {
    type: Function,
    required: true,
  },
});

const css = {
  icon: `
    text-white p-2 rounded-full shadow-md 
    flex items-center justify-center 
    transition-colors duration-300 ease-in-out
  `,
}
</script>

<template>
  <div class="bg-white mt-4 p-4 rounded shadow">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="text-left p-2 border">#</th>
          <th class="text-left p-2 border">Названия</th>
          <th class="text-left p-2 border">Цена</th>
          <th class="text-left p-2 border">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-100"
        >
          <td class="p-2 border w-12">{{ product.id }}</td> 

          <td class="p-2 border">
            <p v-if="!product.is_editable">{{ product.name ?? '-' }}</p>
            <Input
              v-else
              :id="'product' + product.id"
              type="text"
              v-model="product.name"
              placeholder="Название..."
              class="text-xs p-1"
            />
          </td>

          <td class="p-2 border">
            <p v-if="!product.is_editable">{{ product.price ?? '-' }}</p>
            <Input
              v-else
              :id="'product' + product.id"
              type="text"
              v-model="product.price"
              placeholder="Цена..."
              class="text-xs p-1"
            />
          </td>

          <td class="p-2 border w-10">
            <div class="flex justify-end gap-2 items-center">
              <button
                v-if="!product.is_editable"
                @click="handleEditProduct(product.id)"
                :class="[css.icon, 'bg-yellow-500 hover:bg-yellow-600']"
                title="Edit Product"
              >
                <Icon icon="fa-solid fa-pen" class="text-lg" />
              </button>

              <button
                v-else
                @click="handleSaveProduct(product.id)"
                :class="[css.icon, 'bg-green-500 hover:bg-green-600']"
                title="Save"
              >
                <Icon icon="fa-solid fa-save" class="text-lg" />
              </button>

              <button
                @click="handleDeleteProduct(product.id)"
                :class="[css.icon, 'bg-red-500 hover:bg-red-600']"
                title="Delete Product"
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