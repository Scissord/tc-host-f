<script setup>
import { DateFormat } from "@utils";
import { formatRange } from '@utils';

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
});

const idOptions = [
  { value: 1, label: 'С конца', field: 'id', sort: 'desc' },
  { value: 2, label: 'С начала', field: 'id', sort: 'asc' },
];

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1 whitespace-nowrap'
};
</script>

<template>
  <div class="w-full min-h-[50vh] overflow-x-auto">
    <table class="w-full border-collapse border border-slate-200">
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.id" 
            :class='css.th'
          >
            <Checkbox 
              v-if="column.id === 0" 
              v-model="column.is_checked"
              @update:modelValue="handleToggleOrders"
            />          
            <p v-else>{{ column.label }}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :class='css.td'></td>
          <td :class='css.td'>
            <Select
              v-model="columns[1].sort"
              @update:modelValue="(val, obj) => handleChangeSelectSort(obj.field, obj.sort)"
              :options="idOptions"
            />
          </td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'>
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
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
          <td :class='css.td'></td>
        </tr>
        <tr
          v-for="order in orders"
          :key="order.id"
          :class="[
            'transition duration-300 ease',
            order.is_checked ? 'bg-blue-100' : 'bg-white',
            order.is_disabled ? 'pointer-events-none opacity-50' : ''
          ]"
        >
          <td :class='css.td'>
            <Checkbox 
              v-if="!order.is_disabled"
              v-model="order.is_checked"
              @update:modelValue="handleToggleOrder"
            />
            <p v-else>{{ order?.reserved_by ?? '' }}</p>
          </td>
          <td :class='css.td'>
            <div class="flex items-center gap-1">
              <p 
                class="text-blue-900 font-semibold cursor-pointer select-none hover:underline"
                @click="() => handleEntryOrder(order.id)"
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
          <td :class='css.td'>{{ order.webmaster ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional1 ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.updated_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.created_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.approved_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.shipped_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.cancelled_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.buyout_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.delivery_at, 'H:i d.m.Y') ?? '-' }}</td>
          <td :class='css.td'>{{ order.comment ?? '-' }}</td>
          <td :class='css.td'>
            <p v-if="order.items.length > 0">
              {{ order.items[0].price }}
            </p>
          </td>
          <td :class='css.td'>{{ order.total_sum ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.logis_recall_at, 'H:i d.m.Y') ?? '-' }}</td>
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
          <td :class='css.td'>{{ order.utm_term ?? '-' }}</td>
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
          <td :class='css.td'>{{ order.additional3 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional4 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional5 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional6 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional7 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional8 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional9 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional10 ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="orders.length === 0">
    <p class="font-bold text-2xl">Заказы не найдены</p>
  </div>
</template>