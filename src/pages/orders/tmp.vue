<script setup>
import { ref } from 'vue';
import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore, useUserStore } from '@store';
import { socket } from "@/plugins/socket";
import { DateFormat } from '@utils';

const router = useRouter();
const route = useRoute();
const order_id = route.params.order_id;
const user = useUserStore();
const order = useOrderStore();
const name = user.data.name;

const format = (data) => {
  return new Date(data).toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
};

onMounted(async () => {
  socket.emit("sendEntryOrder", {
    order_id,
    name
  });
  await order.handleGetData(order_id);
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
  socket.emit("sendExitOrder", {
    order_id,
    name
  });
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = (event) => {
  socket.emit("sendExitOrder", {
    order_id,
    name
  });
  
  event.preventDefault();
  event.returnValue = '';
};

const handleDoublePress = (double) => {
  socket.emit("sendEntryOrder", {
    double,
    name
  });
  window.open(`/orders/${double}`, '_blank');
};

const customPosition = (el) => ({ top: 10, left: 0 });

const activeSection = ref("Информация");
</script> 

<template>
  <!-- Page Container -->
  <div
    v-if="order.state.isDataLoaded"
    class="min-h-screen p-6 bg-gray-100 text-gray-800 ml-[5vw]"
  >
    <!-- Floating Action Buttons -->
    <!-- <Icon
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
    /> -->

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <h1 class="text-lg font-semibold text-gray-800">Заказ №{{ order_id }}</h1>
        <div class="flex items-center gap-2 text-sm">
          <span 
            class="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full" 
          >
            {{ order?.state?.order?.status?.name }}
          </span>      
          <span
            class="text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full" 
          >
            {{ order?.state?.order?.sub_status?.name }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          v-for="tab in ['Информация', 'История']"
          :key="tab"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            activeSection === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <div class="flex items-center gap-3">
        <PrimeSelect 
          :options="order?.state?.subStatuses"
          optionLabel="name" 
          placeholder="Выберите" 
          class="w-full" 
        />
        <button
          class="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:bg-green-700 transition"
        >
          Сохранить
        </button>
      </div>
    </div>


    <div class="flex items center gap-3 mt-3 min-h-screen">
      <div class="w-2/3 bg-white rounded-lg p-6 h-full">
        <h1 class="text-lg font-semibold text-gray-800">Детали заказа</h1>
        <div class="flex gap-3 mt-3 h-full">
          <div class="w-1/2 flex flex-col gap-3 h-full">
            <FloatLabel variant="on">
              <InputText 
                id="fio"
                inputId="on_fio" 
                v-model="order.state.order.fio"
              />
              <label for="on_fio">ФИО</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="age"
                inputId="on_age" 
                v-model="order.state.order.age"
              />
              <label for="on_age">Возраст</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-64" variant="on">
              <PrimeSelect 
                inputId="on_gender" 
                v-model="order.state.order.gender"
                :options="order.state.genders"
                optionLabel="name" 
                class="w-full" 
              />
              <label for="on_gender">Пол</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-64" variant="on">
              <PrimeSelect 
                inputId="on_delivery_method" 
                v-model="order.state.order.delivery_method"
                :options="order.state.deliveryMethods"
                optionLabel="name" 
                class="w-full" 
              />
              <label for="on_delivery_method">Способ доставки</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="address"
                inputId="on_address" 
                class="w-[500px]"
                v-model="order.state.order.address"
              />
              <label for="on_address">Адрес</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-64" variant="on">
              <PrimeSelect 
                inputId="on_city" 
                v-model="order.state.order.city"
                :options="order.state.cities"
                optionLabel="name" 
                class="w-full" 
              />
              <label for="on_city">Город</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="region"
                inputId="on_region" 
                class="w-[500px]"
                v-model="order.state.order.region"
              />
              <label for="on_region">Регион</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="postal_code"
                inputId="on_postal_code" 
                v-model="order.state.order.postal_code"
              />
              <label for="on_postal_code">Индекс</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-64" variant="on">
              <PrimeSelect 
                inputId="on_payment_method" 
                v-model="order.state.order.payment_method"
                :options="order.state.paymentMethods"
                optionLabel="name" 
                class="w-full" 
              />
              <label for="on_payment_method">Способ оплаты</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="additional4"
                inputId="on_additional4" 
                v-model="order.state.order.additional4"
              />
              <label for="on_additional4">Трек код</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText 
                id="comment"
                inputId="on_comment"
                class="w-[500px]" 
                v-model="order.state.order.comment"
              />
              <label for="on_comment">Комментарий</label>
            </FloatLabel>
          </div>
          <div class="w-1/2 flex flex-col gap-3 h-full">
            <!-- Дата доставки -->
            <div class="flex flex-col gap-2">
              <h1 class="text-xs font-semibold text-black">Дата доставки:</h1>
              <DatePicker
                v-model="order.state.order.delivery_at"
                class="w-[250px] text-sm z-100"
                locale="ru"
                auto-apply
                :format="format"
                :alt-position="customPosition"
                :enable-time-picker="false"
              />
            </div>
            <!-- Дата перезвона -->
            <div class="flex flex-col gap-2">
              <h1 class="text-xs font-semibold text-black">Дата перезвона:</h1>
              <DatePicker
                v-model="order.state.order.logist_recall_at"
                class="w-[250px] text-sm z-100"
                locale="ru"
                auto-apply
                :format="format"
                :alt-position="customPosition"
                :enable-time-picker="false"
              />
            </div>
          </div>
                      
        </div>

      </div>
      <div class="w-1/3 gap-3 flex flex-col">
        <div class="bg-white rounded-lg p-6">
          
        </div>
        <div class="bg-white rounded-lg p-6">

        </div>
        <div class="bg-white rounded-lg p-6">

        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>

