import AppLayout from '@/layouts/AppLayout.vue';
import Home from '@/pages/home/Home.vue';
import Orders from '@/pages/orders/Orders.vue';
import Script from '@/pages/script/Script.vue';
import Admin from '@/pages/admin/Admin.vue';

const appRoutes = {
  path: '/',
  component: AppLayout,
  children: [
    { path: '', name: 'Home', component: Home },
    { path: 'orders', name: 'Orders', component: Orders },
    { path: 'script/:order_id/:good_id', name: 'Script', component: Script },
    { path: 'admin', name: 'Admin', component: Admin }
  ],
};

export default appRoutes;
