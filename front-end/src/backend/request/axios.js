/* global localStorage */
import axios from 'axios';

export default axios.create({
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
  install(Vue) {
    Vue.mixin({
      data() {
        return {
        };
      }
    });

    Object.defineProperty(Vue.prototype, '$helper', {
      get() {
      },
    });
  },
  headers: {
    'Content-Type': "application/json",
    'x-access-token': localStorage.getItem('token'),
  },

});
