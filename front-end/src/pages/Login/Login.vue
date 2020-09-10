<template>
  <div id="main">
    <div id="container-login">
      <div class="item left">
        <div class="item">         
        </div>
        <div class="content-info">
          <div class="item last-update"></div>
        </div>
      </div>
      <div class="item middle">
        <div class="content-middle">
          <div class="middle-logo-tm2">
            <img src="https://s3.amazonaws.com/sample-login/companies/avatars/000/001/683/original/logo_original-1.png?1470776200" id="logoImg" />
          </div>
          <div class="line-middle"></div>
          <div class="middle-text-comercial">Prescrições</div>
          <form name="loginForm" class="form" @submit.prevent="login" v-if="!toggleResetPassword">
            <div class="middle-inputs">
              <div v-show="error" class="error-login">
                <span class>{{ msgError }}</span>
              </div>
              <div class="username">
                <img src="/static/icons/login/icon_username_dark.svg" style="opacity: 0.5;" />
                <input
                  name="username"
                  v-model="username"
                  type="text"
                  class="input-style"
                  :placeholder="$t('login.username')"
                  @click="interaction"
                />
              </div>
              <div class="password">
                <img src="/static/icons/login/icon_password_dark.svg" style="opacity: 0.5;" />
                <input
                  name="password"
                  v-model="password"
                  class="input-style"
                  type="password"
                  :placeholder="$t('login.password')"
                />
              </div>
              <div class="div-button-login margin-40-t">
                <div>
                  <button value="LOGIN" class="button-login button-green">{{ $t('login.login') }}</button>
                </div>
                <div class="division"></div>
                <div class="group-forgot-contact">
                  <div
                    class="text-forgot-pass"
                    @click="toggleResetPassword=!toggleResetPassword"
                  >{{ $t('login.forgotPassword') }}</div>
                </div>
              </div>
            </div>
          </form>
          <form name="resetForm" class="form" @submit.prevent="resetPassword" v-else>
            <div class="middle-inputs">
              <div class="title">{{ $t('login.resetPassword') }}</div>
              <div class="description">{{ $t('login.description') }}</div>
              <div v-if="success" class="success-login">
                <span>{{ $t('login.success') }}</span>
              </div>
              <div v-else-if="error" class="error-login">
                <span>{{ $t('login.noSuccess') }}</span>
              </div>
              <div class="username">
                <img src="/static/icons/login/icon_username_dark.svg" class="opacity05" />
                <input
                  name="username"
                  v-model="username"
                  type="text"
                  class="form-control input-style"
                  placeholder="USERNAME"
                />
              </div>
              <div class="div-button-login">
                <div>
                  <input
                    type="submit"
                    class="button-green uppercase"
                    :value="$t('login.resetPassword')"
                  />
                </div>
                <div class="division"></div>
                <div class="group-forgot-contact">
                  <div
                    class="text-forgot-pass uppercase"
                    @click="toggleResetPassword=!toggleResetPassword"
                  >{{ $t('login.back') }}</div>
                </div>
              </div>
            </div>
          </form>
          <!-- <div class="social-networks">
            <div><a href="https://www.facebook.com/tm2digital/" target="_blank"><img src="/chat/resources/images/login/facebook.svg" style="margin-right: 3px; padding-top: 3px;" /></a></div>
            <div><a href="https://www.instagram.com/tm2_digital/" target="_blank"><img src="/chat/resources/images/login/Instagram.svg" style="padding-top: 5px;" /></a></div>
            <div><a href="https://twitter.com/_TM2Digital" target="_blank"><img src="/chat/resources/images/login/twitter.svg" style="padding-top: 5px;" /></a></div>
          </div>-->
        </div>
      </div>
      <div class="item right"></div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import Prescription from "src/backend/models/Prescription.js";
import store from "@/backend/store";

export default {
  data() {
    return {
      username: "",
      password: "",
      locale: navigator.language,
      toggleResetPassword: false,
      usernameClick: true,
      error: false,
      success: undefined,
      msgError: "Dados Incorretos"
    };
  },
  created() {
    // this._logout();
    if (this.$store.getters.getResponse.resetByTokenExpired) {
      localStorage.removeItem("makeLogin");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("locale");
      this.$toaster.error(this.$t("login.resetByTokenExpired"));
      this.$store.commit("setResetByTokenExpired", false);
    }
    if (this.$store.getters.getResponse.resetByBlockedProfile) {
      localStorage.removeItem("makeLogin");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("locale");
      this.$toaster.error(this.$t("login.resetByBlockedProfile"));
      this.$store.commit("setResetByBlockedProfile", false);
    }

    this._getLocale();
    this.$store.commit("setClearSearch", undefined);
    this.$store.commit("setSearchQuery", undefined);
    this.$store.commit("setSearch", undefined);
    if (this.locale === "pt") {
      this.locale = this.locale.toUpperCase() + "_BR";
    } else if (this.locale.indexOf("es") !== -1) {
      this.locale = "ES";
    } else {
      this.locale = "EN";
    }
  },
  methods: {
    interaction() {
      if (this.usernameClick === true) {
        this.usernameClick = false;
      }
    },

    opacityElement(elementChoice) {
      document.querySelector(elementChoice).style.opacity = "1";
    },

    resetPassword() {
      if (!this.username || !this.locale) {
        this.error = true;
        this.msgError = "Campos Vazios";
      }

      this._getLoading(true);

      User.postResetPassword(this.locale, this.username)
        .then(result => {
          if (result === false) {
            this.error = true;
            this._getLoading(false);
          } else {
            this._getLoading(false);
            this.success = true;
          }
        })
        .catch(e => {
          this.error = true;
          this._getLoading(false);
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: e.response.data,
            type: "error",
            showConfirmButton: true
          });
        });
    },

    login() {
      //Caso algum campo esteja vazio
      if (!(this.username && this.password)) {
        this.error = true;
        this.msgError = "Campos Vazios";
        return;
      }

      this._getLoading(true);

      //Faz a requisicao para login no mixin common.js
      this._login(this.username, this.password)
        .then(result => {
          if (result === false) {
            this.error = true;
            this._getLoading(false);
          } else {
            this.error = false;
            this.$store.commit("setLogin", true);

            this.$router.push("list-prescriptions");

            this._getLoading(false);
          }
        })
        .catch(e => {
          this.error = true;
          this._getLoading(false);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/login";
</style>
