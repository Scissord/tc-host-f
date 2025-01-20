// libraries components
import { registerFontAwesome } from './fontAwesome';
import { registerToast } from './toast';
import { registerVSelect } from './vSelect';
import { registerVueDatePicker } from './vueDatePicker';
import { registerPrimeVue } from './primeVue';

export default function registerPlugins(app) {
  registerFontAwesome(app);
  registerToast(app);
  registerVSelect(app);
  registerVueDatePicker(app);
  registerPrimeVue(app);
}
