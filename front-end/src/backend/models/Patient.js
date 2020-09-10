import http from '../request/http';
import store from '../store';
import axios from 'axios';

export default class{
  static getAll(){
    return http.get(store.getters.getRoutes.patient);
  }
}