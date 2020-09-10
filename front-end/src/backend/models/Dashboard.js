import http from '../request/http';
import store from '../store';

export default class {

    static fcr(body) {
        return http.post(`${store.getters.getRoutes.ticketGetOne}fcr`, body);
    }

    static statusPie(body) {
        return http.post(`${store.getters.getRoutes.ticketGetOne}state`, body);
    }

    static nps(body) {
        return http.get(`${store.getters.getRoutes.dashboardNps}`, body);
    }

    static getSurveyTypes(){
      return http.get(`${store.getters.getRoutes.surveyType}`);
    }

    static getSurvey(body){
      return http.post(`${store.getters.getRoutes.dashboardNps}`, body);
    }
}
