// DashboardLayout
import Dashboard from 'src/pages/Dashboard/Dashboard.vue';

// NotFound
import NotFound from 'src/pages/NotFound/NotFoundPage.vue';

// Tickets
import ListPrescriptions from 'src/pages/Prescriptions/ListPrescriptions.vue';
import ListNotifications from 'src/pages/Notifications/ListNotifications.vue';
import NewPrescription from 'src/pages/Prescriptions/NewPrescription.vue';
import EditTicket from 'src/pages/Prescriptions/EditTicket.vue';
import NewTicketUser from 'src/pages/Prescriptions/NewTicketUser.vue';
import EditTicketUser from 'src/pages/Prescriptions/EditTicketUser.vue';
import Login from 'src/pages/Login/Login.vue';
import ResetPassword from 'src/pages/Login/ResetPassword.vue';
import Logout from 'src/pages/Login/Logout.vue';
import Reports from 'src/pages/Reports/Report';

// IssueTypes
import NewIssueType from 'src/pages/IssueType/NewIssueType.vue';

// NewUser
import NewUser from 'src/pages/User/NewUser.vue';

// NewClient
import NewClient from 'src/pages/Clients/NewClient.vue';
import Clients from 'src/pages/Clients/ListOfClients.vue';
import ListOfUsers from "../pages/User/ListOfUsers";
import ListOfIssueTypes from "../pages/IssueType/ListOfIssueTypes";

// Search Satisfaction
import SearchSatisfaction from "src/pages/Prescriptions/SearchSatisfaction.vue";
//Departments
import ListDepartments from 'src/pages/Departments/ListDepartments.vue';
import NewDepartment from 'src/pages/Departments/NewDepartment';

// SLAs
import ListSlas from 'src/pages/Sla/ListOfSla';
import NewSla from 'src/pages/Sla/NewSla';

// Status Ticket
import NewStatusTicket from 'src/pages/StatusTicket/NewStatusTicket.vue';
import ListStatusTicket from 'src/pages/StatusTicket/ListStatusTicket.vue';

// Profiles
import NewProfile from 'src/pages/Profiles/NewProfile.vue';
import ListProfiles from 'src/pages/Profiles/ListProfiles.vue';

// Priorities
import ListPriorities from 'src/pages/Priority/ListPriorities.vue';
import NewPriority from 'src/pages/Priority/NewPriority.vue';

// Templates
import ListTemplates from 'src/pages/Templates/ListTemplates.vue';
import RegisterAndEditTemplate from 'src/pages/Templates/RegisterAndEditTemplate.vue';

// SatisfactionSurveys
import ListSatisfactionSurveys from 'src/pages/SatisfactionSurvey/ListSatisfactionSurveys.vue';
import RegisterAndEditSatisfactionSurvey from 'src/pages/SatisfactionSurvey/RegisterAndEditSatisfactionSurvey.vue';

let listSatisfactionSurveys = {
  path: '/list-satisfaction-surveys',
  name: "Listar Pesquisas de Satisfação",
  component: ListSatisfactionSurveys,
  meta: { requiresAuth: true }
};

let editSatisfactionSurvey = {
  path: '/edit-satisfaction-survey/:id',
  name: "Editar Pesquisa de Satisfação",
  component: RegisterAndEditSatisfactionSurvey,
  meta: { requiresAuth: true }
};

let registerSatisfactionSurvey = {
  path: '/new-satisfaction-survey',
  name: "Cadastrar Pesquisa de Satisfação",
  component: RegisterAndEditSatisfactionSurvey,
  meta: { requiresAuth: true }
};

//Configuration
import Configuration from 'src/pages/Configuration/Configuration.vue';

let configuration = {
  path: '/configuration',
  name: 'Configuration',
  component: Configuration,
  meta: { requiresAuth: true }
}

let login = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { requiresAuth: false, toolbar: false }
};

let resetPassword = {
  path: '/reset-password',
  name: 'Redefinir Senha',
  component: ResetPassword,
  meta: { requiresAuth: false, toolbar: false }
}

let logout = {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  meta: { requiresAuth: false, toolbar: false }
};

let listPrescriptions = {
  path: '/list-prescriptions',
  name: 'Listar Prescrições',
  component: ListPrescriptions,
  meta: { requiresAuth: true }
};

let editTicket = {
  path: '/edit-ticket/:idTicket',
  name: 'Editar Tickets',
  component: EditTicket,
  props: true,
  meta: { requiresAuth: false }
};

let newPrescription = {
  path: '/new-prescription',
  name: 'Nova Prescrição',
  component: NewPrescription,
  meta: { requiresAuth: true }
};

let editPrescription = {
  path: '/new-prescription/:id',
  name: 'Nova Prescrição',
  component: NewPrescription,
  props: true,
  meta: { requiresAuth: true }
};

let newTicketDraft = {
  path: '/new-ticket-draft/:id',
  name: 'Cadastrar Ticket Draft',
  component: NewPrescription,
  meta: { requiresAuth: true }
};

let editTicketUser = {
  path: '/edit-ticket-user/:idTicket',
  name: 'Editar Tickets Cliente',
  component: EditTicketUser,
  props: true,
  meta: { requiresAuth: true }
};

let newTicketUser = {
  path: '/new-ticket-user',
  name: 'Cadastrar Ticket Cliente',
  component: NewTicketUser,
  meta: { requiresAuth: true }
};

let newTicketUserDraft = {
  path: '/new-ticket-user-draft/:id',
  name: 'Cadastrar Ticket Cliente Draft',
  component: NewTicketUser,
  meta: { requiresAuth: true }
};

let listNotifications = {
  path: '/all-notifications',
  name: 'Todas Notificações',
  component: ListNotifications,
  meta: { requiresAuth: true }
};

let newIssueType = {
  path: '/new-issue-type',
  name: 'Cadastrar Tipo de Problema',
  component: NewIssueType,
  meta: { requiresAuth: true }
};

let newUser = {
  path: '/new-user',
  name: 'Cadastrar Novo Usuário',
  component: NewUser,
  meta: { requiresAuth: true }
};

let editUser = {
  path: '/edit-user/:id',
  name: 'Editar Usuário',
  component: NewUser,
  props: true,
  meta: { requiresAuth: true }
};

let editIssueTypes = {
  path: '/edit-issue-type/:id',
  name: 'Editar Tipo de Pendência',
  component: NewIssueType,
  props: true,
  meta: { requiresAuth: true }
};

let editClients = {
  path: '/edit-client/:id',
  name: 'Editar Cliente',
  component: NewClient,
  props: true,
  meta: { requiresAuth: true }
};

let newClient = {
  path: '/new-client',
  name: 'Cadastrar Novo Cliente',
  component: NewClient,
  meta: { requiresAuth: true }
};

let clients = {
  path: '/list-clients',
  name: 'Listar Clientes',
  component: Clients,
  meta: { requiresAuth: true }
};

let users = {
  path: '/list-users',
  name: 'Listar Usuários',
  component: ListOfUsers,
  meta: { requiresAuth: true }
};

let issues = {
  path: '/list-issue-types',
  name: 'Listar Tipos de Pendência',
  component: ListOfIssueTypes,
  meta: { requiresAuth: true }
};

let searchSatisfaction = {
  path: '/search-satisfaction',
  name: 'Pesquisa de Satisfação',
  component: SearchSatisfaction,
  meta: { requiresAuth: false, toolbar: false }
};

let dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  meta: { requiresAuth: true }
};

let listDepartments = {
  path: '/list-departments',
  name: 'Lista de Departamentos',
  component: ListDepartments,
  meta: { requiresAuth: true }
};

let editDepartment = {
  path: '/edit-department/:id',
  name: 'Editar Departamento',
  component: NewDepartment,
  meta: { requiresAuth: true }
};

let newDepartment = {
  path: '/new-department',
  name: 'Cadastrar Departamento',
  component: NewDepartment,
  meta: { requiresAuth: true }
};

let newSla = {
  path: '/new-sla',
  name: 'Cadastrar SLA',
  component: NewSla,
  meta: { requiresAuth: true }
};

let editSla = {
  path: '/edit-sla/:id',
  name: 'Editar SLA',
  component: NewSla,
  meta: { requiresAuth: true }
};

let listSlas = {
  path: '/list-slas',
  name: 'Listar SLAs',
  component: ListSlas,
  meta: { requiresAuth: true }
};

let reports = {
  path: '/report/:type',
  name: 'Relatórios',
  component: Reports,
  props: true,
  meta: { requiresAuth: true }
};

let newStatusTicket = {
  path: '/new-status-ticket',
  name: 'Cadastrar Status de Ticket',
  component: NewStatusTicket,
  meta: { requiresAuth: true }
};

let editStatusTicket = {
  path: '/edit-status-ticket/:id',
  name: 'Editar Status de Ticket',
  component: NewStatusTicket,
  meta: { requiresAuth: true }
};

let listStatusTicket = {
  path: '/list-status-ticket',
  name: 'Lista de Status de Tickets',
  component: ListStatusTicket,
  meta: { requiresAuth: true }
};

let newProfile = {
  path: '/new-profile',
  name: 'Cadastrar Perfil',
  component: NewProfile,
  meta: { requiresAuth: true }
};

let editProfile = {
  path: '/edit-profile/:id',
  name: 'Editar Perfil',
  component: NewProfile,
  meta: { requiresAuth: true }
}

let listProfiles = {
  path: '/list-profiles',
  name: "Lista de Perfis",
  component: ListProfiles,
  meta: { requiresAuth: true }

}

let listPriorities = {
  path: '/list-priorities',
  name: 'Lista de Prioridades',
  component: ListPriorities,
  meta: { requiresAuth: true }
};

let newPriority = {
  path: '/new-priority',
  name: "Nova Prioridade",
  component: NewPriority,
  meta: { requiresAuth: true }
};

let editPriority = {
  path: '/edit-priority/:id',
  name: 'Editar Prioridade',
  component: NewPriority,
  meta: { requiresAuth: true }
};

let listTemplates = {
  path: '/list-templates',
  name: "Listar Templates",
  component: ListTemplates,
  meta: { requiresAuth: true }
};

let editTemplate = {
  path: '/edit-template/:id',
  name: "Editar Template",
  component: RegisterAndEditTemplate,
  meta: { requiresAuth: true }
};

const routes = [{
  path: '/',
  redirect: '/list-prescriptions'
},
  listSatisfactionSurveys,
  editSatisfactionSurvey,
  registerSatisfactionSurvey,
  listTemplates,
  editTemplate,
  login,
  configuration,
  resetPassword,
  logout,
  listPrescriptions,
  editPrescription,
  newPrescription,
  editTicket,
  newTicketUser,
  listNotifications,
  editTicketUser,
  newTicketDraft,
  newTicketUserDraft,
  newIssueType,
  newUser,
  editUser,
  newClient,
  clients,
  users,
  issues,
  editIssueTypes,
  editClients,
  searchSatisfaction,
  dashboard,
  listDepartments,
  editDepartment,
  newDepartment,
  newSla,
  editSla,
  listSlas,
  reports,
  newStatusTicket,
  editStatusTicket,
  listStatusTicket,
  newProfile,
  editProfile,
  listProfiles,
  listPriorities,
  newPriority,
  editPriority,
{
  path: '*',
  redirect: '/404'
},
  {
    path: '/404',
    component: NotFound,
    name: 'Not Found'
  }
];

export default routes;
