import http from '../request/http';
import store from '../store';

export default class{
  
  static get(){
    return http.get(store.getters.getRoutes.statusTicket);
  }

  static post(body){
    return http.post(store.getters.getRoutes.statusTicket, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.statusTicket, body);
  }

  static getHeader() {
    return http.get(`${store.getters.getRoutes.statusTicket}/header`);
  }

  static getPaginated(page, number, query) {
    return http.get(`${store.getters.getRoutes.statusTicket}/${page}/${number}${query}`);
  }

  static getById(id) {
    return http.get(store.getters.getRoutes.statusTicket + `/${id}`);
  }

}
