import http from '../request/http';
import store from '../store';

export default class{
  static save(obj){
    return http.post(store.getters.getRoutes.worktime, obj);
  }
  static get(ticketId){
    return http.get(store.getters.getRoutes.worktime + "/get?ticketId=" + ticketId);
  }
  static restart(ticketId){
    return http.post(store.getters.getRoutes.worktime + "/reset/" + ticketId);
  }

  static postCustomTuner(body){
    return http.post(store.getters.getRoutes.worktime,body);
  }


}
