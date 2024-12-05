import websocket from './websocket';
// libraries components
import { registerFontAwesome } from './fontAwesome';
import { registerToast } from './toast';
import { registerVSelect } from './vSelect';
import { registerVueDatePicker } from './vueDatePicker';

export default function registerPlugins(app) {
  // app.use(websocket, { url: "ws://localhost:8000" });

  registerFontAwesome(app);
  registerToast(app);
  registerVSelect(app);
  registerVueDatePicker(app);
}
