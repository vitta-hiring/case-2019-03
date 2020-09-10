import http from '../request/http';
import store from '../store';
import axios from 'axios';

export default class{
  static getAll(){
    return http.get(store.getters.getRoutes.prescription + "/findAll");
  }

  static post(prescription){
    return http.post(store.getters.getRoutes.prescription, prescription);
  }

  static getById(id) {
    return http.get(store.getters.getRoutes.prescription + '/findOne' + (id ? ('?id=' + id) : ''));
  }
}