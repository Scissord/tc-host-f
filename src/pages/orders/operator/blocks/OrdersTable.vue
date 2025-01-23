<script setup>
import { formatRange } from '@utils';
import { useUserStore } from '@store';

const props = defineProps({
  orders: {
    type: Array,
    required: true,
    default: []
  },
  columns: {
    type: Array,
    required: true,
    default: []
  },
  handleChangeDateSort: {
    type: Function,
    required: true,
  },
  handleChangeSelectSort: {
    type: Function,
    required: true,
  },
  handleToggleDoubles: {
    type: Function,
    required: true
  },
  handleToggleOrder: {
    type: Function,
    required: true
  },
  handleToggleOrders: {
    type: Function,
    required: true
  },
  handleEntryOrder: {
    type: Function,
    required: true,
  },
  handleMiddleClick: {
    type: Function,
    required: true,
  },
  handleHistoryClick: {
    type: Function,
    required: true,
  },
});

const idOptions = [
  { value: 1, label: 'С конца', field: 'id', sort: 'desc' },
  { value: 2, label: 'С начала', field: 'id', sort: 'asc' },
];

const css = {
  th: 'text-left p-4 whitespace-nowrap',
  td: 'p-4 whitespace-nowrap',
  first_row: 'p-2'
};

const user = useUserStore();
</script>

<template>
  <div class="w-full overflow-x-auto min-h-[50vh] bg-gray-50 p-4 rounded-lg">
    <table class="w-full border border-slate-200 table-auto text-xs font-medium">
      <thead class="bg-gray-100 text-gray-600 uppercase text-[10px] font-semibold">
        <tr>
          <th 
            :class='css.th'
          >
            <Checkbox 
              v-model="columns[0].is_checked"
              @update:modelValue="handleToggleOrders"
            />          
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[1].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[2].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[3].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[6].label }}</p>
          </th>
          <th 
            :class="[css.th, 'cursor-pointer hover:underline']"
            @click="handleChangeSelectSort('o.updated_at', 'asc')"
          >
            <p>{{ columns[7].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[8].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[9].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[10].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[11].label }}</p>
          </th>
          <th 
            :class="[css.th, 'cursor-pointer hover:underline']"
            @click="handleChangeSelectSort('o.delivery_at', 'asc')"
          >
            <p>{{ columns[12].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[13].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[14].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[15].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[16].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[17].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[18].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[19].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[20].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[21].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[22].label }}</p>
          </th>
          <th 
            :class="[css.th, 'cursor-pointer hover:underline']"
            @click="handleChangeSelectSort('o.postal_code', 'asc')"
          >
            <p>{{ columns[23].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[24].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[26].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[27].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[28].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[29].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[30].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[31].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[33].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[34].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[36].label }}</p>
          </th>
          <th 
            :class='css.th'
          >
            <p>{{ columns[37].label }}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-200 bg-white">
          <td :class='css.first_row'></td>
          <td :class='css.first_row'>
            <Select
              v-model="columns[1].sort"
              @update:modelValue="(val, obj) => handleChangeSelectSort(obj.field, obj.sort)"
              :options="idOptions"
            />
          </td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'>
            <DatePicker
              v-model="columns[12].sort"
              class="w-[250px] text-sm z-20"
              locale="ru"
              :format="formatRange"
              @update:model-value="(date) => handleChangeDateSort(date)"
              auto-apply
              range
            />
          </td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'>
          </td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
          <td :class='css.first_row'></td>
        
        </tr>
        <tr
          v-for="order in orders"
          :key="order.id"
          :class="[
            'border-b transition duration-300 ease',
            order.is_checked ? 'bg-blue-100' : 'bg-white hover:bg-gray-50',
            order.is_disabled ? 'pointer-events-none opacity-50' : ''
          ]"
        >
          <td :class="[css.td, 'sticky left-0 bg-white']">
            <Checkbox 
              v-if="!order.is_disabled"
              v-model="order.is_checked"
              @update:modelValue="handleToggleOrder"
            />
            <p v-else>{{ order?.reserved_by ?? '' }}</p>
          </td>
          <td :class="[css.td, 'sticky left-[50px] bg-white']">
            <div class="flex items-center gap-1">
              <p 
                class="text-blue-900 font-semibold cursor-pointer hover:underline"
                @click.left="() => handleEntryOrder(order.id)"
                @click.middle.prevent="() => handleMiddleClick(order.id)"
                @mousedown="(e) => e.preventDefault()"
              >
                {{ order.id ?? "-" }}
              </p>
              <p 
                v-if="order.doubles.length > 0"
                class="text-blue-900 font-semibold cursor-pointer select-none hover:underline"
                @click="() => handleToggleDoubles(order.id)"
              >
                ({{ order.doubles.length }})
              </p>
              <Icon 
                v-if="user?.data?.abilities?.includes(153)"
                icon="fa-solid fa-clock-rotate-left" 
                class="cursor-pointer hover:text-gray-600"
                @click="() => handleHistoryClick(order.id)"
              />
            </div>
            <div 
              v-if="order.is_doubles_open"
              class="flex flex-col gap-1"
            >
              <h1>Дубли:</h1>
              <p 
                v-for="double in order.doubles"
                class="text-blue-900 font-semibold cursor-pointer select-none hover:underline"
                @click="() => handleEntryOrder(double)"
              >
                {{ double }}
              </p>
            </div>
          </td>
          <td :class='css.td'>{{ order.operator ?? '-' }}</td>
          <td
            :class='css.td'
          >
            <div class="flex flex-col gap-1">
              <div
                v-for="product in order.items"
                :key="product.id"
                class="p-1 bg-gray-600 w-fit text-white rounded-lg text-xs"
              >
                <p>
                  {{ product.name ?? '-' }}, {{ product.quantity ?? '-' }} шт. за {{ product.price ?? '-' }}
                </p>
              </div>
            </div>
          </td>
          <td :class='css.td'>{{ order.created_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.updated_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.approved_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.shipped_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.cancelled_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.buyout_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.delivery_at ?? '-' }}</td>
          <td :class='css.td'>{{ order.comment ?? '-' }}</td>
          <td :class='css.td'>
            <p v-if="order.items.length > 0">
              {{ order.items[0].price }}
            </p>
          </td>
          <td :class='css.td'>{{ order.total_sum ?? '-' }}</td>
          <td :class='css.td'>{{ order.logis_recall_at ?? '-' }}</td>
          <td :class="css.td">
            <p v-if="order.items.length > 0">
              {{ order.items.reduce((total, item) => total + item.quantity, 0) }}
            </p>
          </td>
          <td :class='css.td'>{{ order.fio ?? '-' }}</td>
          <td :class='css.td'>{{ order.phone ?? '-' }}</td>
          <td :class='css.td'>{{ order.region ?? '-' }}</td>
          <td :class='css.td'>
            <p v-if="order.city">{{ order.city.name ?? '-' }}</p>
          </td>
          <td :class='css.td'>{{ order.address ?? '-' }}</td>
          <td :class='css.td'>{{ order.postal_code ?? '-' }}</td>
          <td :class='css.td'>{{ order.age ?? '-' }}</td>
          <td :class='css.td'>
            <p v-if="order.status">
              {{ order.status.name ?? '-' }}
            </p>
          </td>
          <td :class='css.td'>
            {{ order.gender ?? '-' }}
          </td>
          <td :class='css.td'>
            {{ order.payment_method ?? '-' }}
          </td>
          <td :class='css.td'>
            {{ order.delivery_method ?? '-' }}
          </td>
          <td :class='css.td'>
            {{ order.order_cancel_reason ?? '-' }}
          </td>
          <td :class='css.td'>{{ order.additional2 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional4 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional5 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional7 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional8 ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="orders.length === 0">
    <p class="font-bold text-2xl">Заказы не найдены</p>
  </div>
</template>