<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListStatusTickets">
            <img src="/static/icons/back.svg" />
          </div>
          <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
          <div>
            <span
              class="f-18-100-gray"
            >{{ isEdit ? $t('title.editStatusTicket') : $t('title.newStatusTicket') }}</span>
          </div>
        </div>
      </div>
      <!-- BODY -->
      <div class="flex-full flex-column-1125">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <!-- FORM -->
            <form @submit.prevent="validateBeforeSubmit">
              <div class="flex-full flex-column">
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>
                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-20 w-title-30 w-title-50 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newStatusTicket.labelContent') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationGeneral + '.svg'"
                          />
                        </div>
                      </div>
                      <div class="flex width-80 w-card-70 w-card-50 flex-column">
                        <!-- Input: Name of Status Ticket -->
                        <div class="flex flex-column width-50 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{ 'color-red': errors.has('statusTicket.name') }"
                          >{{ $t('newStatusTicket.label.name') }}</label>
                          <input
                            name="statusTicket.name"
                            v-validate="'required'"
                            v-model="statusTicket.name"
                            type="text"
                            :data-vv-as="'\'' + $t('newStatusTicket.label.name')+ '\''"
                            class="input-style f-12-300-gray width-70"
                            :placeholder="$t('newStatusTicket.placeholder.name')"
                          />
                          <span class="color-red">{{errors.first('newStatusTicket.name')}}</span>
                        </div>
                        <!-- Input: active  -->
                        <div
                          class="flex flex-column width-50 input-width-100 padding-20-t padding-20-b"
                        >
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('statusTicket.active') }"
                          >{{ $t('newStatusTicket.label.status') }} *</label>
                          <select
                            name="statusTicket.active"
                            v-model="statusTicket.active"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-70"
                          >
                            <option value>{{ $t('newStatusTicket.placeholder.status') }}</option>
                            <option value="true">{{ $t('newStatusTicket.select.active') }}</option>
                            <option value="false">{{ $t('newStatusTicket.select.inactive') }}</option>
                          </select>
                        </div>
                        <!-- Input: closed -->
                        <div
                          class="flex flex-column width-50 input-width-100 padding-20-t padding-20-b"
                        >
                          <label
                            class="f-10-500-darkcyan"
                            :class="{ 'color-red' : errors.has('statusTicket.closed') }"
                          >{{ $t('newStatusTicket.label.finishStatus') }} *</label>
                          <select
                            name="statusTicket.closed"
                            v-model="statusTicket.closed"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-70"
                          >
                            <option value>{{ $t('newStatusTicket.placeholder.finishStatus') }}</option>
                            <option value="true">{{ $t('newStatusTicket.select.active') }}</option>
                            <option value="false">{{ $t('newStatusTicket.select.inactive') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-full">
                  <hr class="hr-ticket" />
                </div>
                <!-- BUTTONS -->
                <div class="flex-full flex flex-justify-end">
                  <div class="padding-20-r">
                    <button
                      class="btn-medium btn-cancel font-bold"
                      @click="returnListStatusTickets"
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
        <div class="widgets">
          <!-- <jira-actions></jira-actions> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option, Checkbox } from "element-ui";
import StatusTicket from "src/backend/models/StatusTicket.js";
import Notification from "src/backend/models/Notification.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewStatusTicket",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  data() {
    return {
      statusTicket: {
        name: "",
        active: "",
        closed: ""
      },
      isEdit: false
    };
  },

  created() {
    this.getNotifications();
    if (this.$router.history.current.params.id) {
      this.isEdit = true;
      StatusTicket.getById(this.$router.history.current.params.id)
        .then(s => {
          this.statusTicket = s.data;
          this.statusTicket.closed = s.data.closed;
        })
        .catch(e => {});
    }
  },

  computed: {
    validationGeneral: function() {
      return this.validationClass(
        !this.errors.has("statusTicket.name") &&
          !!this.statusTicket.name &&
          this.statusTicket.active != "" &&
          (this.statusTicket.closed != "" || this.statusTicket.closed == false)
      );
    }
  },

  methods: {
    validationClass(boolean) {
      return boolean ? "validation-sucess" : "validation-fail";
    },

    returnListStatusTickets() {
      this.$router.push({ name: "Lista de Status de Tickets" });
    },

    validateBeforeSubmit() {
      this._getLoading(true);
      const statusTicket = { ...this.statusTicket };

      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.isEdit) {
            StatusTicket.put(statusTicket)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.statusTicket")} ${this.$t(
                    "swal.titleSuccess"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.returnListStatusTickets();
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
          } else {
            StatusTicket.post(statusTicket)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.statusTicket")} ${this.$t(
                    "swal.titleSuccess"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.returnListStatusTickets();
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
        } else {
          this._getLoading(false);
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: this.$t("swal.errorFields"),
            type: "error",
            showConfirmButton: true
          });
        }
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
