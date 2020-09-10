<template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full margin-20-tb">
          <div class="box-shadow">
            <div class="padding-10-r pointer" @click="returnListProfile">
              <img src="/static/icons/back.svg" />
            </div>
            <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
            <div>
              <span
                class="f-18-100-gray"
              >{{ isEdit ? $t('title.editProfile') : $t('title.newProfile') }}</span>
            </div>
          </div>
        </div>
        <div class="flex-full flex-column-1125">
          <div class="box div-default list-tickets">
            <div class="box-padding">
              <form @submit.prevent="validateBeforeSubmit">
                <div class="flex-full flex-column">
                  <div
                    class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                  >
                    <div class="flex-full section-form">
                      <div :class="validationGeneral"></div>
                      <div class="flex-full padding-15-trbl">
                        <div class="flex width-20 w-title-30 w-title-50 f-15-500-gray">
                          <div class="width-100">
                            {{ $t('newProfile.generalInfo') }}
                            <img
                              class="validation-img w-14-840"
                              :src="'/static/icons/' + validationGeneral + '.svg'"
                            />
                          </div>
                        </div>
                        <div class="flex width-80 w-card-70 w-card-50 flex-column">
                          <form @submit.prevent="postForAddProfile">
                            <div class="flex flex-column width-80 input-width-100">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('profile.active') }"
                              >{{ $t('newProfile.label.name') }} *</label>
                              <input
                                name="profile.name"
                                v-validate="'required'"
                                v-model="profile.name"
                                type="text"
                                :data-vv-as="'\'' + $t('newProfile.label.name')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newProfile.placeholder.name')"
                              />
                            </div>
                            <div class="flex flex-column width-80 input-width-100 padding-20-t">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('profile.active') }"
                              >{{ $t('newProfile.label.user') }} *</label>
                              <select
                                name="profile.type"
                                v-model="profile.type"
                                class="select-style width-100 f-12-500-gray-light"
                                v-validate="'required'"
                              >
                                <option value>{{ $t('newProfile.placeholder.user') }}</option>
                                <option
                                  v-for="typeUser in listUsers"
                                  :key="typeUser"
                                  :value="typeUser"
                                >{{ $t('newProfile.listTypeUsers.' + typeUser) }}</option>
                              </select>
                            </div>
                            <div class="flex flex-column width-80 input-width-100 padding-20-t">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('profile.active') }"
                              >{{ $t('newProfile.label.status') }} *</label>
                              <select
                                name="profile.active"
                                v-model="profile.active"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-100"
                              >
                                <option value>{{ $t('newProfile.select.status') }}</option>
                                <option value="true">{{ $t('newProfile.status.active') }}</option>
                                <option value="false">{{ $t('newProfile.status.inactive') }}</option>
                              </select>
                            </div>
                          </form>
                          <div
                            class="flex flex-column width-80 input-width-100 padding-20-tb"
                            v-if="addProfile"
                          >
                            <div class="flex f-10-500-darkcyan">
                              <div class="width-60">
                                <span>{{ $t('newProfile.label.rules') }}</span>
                              </div>
                              <div class="flex flex-justify-space-around width-40 text-center">
                                <div class="text-center width-33">
                                  <span>{{ $t('newProfile.label.read') }}</span>
                                </div>
                                <div class="text-center width-33">
                                  <span>{{ $t('newProfile.label.write') }}</span>
                                </div>
                                <div class="text-center width-33">
                                  <span>{{ $t('newProfile.label.visible') }}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              class="flex width-100 rule-border"
                              v-for="(rule, index) in this.profile.rules"
                              :key="index"
                            >
                              <div class="width-60">
                                <div
                                  class="padding-15-tb f-14-500-darkcyan"
                                >{{ $t(rule.rule.name) }}</div>
                              </div>
                              <div class="width-40">
                                <div class="flex width-100 padding-10-tb">
                                  <div
                                    class="form-group width-100 flex flex-ful flex-wrap"
                                    :id="String(rule.id)"
                                  >
                                    <div class="width-33 text-center">
                                      <b-form-checkbox class v-model="rule.read"></b-form-checkbox>
                                    </div>
                                    <div class="width-33 text-center">
                                      <b-form-checkbox class v-model="rule.write"></b-form-checkbox>
                                    </div>
                                    <div class="width-33 text-center">
                                      <b-form-checkbox class v-model="rule.visible"></b-form-checkbox>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="flex width-100 flex-justify-end flex-align-items-center padding-10-trbl"
                            >
                              <l-pagination
                                style="float:right;"
                                class="pagination-no-border"
                                v-model="pagination.currentPage"
                                :per-page="pagination.perPage"
                                :total="pagination.total"
                              ></l-pagination>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-full flex-justify-end">
                    <div class="padding-20-r">
                      <button
                        class="btn-medium btn-cancel font-bold"
                        @click="returnListProfile"
                      >{{ $t('cancel') }}</button>
                    </div>
                    <div class="padding-20-r">
                      <button
                        class="btn-medium btn-blue"
                        type="submit"
                      >{{ isEdit ? $t('edit') : addProfile ? $t('save') : $t('newProfile.addProfile')}}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="widgets">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Authority from "src/backend/models/Authority.js";
import AuthorityRule from "src/backend/models/AuthorityRule.js";
import Rule from "src/backend/models/Rule.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewProfile",

  props: ["query"],
  data() {
    return {
      listTickets: {
        id: 94,
        read: true,
        rule: {
          active: true,
          createdAt: "2019-07-11T17:53:18.472+0000",
          createdBy: "rivelino",
          displayName: "navbar.menu.tickets",
          id: 1,
          name: "Listar Tickets",
          route: "/list-tickets",
          stateName: "03",
          updatedAt: null,
          updatedBy: null
        },
        visible: true,
        write: true
      },
      firstAccess: true,
      profile: {
        name: "",
        type: "",
        rules: [],
        active: ""
      },
      listUsers: this.$store.getters.getTypesOfProfiles,
      isEdit: false,
      afterPost: false,
      addProfile: false,
      selectedWrite: [],
      selectedRead: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 100,
        startTotalPages: 110,
        numberOfElements: undefined
      },
      searchQuery: this.query
    };
  },
  created() {
    this._renewParametersVueX();
    if (this.$router.history.current.params.id) {
      this.isEdit = true;
      this.addProfile = true;
      Authority.getById(this.$router.history.current.params.id)
        .then(result => {
          this.profile = result.data;
          this.getRules();
        })
        .catch(e => {});
    }
  },
  methods: {
    getRules() {
      this._getLoading(true);
      AuthorityRule.getPaginated(
        this.profile.id,
        this.pagination.currentPage - 1,
        this.pagination.perPage,
        this.searchQuery ? `?name=${this.query.query}` : ""
      )
        .then(result => {
          this.profile.rules = result.data.content;
          this.pagination = this._setPagination(result.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
          this._catchError(e);
        });
    },

    postForAddProfile(profile) {
      this.addProfile = true;
      this.$validator.validateAll().then(result => {
        if (result) {
          this._getLoading(true);
          Authority.post(profile)
            .then(result => {
              this.afterPost = true;
              this._warning("newProfile.txt.afterCreate");
              this.profile.id = result.data.id;
              if (this.profile.id) {
                this.getRules();
              }
              this._getLoading(false);
            })
            .catch(e => {
              this._getLoading(false);
              if (e == "Error: Request failed with status code 400") {
                let error = "newProfile.sameName";
                this._catchError(error);
              } else {
                this._catchError(e);
              }
            });
        }
      });
    },

    putProfile(profile, viaPaginated) {
      Authority.put(profile)
        .then(result => {
          viaPaginated ? "" : this._getLoading(false);
          this._commitRoles(undefined);
          this._renewParametersVueX();
          viaPaginated
            ? ""
            : this.$swal.fire({
                title: `${this.$t("label.profile")} ${this.$t(
                  "swal.titleSuccess"
                )}`,
                text: this.$t("swal.textSuccess"),
                type: "success",
                showConfirmButton: true
              });
          viaPaginated ? "" : this._getLoading(false);
          viaPaginated ? "" : this.returnListProfile();
        })
        .catch(e => {
          viaPaginated ? "" : this._getLoading(false);
          viaPaginated
            ? ""
            : this.$swal.fire({
                title: this.$t("swal.titleError"),
                text: e.response.data.message,
                showConfirmButton: true
              });
        });
    },

    putForEditProfile(profile, viaPaginated) {
      let needsLock = undefined;
      this.$store.getters.getTypesOfUsersWhoHaveBlockedRoutes.forEach(
        element => {
          if (profile.type == element) {
            needsLock = true;
          }
        }
      );
      if (needsLock) {
        let routesForAddOrEdit = [];
        AuthorityRule.getPaginated(
          this.profile.id,
          0,
          this.$store.getters.getPageSizeAllPermissions,
          ""
        )
          .then(result => {
            result.data.content.forEach(element => {
              if (element.rule.route != "") {
                this.$store.getters.getBlockedRoutes.forEach(blockedRoute => {
                  if (element.rule.route == blockedRoute) {
                    element.read = false;
                    element.write = false;
                    routesForAddOrEdit.push(element);
                    for (var i = 0; i < profile.rules.length; i++) {
                      if (profile.rules[i].id === element.id) {
                        profile.rules.splice(i, 1);
                        i--;
                      }
                    }
                  }
                });
              }
            });
            routesForAddOrEdit.forEach(routeForAddOrEdit => {
              profile.rules.push(routeForAddOrEdit);
            });
            this.putProfile(profile, viaPaginated);
          })
          .catch(e => {});
      } else {
        this.putProfile(profile, viaPaginated);
      }
    },

    returnListProfile() {
      this._getLoading(false);
      this.$router.push({ name: "Lista de Perfis" });
    },

    validationClass(boolean) {
      return boolean ? "validation-success" : "validation-fail";
    },

    validateBeforeSubmit() {
      const profile = { ...this.profile };
      this.$validator.validateAll().then(result => {
        if (result) {
          this._getLoading(true);
          this.isEdit
            ? this.putForEditProfile(profile, undefined)
            : this.afterPost
            ? this.putForEditProfile(profile, undefined)
            : this.postForAddProfile(profile);
        } else {
          this._getLoading(false);
          this.$toaster.error(this.$t("swal.errorFields"));
        }
      });
    },

    returnListProfile() {
      this.$router.push({ name: "Lista de Perfis" });
    }
  },
  computed: {
    validationGeneral: function() {
      return this.validationClass(
        !this.errors.has("profile.name") &&
          this.profile.name &&
          this.profile.type !== "" &&
          this.profile.active !== ""
      );
    }
  },
  watch: {
    "pagination.currentPage": function(next, curr) {
      if (next != curr) {
        this.profile.rules ? this.putForEditProfile(this.profile, true) : "";
        this.getRules();
      }
    }
  }
};
</script>

<style>
.option-write {
  position: center;
  left: 0px;
}

.option-read {
  left: 12px;
}

.position-checkbox {
  left: 10px;
}

.rule-border {
  border-bottom: 1px solid;
}
</style>