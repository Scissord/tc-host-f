import AppLayout from '@/layouts/AppLayout.vue';
// statistic
import UserStatistics from '@/pages/home/user/UserStatistics.vue';
import WebmasterStatistics from '@/pages/home/webmaster/WebmasterStatistics.vue';
import OperatorStatistics from '@/pages/home/operator/OperatorStatistics.vue';
// orders
import UserOrders from '@/pages/orders/user/UserOrders.vue';
import WebmasterOrders from '@/pages/orders/webmaster/WebmasterOrders.vue';
import OperatorOrders from '@/pages/orders/operator/OperatorOrders.vue';
import Order from '@/pages/orders/Order.vue';
// products
import Products from '@/pages/products/Products.vue';
// cities
import Cities from '@/pages/cities/Cities.vue';
// departments
import Departments from '@/pages/departments/Departments.vue';
// teams
import Teams from '@/pages/teams/Teams.vue';
import Team from '@/pages/teams/Team.vue';
// statuses
import Statuses from '@/pages/statuses/Statuses.vue';
import SubStatuses from '@/pages/statuses/SubStatuses.vue';
// admin
import Admin from '@/pages/admin/Admin.vue';
// create_operators
import CreateOperators from '@/pages/create_operators/CreateOperators.vue';
// script
// import Script from '@/pages/script/Script.vue';
// import EditScript from '@/pages/edit_script/EditScript.vue';

const appRoutes = {
  path: '/',
  component: AppLayout,
  children: [
    // Статистика
    { path: '/user/statistics', name: 'UserStatistics', component: UserStatistics },
    { path: '/webmaster/statistics', name: 'WebmasterStatistics', component: WebmasterStatistics },
    { path: '/operator/statistics', name: 'OperatorStatistics', component: OperatorStatistics },
    // Заказы
    { path: 'user/orders', name: 'User Orders', component: UserOrders },
    { path: 'webmaster/orders', name: 'Webmaster Orders', component: WebmasterOrders },
    { path: 'operator/orders', name: 'Operator Orders', component: OperatorOrders },
    { path: 'orders/:order_id', name: 'Order', component: Order },
    // Офферы
    { path: 'products', name: 'Products', component: Products },
    // Города
    { path: 'cities', name: 'Cities', component: Cities },
    // Отделы
    { path: 'departments', name: 'Departments', component: Departments },
    // Команды внутри отдела
    { path: 'departments/:department_id', name: 'Teams', component: Teams },
    // Команда
    { path: 'teams/:team_id', name: 'Team', component: Team },
    // Статусы
    { path: 'statuses', name: 'Statuses', component: Statuses },
    // Подстатусы
    { path: 'statuses/:status_id', name: 'SubStatuses', component: SubStatuses },
    // Админка
    { path: 'admin', name: 'Admin', component: Admin },
    // Оператор создаёт других операторов
    { path: 'create_operators', name: 'CreateOperators', component: CreateOperators },
    // Скрипт для продажников
    // { path: 'script/:order_id/:good_id', name: 'Script', component: Script },
    // { path: 'edit_script', name: 'EditScript', component: EditScript },
  ],
};

export default appRoutes;
