import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.product);
  }

  static query(query){
    return http.get(store.getters.getRoutes.product + "?query=" + query);
  }

  static post(){
    return http.post(store.getters.getRoutes.product);
  }
}
