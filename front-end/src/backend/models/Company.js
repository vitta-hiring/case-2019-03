import http from '../request/http';
import store from '../store';

export default class{

  static get(){
    return http.get(store.getters.getRoutes.company);
  }

  static getPaginated(page,size,query){
    return http.get(`${store.getters.getRoutes.company}/${page}/${size}${query}`);
  }
  static getById(id){
    return http.get(store.getters.getRoutes.company+ `/${id}`);
  }

  static post(body){
    return http.post(store.getters.getRoutes.company, body);
  }

  static put(body){
    return http.put(store.getters.getRoutes.company +`/${body.id}`, body);
  }
  
}
