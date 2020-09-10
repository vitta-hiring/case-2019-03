import http from '../request/http';
import axios from 'axios';
import store from '../store';

const pharmaco = {

  getUsersPaginated (page,number,query,companyId,type) {
    return http.get(`${store.getters.getRoutes.user}/${page}/${number}?query=${query?query:''}${companyId?'&companyId='+companyId:''}${type?'&type='+type:''}`);
  },

  getUsersByCompany (companyId,type) {
    return http.get(`${store.getters.getRoutes.user}/0/20?${companyId?'&companyId='+companyId:''}${type?'&type='+type:''}`);
  },

  getHeader () {
    return http.get(`${store.getters.getRoutes.user}/header`);
  },

  get() {
    return http.get(store.getters.getRoutes.pharmaco);
  },
  getProfiles() {
    return http.get(store.getters.getRoutes.user.profiles);
  },

  getEmails(query) {
    return http.get(store.getters.getRoutes.user + "/emails?query=" + (query ? query : ''));
  },

  getPaginated(profile, numberPage) {
    return http.get(store.getters.getRoutes.user.getPaginated + '/' + profile.toString() + '/' + numberPage.toString());
  },

  getUser(user_id) {
    return http.get(store.getters.getRoutes.user.get + '/' + user_id.toString());
  },

  post(body) {
    return http.post(store.getters.getRoutes.user, body);
  },

  postResetPassword(locale, username) {
    const data = {
      locale: locale,
      username: username
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return axios
      .post(store.getters.getRoutes.login + "/reset-password", data, config)
      .then(result => {
        return result.data;
      })
  },

  putResetPassword(password) {
    return http.put(store.getters.getRoutes.user + "/change-password", encodeURIComponent(btoa(password)));
  },

  token() {
    return http.get(store.getters.getRoutes.token);
  },

  login(username, password) {
    const data = {
      username: username,
      // password: encodeURIComponent(btoa(password))
      password: password
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios
      .post(store.getters.getRoutes.login, data, config)
      .then((result) => {
        store.commit('setCodeStatus', result.status);
        store.commit('setToken', result.data.token);

        return result.data;
      })
      .catch(e => {
        store.commit('setErrorMessage', e);
      });
  },

  delete(username) {
    return http.delete(store.getters.getRoutes.user.delete + '/' + username.toString());
  },

  getOne(userID) {
    return http.get(store.getters.getRoutes.user + '/' + userID);
  },

  getOneByUsername(username) {
    return http.get(store.getters.getRoutes.user + '/findByUsername/' + username);
  },

  put(body) {
    return http.put(store.getters.getRoutes.user, body);
  },

  edit(body) {
    return http.put(store.getters.getRoutes.user.edit, body);
  },

  me() {
    return http.get(store.getters.getRoutes.user.me);
  },

  image(body) {
    return http.post(store.getters.getRoutes.user.image + store.getters.getUser.username, body);
  },

  getBackground() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios
      .get(store.getters.getSystemParameters.url + "/downloadBackground", config);

  },

  postBackground(body) {
    return http.post(store.getters.getSystemParameters.url + "/uploadBackground", body);
  },

  usersFromDepartment(departmentId){
    return http.get(store.getters.getRoutes.user + '/department/' + departmentId.toString() );
  },

  getByCompany(companyId){
    return http.get(store.getters.getRoutes.user + '/company/' + companyId);
  }

};
export default pharmaco;
