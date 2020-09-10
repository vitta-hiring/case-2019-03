import http from '../request/http';
import store from '../store';

export default class{
  static get(){
    return http.get(store.getters.getRoutes.issue);
  }

  static post(issue){
    return http.post(store.getters.getRoutes.issue, issue);
  }
  
  static postJira(issue){
    return http.post(store.getters.getRoutes.issue + "/jira", issue);
  }

  static postLink(link){
    return http.post(store.getters.getRoutes.issue + "/link", link);
  }

  static getLinkedIssue(ticketId,page=0){
    return http.get(store.getters.getRoutes.issue + `/linked?ticketId=${ticketId}&page=${page}&size=10`);
  }

  static getLinkable(){
    return http.get(store.getters.getRoutes.issue + "/linkable");
  }

  static unlink(linkedIssue, ticketId){
    return http.post(store.getters.getRoutes.issue + "/" + ticketId + "/unlink", linkedIssue);
  }
}
