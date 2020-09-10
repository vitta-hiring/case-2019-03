import http from '../request/http';
import store from '../store';

export default class {
  static getHeader() {
    return http.get(`${store.getters.getRoutes.authority}/header`);
  }

  static getPaginated(page, number, query) {
    return http.get(`${store.getters.getRoutes.authority}/${page}/${number}${query}`);
  }

  static getAllPermissionsForThisProfile(number, profileName) {
    return http.get(`${store.getters.getRoutes.authority}/0/${number}?profile=${profileName}`);
  }

  static get(profileQuery) {
    return http.get(`${store.getters.getRoutes.authority}/${profileQuery.page}/${profileQuery.size}?type=${profileQuery.type}&name=${profileQuery.query}`);
  }

  static getById(id) {
    return http.get(`${store.getters.getRoutes.authority}/${id}`);
  }

  static getRoles(id) {
    return http.get(`${store.getters.getRoutes.authorityrule}/${id}`);
  }

  static post(body) {
    return http.post(store.getters.getRoutes.authority, body);
  }

  static put(body) {
    return http.put(store.getters.getRoutes.authority, body);
  }
}
