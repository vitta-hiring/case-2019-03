import http from '../request/http';
import axios from 'axios';
import store from '../store';

const Jira = {

  post(issue) {
    return http.post(store.getters.getRoutes.jiraIssue + "/createIssue", issue);
  },

  getMetadata() {
    return http.get(store.getters.getRoutes.jiraIssue + "/getMetadata");
  },

  assigned(query, keyProject) {
    return http.get(store.getters.getRoutes.jiraIssue + "/getUsers?key=" + keyProject + "&query=" + query);
  },

  postComment(issueComment) {
    return http.post(`${ store.getters.getRoutes.jiraIssue }/comment` , issueComment);
  }

}

export default Jira;