import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.tag);
  }

  static query(query){
    return http.get(store.getters.getRoutes.tag + "?query=" + query);
  }

  static post(){
    return http.post(store.getters.getRoutes.tag);
  }
}
