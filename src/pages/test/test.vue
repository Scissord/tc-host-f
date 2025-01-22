<script setup>
import HeaderAdmin from "./blocks/HeaderAdmin.vue";
import HistoryOrder from "./blocks/HistoryOrder.vue";
import RolesList from "./blocks/RolesList.vue";
import RolesTable from "./blocks/RolesTable.vue";
import Teams from "./blocks/Teams.vue";
import UserTable from "./blocks/UserTable.vue";
</script>
<template>
  <div class="ml-[5vw] ">
    <HeaderAdmin />
    <RolesList />
    <Teams />
    <!-- <UserTable /> -->
    <!-- <HistoryOrder /> -->
    <RolesTable />
  </div>
</template>