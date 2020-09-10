import http from '../request/http';
import store from '../store';

export default class {
  static get() {
    return http.get(store.getters.getRoutes.channel);
  }

  static getChannelsTM2(channelQuery) {
    return http.get(`${store.getters.getRoutes.channel}/${channelQuery.page}/${channelQuery.size}?name=${channelQuery.query}`);
  }

  static post() {
    return http.post(store.getters.getRoutes.channel);
  }
}
