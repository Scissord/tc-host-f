<script setup>
import { useRoute } from 'vue-router';
import { useOrderStore } from '@store';
import { DateFormat } from "@utils";
import { onMounted } from 'vue';
import { socket } from "@/plugins/socket";

const route = useRoute();
const order_id = route.params.order_id;
const order = useOrderStore();

onMounted(async () => {
  socket.emit("sendEntryOrder", order_id);
  await order.handleGetData(order_id);
});

const css = {
  card: 'flex flex-col gap-3 border rounded-lg p-3',
  title: 'font-bold'
};
</script>

<template>
  <div class="min-h-[50vh] grid grid-cols-4 p-6 gap-6 text-sm">
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">ID:</h1>
        <p>{{ order.state.order.id ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">ФИО:</h1>
        <p>{{ order.state.order.fio ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Оператор:</h1>
        <p>{{ order.state.order.operator_id ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Вебмастер:</h1>
        <p>{{ order.state.order.webmaster_id ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Статус:</h1>
        <p>{{ order.state.order.sub_status_id ?? '-' }}</p>
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Телефон:</h1>
        <p>{{ order.state.order.phone ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Регион:</h1>
        <p>{{ order.state.order.region ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Город:</h1>
        <p>{{ order.state.order.city_id ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Адрес:</h1>
        <p>{{ order.state.order.address ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Почта:</h1>
        <p>{{ order.state.order.postal_code ?? '-' }}</p>
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Коммент:</h1>
        <p>{{ order.state.order.comment ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Дата:</h1>
        <p>{{ DateFormat(order.state.order.created_at, 'H:i d:m:Y') ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Последнее обновление:</h1>
        <p>{{ DateFormat(order.state.order.updated_at, 'H:i d:m:Y') ?? '-' }}</p>
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional1:</h1>
        <p>{{ order.state.order.additional1 ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional2:</h1>
        <p>{{ order.state.order.additional2 ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional3:</h1>
        <p>{{ order.state.order.additional3 ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional4:</h1>
        <p>{{ order.state.order.additional4 ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional5:</h1>
        <p>{{ order.state.order.additional5 ?? '-' }}</p>
      </div>
    </div>
  </div>
</template>
