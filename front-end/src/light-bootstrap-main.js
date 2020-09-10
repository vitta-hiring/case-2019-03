import './polyfills';
// Notifications plugin. Used on Notifications page
// Validation plugin used to validate forms
//import VeeValidate from 'vee-validate';
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents';
// A plugin file where you could register global directives
//import GlobalDirectives from './globalDirectives';
// Sidebar on the right. Used as a local plugin in
//import SideBar from './components/SidebarPlugin';
//import NotificationPlugin from './components/NotificationPlugin';
// Tabs plugin. Used on Panels page.
//import VueTabs from 'vue-nav-tabs';

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

// asset imports
// import 'bootstrap/dist/css/bootstrap.css';
// import 'vue-nav-tabs/themes/vue-tabs.scss';
// import './assets/sass/light-bootstrap-dashboard.scss';
// import './assets/css/demo.css';
import './assets/css/ticket.css';
import './assets/css/tabs.css';
import './assets/css/multiselect.css';
import './assets/sass/_variables.scss';
import './assets/sass/utils.scss';
import './assets/sass/_pages.scss';
import './assets/sass/_tabs-navs-pagination.scss';
import './assets/css/_media_queries.css';
// import "vue-loading-overlay/dist/vue-loading.css";


export default {
  async install (Vue) {
    Vue.use(GlobalComponents);
    // Vue.use(GlobalDirectives);
    // Vue.use(SideBar);
    // Vue.use(NotificationPlugin);
    // Vue.use(VueTabs);
    // Vue.use(VeeValidate);
  }
};
