<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore, useUserStore } from '@store';
import { DateFormat } from "@utils";
import { socket } from "@/plugins/socket";

const route = useRoute();
const order_id = route.params.order_id;
const user = useUserStore();
const order = useOrderStore();

onMounted(async () => {
  socket.emit("sendEntryOrder", {
    order_id,
    name: user.data.name
  });
  await order.handleGetData(order_id);
});

onBeforeUnmount(() => {
  socket.emit("sendExitOrder", {
    order_id,
    name: user.data.name
  });
});

const css = {
  card: 'flex flex-col gap-3 border rounded-lg p-3',
  title: 'font-bold'
};
</script> 

<template>
  <!-- Page Container -->
  <div
    class="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100 text-gray-800"
    :class="isSidebarExpanded ? 'ml-[20vw]' : 'ml-[5vw]'"
  >
    <!-- Floating Action Buttons -->
    <Icon
      v-if="!order.state.order.is_editable"
      :icon="['fas', 'pen-to-square']"
      class="text-3xl fixed bottom-5 right-5 cursor-pointer bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
      @click="order.toggleOrder()"
    />
    <Icon
      v-else
      :icon="['fas', 'floppy-disk']"
      class="text-3xl fixed bottom-5 right-5 cursor-pointer bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition-all"
      @click="order.saveOrder()"
    />

    <!-- Card for Each Section -->
    <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
      <!-- ID -->
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">ID:</h1>
        <p class="text-gray-700">{{ order.state.order.id ?? '-' }}</p>
      </div>

      <!-- ФИО -->
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">ФИО:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.fio ?? '-' }}
        </p>
        <Input
          v-else
          id="fio"
          type="text"
          v-model="order.state.order.fio"
          class="border rounded-md p-2 text-gray-700"
          placeholder="..."
        />
      </div>

      <!-- Оператор -->
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Оператор:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.operator_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.operator_id"
          :options="order.state.operators"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <!-- Статус -->
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Статус:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.sub_status_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.sub_status_id"
          :options="order.state.subStatuses"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <!-- Регион -->
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Регион:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.region ?? '-' }}
        </p>
        <Input
          v-else
          id="region"
          type="text"
          v-model="order.state.order.region"
          class="border rounded-md p-2 text-gray-700"
          placeholder="..."
        />
      </div>
    </div>

    <!-- Additional Cards -->
    <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Город:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.city_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.city_id"
          :options="order.state.cities"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Адрес:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.address ?? '-' }}
        </p>
        <Input
          v-else
          id="address"
          type="text"
          v-model="order.state.order.address"
          class="border rounded-md p-2 text-gray-700"
          placeholder="..."
        />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Почта:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.postal_code ?? '-' }}
        </p>
        <Input
          v-else
          id="postal_code"
          type="text"
          v-model="order.state.order.postal_code"
          class="border rounded-md p-2 text-gray-700"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Дата создания:</h1>
        <p class="text-gray-700 break-words">
          {{ DateFormat(order.state.order.created_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold text-gray-600">Последнее обновление:</h1>
        <p class="text-gray-700 break-words">
          {{ DateFormat(order.state.order.updated_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>
    </div>
<!-- Third Card -->
<div class="bg-white rounded-lg shadow-md p-6 space-y-4 min-h-[350px]">
  <!-- Additional Fields: additional1 - additional9 -->
  <div
    v-for="i in 9"
    :key="`additional${i}`"
    class="flex flex-col gap-2"
  >
    <h1 class="text-sm font-semibold text-gray-600">
      Дополнительное {{ i }}:
    </h1>
    <p v-if="!order.state.order.is_editable" class="text-gray-700 break-words">
      {{ order.state.order[`additional${i}`] ?? '-' }}
    </p>
    <Input
      v-else
      :id="`additional${i}`"
      v-model="order.state.order[`additional${i}`]"
      type="text"
      class="border rounded-md p-2 text-gray-700"
      placeholder="..."
    />
  </div>
</div>
</div>
</template>

