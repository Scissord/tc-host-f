import useUserStore from "./user";
import useOrderStore from './orders/order';
import useUserOrdersStore from './orders/user';
import useWebmasterOrdersStore from './orders/webmaster';
import useOperatorOrdersStore from './orders/operator';
import useThemeStore from './theme';
import useModalStore from './modal';
import useNotificationStore from './notification';
import useConnectionStore from "./connection";

export {
  // DATA
  useUserStore,
  useOrderStore,
  useUserOrdersStore,
  useWebmasterOrdersStore,
  useOperatorOrdersStore,
  // UI
  useThemeStore,
  useModalStore,
  useNotificationStore,
  // PLUGINS
  useConnectionStore,
};
