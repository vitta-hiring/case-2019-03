import http from '../request/http';
import store from '../store';

export default class{
  static get(locale){
    return http.get(store.getters.getRoutes.notification + "?locale=" + locale);
  }
  static getList(locale, pageSize, pageNumber){
    return http.get(store.getters.getRoutes.notification + "?pageSize=" + pageSize + "&locale=" + locale + "&pageNumber=" + pageNumber);
  }
}
