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
  <div class="min-h-screen grid grid-cols-4 p-6 gap-6 text-lg relative">
    <Icon
      v-if="!order.state.order.is_editable"
      :icon="['fas', 'pen-to-square']"
      class="text-2xl fixed bottom-5 right-5 cursor-pointer hover:text-gray-300 transition-colors duration-300 ease-in-out"
      @click="order.toggleOrder()"
    />
    <Icon
      v-else
      :icon="['fas', 'floppy-disk']"
      class="text-2xl fixed bottom-5 right-5 cursor-pointer hover:text-gray-300 transition-colors duration-300 ease-in-out"
      @click="order.saveOrder()"
    />
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">ID:</h1>
        <p>{{ order.state.order.id ?? '-' }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">
          ФИО:
        </h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.fio ?? '-' }}
        </p>
        <Input
          v-else
          id="fio"
          type="text"
          v-model="order.state.order.fio"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Оператор:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.operator_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.operator_id"
          :options="order.state.operators"
          value="id"
          label="name"
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Статус:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.sub_status_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.sub_status_id"
          :options="order.state.subStatuses"
          value="id"
          label="name"
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Регион:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.region ?? '-' }}
        </p>
        <Input
          v-else
          id="region"
          type="text"
          v-model="order.state.order.region"
          placeholder="..."
        />
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Город:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.city_id ?? '-' }}
        </p>
        <Select
          v-else
          v-model="order.state.order.city_id"
          :options="order.state.cities"
          value="id"
          label="name"
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Адрес:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.address ?? '-' }}
        </p>
        <Input
          v-else
          id="address"
          type="text"
          v-model="order.state.order.address"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Почта:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.postal_code ?? '-' }}
        </p>
        <Input
          v-else
          id="postal_code"
          type="text"
          v-model="order.state.order.postal_code"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Коммент:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.comment ?? '-' }}
        </p>
        <Input
          v-else
          id="comment"
          type="text"
          v-model="order.state.order.comment"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Дата:</h1>
        <p>
          {{ DateFormat(order.state.order.created_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">Последнее обновление:</h1>
        <p>
          {{ DateFormat(order.state.order.updated_at, 'H:i d:m:Y') ?? '-' }}
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional1:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional1 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional1"
          type="text"
          v-model="order.state.order.additional1"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional2:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional2 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional2"
          type="text"
          v-model="order.state.order.additional2"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional3:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional3 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional3"
          type="text"
          v-model="order.state.order.additional3"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional4:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional4 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional4"
          type="text"
          v-model="order.state.order.additional4"
          placeholder="..."
        />
      </div>
    </div>
    <div :class="css.card">
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional5:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional5 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional5"
          type="text"
          v-model="order.state.order.additional5"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional6:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional6 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional6"
          type="text"
          v-model="order.state.order.additional6"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional7:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional7 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional7"
          type="text"
          v-model="order.state.order.additional7"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional8:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional8 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional8"
          type="text"
          v-model="order.state.order.additional8"
          placeholder="..."
        />
      </div>
      <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional9:</h1>
        <p v-if="!order.state.order.is_editable">
          {{ order.state.order.additional9 ?? '-' }}
        </p>
        <Input
          v-else
          id="additional9"
          type="text"
          v-model="order.state.order.additional9"
          placeholder="..."
        />
      </div>
      <!-- <div class="flex flex-col gap-1">
        <h1 :class="css.title">additional10:</h1>
        <p>
          {{ order.state.order.additional10 ?? '-' }}
        </p>
      </div> -->
    </div>
  </div>
</template>
