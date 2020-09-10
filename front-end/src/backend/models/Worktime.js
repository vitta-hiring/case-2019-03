import http from '../request/http';
import store from '../store';

export default class{
  static get(ticketId){
    return http.get(store.getters.getRoutes.worktime + "?ticketId=" + ticketId);
  }

  static post(obj){
    return http.post(store.getters.getRoutes.worktime, obj);
  }
}
