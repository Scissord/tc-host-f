<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore, useUserStore } from '@store';
import { socket } from "@/plugins/socket";
import { DateFormat } from '@utils';
import Header from './order/Header.vue';

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

const isProductInOrder = (productId) => {
  return order.state.order.items.some(item => +item.product_id === +productId);
};
</script> 

<template>
  <!-- Page Container -->
  <div
    v-if="order.state.isDataLoaded"
    class="min-h-screen p-6 bg-gray-100 text-gray-800 ml-[5vw]"
  >
    <Header 
      :order_id="order_id"
    />
    
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

            <!-- Телефон -->
            <FloatLabel v-if="+user.data.id === 1" variant="on" class="mt-2">
              <InputText 
                id="phone"
                inputId="on_phone"
                class="w-64" 
                v-model="order.state.order.phone"
              />
              <label for="on_phone">Телефон</label>
            </FloatLabel>
          </div>
                      
        </div>

      </div>
      <div class="w-1/3 gap-3 flex flex-col">
        <div class="bg-white rounded-lg p-6">
          <FloatLabel 
            class="w-full md:w-64 mt-2" 
            variant="on"
          >
            <PrimeSelect 
              inputId="on_operator" 
              v-model="order.state.order.operator"
              :options="order.state.operators"
              optionLabel="name" 
              class="w-full"
              :disabled="!user.data.abilities.includes(64)"
            />
            <label for="on_operator">Оператор</label>
          </FloatLabel>

          <div v-if="order?.state?.order?.doubles.length > 0" class="mt-3">
            <h1 class="font-bold text-sm">Дубли: {{ order?.state?.order?.doubles.length }} </h1>
            <div class="flex flex-wrap items-center gap-2 mt-2">
              <p 
                v-for="double in order?.state?.order?.doubles.length > 8 ? order?.state?.order?.doubles.slice(0, 8) : order?.state?.order?.doubles"
                :key="double.id"
                class="bg-blue-300 px-2 py-1 text-xs text-white cursor-pointer rounded-lg"
                @click.left="() => handleDoublePress(double.id)"
              >
                {{ double.id + `(${double.status_name})` }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg p-6 grid grid-cols-3 gap-3">
          <!-- Дата создания -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Дата создания:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.created_at ?? '-' }}
            </p>
          </div>

          <!-- Последнее обновление -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Последнее обновление:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.updated_at ?? '-' }}
            </p>
          </div>

          <!-- Дата апрува -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Дата апрува:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.approved_at ?? '-' }}
            </p>
          </div>

          <!-- Дата отмены -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Дата отмены:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.cancelled_at ?? '-' }}
            </p>
          </div>

          <!-- Дата отгрузки -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Дата отгрузки:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.shipped_at ?? '-' }}
            </p>
          </div>

          <!-- Дата выкупа -->
          <div class="flex flex-col gap-2">
            <h1 class="text-xs font-semibold text-black">Дата выкупа:</h1>
            <p class="text-gray-700 break-words">
              {{ order.state.order.buyout_at ?? '-' }}
            </p>
          </div>
        </div>
        <div class="bg-white rounded-lg p-6">
          <!-- Итого -->
          <FloatLabel variant="on" class="mt-3">
            <InputText 
              id="total_sum"
              inputId="on_total_sum"
              class="w-64" 
              v-model="order.state.order.total_sum"
            />
            <label for="on_total_sum">Итого</label>
          </FloatLabel>
          <div class="flex flex-col gap-3 mt-3">
            <h1 class="font-bold text-sm">Уже в заказе:</h1>
            <div class="flex flex-col gap-3">
              <div 
                v-for="item in order.state.order.items" 
                :key="item.id"
                class="grid grid-cols-4 gap-3"
              >
                <p class="flex items-center justify-center">{{ item.name }}</p>
                <Input
                  :id="item.id + 'quantity'"
                  type="text"
                  v-model="item.quantity"
                  @update:modelValue="order.handleUpdateTotal()"
                  class="border rounded-md px-2 py-1 text-gray-700 text-xs w-full"
                  placeholder="..."
                />
                <Input
                  :id="item.id + 'price'"
                  type="text"
                  v-model="item.price"
                  @update:modelValue="order.handleUpdateTotal()"
                  class="border rounded-md px-2 py-1 text-gray-700 text-xs w-full"
                  placeholder="..."
                />
                <div class="flex items-center justify-center">
                  <Icon 
                    icon="fa-solid fa-trash"
                    class="cursor-pointer text-sm text-red-500 hover:opacity-60 transition-all duration-300 ease-in-out"
                    @click="order.handleDeleteProduct(item.id)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3 mt-3">
            <h1 class="font-bold text-sm">Продукты:</h1>
            <div
              v-for="product in order.state.products"
              :key="product.id"
              class="flex items-center gap-3"
            >
              <Checkbox 
                :modelValue="isProductInOrder(product.id)"
                @update:modelValue="order.handleAddProduct(product)"
              />
              <p>{{ product.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>

