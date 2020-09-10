/*jshint esversion: 9 */

import 'v-toaster/dist/v-toaster.css'; 
import Vue from 'vue';
import VueRouter from 'vue-router';
import LightBootstrap from './light-bootstrap-main';
import Toaster from 'v-toaster';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons';
import VeeValidate, { Validator } from 'vee-validate';
import enValidations from "vee-validate/dist/locale/en";
import esValidations from "vee-validate/dist/locale/es";
import ptValidations from "vee-validate/dist/locale/pt_BR";
import VueProgressBar from 'vue-progressbar';
import CpfValidator from 'src/util/cpfValidator';
import {Tabs, Tab} from 'vue-tabs-component';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import router from './routes/router';
import store from './backend/store';
import { getAllUrlParams, whereShouldIPoint} from 'src/util/commonUtils.js';
import VueMoment from 'vue-moment';
import Paginate from 'vuejs-paginate';
import i18n from '@/plugins/i18n';
import VModal from 'vue-js-modal';
import VueTimers from 'vue-timers';
import VueTheMask from 'vue-the-mask';
import './assets/css/_media_queries.css';
import Common from "@/util/common";
import VueApexCharts from 'vue-apexcharts';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VTooltip from 'v-tooltip';
import 'vue-tel-input/dist/vue-tel-input.css';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import Swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css";
import { MakeSplit } from "@/components";
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);  
Vue.use(MakeSplit);

const moment = require('moment');
require('moment/locale/es');
require('moment/locale/pt-br');

Vue.component('vue-phone-number-input', VuePhoneNumberInput);
Vue.component('paginate', Paginate);
Vue.component('apexchart', VueApexCharts);

Validator.extend('cpf', CpfValidator);

const options = {
  color: 'yellow',
  failedColor: '#874b4b',
  thickness: '5px',
  autoFinish: false,
  transition: {
    speed: '0.0.1s',
    opacity: '0.6s',
    termination: 0
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
Vue.component('v-icon', Icon);

Vue.use(VueTimers);
Vue.use(Toaster, {
  timeout: 5000
});
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
  useConstraintAttrs: true,
  dictionary: {
    en: enValidations,
    es: esValidations,
    "pt-br": ptValidations
  }
};

Vue.use(VeeValidate, config);

Vue.mixin(Common);
Vue.use(Swatches);
Vue.use(VTooltip);
Vue.use(VueProgressBar, options);
Vue.use(getAllUrlParams);
Vue.use(whereShouldIPoint);
Vue.use(VueRouter);
Vue.use(VueTheMask);
Vue.use(VueSweetalert2);
Vue.use(LightBootstrap);
Vue.use( CKEditor );
Vue.use(VueMoment, {
  moment
});
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  MakeSplit,
  getAllUrlParams,
  whereShouldIPoint,
  i18n: i18n(),
  components: {
    'v-icon': Icon,
  }
}).$mount('#app');
