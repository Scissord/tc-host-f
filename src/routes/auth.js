import AuthLayout from '@/layouts/AuthLayout.vue';
import Auth from '@/pages/auth/Auth.vue';
import UserAuth from '@/pages/auth/user/UserAuth.vue';
import WebmasterAuth from '@/pages/auth/webmaster/WebmasterAuth.vue';
import OperatorAuth from '@/pages/auth/operator/OperatorAuth.vue';

const authRoutes = {
  path: '/auth',
  component: AuthLayout,
  children: [
    { path: '', name: 'Auth', component: Auth },
    { path: 'user', name: 'User Auth', component: UserAuth },
    { path: 'webmaster', name: 'Webmaster Auth', component: WebmasterAuth },
    { path: 'operator', name: 'Operator Auth', component: OperatorAuth },
  ],
};

export default authRoutes;
