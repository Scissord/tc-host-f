<script setup>
import { DateFormat } from "@utils";

const props = defineProps({
  orders: Object,
  columns: Array
});

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
          <th v-for="column in columns" :key="column.column_name" :class='css.th'>
            {{ column.display_name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, key) in orders"
          :key="key"
        >
          <td :class='css.td'>{{ order.id ?? "-" }}</td>
          <td :class='css.td'>{{ order.fio ?? "-" }}</td>
          <!-- <td
            :class='css.td'
          >
            <div class="flex flex-col gap-1">
              <div
                v-for="good in order.goods"
                :key="good.good_id"
                class="p-1 bg-blue-900 w-fit text-white rounded-lg text-xs"
              >
                <p>
                  {{ good.good_name ?? '-' }}, {{ good.quantity ?? '-' }} шт. за {{ good.price * good.quantity ?? '-' }}
                </p>
              </div>
            </div>
          </td> -->
          <td :class='css.td'>{{ order.region ?? '-' }}</td>
          <td :class='css.td'>{{ order.city ?? '-' }}</td>
          <td :class='css.td'>{{ order.address ?? '-' }}</td>
          <td :class='css.td'>{{ order.postindex ?? '-' }}</td>
          <td :class='css.td'>{{ order.comment ?? '-' }}</td>
          <td :class='css.td'>{{ order.quantity ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional1 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional10 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional9 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional8 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional7 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional6 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional5 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional4 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional3 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional2 ?? '-' }}</td>
          <td :class='css.td'>{{ order.webmaster.name ?? '-' }}</td>
          <td :class='css.td'>{{ order.operator_id ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional11 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional12 ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.updated_at, 'H:i d:m:Y') ?? '-' }}</td>
          <td :class='css.td'>{{ DateFormat(order.created_at, 'H:i d:m:Y') ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>