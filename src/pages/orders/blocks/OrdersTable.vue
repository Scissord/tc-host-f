<script setup>
defineProps({
  orders: Object
});

const css = {
  th: 'text-left border border-slate-200 p-1',
  td: 'border border-slate-200 p-1'
};
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse border border-slate-200">
      <thead>
        <tr>
          <th :class='css.th'>ID</th>
          <th :class='css.th'>Оператор</th>
          <th :class='css.th'>Товары</th>
          <th :class='css.th'>Кол-во</th>
          <th :class='css.th'>Вебмастер</th>
          <th :class='css.th'>ФИО</th>
          <th :class='css.th'>Регион</th>
          <th :class='css.th'>Город</th>
          <th :class='css.th'>Адрес</th>
          <th :class='css.th'>Коммент</th>
          <th :class='css.th'>Почта</th>
          <th :class='css.th'>Additional1</th>
          <th :class='css.th'>Additional2</th>
          <th :class='css.th'>Additional3</th>
          <th :class='css.th'>Additional4</th>
          <th :class='css.th'>Additional7</th>
          <th :class='css.th'>Additional8</th>
          <th :class='css.th'>Additional12</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, key) in orders"
          :key="key"
        >
          <td :class='css.td'>{{ order.id ?? "-" }}</td>
          <td :class='css.td'>{{ order.operator_id ?? "-" }}</td>
          <td
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
          </td>
          <td :class='css.td'>{{ order.quantity ?? '-' }}</td>
          <td :class='css.td'>{{ order.webmaster.name ?? '-' }}</td>
          <td :class='css.td'>{{ order.fio ?? '-' }}</td>
          <td :class='css.td'>{{ order.region ?? '-' }}</td>
          <td :class='css.td'>{{ order.city ?? '-' }}</td>
          <td :class='css.td'>{{ order.address ?? '-' }}</td>
          <td :class='css.td'>{{ order.comment ?? '-' }}</td>
          <td :class='css.td'>{{ order.postindex ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional1 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional2 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional3 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional4 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional7 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional8 ?? '-' }}</td>
          <td :class='css.td'>{{ order.additional12 ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>