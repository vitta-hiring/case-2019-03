import http from '../request/http';
import store from '../store';

export default class {

  static get(issueType){
    return http.get(store.getters.getRoutes.issueType);
  }

  static getById(id){
    return http.get(store.getters.getRoutes.issueType + `/${id}`);
  }
  static getHeader(){
    return http.get(`${store.getters.getRoutes.issueType}/header`);
  }
  static getPagineted(page,number,query){
    return http.get(`${store.getters.getRoutes.issueType}/${page}/${number}${query}`);
  }

  static getAll(){
    return http.get(store.getters.getRoutes.issueType+'/find');
  }

  static get(issueType){
    return http.get(store.getters.getRoutes.issueType);
  }

  static getActives(){
    return http.get(store.getters.getRoutes.issueType + "/find?status=true");
  }

  static post(issueType){
    return http.post(store.getters.getRoutes.issueType, issueType);
  }

  static put(issueType){
    return http.put(store.getters.getRoutes.issueType+`/${issueType.id}`, issueType);
  }

}
