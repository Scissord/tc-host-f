import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './routes';
import registerPlugins from '@plugins';
import registerComponents from '@components';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

registerComponents(app);
registerPlugins(app);

app.mount('#app');
