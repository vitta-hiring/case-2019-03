<template>
  <div>
    <modal
      name="create-user"
      height="auto"
      width="50%"
      :scrollable="true"
      @before-open="beforeOpen"
    >
      <div class="div-hover">
        <form class="margin-20-b" @submit.prevent="validateBeforeSubmit">
          <div class="flex-full margin-10-trbl">
            <div>
              <span class="f-20-100-gray">{{edit?'Editar':'Adicionar'}} usuário</span>
            </div>
          </div>
          <div class="flex flex-column marginCenter width-90">
            <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
              <div class="flex-full">
                <div :class="validationGeneral"></div>
                <div class="flex-full padding-15-trbl">
                  <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-14-500-gray">
                    <div class="width-100">
                      {{ $t('newUser.stepTwo') }}
                      <img
                        class="validation-img w-14-840"
                        :src="'/static/icons/' + validationGeneral + '.svg'"
                      />
                    </div>
                  </div>

                  <div class="flex width-100 w-card-70 w-card-60 flex-column margin-20-t">
                    <div class="flex-full flex-column-680 input-width-100">
                      <!-- Text : DISPLAY NAME -->
                      <div class="flex flex-column width-50 input-width-100 margin-20-b">
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
                          class="input-style f-12-300-gray width-80 margin-5-b"
                          :placeholder="$t('newUser.placeholder.displayName')"
                        />
                        <span class="color-red">{{errors.first('user.displayName')}}</span>
                      </div>
                      <!-- Text : USER NAME -->
                      <div class="flex flex-column width-50 input-width-100 margin-20-b">
                        <label
                          class="f-10-500-darkcyan"
                          :class="{'color-red': errors.has('user.username') }"
                        >{{ $t('newUser.label.username') }} *</label>
                        <input
                          name="user.username"
                          :disabled="editUsername"
                          v-validate="!editUsername ? 'required' : ''"
                          v-model.trim="username"
                          :data-vv-as="'\'' + $t('newUser.label.username')+ '\''"
                          type="text"
                          class="input-style f-12-300-gray width-80 margin-5-b"
                          :class="editUsername ? 'inputDisabled' : ''"
                          :placeholder="$t('newUser.placeholder.username')"
                        />
                        <span class="color-red">{{errors.first('user.username')}}</span>
                      </div>
                    </div>
                    <div class="flex-full flex-column-680 input-width-100">
                      <div
                        class="flex flex-column width-50 input-width-100 margin-20-b"
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
                        class="flex flex-column width-50 input-width-100"
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
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
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
                  <div class="flex width-100 w-card-70 w-card-60 flex-column margin-20-t">
                    <div class="flex-full flex-column-680 input-width-100">
                      <!-- TEXT : PHONE NUMBER -->
                      <div class="flex flex-column width-60 input-width-100 margin-20-b">
                        <label
                          class="padding-15-r"
                          :class="{'color-red': errors.has('user.phone') }"
                        >{{ $t('newUser.label.phone') }} *</label>
                        <vue-phone-number-input
                          name="user.phone"
                          v-if="showDefaultCountry"
                          style="margin-top: 2px"
                          :class="{'width-100': fullHD, 'width-100': HD}"
                          :default-country-code="defaultCountry"
                          :translations="translations"
                          :formatInternational="user.phone"
                          v-validate="{ required: true }"
                          :data-vv-as="'\'' + $t('newUser.label.phone')+ '\''"
                          v-model="user.phone"
                          @update="updatePhone"
                        />
                        <span class="color-red">{{errors.first('user.phone')}}</span>
                        <span
                          v-if="tryValidate == true"
                          class="color-red"
                        >{{ $t('newUser.invalidPhone') }}</span>
                      </div>
                    </div>
                    <div class="flex-full flex-column-680 input-width-100">
                      <!-- Text : EMAIL -->
                      <div class="flex flex-column width-74 input-width-100">
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
                          class="input-style f-12-300-gray width-80 margin-5-b"
                          :placeholder="$t('newUser.placeholder.email')"
                        />
                        <span class="color-red">{{errors.first('user.email')}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- BUTTONS -->
            <div class="flex-full flex flex-justify-end">
              <div class="padding-20-r">
                <button
                  class="btn-medium btn-cancel font-bold"
                  @click.prevent="hideUserModal()"
                >{{ $t('cancel') }}</button>
              </div>
              <div class="padding-20-r">
                <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
              </div>
            </div>
            <!-- BUTTONS-END -->
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import User from "src/backend/models/User";

export default {
  name: "UserModal",
  data() {
    return {
      HD: undefined,
      fullHD: undefined,
      postOrPut: false,
      currentCountry: this.$store.getters.getCountryDefault,
      isValid: false,
      showDefaultCountry: false,
      phone: "",
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
      user: {
        type: "",
        department: "",
        company: {},
        displayName: "",
        username: "",
        password: "",
        rePassword: "",
        phone: "",
        email: "",
        active: "",
        departments: []
      },
      password: "",
      rePassword: "",
      validationPassword: {
        confirmed: "userpassword",
        required: true,
        min: 6
      },
      username: "",
      edit: false,
      editUsername: false,
      showPasswordInput: true,
      clientId: ""
    };
  },
  methods: {
    showError() {
      this._getLoading(false);
      this.$toaster.error(this.$t("swal.errorFields"));
      // this.$swal.fire({
      //   title: this.$t("swal.titleError"),
      //   text: this.$t("swal.errorFields"),
      //   type: "error",
      //   showConfirmButton: true
      // });
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

    clearData() {
      this.user = {
        type: "",
        department: "",
        company: {},
        displayName: "",
        username: "",
        password: "",
        rePassword: "",
        phone: "",
        email: "",
        active: "",
        departments: []
      };
      this.password = "";
      this.rePassword = "";
      this.validationPassword = {
        confirmed: "userpassword",
        required: true,
        min: 6
      };
      this.username = "";
      this.edit = false;
      this.editUsername = false;
      this.showPasswordInput = true;
      this.clientId = null;
    },
    beforeOpen(event) {
      if (event.params) {
        if (event.params.clientId) {
          this.clientId = event.params.clientId;
        }
        if (event.params.user) {
          this.user = { ...event.params.user };
          this.user.phone = this.formatPhone(this.user.phone);
          this.username = this.user.username;
          this.edit = true;
          this.editUsername = !!this.clientId;
          this.showPasswordInput = false;
        }
        if (!event.params.clientId || !event.params.user) {
          this.showDefaultCountry = true;
        }
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        this.postOrPut = true;
        if (result) {
          const user = { ...this.user };
          user.name = this.user.displayName;
          user.departments = [];
          user.active = true;
          user.type = "USER";

          if (this.showPasswordInput) {
            user.password = this.password;
            user.rePassword = this.rePassword;
          }

          if (this.clientId) {
            if (user.id) {
              this._getLoading(true);
              user.phone = this.phone;
              this.edit && this.validationPersonal == "validation-success"
                ? User.put(user)
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
                      this.$emit("refresh");
                      this.hideUserModal(true);
                    })
                    .catch(e => {
                      this._getLoading(false);
                      this.$swal.fire({
                        title: this.$t("swal.titleError"),
                        text: e.response.data.message,
                        type: "error",
                        showConfirmButton: true
                      });
                    })
                : this._getLoading(false);
            } else {
              user.company = { id: this.clientId };
              if (
                !user.displayName ||
                !user.username ||
                user.password != user.rePassword ||
                !user.phone ||
                !user.email
              ) {
                this.$toaster.error("Error.");
              } else {
                this._getLoading(true);
                user.phone = this.phone;
                !this.edit && this.validationPersonal == "validation-success"
                  ? User.post(user)
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
                        this.$emit("refresh");
                        this.$emit("saveUserTicket", r.data);
                        this.hideUserModal(true);
                      })
                      .catch(e => {
                        this._getLoading(false);
                        this.$swal.fire({
                          title: this.$t("swal.titleError"),
                          text: e.response.data.message,
                          type: "error",
                          showConfirmButton: true
                        });
                      })
                  : this._getLoading(false);
              }
              this._getLoading(false);
            }
          } else {
            if (this.validationPersonal == "validation-fail") {
              this.showError();
            }
            if (this.edit && this.validationPersonal == "validation-success") {
              user.phone = this.phone;
              this.$emit("save", user);
              this.hideUserModal(true);
            }
            if (!this.edit && this.validationPersonal == "validation-success") {
              user.phone = this.phone;
              user.tempId = -1;
              this.$emit("save", user);
              this.hideUserModal(true);
            }
            this._getLoading(false);
          }
        }
      });
    },
    hideUserModal(saved) {
      this.clearData();
      this.$modal.hide("create-user");
    },
    validationClass(boolean) {
      return boolean ? "validation-success" : "validation-fail";
    }
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

    validationGeneral: function() {
      return this.validationClass(
        !this.errors.has("user.displayName") &&
          !!this.user.displayName &&
          !this.errors.has("user.username") &&
          !!this.user.username &&
          (this.showPasswordInput
            ? !this.errors.has("userpassword") &&
              !!this.password &&
              !this.errors.has("user.rePassword") &&
              !!this.rePassword
            : true)
      );
    },

    validationPersonal: function() {
      return this.validationClass(
        !this.errors.has("user.phone") &&
          !this.errors.has("user.email") &&
          this.user.email &&
          this.isValid &&
          (this.currentCountry == "BR"
            ? this.phone.length == 13 || this.phone.length == 14
              ? true
              : false
            : true)
      );
    }
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
  created() {
    this.$modal.show("create-user");
    window.innerWidth > 1919 ? (this.fullHD = true) : (this.HD = true);
  }
};
</script>

<style scoped>
.marginCenter {
  margin: 30px auto 0;
}

.inputDisabled {
  color: #a6a6a6;
  background-color: #f2f2f2;
}
</style>
