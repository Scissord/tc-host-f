import useUserStore from "./user";
import useOrdersStore from './orders';
import useOrderStore from './order';
import useThemeStore from './theme';
import useModalStore from './modal';
import useNotificationStore from './notification';
import useConnectionStore from "./connection";

export {
  // DATA
  useUserStore,
  useOrdersStore,
  useOrderStore,
  // UI
  useThemeStore,
  useModalStore,
  useNotificationStore,
  // PLUGINS
  useConnectionStore,
};
