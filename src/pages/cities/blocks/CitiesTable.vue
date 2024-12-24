  <script setup>
  defineProps({
    cities: {
      type: Array,
      required: true,
      default: []
    },
    handleEditCity: {
      type: Function,
      required: true
    },
    handleSaveCity: {
      type: Function,
      required: true
    },
    handleDeleteCity: {
      type: Function,
      required: true
    },
  });

  const css = {
    th: 'text-left border border-slate-200 p-1 whitespace-nowrap overflow-hidden',
    td: 'border border-slate-200 p-1 whitespace-nowrap overflow-hidden',
    icon: 'hover:text-gray-300 cursor-pointer',
  };
  </script>

  <template>
    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-slate-200 table-fixed">
        <thead>
          <tr>
            <th 
              :class="[css.th, 'w-[50px]']"
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="city in cities"
            :key="city.id"
            class="bg-white"
          >
            <td :class='css.td'>
              <div
                class="flex justify-center items-center space-x-2"
              >
                <Icon 
                  v-if="!city.is_editable"
                  :icon="['fas', 'pen-to-square']" 
                  :class="css.icon"
                  @click="handleEditCity(city.id)"
                />
                <Icon 
                  v-else
                  :icon="['fas', 'floppy-disk']" 
                  :class="css.icon"
                   @click="handleSaveCity(city.id)"
                />
                <Icon 
                  :icon="['fas', 'trash']" 
                  :class="css.icon"
                  @click="handleDeleteCity(city.id)"
                />
              </div>
            </td>
            <td :class="[css.td, 'w-[50px]']">{{ city.id ?? '-' }}</td>
            <td :class="[css.td, 'w-[200px]']">
              <p v-if="!city.is_editable">{{ city.name ?? '-' }}</p>
              <Input
                v-else
                :id="'city' + city.id"
                type="text"
                v-model="city.name"
                placeholder="Название..."
                class="text-xs p-1"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center" v-if="cities.length === 0">
      <p class="font-bold text-2xl">Города не найдены</p>
    </div>
  </template>