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
const name = user.data.name;

onMounted(async () => {
  socket.emit("sendEntryOrder", {
    order_id,
    name
  });
  await order.handleGetData(order_id);
});

onBeforeUnmount(() => {
  socket.emit("sendExitOrder", {
    order_id,
    name
  });
});
</script> 

<template>
  <!-- Page Container -->
  <div
    class="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100 text-gray-800 ml-[5vw]"
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
        <h1 class="text-xs font-semibold text-black">ID:</h1>
        <p class="text-gray-700">{{ order.state.order.id ?? '-' }}</p>
      </div>

      <!-- ТЕЛЕФОН -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Телефон:</h1>
        <p class="text-gray-700">
          {{ order.state.order.phone ?? '-' }}
        </p>
      </div>

      <!-- Дата создания -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Дата создания:</h1>
        <p class="text-gray-700 break-words">
          {{ DateFormat(order.state.order.created_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>

      <!-- Последнее обновление -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Последнее обновление:</h1>
        <p class="text-gray-700 break-words">
          {{ DateFormat(order.state.order.updated_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>

      <!-- ТЕЛЕФОН -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Товары:</h1>
        <div class="flex flex-col gap-1">
          <div
            v-for="product in order.state.order.items"
            :key="product.id"
            class="p-1 bg-gray-600 w-fit text-white rounded-lg text-xs"
          >
            <p>
              {{ product.name ?? '-' }}, {{ product.quantity ?? '-' }} шт. за {{ product.price * product.quantity ?? '-' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Оператор -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Оператор:</h1>
        <p 
          class="text-gray-700"
        >
          {{ order.state.order.operator ?? '-' }}
        </p>
        <!-- <Select
          v-else
          v-model="order.state.order.operator_id"
          :options="order.state.operators"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        /> -->
      </div>

      <!-- Статус -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Статус:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order?.state?.order?.status?.name ?? '-' }}
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

      <!-- Город -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Город:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order?.state?.order?.city?.name ?? '-' }}
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

      <!-- Пол -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Пол:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.gender ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.gender_id"
          :options="order.state.genders"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <!-- Способ оплаты -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Способ оплаты:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.payment_method ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.payment_method_id"
          :options="order.state.paymentMethods"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <!-- Способ оплаты -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Способ доставки:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.delivery_method ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.delivery_method_id"
          :options="order.state.deliveryMethods"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>

      <!-- Причина отказа -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xs font-semibold text-black">Причина отказа:</h1>
        <p v-if="!order.state.order.is_editable" class="text-gray-700">
          {{ order.state.order.order_cancel_reason ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.order_cancel_reason_id"
          :options="order.state.orderCancelReasons"
          value="id"
          label="name"
          class="border rounded-md p-2 text-gray-700"
        />
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 space-y-4 min-h-screen">
      <div class="flex flex-col gap-2">
        <!-- ФИО -->
        <div class="flex flex-col gap-2">
          <h1 class="text-xs font-semibold text-black">ФИО:</h1>
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

        <!-- Регион -->
        <div class="flex flex-col gap-2">
          <h1 class="text-xs font-semibold text-black">Регион:</h1>
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

        <!-- Возвраст -->
        <div class="flex flex-col gap-2">
          <h1 class="text-xs font-semibold text-black">Возвраст:</h1>
          <p v-if="!order.state.order.is_editable" class="text-gray-700">
            {{ order.state.order.age ?? 0 }}
          </p>
          <Input
            v-else
            id="age"
            type="text"
            v-model="order.state.order.age"
            class="border rounded-md p-2 text-gray-700"
            placeholder="..."
          />
        </div>

        <!-- Адресс -->
        <div class="flex flex-col gap-2">
          <h1 class="text-xs font-semibold text-black">Адрес:</h1>
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

        <!-- Почта -->
        <div class="flex flex-col gap-2">
          <h1 class="text-xs font-semibold text-black">Почта:</h1>
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
      </div>
      <div
        v-for="i in 10"
        :key="`additional${i}`"
        class="flex flex-col gap-2"
      >
        <h1 class="text-xs font-semibold text-black">
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

