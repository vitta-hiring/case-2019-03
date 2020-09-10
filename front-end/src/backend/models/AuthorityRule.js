import http from '../request/http';
import store from '../store';

export default class {
  static getPaginated(id, page, number, query) {
    return http.get(`${ store.getters.getRoutes.authorityrule }/${ id }/${ page }/${ number }${ query }`)
  }
}