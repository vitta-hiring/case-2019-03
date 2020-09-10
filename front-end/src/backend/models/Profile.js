import http from '../request/http';
import store from '../store';

export default class {
  constructor() {
    this.id = 0;
    this.name = '';
    this.roles = '';
  }

  static post(body) {
    return http.post(store.getters.getRoutes.user.profiles, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.user.profiles, body);
  }

  static getAll() {
    return http.get(store.getters.getRoutes.user.profiles);
  }
  
}