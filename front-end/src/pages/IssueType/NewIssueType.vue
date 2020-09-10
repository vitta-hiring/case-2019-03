<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListIssueTypes">
            <img src="/static/icons/back.svg" alt>
          </div>
          <div class="margin-20-rl division background-darkcyan"></div>
          <div>
            <span
              class="f-18-100-gray"
            >{{ this.edit?$t('title.editIssueType'):$t('title.newIssueType') }}</span>
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
                <div class="flex-full box-shadow-hover padding-0-trbl f-10-500-darkcyan">
                  <div class="flex-full section-form">
                    <div :class="validationIssueType"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- VALIDATION LABEL -->
                      <div class="flex width-20 w-title-30 w-title-40 f-10-840 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newIssueType.form.IssueType.title') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationIssueType+ '.svg'"
                          >
                        </div>
                      </div>
                      <!-- TEXT : NAME -->
                      <div class="flex width-80 w-card-70 w-card-60 flex-column">
                        <div class="flex flex-column width-80 input-width-100 margin-15-b">
                          <label
                            class="f-10-500-darkcyan f-9-500-darkcyan"
                            :class="{ 'color-red': errors.has('issueType.name') }"
                          >{{ $t('newIssueType.form.IssueType.name') }} *</label>
                          <input
                            name="issueType.name"
                            v-validate="'required'"
                            v-model="issueType.name"
                            :data-vv-as="'\'' + $t('newIssueType.form.IssueType.name')+ '\''"
                            type="text"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newIssueType.form.label.typeName')"
                          >
                          <span class="color-red">{{errors.first('issueType.name')}}</span>
                        </div>
                        <!-- TEXT : DESCRIPTION-->
                        <div class="flex flex-column width-80 input-width-100 margin-15-b">
                          <label
                            class="f-10-500-darkcyan f-9-500-darkcyan"
                            :class="{ 'color-red': errors.has('issueType.description') }"
                          >{{ $t('newIssueType.form.IssueType.description') }} *</label>
                          <input
                            name="issueType.description"
                            v-validate="'required'"
                            v-model="issueType.description"
                            :data-vv-as="'\'' + $t('newIssueType.form.IssueType.description')+ '\''"
                            type="text"
                            class="input-style f-12-300-gray width-100 margin-5-b"
                            :placeholder="$t('newIssueType.form.label.typeDescription')"
                          >
                          <span class="color-red">{{errors.first('issueType.description')}}</span>
                        </div>
                        <!-- DROPDOWN : STATUS -->
                        <div class="flex flex-column width-80 input-width-100">
                          <label
                            class="f-10-500-darkcyan f-9-500-darkcyan"
                            :class="{'color-red': errors.has('issueType.status') }"
                          >{{ $t('newIssueType.form.IssueType.status') }} *</label>
                          <select
                            name="issueType.status"
                            v-model="issueType.status"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-40 w-select-issue-type"
                          >
                            <option value>{{ $t('newIssueType.form.selectStatus') }}</option>
                            <option value="true">{{ $t('newIssueType.form.statusOptions.true') }}</option>
                            <option value="false">{{ $t('newIssueType.form.statusOptions.false') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="margin-15-tb flex-full">
                <hr class="hr-ticket">
              </div>
              <!-- BUTTONS -->
              <div class="flex-full flex flex-justify-end">
                <div class="padding-20-r">
                  <button
                    class="btn-medium btn-cancel font-bold"
                    @click="returnListIssueTypes"
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
import IssueType from "src/backend/models/IssueType.js";
import { Select, Option, Checkbox } from "element-ui";
import Notification from "src/backend/models/Notification.js";

export default {
  name: "NewIssueType",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  computed: {
    validationIssueType: function() {
      if (
        !this.errors.has("issueType.name") &&
        !!this.issueType.name &&
        !this.errors.has("issueType.description") &&
        !!this.issueType.description &&
        !this.errors.has("issueType.status") &&
        !!this.issueType.status
      ) {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    }
  },

  data() {
    return {
      issueType: {
        name: "",
        description: "",
        status: ""
      },
      edit: false
    };
  },

  created() {
    this._renewParametersVueX();
    if (this.$router.history.current.params.id) {
      this.edit = true;
      IssueType.getById(this.$router.history.current.params.id)
        .then(s => {
          this.issueType = s.data;
        })
        .catch(e => {});
    }
    this.getNotifications();
  },

  methods: {
    returnListIssueTypes() {
      this.$router.push({ name: "Listar Tipos de Pendência" });
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.newIssueType();
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

    newIssueType() {
      this._getLoading(true);
      if (this.edit) {
        IssueType.put(this.issueType)
          .then(result => {
            this._getLoading(false);
            this.$swal.fire({
              title: `${this.$t("label.issueType")} ${this.$t(
                "swal.titleSuccess"
              )}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true
            });
            this.returnListIssueTypes();
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
        IssueType.post(this.issueType)
          .then(result => {
            this._getLoading(false);
            this.$swal.fire({
              title: `${this.$t("label.issueType")} ${this.$t(
                "swal.titleSuccess"
              )}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true
            });
            this.returnListIssueTypes();
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
    }
  }
};
</script>

<style>
</style>
