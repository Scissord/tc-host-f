import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import MultiSelect from "primevue/multiselect";
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

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
  app.component("PrimeSelect", Select);
  app.component("FloatLabel", FloatLabel);
  app.component("InputText", InputText);
};
