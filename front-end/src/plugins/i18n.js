import Vue from 'vue';
import VueI18n from 'vue-i18n';
import PTBR from '@/locales/pt-br.json';
import EN from '@/locales/en.json';
import ES from '@/locales/es.json';
import store from '@/backend/store';


Vue.use(VueI18n);

const messages = {
    'pt-br': PTBR,
    'en': EN,
    'es': ES
};

const i18n = () => {

  return new VueI18n({
    locale: store.getters.getLocale, // set locale
    fallbackLocale: 'pt-br', // set fallback locale
    messages, // set locale messages
  });
};

export default i18n;
