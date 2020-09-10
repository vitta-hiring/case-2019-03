import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.department);
  }

  static post(body){
    return http.post(store.getters.getRoutes.department, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.department, body);
  }

  static getHeader() {
    return http.get(`${store.getters.getRoutes.department}/header`);
  }

  static getPaginated(page, number, query) {
    return http.get(`${store.getters.getRoutes.department}/${page}/${number}${query}`);
  }

  static getById(id) {
    return http.get(store.getters.getRoutes.department + `/${id}`);
  }

  static getSurveyType() {
    return http.get(store.getters.getRoutes.surveyType);
  }
}
