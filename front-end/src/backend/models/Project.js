import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.project);
  }

  static searchQuery(numberPage, searchQuery){
    return http.get(store.getters.getRoutes.project + "/getPages/" + searchQuery + "?pageSize=50&pageNumber=" + numberPage);
  }

  static searchQuery(numberPage){
    return http.get(store.getters.getRoutes.project + "/getPages?pageSize=50&pageNumber=" + numberPage);
  }

  static post(){
    return http.post(store.getters.getRoutes.project);
  }
}
