import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.state);
  }

  static post(){
    return http.post(store.getters.getRoutes.state);
  }
}
