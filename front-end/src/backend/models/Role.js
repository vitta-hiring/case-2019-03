import http from '../request/http';
import store from '../store';

export default class{
  constructor(){
    this.id = 0;
    this.name = '';
    this.description = '';
    this.sub_item = false;
    this.authority = '';
  }

  static getAll(){
    return http.get(store.getters.getRoutes.user.roles);
  }

}
