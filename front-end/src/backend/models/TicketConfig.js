import http from '../request/http';
import store from '../store';

export default class{
  static get() {
    return http.get(store.getters.getRoutes.ticketConfig);
  }
  static put(body) {
    return http.put(store.getters.getRoutes.ticketConfig, body);
  }
}
