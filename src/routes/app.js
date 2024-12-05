import AppLayout from '@/layouts/AppLayout.vue';
import Home from '@/pages/home/Home.vue';
import Orders from '@/pages/orders/Orders.vue';
import Webmaster from '@/pages/webmaster/Webmaster.vue';
import Script from '@/pages/script/Script.vue';
import EditScript from '@/pages/edit_script/EditScript.vue';
import Admin from '@/pages/admin/Admin.vue';

const appRoutes = {
  path: '/',
  component: AppLayout,
  children: [
    { path: '', name: 'Home', component: Home },
    // Лидвертекс
    { path: 'orders', name: 'Orders', component: Orders },
    { path: 'orders', name: 'Orders', component: Orders },
    { path: 'webmaster/:webmaster_id', name: 'Webmaster', component: Webmaster },
    // Скрипт для продажников
    { path: 'script/:order_id/:good_id', name: 'Script', component: Script },
    { path: 'edit_script', name: 'EditScript', component: EditScript },
    // Админка
    { path: 'admin', name: 'Admin', component: Admin }
  ],
};

export default appRoutes;
