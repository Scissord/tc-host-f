import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import MultiSelect from "primevue/multiselect";

export function registerPrimeVue(app) {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'light',
      }
    },
  });
  app.component("MultiSelect", MultiSelect);
};
