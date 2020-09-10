<template>
  <div id="main">
    <div id="container-login">
      <div class="item left">
        <div class="item">
          <img src="/static/img/login/logo_tm2_digital.svg" class="logo">
        </div>
        <div class="content-info">
          <div class="item last-update"></div>
        </div>
      </div>
      <div class="item middle">
        <div class="content-middle">
          <div class="middle-logo-tm2">
            <img src="/static/img/login/new_tm2Digital2_new.svg" id="logoImg">
            <img src="/static/img/login/nologo_tm2digital.svg" id="logoTM2Digital">
          </div>
          <div class="line-middle"></div>
          <div class="middle-text-comercial">{{ $t('login.tickets') }}</div>
          <form name="loginForm" class="form" @submit.prevent="newPassword">
            <div class="middle-inputs">
              <div class="flex flex-column f-18-300-gray text-center">
                {{ $t('login.changePassword') }}
                <span class="f-14-300-gray margin-10-t">{{ $t('login.setNewPassword') }}</span>
              </div>
              <div v-if="success" class="success-login">
                <span>{{ $t('login.success') }}</span>
              </div>
              <div v-else-if="error" class="error-login">
                <span>{{ $t('login.noSuccess') }}</span>
              </div>
              <div class="username">
                <img src="/static/icons/login/icon_password_dark.svg" style="opacity: 0.5;">
                <input
                  type="password"
                  class="form-control input-style"
                  name="password"
                  v-model="password"
                  @click="interation"
                  :placeholder="$t('login.newPassword')">
              </div>
              <div class="username">
                <img src="/static/icons/login/icon_password_dark.svg" style="opacity: 0.5;">
                <input
                  type="password"
                  class="form-control input-style"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  :placeholder="$t('login.confirmPassword')">
              </div>
              <div class="div-button-login">
                <div>
                  <input type="submit" class="button-green uppercase" :value="$t('login.resetPassword')">
                </div>
                <div class="division"></div>
                <div class="group-forgot-contact">
                  <div
                    class="text-forgot-pass uppercase"
                    @click="returnLogin">
                      {{ $t('login.back') }}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="item right"></div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import Prescription from "src/backend/models/Prescription.js";

export default {
  data() {
    return {
      password: undefined,
      confirmPassword: undefined,
      usernameClick: true,
      error: false,
      success: undefined,
      errorResetPassword: undefined,
      msgError: "Dados Incorretos",
      toggleResetPassword: false
    };
  },
  created() {
    this._getLocale();
  },
  methods: {
    interation() {
      if (this.usernameClick === true) {
        document
          .querySelector(".middle-logo-tm2")
          .classList.toggle("--moveLogo");
        document
          .querySelector(".line-middle")
          .classList.toggle("--moveDivisor");
        setTimeout(function() {
          document
            .querySelector("#logoTM2Digital")
            .classList.toggle("logoTM2Digital-fade");
        }, 500);
        this.usernameClick = false;
      }
    },

    opacityElement(elementChoice) {
      document.querySelector(elementChoice).style.opacity = "1";
    },

    screenHide(screenType) {
      // vm.success = false;
      // vm.errorResetPassword = false;

      if (screenType === "screenLogin") {
        document.querySelector(".screen-login").style.display = "none";
        document.querySelector(".screen-reset-password").style.display = "flex";
      } else {
        document.querySelector(".screen-login").style.display = "block";
        document.querySelector(".screen-reset-password").style.display = "none";
      }
    },

    newPassword() {
      this.verifyPassword(this.password, this.confirmPassword);
      if (this.error === false) {
        this._getLoading(true);
        User.putResetPassword(this.password)
          .then(result => {
            if (result === false) {
              this.error = true;
              this._getLoading(false);
            } else {
              this.success = true;
              this._getLoading(false);
              this.returnLogin();
              this.$swal.fire({
                title: this.$t('login.changePassword'),
                text: this.$t('login.passwordSuccess'),
                type: "success",
                showConfirmButton: true
              });
            }
          })
          .catch(e => {
            this.error = true;
            this._getLoading(false);
          });
      }
    },

    verifyPassword(password, confirmPassword) {
      if (!(password || confirmPassword)) {
        this.error = true;
      } else if (password !== confirmPassword) {
        this.error = true;
      } else if (password.length < 6) {
        this.error = true;
      } else {
        this.error = false;
      }
    },

    returnLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/login";
</style>
