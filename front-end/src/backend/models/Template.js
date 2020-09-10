import http from '../request/http';
import store from '../store';

export default class {
    static get(templateQuery) {
        return http.get(`${store.getters.getRoutes.template}/${templateQuery.page}/${templateQuery.size}?name=${templateQuery.query}`);
    }

    static getTypesOfTemplates() {
        return http.get(`${store.getters.getRoutes.template}/types`);
    }

    static getHeader() {
        return http.get(`${store.getters.getRoutes.template}/header`);
    }

    static getById(id) {
        return http.get(`${store.getters.getRoutes.template}/${id}`);
    }
    
    static put(template) {
        return http.put(store.getters.getRoutes.template, template);
    }
}
