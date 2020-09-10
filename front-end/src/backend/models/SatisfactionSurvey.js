import http from '../request/http';
import store from '../store';

export default class {
    static get(satisfactionSurveyQuery) {
        return http.get(`${store.getters.getRoutes.satisfactionSurvey}/${satisfactionSurveyQuery.page}/${satisfactionSurveyQuery.size}?name=${satisfactionSurveyQuery.query}`);
    }

    static getTypesOfSatisfactionSurvey() {
        return http.get(`${store.getters.getRoutes.satisfactionSurvey}/types`);
    }

    static getHeader() {
        return http.get(`${store.getters.getRoutes.satisfactionSurvey}/header`);
    }

    static getById(id) {
        return http.get(`${store.getters.getRoutes.satisfactionSurvey}/${id}`);
    }
    
    static put(satisfactionSurvey) {
        return http.put(store.getters.getRoutes.satisfactionSurvey, satisfactionSurvey);
    }

    static post(satisfactionSurvey) {
        return http.post(store.getters.getRoutes.satisfactionSurvey, satisfactionSurvey);
    }

    static existActiveSurvey(type) {
        return http.get(`${store.getters.getRoutes.satisfactionSurvey}/existActiveSurvey/${type}`);
    }    
}
