import store from '@/backend/store';
import router from 'src/routes/router.js';
import User from 'src/backend/models/User.js';
import Authority from "src/backend/models/Authority.js";
import CustomTimer from 'src/components/AddTimer.vue';
import { MakeSplit } from "@/components";

export default {
  components: {
    CustomTimer,
    MakeSplit
  },
  created() { },
  methods: {
    _to(from, numberOfElements, total) {
      let highBound = from + numberOfElements;
      if (total < highBound) {
        highBound = total;
      }
      return highBound;
    },

    _from(perPage, currentPage) {
      return perPage * (currentPage - 1);
    },

    _warning(txt) {
      this.$toaster.warning(this.$t(txt));
    },

    _successfulResult(entity, path, fem) {
      this._getLoading(false);
      let currentLabel = "label." + entity;
      fem ? this.$swal.fire({
        title: `${this.$t(currentLabel)} ${this.$t(
          "swal.titleSuccessFem"
        )}`,
        text: this.$t("swal.textSuccess"),
        type: "success",
        showConfirmButton: true
      }) : this.$swal.fire({
        title: `${this.$t(currentLabel)} ${this.$t(
          "swal.titleSuccess"
        )}`,
        text: this.$t("swal.textSuccess"),
        type: "success",
        showConfirmButton: true
      });
      this.$router.push({ path: path });
    },

    _catchError(e) {
      this._getLoading(false);
      this.$swal.fire({
        title: this.$t("swal.titleError"),
        text: this.$t(e),
        type: "error",
        showConfirmButton: true
      });
    },

    _closeModal(name) {
      this.$modal.hide(name);
    },

    _openModal(name) {
      this.$modal.show(name);
    },

    _login(username, password) {
      return User.login(this.username, this.password)
        .then((result) => {          
          if (result !== undefined) {            
            if (result.accessToken) {
              store.commit('setToken', result.accessToken);
              // this._renewParametersVueX();
            } else {
              return false;
            }
          } else {
            return false;
          }
          return result;
        })
        .catch((e) => {
          this._getLoading(false);
          return e;
        });
    },

    _isAgent() {
      return store.getters.getUser.profile === store.getters.getUser.labelAgent ? true : false;
    },

    _isUser() {
      return store.getters.getUser.profile === store.getters.getUser.labelUser ? true : false;
    },

    _isAdmin() {
      return store.getters.getUser.profile === store.getters.getUser.labelAdmin ? true : false;
    },

    _isClose(split) {
      this.$emit("makeSplit", split);
      this.$emit('close', split);
    },

    _roles() {
      return store.getters.getUser.getAuthorityId;
    },

    _openCustomTracker() {
      this.$modal.show(CustomTimer, {
        height: 'auto',
        dynamic: true,
        injectModalsContainer: true,
        draggable: true,
      });
    },

    _openMakeSplit() {
      this.$modal.show(MakeSplit, {
        text: 'This text is passed as a property'
      }, {
          height: 'auto',
        }, {
          'makeSplit': (split) => { },
          'before-close': (event) => { },
        });
    },

    _tokenExpired(erroBack) {
      var erroBack = erroBack.toString();
      if (erroBack === store.getters.getResponse.tokenExpired || erroBack === store.getters.getResponse.notAuthorized) {
        localStorage.removeItem('makeLogin');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('locale');
        store.commit("setResetByTokenExpired", true);
        router.push({ name: "Login" });
      }
    },

    _setPagination(response) {
      let pagination = {};
      pagination.perPage = response.size;
      pagination.currentPage = response.number + 1;
      pagination.perPageOptions = response.size;
      pagination.total = response.totalElements;
      pagination.startTotalPages = response.totalPages;
      pagination.numberOfElements = response.numberOfElements;
      return pagination;
    },

    _isUserCreate() {
      var user = {};
      if (store.getters.getUser.profile === store.getters.getUser.labelUser) {
        if (store.getters.getUser.authority) {
          if (store.getters.getUser.authority.name === 'ROLE_USER_VIEW') {
            return false;
          }
        }
      }
      return true;
    },

    _orderMenu(menus) {
      let orderMenus = [...menus];
      return orderMenus.sort(function (a, b) {
        if (a.rule.stateName < b.rule.stateName) return -1;
        if (a.rule.stateName > b.rule.stateName) return 1;
        return 0;
      });
    },

    _goThroughPermissions(path, from, roles, original) {
      if (path == "/list-prescriptions") {
        router.push({ path: "/list-prescriptions" })
      }
      if (path != "/list-prescriptions") {
        roles.forEach(element => {
          if (element.rule.route == path && element.read == true) {
            var edit = path.includes("edit");
            var create = path.includes("new");
            var write = edit == true || create == true ? true : false;
            write == true ? element.write == true ? this.routeIsValid = true : this.routeIsValid = false : this.routeIsValid = true;
            this.routeIsValid == true ? original ? router.push({ path: original }) : router.push({ path: path }) : "";
          }
        });
        this.routeIsValid == true ? "" : (this.$toaster.error(this.$t("routeNotValid")), from ? from.path == '/' ? router.push({ path: "/list-prescriptions" }) : router.push({ path: from.path }) : "");
      }
    },

    _thisRouteIsValid(to, from, roles) {
      this.routeIsValid = undefined;
      this.count
      if (to) {
        var report = to.path.includes("report");
        if (report) {
          this._goThroughPermissions(to.path, from, roles, to.path);
        }
        if (!report) {
          if ((to.path.split('/').length - 1) == 2) {
            var s = "";
            s = to.path;
            while (s.charAt(0) === '/') {
              s = s.substr(1);
            }
            s = s.substring(0, s.indexOf('/'));
            let path = "/" + s;
            this._goThroughPermissions(path, from, roles, to.path);
          }
          else {
            this._goThroughPermissions(to.path, from, roles);
          }
        }
      }
    },

    _setRoles(to, from, authorityId) {
      Authority.getRoles(authorityId)
        .then(setRoles => {
          let tempMenus = [];
          let mainMenus = [];
          setRoles.data.forEach(element => {
            if (element.rule.stateName != '' && element.read == true && element.write == true && element.visible == true) {
              tempMenus.push(element)
            }
            var string = element.rule.stateName,
              substring = ".";
            if (element.read == true && element.write == true && element.visible == true && (element.rule.rote == '' || (element.rule.stateName != '' && !string.includes(substring)))) {
              mainMenus.push(element)
            }
          });
          this._thisRouteIsValid(to, from, setRoles.data);
          tempMenus = this._orderMenu(tempMenus);
          mainMenus = this._orderMenu(mainMenus);
          store.commit("setMenus", tempMenus);
          store.commit("setMainMenus", mainMenus);
          this._commitRoles(setRoles.data);
          store.commit("setMenusLenght", tempMenus.length);
        })
        .catch();
    },

    _commitRoles(roles) {
      store.commit("setRoles", roles);
      roles ? store.commit("setRolesLenght", roles.length) : store.commit("setRolesLenght", undefined);
    },

    _commitUser(user) {
      store.commit("setUser", user);
    },

    _renewToken(to, from) {
      // store.commit('setToken', result.data.token);
    },

    _renewParametersVueX(to, from) {
      this.$whereShouldIPoint;
      this.$getAllUrlParams; 
      this._renewToken(to, from);
    },

    _logout() {
      this._getLoading(true);
      this._commitRoles(undefined);
      this._commitUser(undefined);
      this.$store.commit("setCurrentPageTicket", undefined);
      this.$store.commit("setSearchQuery", undefined);
      this.$store.commit("setNotifications", undefined);
      this.$store.commit("setFilters", undefined);
      this.$store.commit("setClearSearch", undefined);
      this.$store.commit("setClearFilters", undefined);
      this.$store.commit("setQueryString", undefined);
      this.$store.commit("setSearch", undefined);
      this.$store.commit("setTicketsPages", undefined);
      this.$store.commit("setTicketPaging", undefined);
      this.$store.commit("setInformationsByUser", undefined);
      this.$store.commit("setMenus", undefined);
      this.$store.commit("setMainMenus", undefined);
      this.$store.commit("setMenus", undefined);
      this.$store.commit("setSubMenus", undefined);
      this.$store.commit("setAmIOnTheMainMenus", true);
      localStorage.removeItem('makeLogin');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('locale');
      this.$store.commit('setLogin', false);
      this.$router.push('login');
      this._getLoading(false);
    },

    _getLocale() {
      if (localStorage.getItem('locale') === null) {
        this._setLocale('pt-br');
      } else {
        store.commit('setLocale', localStorage.getItem('locale'));
      }
      return localStorage.getItem('locale');
    },

    _setLocale(locale) {
      this._getLoading(true);
      localStorage.setItem('locale', locale);
      store.commit('setLocale', locale);
      this.$root.$i18n.locale = locale;
      this._getLoading(false);
    },

    _getLoading(status) {
      this.$store.commit('setLoading', status);
    },

    _errorHandler(e) {
      this.$swal.fire({
        title: this.$t("editTicket.edit.errorSwal"),
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true
      });
    },
  },
};
