import AppLayout from '@/layouts/AppLayout.vue';
// statistic
import Home from '@/pages/home/Home.vue';
// orders
import UserOrders from '@/pages/orders/user/UserOrders.vue';
import WebmasterOrders from '@/pages/orders/webmaster/WebmasterOrders.vue';
import OperatorOrders from '@/pages/orders/operator/OperatorOrders.vue';
import Order from '@/pages/orders/Order.vue';
// products
import Products from '@/pages/products/Products.vue';
// departments
import Departments from '@/pages/departments/Departments.vue';
import Department from '@/pages/departments/Department.vue';
// teams
import Teams from '@/pages/teams/Teams.vue';
// admin
import Admin from '@/pages/admin/Admin.vue';
// script
// import Script from '@/pages/script/Script.vue';
// import EditScript from '@/pages/edit_script/EditScript.vue';

const appRoutes = {
  path: '/',
  component: AppLayout,
  children: [
    { path: '', name: 'Home', component: Home },
    // Заказы
    { path: 'user/orders', name: 'User Orders', component: UserOrders },
    { path: 'webmaster/orders', name: 'Webmaster Orders', component: WebmasterOrders },
    { path: 'operator/orders', name: 'Operator Orders', component: OperatorOrders },
    { path: 'orders/:order_id', name: 'Order', component: Order },
    // Офферы
    { path: 'products', name: 'Products', component: Products },
    // Команды
    { path: 'departments', name: 'Departments', component: Departments },
    { path: 'departments/:department_id', name: 'Department', component: Department },
    { path: 'teams', name: 'Teams', component: Teams },
    // Админка
    { path: 'admin', name: 'Admin', component: Admin },
    // Скрипт для продажников
    // { path: 'script/:order_id/:good_id', name: 'Script', component: Script },
    // { path: 'edit_script', name: 'EditScript', component: EditScript },
  ],
};

export default appRoutes;
