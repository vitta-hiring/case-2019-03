import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.pharmaco);
  }

  static post(body){
    return http.post(store.getters.getRoutes.sla, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.sla, body);
  }

  static getById(id){
    return http.get(store.getters.getRoutes.sla + `/${id}`);
  }

  static getPaginated(page, number, query) {
    return http.get(`${store.getters.getRoutes.sla}/${page}/${number}${query}`);
  }

  static getHeader() {
    return http.get(`${store.getters.getRoutes.sla}/header`);
  }

  static verify(id) {
    return http.get(`${store.getters.getRoutes.sla}/verify/${id}`);
  }
}
