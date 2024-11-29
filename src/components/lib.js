// ui
// import Loader from "./ui/loader/Loader.vue";
// import Button from "./ui/button/Button.vue";
// import Select from "./ui/select/Select.vue";
// import Input from './ui/input/Input.vue';
// import Modal from "./ui/modal/Modal.vue";

// export {
//   Loader,
//   Button,
//   Select,
//   Modal,
//   Input
// }

import registerButton from './ui/button/registerButton';
import registerInput from './ui/input/registerInput';
import registerLoader from './ui/loader/registerLoader';
import registerModal from './ui/modal/registerModal';

export default function registerComponents(app) {
  registerButton(app);
  registerInput(app);
  registerLoader(app);
  registerModal(app);
}
