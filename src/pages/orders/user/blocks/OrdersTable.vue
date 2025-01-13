<script setup>
import { DateFormat } from "@utils";

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
  }
})

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1 whitespace-nowrap'
};
</script>

<template>
  <div class="w-full overflow-x-auto">
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
            <p 
              class="text-blue-900 font-semibold cursor-pointer hover:underline"
              @click="() => handleEntryOrder(order.id)"
            >
              {{ order.id ?? "-" }}
            </p>
          </td>
          <td :class='css.td'>{{ order.fio ?? "-" }}</td>
          <td
            :class='css.td'
          >
            <div class="flex flex-col gap-1">
              <div
                v-for="product in order.items"
                :key="product.id"
                class="p-1 bg-blue-900 w-fit text-white rounded-lg text-xs"
              >
                <p>
                  {{ product.name ?? '-' }}, {{ product.quantity ?? '-' }} шт. за {{ product.price * product.quantity ?? '-' }}
                </p>
              </div>
            </div>
          </td>
          <td :class='css.td'>{{ order.phone ?? '-' }}</td>
          <td :class='css.td'>{{ order.region ?? '-' }}</td>
          <td :class='css.td'>
            <p v-if="order.city">{{ order.city.name ?? '-' }}</p>
          </td>
          <td :class='css.td'>{{ order.address ?? '-' }}</td>
          <td :class='css.td'>{{ order.postal_code ?? '-' }}</td>
          <td :class='css.td'>{{ order.comment ?? '-' }}</td>
          <td :class='css.td'>{{ order.utm_term ?? '-' }}</td>
          <td :class='css.td'>{{ order.webmaster ?? '-' }}</td>
          <td :class='css.td'>{{ order.operator ?? '-' }}</td>
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
          <td :class='css.td'>{{ order.additional1 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional2 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional3 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional4 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional5 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional6 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional7 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional8 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional9 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional10 ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.updated_at, 'H:i d:m:Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.created_at, 'H:i d:m:Y') ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="orders.length === 0">
    <p class="font-bold text-2xl">Заказы не найдены</p>
  </div>
</template>