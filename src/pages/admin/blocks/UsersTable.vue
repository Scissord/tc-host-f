  <script setup>
  defineProps({
    users: {
      type: Array,
      required: true,
      default: []
    },
    handleAddUser: {
      type: Function,
      required: true
    },
    handleEditUser: {
      type: Function,
      required: true
    },
    handleSaveUser: {
      type: Function,
      required: true
    },
    handleDeleteUser: {
      type: Function,
      required: true
    },
  });

  const css = {
    th: 'text-left border border-slate-200 p-1 whitespace-nowrap overflow-hidden',
    td: 'border border-slate-200 p-1 whitespace-nowrap overflow-hidden',
    icon: 'hover:text-gray-300 cursor-pointer',
  };
  </script>

  <template>
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-2xl">
          Пользователи
        </h1>
        <Button 
          text="Добавить"
          @click="handleAddUser"
        />
      </div>
      <div class="w-full overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200 table-fixed">
          <thead>
            <tr>
              <th 
                :class="[css.th, 'w-[50px]']" 
              >
              </th>
              <th 
                :class="[css.th, 'w-[50px]']" 
              >
                ID
              </th>
              <th
                :class="[css.th, 'w-[150px]']"
              >
                Логин
              </th>
              <th 
                :class="[css.th, 'w-[500px]']"
              >
                Пароль
              </th>
              <th 
                :class="[css.th, 'w-[200px]']"
              >
                Имя
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="bg-white"
            >
              <td :class='css.td'>
                <div
                  class="flex justify-center items-center space-x-2"
                >
                  <Icon 
                    v-if="!user.is_editable"
                    :icon="['fas', 'pen-to-square']" 
                    :class="css.icon"
                    @click="handleEditUser(user.id)"
                  />
                  <Icon 
                    v-else
                    :icon="['fas', 'floppy-disk']" 
                    :class="css.icon"
                    @click="handleSaveUser(user.id)"
                  />
                  <Icon 
                    :icon="['fas', 'trash']" 
                    :class="css.icon"
                    @click="handleDeleteUser(user.id)"
                  />
                </div>
              </td>
              <td :class="css.td">{{ user.id ?? '-' }}</td>
              <td :class="css.td">
                <p v-if="!user.is_editable">{{ user.login ?? '-' }}</p>
                <Input
                  v-else
                  :id="'login' + user.id"
                  type="text"
                  v-model="user.login"
                  placeholder="..."
                  class="text-xs p-1"
                />
              </td>
              <td :class="css.td">
                <p v-if="!user.is_editable">{{ user.password ?? '-' }}</p>
                <Input
                  v-else
                  :id="'password' + user.id"
                  type="text"
                  v-model="user.password"
                  placeholder="..."
                  class="text-xs p-1"
                />
              </td>
              <td :class="css.td">
                <p v-if="!user.is_editable">{{ user.name ?? '-' }}</p>
                <Input
                  v-else
                  :id="'name' + user.id"
                  type="text"
                  v-model="user.name"
                  placeholder="..."
                  class="text-xs p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex items-center justify-center" v-if="users.length === 0">
      <p class="font-bold text-2xl">Продукты не найдены</p>
    </div>
  </template>