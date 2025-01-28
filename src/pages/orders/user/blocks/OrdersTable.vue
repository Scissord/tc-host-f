<script setup>
import { formatRange, DateFormat } from '@utils';

const props = defineProps({
  sort_by: {
    type: Array,
    required: true,
    default: []
  },
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

const inDevelopment = () => {
  alert('В разработке!');
};

const idOptions = [
  { value: 1, label: 'С конца', field: 'id', sort: 'desc' },
  { value: 2, label: 'С начала', field: 'id', sort: 'asc' },
];

const css = {
  th: 'text-left p-4 whitespace-nowrap',
  td: 'p-4 whitespace-nowrap',
  first_row: 'p-2',
  p: 'text-[10px]',
};
</script>

<template>
  <div class="w-full min-h-[50vh] overflow-x-auto bg-gray-50 p-4 rounded-lg">
    <table class="w-full border border-slate-200 table-auto text-xs font-medium">
      <thead class="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
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
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[1].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.operator_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[2].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => inDevelopment()"
          >
            <p :class="css.p">{{ columns[3].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.webmaster_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[4].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional1', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[5].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.created_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[6].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.updated_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[7].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.approved_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[8].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.shipped_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[9].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.cancelled_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[10].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.buyout_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[11].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.delivery_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[12].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.comment', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[13].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => inDevelopment()"
          >
            <p :class="css.p">{{ columns[14].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.total_sum', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[15].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.logist_recall_at', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[16].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => inDevelopment()"
          >
            <p :class="css.p">{{ columns[17].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.fio', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[18].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.phone', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[19].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.region', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[20].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.city_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[21].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.address', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[22].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.postal_code', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[23].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.age', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[24].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.utm_term', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[25].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.sub_status_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[26].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.gender_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[27].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.payment_method_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[28].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.delivery_method_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[29].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.order_cancel_reason_id', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[30].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional2', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[31].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional3', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[32].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional4', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[33].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional5', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[34].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional6', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[35].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional7', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[36].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional8', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[37].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional9', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[38].label }}</p>
          </th>
          <th 
            :class='[css.th, "cursor-pointer hover:underline hover:text-blue-900"]'
            @click="() => handleChangeSelectSort('o.additional10', sort_by[1] === 'asc' ? 'desc' : 'asc')"
          >
            <p :class="css.p">{{ columns[39].label }}</p>
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
                class="text-blue-900 font-semibold cursor-pointer hover:underline"
                @click="handleToggleDoubles(order.id)"
              >
                ({{ order.doubles.length }})
              </p>
              <Icon 
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
          <td :class='css.td'>{{ order.webmaster ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional1 ?? '-' }}</td>
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
          <td :class='css.td'>{{ DateFormat(order?.returned_at, 'd.m.Y H:i') ?? '-' }}</td>
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
