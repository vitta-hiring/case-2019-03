import http from '../request/http';
import axios from 'axios';
import store from '../store';

const report = {
  get(type, query){
    return http.get(store.getters.getRoutes.report + '/' + type + '/?' + query);
  }
};

export default report;
