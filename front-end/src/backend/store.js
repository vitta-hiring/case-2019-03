import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from 'moment';
import { Validator } from 'vee-validate';
import { CountryList } from 'src/backend/request/allCountries.js'

Vue.use(Vuex);

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const backend = {
  state: {
    // BACK
    local: "http://localhost:8080",
    development: "http://172.23.18.248:8091",
    sandbox: "https://tm2ticket.tm2digital.com/back",
    commercial: "https://comercial-ticket.tm2digital.com/back",

    // FRONT
    frontLocalhost: "localhost",
    frontDev: "172.23.18.248", //:8092
    frontTM2Dev: "172.23.18.248:8192",
    frontSandbox: "https://tm2ticket.tm2digital.com",
    frontTM2Sandbox: "https://tm2ticket.tm2digital.com",
    frontCommercial: "https://comercial-ticket.tm2digital.com",
    frontTM2Digital: "https://hml.tm2digital.com/chat/#/login",
    frontTM2Atendimento: "https://atendimento.tm2digital.com/chat/login.html#!#%2Flogin",
    /*
      MASTER

      DATABASE
      Server: mysqlmaster.neppo.com.br:3306
      Schema Database: tm2_ticket
      user: ticket
      password: n3pp0t1

      SANDBOX

      DATABASE
      Server: 172.23.16.15:3307
      Schema Database: tm2_ticket_hom
      user:  tickethom
      password: n3pp0t1

      [APLICATIONS] - BRANCH sandbox
      TICKET BACK http://172.23.18.248:8093
      TICKET FRONT http://172.23.18.248:8094
      SERVER http://172.23.18.248:8194

      DEVELOPMENT

      DATABASE
      Server: 172.23.18.248:3317
      Schema Database: TM2_TICKET_DEV
      user: ticketdev
      password: ticketdev

      [APLICATIONS] - BRANCH development
      TICKET BACK http://172.23.18.248:8091
      TICKET FRONT http://172.23.18.248:8092
      SERVER http://172.23.18.248:8192
    */
  },
  mutations: {
    setBackend(state, URL) {
      state.URL = URL;
      routes.state.authority = URL + "/api/authority";
      routes.state.pharmacos = URL + "/api/pharmacos/findAll";      
      routes.state.authorityrule = URL + "/api/authorityrule";
      routes.state.rule = URL + "/api/rule";
      routes.state.login = URL + "/api/auth/signin";
      routes.state.token = URL + "/api/auth/token";
      routes.state.prescription = URL + "/api/medication";
      routes.state.patient = URL + "/api/patient/findAll";
      routes.state.doctor = URL + "/api/doctor/findAll";
      routes.state.ticketGetPages = URL + "/api/ticket/getPages";
      routes.state.ticketGetOne = URL + "/api/ticket/";
      routes.state.channel = URL + "/api/channel";
      routes.state.template = URL + "/api/template";
      routes.state.satisfactionSurvey = URL + "/api/survey";
      routes.state.user = URL + "/api/user";
      routes.state.issue = URL + "/api/issue";
      routes.state.pharmaco = URL + "/api/pharmaco/findAll";
      routes.state.worktime = URL + "/api/worktime";
      routes.state.tag = URL + "/api/tag";
      routes.state.jiraIssue = URL + "/api/basic/issue";
      routes.state.department = URL + "/api/department";
      routes.state.priority = URL + "/api/priority";
      routes.state.state = URL + "/api/state";
      routes.state.draft = URL + "/api/ticket/draft";
      routes.state.upload = URL + "/api/upload";
      routes.state.notification = URL + "/api/notification/findByUserId";
      routes.state.tag = URL + "/api/tag";
      routes.state.answer = URL + "/api/answer";
      routes.state.product = URL + "/api/product";
      routes.state.issueType = URL + "/api/issueType";
      routes.state.company = URL + "/api/company";
      routes.state.jira = URL + "/api/basic/";
      routes.state.dashboardNps = URL + "/api/survey/result";
      routes.state.ticketConfig = URL + "/api/config/";
      routes.state.surveyType = URL + "/api/surveytype";
      routes.state.report = URL + "/api/reports";
      routes.state.statusTicket = URL + "/api/state";
      routes.state.searchSatisfaction = URL + "/api/ticket-survey/reply";
    },
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    }
  },
  getters: {
    getBackend(state) {
      return state;
    }
  }
};

const user = {
  state: {
    countryDefault: "BR",
    labelAdmin: "ADMIN",
    labelAgent: "AGENT",
    labelUser: "USER",
    displayName: "",
    admin: localStorage.getItem("admin"),
    domain: localStorage.getItem("domain"),
    email: localStorage.getItem("email"),
    firstName: localStorage.getItem("firstName"),
    genre: localStorage.getItem("genre"),
    departments: localStorage.getItem("departments"),
    lastName: localStorage.getItem("lastName"),
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    profile: localStorage.getItem("profile"),
    username: localStorage.getItem("username"),
    updateUser: localStorage.getItem("updatedUser"),
    locale: localStorage.getItem("locale")
  },
  mutations: {
    setUser(state, user) {
      if (user) {
        state.admin = user.admin;
        state.displayName = user.displayName;
        state.domain = user.domain;
        state.email = user.email;
        state.firstName = user.firstName;
        state.genre = user.genre;
        state.profile = user.type;
        state.authority = user.authority;
        state.authorityId = user.authority.id;
        state.departments = user.departments;
        state.lastName = user.lastName;
        state.id = user.id;
        state.username = user.username;
        state.name = user.name;
        state.updatedUser = user.updatedUser;
        state.locale = user.locale;
      }
      else {
        state.authorityId = undefined;
      }
    },
    setLocale(state, locale) {
      state.locale = locale;
      Validator.localize(locale);
      moment.locale(locale);
    }
  },
  getters: {
    getUser(state) {
      return state;
    },
    getCountryDefault(state) {
      return state.countryDefault;
    },
    getAuthorityId(state) {
      return state.authorityId;
    },
    getLocale(state) {
      return state.locale;
    }

  }
};

const response = {
  state: {
    codeStatus: undefined,
    errorMessage: undefined,
    resetByTokenExpired: false,
    resetByBlockedProfile: false,
    tokenExpired: "Error: Request failed with status code 400",
    notAuthorized: "Error: Request failed with status code 401",
    blockedProfileLogin: "Error: Request failed with status code 403",
    blockedProfile: "Error: Request failed with status code 412"
  },
  mutations: {
    setCodeStatus(state, codeStatus) {
      state.codeStatus = codeStatus;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    setResetByTokenExpired(state, status) {
      state.resetByTokenExpired = status;
    },
    setResetByBlockedProfile(state, status) {
      state.resetByBlockedProfile = status;
    }
  },
  getters: {
    getResponse(state) {
      return state;
    }
  }
};

const split = {
  state: {
    split: {},
    companyId: "",
    ticketIdFrom: "",
    ticketIdInto: "",
    closedTicketsPerCompany: [],
    refresh: false
  },
  mutations: {
    setSplit(state, split) {
      state.split = split;
    },
    setMergeCompanyId(state, value) {
      state.companyId = value;
    },
    setTicketIdFrom(state, ticketIdFrom) {
      state.ticketIdFrom = ticketIdFrom;
    },
    setTicketIdInto(state, ticketIdInto) {
      state.ticketIdInto = ticketIdInto;
    },
    setRefresh(state, value) {
      state.refresh = value;
    },
    setClosedTicketsPerCompany(state, value) {
      state.closedTicketsPerCompany = value;
    }
  },
  getters: {
    getSplit(state) {
      return state;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getMerge(state) {
      return state.companyId;
    },
    getClosedTicketsPerCompany(state) {
      return state.closedTicketsPerCompany;
    },
    getTicketIdFrom(state) {
      return state.ticketIdFrom;
    },
    getTicketIdInto(state) {
      return state.ticketIdInto;
    }
  }
};

const users = {
  state: {
    users: []
  },
  mutations: {
    setUsers(state, listUsers) {
      state.users = listUsers;
    }
  },
  getters: {
    getUsers(state) {
      return state;
    }
  }
};

const typesOfProfiles = {
  state: {
    typesOfProfiles: ["ADMIN", "AGENT", "USER"],
    profilesByTypeOfUser: undefined,
    profileByTypeOfUser: undefined,
  },
  mutations: {
    setTypesOfProfiles(state, typesOfProfiles) {
      state.typesOfProfiles = typesOfProfiles;
    },
    setProfilesByTypeOfUser(state, profilesByTypeOfUser) {
      state.profilesByTypeOfUser = profilesByTypeOfUser;
    },
    setProfileByTypeOfUser(state, profileByTypeOfUser) {
      state.profileByTypeOfUser = profileByTypeOfUser;
    }
  },
  getters: {
    getTypesOfProfiles(state) {
      return state.typesOfProfiles;
    },
    getProfilesByTypeOfUser(state) {
      return state.profilesByTypeOfUser;
    },
    getProfileByTypeOfUser(state) {
      return state.profileByTypeOfUser;
    }
  }
};

const routes = {
  state: {
    api: localStorage.getItem("URL") + "/api",    
    authority: localStorage.getItem("URL") + "/api/authority",    
    authorityrule: localStorage.getItem("URL") + "/api/authorityrule",
    rule: localStorage.getItem("URL") + "/api/rule",
    login: localStorage.getItem("URL") + "/api/auth",
    token: localStorage.getItem("URL") + "/api/auth/token",
    prescription: localStorage.getItem("URL") + "/api/medication",
    patient: localStorage.getItem("URL") + "/api/patient/findAll",    
    doctor: localStorage.getItem("URL") + "/api/doctor/findAll",    
    channel: localStorage.getItem("URL") + "/api/channel",
    project: localStorage.getItem("URL") + "/api/project",
    jiraIssue: localStorage.getItem("URL") + "/api/basic/issue",
    user: localStorage.getItem("URL") + "/api/user",
    pharmaco: localStorage.getItem("URL") + "/api/pharmaco/findAll",
    worktime: localStorage.getItem("URL") + "/api/worktime",
    state: localStorage.getItem("URL") + "/api/state",
    draft: localStorage.getItem("URL") + "/api/ticket/draft",
    upload: localStorage.getItem("URL") + "/api/upload",
    notification: localStorage.getItem("URL") + "api/notification/findByUserId",
    ticketGetOne: localStorage.getItem("URL") + "api/ticket/",
    ticketGetPages: localStorage.getItem("URL") + "api/ticket/getPages",
    tag: localStorage.getItem("URL") + "api/tag",
    answer: localStorage.getItem("URL") + "api/answer",
    product: localStorage.getItem("URL") + "api/product",
    issueType: localStorage.getItem("URL") + "api/issueType",
    company: localStorage.getItem("URL") + "api/company",
    jira: localStorage.getItem("URL") + "api/basic",
    searchSatisfaction: localStorage.getItem("URL") + "/api/ticket-survey/reply",
    ticketConfig: localStorage.getItem("URL") + "api/config",
    surveyType: localStorage.getItem("URL") + "api/surveytype",
    report: localStorage.getItem("URL") + "api/reports",
    statusTicket: localStorage.getItem("URL") + "api/state",
    priority: localStorage.getItem("URL") + "api/priority",

  },
  getters: {
    getRoutes(state) {
      return state;
    }
  }
};

const systemParameters = {
  state: {
    url: localStorage.getItem("URL") + "/systemParameters",
  },
  getters: {
    getSystemParameters(state) {
      return state;
    }
  }
};

const spinner = {
  state: {
    loading: false
  },
  getters: {
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setLoading(state, loading) {
      Vue.set(state, 'loading', loading);
    }
  },
};

const template = {
  state: {
    template: undefined
  },
  getters: {
    getTemplate(state) {
      return state.template;
    }
  },
  mutations: {
    setTemplate(state, template) {
      state.template = template;
    }
  },
};

const notifications = {
  state: {
    notifications: undefined,
  },
  mutations: {
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    }
  }
};

const tags = {
  state: {
    tags: undefined,
    tagsArray: undefined,
  },
  getters: {
    getTags(state) {
      return state.tags;
    },
    getTagsArray(state) {
      return state.tagsArray;
    }
  },
  mutations: {
    setTags(state, tags) {
      state.tags = tags;
    },
    setTagsArray(state, tagsArray) {
      state.tagsArray = tagsArray;
    }
  },
};

const emails = {
  state: {
    emails: undefined
  },
  getters: {
    getEmails(state) {
      return state.emails;
    }
  },
  mutations: {
    setEmails(state, emails) {
      Vue.set(state, 'emails', emails);
    }
  },
};

const pharmacos = {
  state: {
    pharmacos: undefined
  },
  getters: {
    getPharmacos(state) {
      return state.pharmacos;
    }
  },
  mutations: {
    setPharmacos(state, pharmacos) {
      Vue.set(state, 'pharmacos', pharmacos);
    }
  },
};

const rangeDate = {
  state: {
    rangeDate: []
  },
  getters: {
    getRangeDate(state) {
      return state.rangeDate;
    }
  },
  mutations: {
    setRangeDate(state, rangeDate) {
      Vue.set(state, 'rangeDate', rangeDate);
    }
  },
};

const countryList = {
  state: {
    countryList: CountryList
  },
  getters: {
    getCountryList(state) {
      return state.countryList;
    }
  },
  mutations: {
    setCountryList(state, rangeDate) {
      Vue.set(state, 'rangeDate', rangeDate);
    }
  },
};

const functions = {
  state: {
    HREF: undefined,
    search: undefined,
    paramsURL: undefined,
    isEmpty: undefined,
    clearSearch: undefined,
    searchQuery: undefined,
    uploads: [],
    removedFiles: [],
    locales: ["pt-Br", "en", "es"],
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setHREF(state, HREF) {
      state.HREF = HREF;
    },
    setClearSearch(state, clearSearch) {
      state.clearSearch = clearSearch;
    },
    setParamsURL(state, paramsURL) {
      state.paramsURL = paramsURL;
    },
    setIsEmpty(state, isEmpty) {
      state.isEmpty = isEmpty;
    },
    setUpload(state, upload) {
      upload === 1 ?
        state.uploads = [] :
        state.uploads.push(upload);
    },
    removeUpload(state, uploadName) {
      state.uploads = state.uploads.filter(f => {
        return f.document !== uploadName;
      });
    },
    setRemovedFiles(state, removed) {
      removed === 1 ?
        state.removedFiles = [] :
        state.removedFiles.push(removed);
    },
    setSearch(state, search) {
      state.search = search;
    },
  },
  getters: {
    getFunctions(state) {
      return state;
    }
  }
};

const tickets = {
  state: {
    tickets: undefined,
  },
  mutations: {
    setTickets(state, tickets) {
      state.tickets = tickets;
    },
  },
  getters: {
    getTickets(state) {
      return state;
    }
  }
};

const clearFilters = {
  state: {
    clearFilters: undefined,
  },
  mutations: {
    setClearFilters(state, clearFilters) {
      state.clearFilters = clearFilters;
    },
  },
  getters: {
    getClearFilters(state) {
      return state.clearFilters;
    }
  }
};

const ticketsPages = {
  state: {
    ticketsPages: undefined,
  },
  mutations: {
    setTicketsPages(state, ticketsPages) {
      state.ticketsPages = ticketsPages;
    },
  },
  getters: {
    getTicketsPages(state) {
      return state.ticketsPages;
    }
  }
};

const prescriptions = {
  state: {
    prescriptions: undefined,
  },
  mutations: {
    setPrescriptions(state, prescriptions) {
      state.prescriptions = prescriptions;
    },
  },
  getters: {
    getPrescriptions(state) {
      return state.prescriptions;
    }
  }
};

const prescription = {
  state: {
    prescription: undefined,
  },
  mutations: {
    setPrescriptions(state, prescription) {
      state.prescription = prescription;
    },
  },
  getters: {
    getPrescription(state) {
      return state.prescription;
    }
  }
};

const patients = {
  state: {
    patients: undefined,
  },
  mutations: {
    setPatients(state, patients) {
      state.patients = patients;
    },
  },
  getters: {
    getPatients(state) {
      return state.patients;
    }
  }
};

const doctors = {
  state: {
    doctors: undefined,
  },
  mutations: {
    setDoctors(state, doctors) {
      state.doctors = doctors;
    },
  },
  getters: {
    getDoctors(state) {
      return state.doctors;
    }
  }
};

const refreshErrors = {
  state: {
    commentIssueJira: undefined,
  },
  mutations: {
    setCommentIssueJiraError(state, value) {
      state.commentIssueJira = value;
    },
  },
  getters: {
    getCommentIssueJiraError(state) {
      return state.commentIssueJira;
    }
  }
};

const ticket = {
  state: {
    ticket: undefined,
    totalTime: undefined,
  },
  mutations: {
    setTicket(state, ticket) {
      state.ticket = ticket;
    },
    setTotalTime(state, totalTime) {
      state.totalTime = totalTime;
    },
  },
  getters: {
    getTicket(state) {
      return state;
    },
    getTotalTime(state) {
      return state.totalTime;
    },
  }
};

const ticketPaging = {
  state: {
    ticketPaging: undefined,
    currentPageTicket: undefined
  },
  mutations: {
    setCurrentPageTicket(state, currentPageTicket) {
      state.currentPageTicket = currentPageTicket;
    },
    setTicketPaging(state, ticketPaging) {
      state.ticketPaging = ticketPaging;
    }
  },
  getters: {
    getTicketPaging(state) {
      return state.ticketPaging;
    },
    getCurrentPageTicket(state) {
      return state.currentPageTicket;
    }
  }
}

const login = {
  state: {
    makeLogin: false,
  },
  mutations: {
    setLogin(state, makeLogin) {
      state.makeLogin = makeLogin;
    }
  },
  getters: {
    getLogin(state) {
      return state.makeLogin;
    }
  }
};

const roles = {
  state: {
    roles: undefined,
    size: undefined
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
    },
    setRolesLenght(state, value) {
      state.size = value;
    }
  },
  getters: {
    getRoles(state) {
      return state.roles;
    },
    getRolesLenght(state) {
      return state.size;
    }
  }
};

const menus = {
  state: {
    menus: [],
    mainMenus: [],
    size: undefined,
    amIOnTheMainMenus: true,
    showMainMenus: true,
  },
  mutations: {
    setMenus(state, menus) {
      state.menus = menus;
    },
    setMenusLenght(state, value) {
      state.size = value;
    },
    setMainMenus(state, value) {
      state.mainMenus = value;
    },
    setAmIOnTheMainMenus(state, value) {
      state.amIOnTheMainMenus = value;
    },
    setShowMainMenus(state, value) {
      state.showMainMenus = value;
    }
  },
  getters: {
    getMenus(state) {
      return state.menus;
    },
    getMainMenus(state) {
      return state.mainMenus;
    },
    getMenusLenght(state) {
      return state.size;
    },
    getMainMenusLength(state) {
      return state.mainMenus.length;
    },
    getAmIOnTheMainMenus(state) {
      return state.amIOnTheMainMenus;
    },
    getShowMainMenus(state) {
      return state.amIOnTheMainMenus;
    }
  }
};

const channels = {
  state: {
    channels: undefined,
  },
  mutations: {
    setChannels(state, channels) {
      state.channels = channels;
    },
  },
  getters: {
    getChannels(state) {
      return state.channels;
    },
  }
};

const states = {
  state: {
    states: undefined,
  },
  mutations: {
    setStates(state, states) {
      state.states = states;
    },
  },
  getters: {
    getStates(state) {
      return state.states;
    },
  }
};

const informationsByUser = {
  state: {
    informationsByUser: undefined,
  },
  mutations: {
    setInformationsByUser(state, informationsByUser) {
      state.informationsByUser = informationsByUser;
    },
  },
  getters: {
    getInformationsByUser(state) {
      return state.informationsByUser;
    },
  }
};

const priorities = {
  state: {
    priorities: undefined,
  },
  mutations: {
    setPriorities(state, priorities) {
      state.priorities = priorities;
    },
  },
  getters: {
    getPriorities(state) {
      return state.priorities;
    },
  }
};

const keepSearchingTickets = {
  state: {
    queryString: undefined,
    filters: undefined,
  },
  mutations: {
    setQueryString(state, queryString) {
      state.queryString = queryString;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
  },
  getters: {
    getQueryString(state) {
      return state.queryString;
    },
    getFilters(state) {
      return state.filters;
    },
  }
};

const templates = {
  state: {
    templates: undefined,
  },
  mutations: {
    setTemplates(state, templates) {
      state.templates = templates;
    },
  },
  getters: {
    getTemplates(state) {
      return state.templates;
    },
  }
};

const getChannelsTM2 = {
  state: {
    channelsTM2: undefined,
    channelTM2: undefined,
  },
  mutations: {
    setChannelsTM2(state, channelsTM2) {
      state.channelsTM2 = channelsTM2;
    },
    setChannelTM2(state, channelTM2) {
      state.channelTM2 = channelTM2;
    },
  },
  getters: {
    getChannelsTM2(state) {
      return state.channelsTM2;
    },
    getChannelTM2(state) {
      return state.channelTM2;
    },
  }
};

const satisfactionSurvey = {
  state: {
    satisfactionSurvey: undefined,
  },
  mutations: {
    setSatisfactionSurvey(state, satisfactionSurvey) {
      state.satisfactionSurvey = satisfactionSurvey;
    }
  },
  getters: {
    getSatisfactionSurvey(state) {
      return state.satisfactionSurvey;
    }
  }
};

const getSurveyTypes = {
  state: {
    surveyType: undefined,
    surveyTypes: undefined,
  },
  mutations: {
    setSurveyType(state, surveyType) {
      state.surveyType = surveyType;
    },
    setSurveyTypes(state, surveyTypes) {
      state.surveyTypes = surveyTypes;
    },
  },
  getters: {
    getSurveyType(state) {
      return state.surveyType;
    },
    getSurveyTypes(state) {
      return state.surveyTypes;
    },
  }
};

const templatesLocale = {
  state: {
    ptbr: undefined,
    en: undefined,
    es: undefined,
    subjectPtbr: undefined,
    subjectEn: undefined,
    subjectEs: undefined,
    listTemplates: undefined,
    iDptbr: undefined,
    iDen: undefined,
    iDes: undefined
  },
  mutations: {
    setListTemplates(state, value) {
      state.listTemplates = value;
    },
    setPtbr(state, ptbr) {
      state.ptbr = ptbr;
    },
    setIdPtbr(state, iDptbr) {
      state.iDptbr = iDptbr;
    },
    setIdEn(state, iDen) {
      state.iDen = iDen;
    },
    setIdEs(state, iDes) {
      state.iDes = iDes;
    },
    setEn(state, en) {
      state.en = en;
    },
    setEs(state, es) {
      state.es = es;
    },
    setSubjectPtbr(state, subjectPtbr) {
      state.subjectPtbr = subjectPtbr;
    },
    setSubjectEn(state, subjectEn) {
      state.subjectEn = subjectEn;
    },
    setSubjectEs(state, subjectEs) {
      state.subjectEs = subjectEs;
    },
  },
  getters: {
    getIdPtbr(state) {
      return state.iDptbr;
    },
    getIdEn(state) {
      return state.iDen;
    },
    getIdEs(state) {
      return state.iDes;
    },
    getListTemplates(state) {
      return state.listTemplates;
    },
    getPtbr(state) {
      return state.ptbr;
    },
    getEn(state) {
      return state.en;
    },
    getEs(state) {
      return state.es;
    },
    getSubjectPtbr(state) {
      return state.subjectPtbr;
    },
    getSubjectEn(state) {
      return state.subjectEn;
    },
    getSubjectEs(state) {
      return state.subjectEs;
    },
  }
};

const typesOfTemplates = {
  state: {
    typeOfTemplate: undefined,
    typesOfTemplates: []
  },
  mutations: {
    setTypesOfTemplates(state, typesOfTemplates) {
      state.typesOfTemplates = typesOfTemplates
    },
    setTypeOfTemplate(state, typeOfTemplate) {
      state.typeOfTemplate = typeOfTemplate
    }
  },
  getters: {
    getTypesOfTemplates(state) {
      return state.typesOfTemplates;
    },
    getTypeOfTemplate(state) {
      return state.typeOfTemplate;
    }
  }
}

const subMenus = {
  state: {
    subMenus: undefined,
    size: undefined
  },
  mutations: {
    setSubMenus(state, subMenus) {
      state.subMenus = subMenus
    },
    setSubMenusLenght(state, value) {
      state.size = value;
    }
  },
  getters: {
    getSubMenus(state) {
      return state.subMenus;
    },
    getSubMenusLength(state) {
      return state.subMenus ? state.subMenus.length : "";
    }
  }
}

const blockedRoutesForUsers = {
  state: {
    typesOfUsersWhoHaveBlockedRoutes: ['USER'],
    blockedRoutes: ['/dashboard', '/new-client', '/list-clients', '/edit-client', '/new-ticket', '/new-profile', '/list-profiles', '/edit-profile', '/new-satisfaction-survey', '/list-satisfaction-surveys', '/edit-satisfaction-survey', '/new-user', '/edit-user'],
    pageSize: 250
  },
  mutations: {
    setTypesOfUsersWhoHaveBlockedRoutes(state, value) {
      state.typesOfUsersWhoHaveBlockedRoutes = value
    },
    setBlockedRoutes(state, value) {
      state.blockedRoutes = value;
    }
  },
  getters: {
    getTypesOfUsersWhoHaveBlockedRoutes(state) {
      return state.typesOfUsersWhoHaveBlockedRoutes;
    },
    getBlockedRoutes(state) {
      return state.blockedRoutes;
    },
    getPageSizeAllPermissions(state) {
      return state.pageSize;
    }
  }
}
const store = new Vuex.Store({
  modules: {
    blockedRoutesForUsers: blockedRoutesForUsers,
    subMenus: subMenus,
    satisfactionSurvey, satisfactionSurvey,
    getSurveyTypes: getSurveyTypes,
    template: template,
    templatesLocale: templatesLocale,
    getChannelsTM2: getChannelsTM2,
    typesOfTemplates: typesOfTemplates,
    templates: templates,
    clearFilters: clearFilters,
    keepSearchingTickets: keepSearchingTickets,
    prescriptions: prescriptions,
    prescription: prescription,
    patients: patients,
    doctors: doctors,
    ticketsPages: ticketsPages,
    channels: channels,
    states: states,
    informationsByUser: informationsByUser,
    priorities: priorities,
    menus: menus,
    roles: roles,
    typesOfProfiles: typesOfProfiles,
    refreshErrors: refreshErrors,
    countryList: countryList,
    user: user,
    tickets: tickets,
    notifications: notifications,
    ticket: ticket,
    backend: backend,
    response: response,
    routes: routes,
    rangeDate: rangeDate,
    tags: tags,
    pharmacos: pharmacos,
    emails: emails,
    users: users,
    spinner: spinner,
    systemParameters: systemParameters,
    functions: functions,
    ticketPaging: ticketPaging,
    login: login,
    split: split
  }
});

export default store;
