import http from '../request/http';
import store from '../store';

export default class{
  static get(active){
    return http.get(store.getters.getRoutes.priority + (active !== undefined ? '?active=' + active : ''));
  }

  static getHeader() {
    return http.get(`${ store.getters.getRoutes.priority }/header`);
  }

  static getPaginated(page, number, query) {
    return http.get(`${ store.getters.getRoutes.priority }/${ page }/${ number }${ query }`);
  }

  static getById(id) {
    return http.get(`${ store.getters.getRoutes.priority }/${ id }`);
  }

  static post(body){
    return http.post(store.getters.getRoutes.priority, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.priority, body);
  }

  static getColors(id){
    return http.get(store.getters.getRoutes.priority + '/colors' + (id ? ('?id=' + id) : ''));
  }
}
