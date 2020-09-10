<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListSlas">
            <img src="/static/icons/back.svg" alt />
          </div>
          <div class="margin-20-rl division background-darkcyan"></div>
          <div>
            <span class="f-18-100-gray">{{ this.edit?$t('title.editSla'):$t('title.newSla') }}</span>
          </div>
        </div>
      </div>
      <!-- BODY -->
      <div class="flex-full flex-column-1125">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <!-- FORM -->
            <form @submit.prevent="validateBeforeSubmit">
              <!-- FIRST STEP: GENERAL INFO -->
              <div class="flex-full flex-column">
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationSla"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- VALIDATION LABEL -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newSla.form.sla.title') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationSla+ '.svg'"
                          />
                        </div>
                      </div>
                      <!-- TEXT : SLA NAME -->
                      <div class="flex width-80 w-card-70 w-card-60 flex-column">
                        <div class="flex flex-column width-80 input-width-100 margin-15-b">
                          <label
                            class="f-10-500-darkcyan f-9-500-darkcyan"
                            :class="{ 'color-red': errors.has('newSla.name') }"
                          >{{ $t('newSla.form.sla.name') }} *</label>
                          <input
                            name="sla.name"
                            v-validate="'required'"
                            v-model="sla.name"
                            :data-vv-as="'\'' + $t('newSla.form.sla.name')+ '\''"
                            type="text"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newSla.form.sla.name')"
                          />
                          <span class="color-red">{{errors.first('newSla.name')}}</span>
                        </div>
                        <!-- TEXT : SLA DESCRIPTION-->
                        <div class="flex flex-column width-80 input-width-100 margin-15-b">
                          <label
                            class="f-10-500-darkcyan f-9-500-darkcyan"
                            :class="{ 'color-red': errors.has('sla.description') }"
                          >{{ $t('newSla.form.sla.description') }} *</label>
                          <input
                            name="sla.description"
                            v-validate="'required'"
                            v-model="sla.description"
                            :data-vv-as="'\'' + $t('newSla.form.sla.description')+ '\''"
                            type="text"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newSla.form.sla.description')"
                          />
                          <span class="color-red">{{errors.first('sla.description')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- SECOND STEP: PROPERTIES -->
              <div class="flex-full flex-column">
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationProperties"></div>
                    <div class="flex-full padding-15-trbl">
                      <!-- VALIDATION LABEL -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newSla.form.sla.properties') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationProperties + '.svg'"
                          />
                        </div>
                      </div>
                      <div class="flex width-80 w-card-70 w-card-60 flex-column">
                        <!-- TIME : DEADLINE-->
                        <div class="flex flex-column width-100 margin-15-b">
                          <div class="flex text-right flex-align-items-center margin-10-t">
                            <label class="f-10-500-darkcyan">{{$t('newSla.form.sla.deadline')}}</label>
                            <div class="flex flex-column-780 width-50 sla-width">
                              <div class="col input-group input-group-sm padding-b-780">
                                <input
                                  min="0"
                                  v-validate="'required'"
                                  class="form-control"
                                  type="number"
                                  v-model="sla.hoursDeadline"
                                />
                                <div class="input-group-append">
                                  <span class="input-group-text">h</span>
                                </div>
                              </div>
                              <div class="col input-group input-group-sm">
                                <input
                                  min="0"
                                  max="59"
                                  v-validate="'required'"
                                  class="form-control"
                                  type="number"
                                  v-model="sla.minutesDeadline"
                                />
                                <div class="input-group-append">
                                  <span class="input-group-text">min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- TIME : INITIAL TIME-->
                        <div class="flex flex-column width-100 margin-15-b">
                          <div class="flex text-right flex-align-items-center margin-10-t">
                            <label class="f-10-500-darkcyan">{{$t('newSla.form.sla.initial')}}</label>
                            <div class="flex flex-column-780 width-50 sla-width">
                              <div class="col input-group input-group-sm padding-b-780">
                                <input
                                  min="0"
                                  v-validate="'required'"
                                  class="form-control"
                                  type="number"
                                  v-model="sla.hoursInitialTime"
                                />
                                <div class="input-group-append">
                                  <span class="input-group-text">h</span>
                                </div>
                              </div>
                              <div class="col input-group input-group-sm">
                                <input
                                  min="0"
                                  max="59"
                                  v-validate="'required'"
                                  class="form-control"
                                  type="number"
                                  v-model="sla.minutesInitialTime"
                                />
                                <div class="input-group-append">
                                  <span class="input-group-text">min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- DROPDOWN : STATUS -->
                        <div class="flex flex-column width-80 input-width-100">
                          <label
                            class="f-10-500-darkcyan f-9-500-dark cyan"
                            :class="{'color-red': errors.has('sla.status') }"
                          >{{ $t('newSla.form.sla.status') }} *</label>
                          <select
                            name="sla.status"
                            v-model="sla.active"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-40 w-select-issue-type"
                          >
                            <option value>{{ $t('newSla.form.placeholders.selectStatus') }}</option>
                            <option value="true">{{ $t('newSla.form.statusOptions.true') }}</option>
                            <option value="false">{{ $t('newSla.form.statusOptions.false') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="margin-15-tb flex-full">
                <hr class="hr-ticket" />
              </div>
              <!-- BUTTONS -->
              <div class="flex-full flex flex-justify-end">
                <div class="padding-20-r">
                  <button
                    class="btn-medium btn-cancel font-bold"
                    @click.prevent="returnListSlas"
                  >{{ $t('cancel') }}</button>
                </div>
                <div class="padding-20-r">
                  <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- FOOTER -->
        <div class="widgets">
          <!-- <time-tracker></time-tracker> -->
          <!--<jira-actions></jira-actions>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import { Select, Option, Checkbox } from "element-ui";
import Notification from "src/backend/models/Notification.js";
import Sla from "src/backend/models/Sla.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewSla",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  computed: {
    validationSla: function() {
      if (
        !this.errors.has("newSla.name") &&
        !!this.sla.name &&
        !this.errors.has("newSla.description") &&
        !!this.sla.description
      ) {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    },
    validationProperties: function() {
      if (
        (this.sla.hoursDeadline != 0 || this.sla.minutesDeadline != 0) &&
        (this.sla.hoursInitialTime != 0 || this.sla.minutesInitialTime != 0) &&
        this.sla.active != undefined
      ) {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    }
  },

  data() {
    return {
      sla: {
        name: "",
        hoursDeadline: 0,
        minutesDeadline: 0,
        hoursInitialTime: 0,
        minutesInitialTime: 0,
        initialTime: 0,
        description: "",
        active: false,
        deadline: 0
      },
      edit: false
    };
  },

  created() {
    if (this.$router.history.current.params.id) {
      this.edit = true;
      Sla.getById(this.$router.history.current.params.id)
        .then(s => {
          this.sla = s.data;
          this.sla.hoursDeadline = Math.floor(this.sla.deadline / 3600);
          this.sla.minutesDeadline = (this.sla.deadline % 3600) / 60;
          this.sla.hoursInitialTime = Math.floor(this.sla.initialTime / 3600);
          this.sla.minutesInitialTime = (this.sla.initialTime % 3600) / 60;
        })
        .catch(e => {});
    }
    this.getNotifications();
  },

  methods: {
    returnListSlas() {
      this.$router.push({ name: "Listar SLAs" });
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.edit) {
            this.validateInactivate();
          } else {
            this.newSla();
          }
        } else {
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: this.$t("swal.errorFields"),
            type: "error",
            showConfirmButton: true
          });
        }
        return;
      });
    },

    newSla() {
      this._getLoading(true);
      this.sla.deadline = 3600 * this.sla.hoursDeadline + 60 * this.sla.minutesDeadline;
      this.sla.initialTime = 3600 * this.sla.hoursInitialTime + 60 * this.sla.minutesInitialTime;
      if (this.edit) {
        Sla.put(this.sla)
          .then(result => {
            this._getLoading(false);

            this.$swal.fire({
              title: `${this.$t("label.sla")} ${this.$t("swal.titleSuccess")}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true
            });
            this.returnListSlas();
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
        Sla.post(this.sla)
          .then(result => {
            this._getLoading(false);
            this.$swal.fire({
              title: `${this.$t("label.sla")} ${this.$t("swal.titleSuccess")}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true
            });
            this.returnListSlas();
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
    },

    validateInactivate() {
      var active =  this.sla.active == true || this.sla.active == 'true';
      if (!active) {
        Sla.verify(this.sla.id)
          .then( result => {
            if (result.data) {
              this.$swal
                .fire({
                  title: this.$t("newSla.confirm.titleTicket"),
                  html: this.$t("newSla.confirm.msgTicket"),
                  type: "warning",
                });
            } else {
              this.$swal
                .fire({
                  title: this.$t("newSla.confirm.warning"),
                  html: this.$t("newSla.confirm.msgConfirm"),
                  type: "warning",
                  showCloseButton: false,
                  showCancelButton: true,
                  showConfirmButton : true,
                  cancelButtonColor: '#d33',
                  focusConfirm: false,
                  confirmButtonText: this.$t("newSla.confirm.yes"),
                  cancelButtonText: this.$t("newSla.confirm.no")
                })
                .then(result => {
                  if (result.value) {
                    this.newSla();
                  }
                });
            }
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
      }else {
        this.newSla();
      }
    }
  }
};
</script>

<style>
</style>
