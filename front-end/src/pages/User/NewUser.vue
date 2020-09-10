<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListUsers">
            <img src="/static/icons/back.svg" alt />
          </div>
          <div class="margin-10-rl division division-new-ticket background-darkcyan"></div>
          <div>
            <span class="f-18-100-gray" v-if="edit">{{ $t('title.editUser') }}</span>
            <span class="f-18-100-gray" v-if="!edit">{{ $t('title.newUser') }}</span>
          </div>
        </div>
      </div>
      <div class="flex-full flex-column-1125">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <!-- FORM -->
            <form @submit.prevent="validateBeforeSubmit">
              <div class="flex-full flex-column">
                <!-- FIST STEP -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full">
                    <div :class="validationType"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- VALIDATION LABEL -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newUser.stepOne') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationType + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT TAGS -->
                      <div class="flex width-80 w-card-60">
                        <!-- DROPDOWN: TYPE OF USER -->
                        <div class="flex flex-column width-35 input-width-100">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('user.type') }"
                          >{{ $t('newUser.label.userType') }} *</label>
                          <select
                            name="user.type"
                            v-model="user.type"
                            @change="refreshTypeUser(user.type)"
                            class="select-style f-12-500-gray-light width-100"
                            :placeholder="$t('newUser.select.userType')"
                            v-validate="'required'"
                            :disabled="user.tm2"
                          >
                            <option value>{{ $t('newUser.select.userType') }}</option>
                            <option
                              v-for="typeUser in listUsers"
                              :key="typeUser"
                              :value="typeUser"
                            >{{ $t('newUser.listTypeUsers.' + typeUser) }}</option>
                          </select>
                        </div>
                        <!-- DROPDOWN: TYPE OF USER END -->

                        <!-- DROPDOWN: PROFILE -->
                        <div
                          v-if="user.type"
                          class="flex flex-column width-35 input-width-100 position-list-profiles"
                        >
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('user.type') }"
                          >{{ $t('newUser.label.profile') }} *</label>
                          <profiles-by-type-of-user
                            v-if="user.type"
                            :userType="user.type"
                            :key="componentKey"
                            :isTm2="user.tm2"
                          />
                        </div>
                        <!-- DROPDOWN: PROFILE END -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECOND STEP -->
                {{ isUser }}
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full">
                    <div class="validation-success" v-if="generalOK"></div>
                    <div class="validation-fail" v-if="!generalOK"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-14-500-gray">
                        <div class="width-100">
                          {{ $t('newUser.stepTwo') }}
                          <img
                            class="validation-img w-14-840"
                            v-if="generalOK"
                            :src="'/static/icons/' + 'validation-success' + '.svg'"
                          />
                          <img
                            class="validation-img w-14-840"
                            v-if="!generalOK"
                            :src="'/static/icons/' + 'validation-fail' + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT CONTENT  -->
                      <div class="flex width-80 w-card-70 w-card-60 flex-column">
                        <!-- DROPDOWN : DEPARTMENT (TO TYPE_USER != 'USER')-->
                        <div
                          class="flex flex-column width-40 input-width-100 margin-20-b"
                          v-if="this.user.type != 'USER'"
                        >
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': false }"
                          >{{ $t('newUser.label.department') }} *</label>
                          <select
                            name="user.department"
                            :multiple="true"
                            :automaticDropdown="true"
                            v-model="user.departments"
                            class="select-style f-12-500-gray-light width-100 height-100"
                            :placeholder="$t('newUser.select.department')"
                          >
                            <option
                              v-for="(department, id) in activeDepartments"
                              :key="id"
                              :value="department.id"
                            >{{ department.name }}</option>
                          </select>
                        </div>
                        <!-- DROPDOWN : COMPANY (ONLY SHOW IF IS A USER) -->
                        <div
                          class="flex flex-column width-35 input-width-80 margin-20-b"
                          v-if="this.user.type == 'USER'"
                        >
                          <label
                            v-if="generalOK"
                            class="f-10-500-darkcyan"
                          >{{ $t('newUser.label.company') }}</label>
                          <label
                            v-if="!generalOK"
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('user.company.id') }"
                          >{{ $t('newUser.label.company') }}</label>
                          <select
                            name="user.company.id"
                            v-model="user.company.id"
                            @change="companyIsValid"
                            v-validate="user.type == 'USER' ? 'required' : ''"
                            :data-vv-as="'\'' + $t('newUser.label.company')+ '\''"
                            class="select-style f-12-500-gray-light width-100"
                            :placeholder="$t('newUser.select.company')"
                          >
                            <option value>{{ $t('newUser.select.company') }}</option>
                            <option
                              v-for="(company, id) in listCompanys"
                              :key="id"
                              :value="company.id"
                            >{{ company.name }}</option>
                          </select>
                          <span
                            v-if="!generalOK"
                            class="color-red"
                          >{{errors.first('user.company.id')}}</span>
                        </div>
                        <div class="flex-full flex-column-680 input-width-100">
                          <!-- Text : DISPLAY NAME -->
                          <div class="flex flex-column width-40 input-width-100 margin-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('user.displayName') }"
                            >{{ $t('newUser.label.displayName') }} *</label>
                            <input
                              name="user.displayName"
                              v-validate="'required'"
                              v-model="user.displayName"
                              :data-vv-as="'\'' + $t('newUser.label.displayName')+ '\''"
                              type="text"
                              class="input-style f-12-300-gray width-80"
                              :placeholder="$t('newUser.label.displayName')"
                            />
                            <span class="color-red">{{errors.first('user.displayName')}}</span>
                          </div>
                          <!-- Text : USER NAME -->
                          <div class="flex flex-column width-40 input-width-100 margin-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('user.username') }"
                            >{{ $t('newUser.label.username') }} *</label>
                            <input
                              name="user.username"
                              :disabled="edit"
                              v-validate="!edit ? 'required' : ''"
                              v-model.trim="username"
                              :data-vv-as="'\'' + $t('newUser.label.username')+ '\''"
                              type="text"
                              class="input-style f-12-300-gray width-80"
                              :class="edit ? 'inputDisabled' : ''"
                              :placeholder="$t('newUser.placeholder.username')"
                            />
                            <span class="color-red">{{errors.first('user.username')}}</span>
                          </div>
                        </div>
                        <div
                          class="flex width-50 text-right margin-20-t padding-50-l flex-align-items-center"
                          v-if="!user.tm2 && edit"
                        >
                          <div class="text-left">
                            <label class="padding-15-r">{{ $t('newUser.label.reset_pass') }}</label>
                          </div>
                          <div class="text-left">
                            <b-form-checkbox
                              v-model="showPasswordInput"
                              name="user.resetPassword"
                              switch
                            ></b-form-checkbox>
                          </div>
                        </div>
                        <div
                          class="flex width-50 text-right margin-20-t padding-50-l flex-align-items-center"
                          v-if="!user.tm2 && edit"
                        ></div>
                        <!-- PASSWORD -->
                        <div class="flex-full flex-column-680 input-width-100">
                          <div
                            class="flex flex-column width-40 input-width-100 margin-20-b"
                            v-if="showPasswordInput"
                          >
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('userpassword') }"
                            >{{ $t('newUser.label.password') }} *</label>
                            <input
                              name="userpassword"
                              ref="userpassword"
                              v-validate="showPasswordInput ? 'required|min:6' : ''"
                              v-model="password"
                              :data-vv-as="'\'' + $t('newUser.label.password')+ '\''"
                              type="password"
                              class="input-style f-12-300-gray width-80"
                              :placeholder="$t('newUser.placeholder.password')"
                            />
                            <span class="color-red">{{errors.first('userpassword')}}</span>
                          </div>
                          <!-- CONFIRM PASSWORD -->
                          <div
                            class="flex flex-column width-40 input-width-100"
                            v-if="showPasswordInput"
                          >
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('user.rePassword') }"
                            >{{ $t('newUser.label.rePassword') }} *</label>
                            <input
                              name="user.rePassword"
                              v-validate="showPasswordInput ? validationPassword : ''"
                              v-model="rePassword"
                              :data-vv-as="'\'' + $t('newUser.label.rePassword')+ '\''"
                              type="password"
                              class="input-style f-12-300-gray width-80"
                              :placeholder="$t('newUser.placeholder.rePassword')"
                            />
                            <span class="color-red">{{errors.first('user.rePassword')}}</span>
                          </div>
                        </div>
                        <!-- JIRA TOKEN -->
                        <div
                          class="flex-full flex-column-680 input-width-100"
                          v-if="this.user.type !== 'USER'"
                        >
                          <div class="flex flex-column width-80 input-width-100">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('user.jiraToken') }"
                            >{{ $t('newUser.label.jiraToken') }}</label>
                            <textarea
                              name="user.jiraToken"
                              v-model="user.jiraToken"
                              class="text-shadow textarea-modal input-style f-12-300-gray width-100"
                              :placeholder="$t('newUser.placeholder.jiraToken')"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- THIRD STEP -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full">
                    <div :class="validationPersonal"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-14-500-gray">
                        <div class="width-100">
                          {{ $t('newUser.stepThree') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationPersonal + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT CONTENT  -->
                      <div class="flex width-80 w-card-70 w-card-60 flex-column">
                        <!-- Text : PHONE NUMBER -->
                        <div class="flex flex-column width-40 input-width-100 margin-20-b">
                          <label
                            class="padding-15-r"
                            :class="{'color-red': errors.has('user.phone') }"
                          >{{ $t('newUser.label.phone') }} *</label>
                          <vue-phone-number-input
                            name="user.phone"
                            v-if="showDefaultCountry"
                            style="margin-top: 2px"
                            :default-country-code="defaultCountry"
                            :translations="translations"
                            :formatInternational="user.phone"
                            v-validate="{ required: true }"
                            :data-vv-as="'\'' + $t('newUser.label.phone')+ '\''"
                            v-model="user.phone"
                            @update="updatePhone"
                          />
                          <!-- <the-mask
                            name="user.phone"
                            v-validate="{ required: true, regex: /^([-+]?[0-9]+)$/, min: 10}"
                            v-model="user.phone"
                            :data-vv-as="'\'' + $t('newUser.label.phone')+ '\''"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newUser.placeholder.phone')"
                            :mask="['(##) ####-####', '(##) #####-####']"
                          />-->
                          <span class="color-red">{{errors.first('user.phone')}}</span>
                          <span
                            v-if="tryValidate == true"
                            class="color-red"
                          >{{ $t('newUser.invalidPhone') }}</span>
                        </div>
                        <!-- Text : EMAIL -->
                        <div class="flex flex-column width-40 input-width-100">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('user.email') }"
                          >{{ $t('newUser.label.email') }} *</label>
                          <input
                            name="user.email"
                            v-validate="'required|email'"
                            v-model="user.email"
                            :data-vv-as="'\'' + $t('newUser.label.email')+ '\''"
                            type="email"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newUser.placeholder.email')"
                          />
                          <span class="color-red">{{errors.first('user.email')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- FOUTH STEP -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full">
                    <div :class="validationPropriety"></div>
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-14-500-gray">
                        <div>
                          {{ $t('newUser.stepFour') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationPropriety + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- STATUS -->
                      <div class="flex width-80 w-card-70 w-card-60">
                        <div class="flex flex-column width-40 input-width-100">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('user.active') }"
                          >{{ $t('newUser.label.status') }} *</label>
                          <select
                            name="user.active"
                            v-model="user.active"
                            v-validate="'required'"
                            :placeholder="$t('newUser.select.active')"
                            class="select-style f-12-500-gray-light width-100"
                          >
                            <option value>{{ $t('newUser.select.active') }}</option>
                            <option :value="true">{{ $t('newUser.activeTrue') }}</option>
                            <option :value="false">{{ $t('newUser.activeFalse') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- FINAL SEPARATOR -->
                <div class="margin-15-tb flex-full">
                  <hr class="hr-ticket" />
                </div>
                <!-- BUTTONS -->
                <div class="flex-full flex flex-justify-end">
                  <div class="padding-20-r">
                    <button
                      class="btn-medium btn-cancel font-bold"
                      @click="returnListUsers"
                    >{{ $t('cancel') }}</button>
                  </div>
                  <div class="padding-20-r">
                    <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- FOOTER -->
        <div class="widgets">
          <!-- <time-tracker></time-tracker> -->
          <!-- <jira-actions></jira-actions>-->
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { Select, Option, Checkbox } from "element-ui";
import Notification from "src/backend/models/Notification.js";
import Department from "src/backend/models/Department.js";
import Company from "src/backend/models/Company.js";
import User from "src/backend/models/User.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewUser",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },
  data() {
    return {
      componentKey: 0,
      postOrPut: false,
      currentCountry: this.$store.getters.getCountryDefault,
      isValid: false,
      showDefaultCountry: false,
      defaultCountry: this.$store.getters.getCountryDefault,
      translations: {
        countrySelectorLabel: this.$t(
          "newUser.placeholder.countrySelectorLabel"
        ),
        countrySelectorError: this.$t(
          "newUser.placeholder.countrySelectorError"
        ),
        phoneNumberLabel: this.$t("newUser.placeholder.phoneNumberLabel"),
        example: this.$t("newUser.placeholder.example")
      },
      generalOK: false,
      user: {
        type: "",
        department: "",
        company: { id: "" },
        displayName: "",
        username: "",
        password: "",
        rePassword: "",
        phone: "",
        email: "",
        jiraToken: "",
        active: true,
        departments: []
      },
      company: "",
      password: "",
      phone: "",
      rePassword: "",
      username: "",
      validationPassword: {
        confirmed: "userpassword",
        required: true,
        min: 6
      },
      listUsers: ["ADMIN", "USER", "AGENT"],
      activeDepartments: [],
      listDepartments: [],
      listCompanys: [],
      showPasswordInput: true,
      edit: false
    };
  },
  computed: {
    tryValidate() {
      return this.postOrPut == true && this.phone
        ? this.isValid
          ? false
          : true
        : false;
    },

    setDefaultCountry() {
      return this.defaultCountry;
    },

    isUser() {
      this.validateGeneralFields();
      return "";
    },

    validationType: function() {
      return this.validationClass(
        this.user.type !== "" && this.$store.getters.getProfileByTypeOfUser
      );
    },

    validationGeneral: function() {
      return this.validatons();
    },

    validationPersonal: function() {
      return this.validationClass(
        !this.errors.has("user.phone") &&
          this.user.phone &&
          !this.errors.has("user.email") &&
          this.user.email &&
          this.isValid &&
          (this.currentCountry == "BR"
            ? this.phone.length == 13 || this.phone.length == 14
              ? true
              : false
            : true)
      );
    },

    validationPropriety: function() {
      return this.validationClass(this.user.active !== "");
    }
  },
  created() {
    this._getLoading(true);
    this.getNotifications();
    Department.get()
      .then(result => {
        this.listDepartments = result.data;
        this.activeDepartments = this.listDepartments.filter(department => {
          return department.active;
        });
        this.getCompanies();
      })
      .catch(e => {});
  },
  watch: {
    username: function(newUsername) {
      let cleanUsername = newUsername.replace(/[^\w]/gi, "").trim();
      this.username = cleanUsername;
      this.user.username = cleanUsername;
    },
    defaultCountry: function(newDefaultCountry) {
      this.defaultCountry = newDefaultCountry;
    }
  },
  methods: {
    getCompanies() {
      Company.get()
        .then(result => {
          this.listCompanys = result.data;
          this.verifyEdit();
        })
        .catch(e => {});
    },
    verifyEdit() {
      if (this.$router.history.current.params.id) {
        this.edit = true;
        User.getOne(this.$router.history.current.params.id)
          .then(s => {
            this.user = s.data;
            this.showPasswordInput = false;
            this.user.password = null;
            this.user.company
              ? ""
              : ((this.user.company = {}), (this.user.company.id = ""));
            this.user.rePassword = null;
            this.username = this.user.username;
            this.user.phone = this.formatPhone(this.user.phone);
            this.user.departments = this.user.departments.map(({ id }) => id);
            this.$store.commit("setProfileByTypeOfUser", this.user.authority);
            this._getLoading(false);
          })
          .catch(e => {
            this._getLoading(false);
          });
      } else {
        this.showDefaultCountry = true;
        this._getLoading(false);
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    refreshTypeUser(typeUser) {
      this.$store.commit("setProfileByTypeOfUser", undefined);
      this.forceRerender();
    },
    findCountryAcronym(DDI) {
      this.find = false;
      this.$store.getters.getCountryList.forEach(element => {
        if (element.dialCode == DDI) {
          this.defaultCountry = element.iso2.toUpperCase();
          this.showDefaultCountry = true;
          this.find = true;
        }
      });
      return this.find ? true : false;
    },

    removeDialCode(number, phone) {
      return (phone = phone.substring(0, number));
    },

    findDialCode: function(phone) {
      this.showDefaultCountry = true;
      let firstThree = phone.substring(0, 3);
      let firstTwo = phone.substring(0, 2);
      let first = phone.substring(0, 1);
      this.findCountryAcronym(firstThree) == false
        ? this.findCountryAcronym(firstTwo) == false
          ? this.findCountryAcronym(first) == false
            ? ""
            : (phone = phone.substr(1))
          : (phone = phone.substr(2))
        : (phone = phone.substr(3));
      return phone;
    },

    formatPhone(phone) {
      phone = phone.replace("+", "");
      phone = phone.replace("-", "");
      phone = phone.replace(".", "");
      phone.length == 8 || phone.length == 9 || phone.length == 10
        ? ((this.defaultCountry = this.$store.getters.getCountryDefault),
          (this.showDefaultCountry = true))
        : "";
      phone.length > 10
        ? (phone = this.findDialCode(phone))
        : (this.showDefaultCountry = true);
      return phone;
    },

    updatePhone(event) {
      event.countryCode
        ? (this.currentCountry = event.countryCode)
        : this.$store.getters.getCountryDefault;
      event.isValid == true ? (this.isValid = true) : (this.isValid = false);
      event.formattedNumber ? (this.phone = event.formattedNumber) : "";
    },

    validations: function() {
      return this.validationClass(
        this.user.displayName &&
          this.user.username &&
          (this.showPasswordInput
            ? !this.errors.has("userpassword") &&
              !!this.password &&
              !this.errors.has("user.rePassword") &&
              !!this.rePassword
            : true) &&
          ((this.user.type != "USER" && this.user.departments.length > 0) ||
            this.user.type == "USER")
      );
    },

    validateGeneralFields() {
      this.user.type != "USER" && this.validations() == "validation-success"
        ? (this.generalOK = true)
        : this.companyIsValid();
    },

    companyIsValid: function() {
      this.user.company.id != "" && this.validations() == "validation-success"
        ? (this.generalOK = true)
        : (this.generalOK = false);
    },

    validationClass(boolean) {
      return boolean ? "validation-success" : "validation-fail";
    },

    returnListUsers() {
      this.$router.push({ name: "Listar Usuários" });
    },

    validDepartmentCompany() {
      return (
        (this.user.departments.length > 0 && this.user.type !== "USER") ||
        (this.company && this.user.type === "USER")
      );
    },
    validateBeforeSubmit() {
      this._getLoading(true);
      this.$validator.validateAll().then(result => {
        this.postOrPut = true;
        if (
          result &&
          ((this.user.type !== "USER" && this.user.departments.length > 0) ||
            this.user.type === "USER")
        ) {
          const user = { ...this.user };
          user.name = this.user.displayName;
          user.departments = user.departments.map(id => ({ id: id }));
          if (user.type === "USER" && user.company.id !== "") {
            user.departments = [];
          } else {
            user.company = null;
          }
          if (this.showPasswordInput) {
            user.resetPassword = true;
            user.password = this.password;
            user.rePassword = this.rePassword;
          }
          if (!this.edit && this.validationPersonal == "validation-success") {
            user.phone = this.phone;
            user.authority = this.$store.getters.getProfileByTypeOfUser;
            User.post(user)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.user")} ${this.$t(
                    "swal.titleSuccess"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.user.company =
                  this.user.type != "USER" ? "" : this.user.company;

                if (this.$store.getters.getUser.id === user.id) {
                  this.$store.commit('setUser', user);
                }

                this.returnListUsers();
              })
              .catch(e => {
                this._getLoading(false);
                this.$swal.fire({
                  title: this.$t("swal.titleError"),
                  text: e.response.data.message,
                  type: "error",
                  showConfirmButton: true
                });
              });
          }
          if (this.edit && this.validationPersonal == "validation-success") {
            user.password ? "" : delete user.password;
            user.rePassword ? "" : delete user.rePassword;
            user.resetPassword ? "" : delete user.resetPassword;
            user.phone = this.phone;
            user.authority = this.$store.getters.getProfileByTypeOfUser;
            User.put(user)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.user")} ${this.$t(
                    "swal.titleSuccess"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.user.company
                  ? (this.user.company =
                      this.user.type != "USER" ? "" : this.user.company)
                  : "";
                if (this.$store.getters.getUser.id === user.id) {
                  this.$store.commit('setUser', user);
                }
                this.returnListUsers();
              })
              .catch(e => {
                this._getLoading(false);
                this.$swal.fire({
                  title: this.$t("swal.titleError"),
                  text: e.response.data.message,
                  type: "error",
                  showConfirmButton: true
                });
              });
          }
          if (this.validationPersonal == "validation-fail") {
            this.showError();
          }
        } else {
          this.showError();
        }
      });
    },

    showError() {
      this._getLoading(false);
      this.$swal.fire({
        title: this.$t("swal.titleError"),
        text: this.$t("swal.errorFields"),
        type: "error",
        showConfirmButton: true
      });
    },

    getNotifications() {
      Notification.get(
        this.$store.getters.getUser.id,
        this.$store.getters.getUser.locale
      )
        .then(result => {
          this.notifications = result.data.content;
        })
        .catch(e => {});
    }
  }
};
</script>
  <style scoped lang="scss">
@import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #0097a7;
  background-color: #0097a7;
}

.inputDisabled {
  color: #a6a6a6;
  background-color: #f2f2f2;
}

.position-list-profiles {
  margin-left: 3rem;
}
</style>
