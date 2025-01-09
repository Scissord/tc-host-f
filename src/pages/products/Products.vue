<script setup>
import { onMounted, ref, computed } from "vue";
import { useProducts } from "@hooks";
import Paginate from '../../components/ui/paginate/Paginate.vue';
import { initCustomFormatter } from "vue";

const {
  state,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleSaveProduct,
  handleGetData,
} = useProducts();

// Pagination logic
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return state.products.slice(start, end);
});

const totalPages = computed(() => Math.ceil(state.products.length / itemsPerPage));

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div class="flex-grow min-h-screen p-6 transition-all duration-300 ease-in-out"
  :class="isSidebarExpanded ? 'ml-[20vw]' : 'ml-[5vw]'">
    <!-- Header -->
    <div class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded">
      <h1 class="text-2xl font-semibold">
        <span class="font-bold">Продукты</span>
      </h1>
      <div class="flex gap-2">
        <button
          @click="handleAddProduct"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Добавить Продукт
        </button>
      </div>
    </div>

    <!-- Table -->
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
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            class="hover:bg-gray-100"
          >
            <td class="p-2 border w-12">{{ product.id }}</td> 

            <!-- Name Column -->
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

            <!-- Price Column -->
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

            <!-- Actions Column -->
            <td class="p-2 border w-10">
              <div class="flex justify-end gap-2 items-center">
                <!-- Edit Button -->
                <button
                  v-if="!product.is_editable"
                  @click="handleEditProduct(product.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                  title="Edit Product"
                >
                  <Icon icon="fa-solid fa-pen" class="text-lg" />
                </button>

                <!-- Save Button -->
                <button
                  v-else
                  @click="handleSaveProduct(product.id)"
                  class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                  title="Save"
                >
                  <Icon icon="fa-solid fa-save" class="text-lg" />
                </button>

                <!-- Delete Button -->
                <button
                  @click="handleDeleteProduct(product.id)"
                  class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
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
  </div>
</template>
