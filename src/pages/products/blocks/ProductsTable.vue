  <script setup>
  defineProps({
    products: {
      type: Array,
      required: true,
      default: []
    },
    handleEditProduct: {
      type: Function,
      required: true
    },
    handleSaveProduct: {
      type: Function,
      required: true
    },
    handleDeleteProduct: {
      type: Function,
      required: true
    },
  });

  const css = {
    th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
    td: 'border border-slate-200 p-1 whitespace-nowrap',
    icon: 'hover:text-gray-300 cursor-pointer',
  };
  </script>

  <template>
    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-slate-200">
        <thead>
          <tr>
            <th 
              :class='css.th'
            >
            </th>
            <th 
              :class='css.th'
            >
              ID
            </th>
            <th 
              :class='css.th'
            >
              Название
            </th>
            <th 
              :class='css.th'
            >
              Цена
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="bg-white"
          >
            <td :class="[css.td, 'w-[50px]']">
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  v-if="!product.is_editable"
                  :icon="['fas', 'pen-to-square']" 
                  :class="css.icon"
                  @click="handleEditProduct(product.id)"
                />
                <Icon 
                  v-else
                  :icon="['fas', 'floppy-disk']" 
                  :class="css.icon"
                   @click="handleSaveProduct(product.id)"
                />
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteProduct(product.id)"
                />
              </div>
            </td>
            <td :class="[css.td, 'w-[50px]']">{{ product.id ?? '-' }}</td>
            <td :class="[css.td, 'w-[200px]']">
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
            <td :class='css.td'>
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
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center" v-if="products.length === 0">
      <p class="font-bold text-2xl">Продукты не найдены</p>
    </div>
  </template>