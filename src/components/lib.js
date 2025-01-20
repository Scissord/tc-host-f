import registerButton from './ui/button/registerButton';
import registerInput from './ui/input/registerInput';
import registerLoader from './ui/loader/registerLoader';
import registerModal from './ui/modal/registerModal';
import registerPaginate from './ui/paginate/registerPaginate';
import registerCheckbox from './ui/checkbox/registerCheckbox';
import registerSelect from './ui/select/registerSelect';
import registerPhoneInput from './ui/phone_input/registerPhoneInput';
// import registerMultiSelect from './ui/multi_select/registerMultiSelect';

export default function registerComponents(app) {
  registerButton(app);
  registerInput(app);
  registerLoader(app);
  registerModal(app);
  registerPaginate(app);
  registerCheckbox(app);
  registerSelect(app);
  registerPhoneInput(app);
  // registerMultiSelect(app);
};
