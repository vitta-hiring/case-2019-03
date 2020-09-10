import http from '../request/http';
import store from '../store';

export default class {
  static get() {
    return http.get(store.getters.getRoutes.rule);
  }
}