<template>
  <div id="container">
    <div id="content-master">
      <!-- START HEADER CONTEUDO -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow width-65 box-width">
          <div class="padding-10-r pointer" @click="backListTickets">
            <img src="/static/icons/back.svg" alt />
          </div>
          <div class="flex flex-column width-75 w-new-ticket">
            <div class="f-10-500-darkcyan padding-2-b">{{ $t('title.newTicket') }}</div>
            <div>
              <input
                v-if="prescription"
                v-model="prescription.name"
                class="width-100 f-18-100-gray input-style-hover"
                type="text"
                :placeholder="$t('newTicketUser.typeSubjectTicket')"
              />
            </div>
          </div>
          <div class="margin-15-rl division division-new-ticket background-darkcyan"></div>
          <div class="width-35 w-save-draft text-center">
            <span
              class="f-14-300-darkcyan f-new-ticket-12 pointer"
              @click="newDraft"
            >{{ $t('newTicket.saveDraft') }}</span>
            <img class="padding-5-l icon-position icon-none" src="/static/icons/sync.svg" />
          </div>
        </div>
      </div>
      <!-- END HEADER CONTEUDO -->
      <div class="flex-full flex-column-1125">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <form @submit.prevent="validateBeforeSubmit">
              <div class="flex-full flex-column">
                <div
                  class="flex-full flex-row box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>
                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-20 w-title f-14-500-gray">
                        <div class="width-100 f-10-840">
                          {{ $t('newTicket.form.general.title') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationGeneral+ '.svg'"
                          />
                        </div>
                      </div>

                      <div class="flex-full flex-column">
                        <div class="flex-full flex-column-780 padding-12-b">
                          <!-- PHARMACOS -->
                          <div class="flex flex-column width-100 input-width-100">
                            <label class="f-10-500-darkcyan">{{ $t('newPrescription.pharmacos') }} *</label>
                            <pharmacos
                              v-if="this.$store.getters.getPharmacos"
                              ref="email"
                              class="width-80"
                            ></pharmacos>
                          </div>
                        </div>

                        <div class="flex-full flex-column-780 padding-12-b">
                          <!-- PATIENTS -->
                          <div class="flex flex-column width-100 input-width-100">
                            <label class="f-10-500-darkcyan">{{ $t('newPrescription.patients') }} *</label>
                            <patients
                              v-if="this.$store.getters.getPatients"
                              ref="email"
                              class="width-80"
                            ></patients>
                          </div>
                        </div>

                        <div class="flex-full flex-column-780 padding-12-b">
                          <!-- DOCTORS -->
                          <div class="flex flex-column width-100 input-width-100">
                            <label class="f-10-500-darkcyan">{{ $t('newPrescription.doctors') }} *</label>
                            <doctors
                              v-if="this.$store.getters.getDoctors"
                              ref="email"
                              class="width-80"
                            ></doctors>
                          </div>
                        </div>

                        <div class="flex-full flex-column-680 padding-12-b">
                          <div class="flex-full flex flex-wrap">
                            <!-- CONCENTRATION -->
                            <div class="width-80 flex-column input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.concentration') }"
                              >{{ $t('newPrescription.concentration') }} *</label>
                              <input
                                v-if="prescription"
                                name="satisfactionSurvey.question"
                                v-validate="{ required: true }"
                                v-model="prescription.concentration"
                                type="number"
                                :data-vv-as="'\'' + $t('newPrescription.concentration')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.concentrationPlaceholder')"
                              />
                            </div>

                            <!-- medicationType -->
                            <div class="width-80 flex-column input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.medicationType') }"
                              >{{ $t('newPrescription.medicationType') }} *</label>
                              <input
                                v-if="prescription"
                                name="satisfactionSurvey.medicationType"
                                v-validate="{ required: true }"
                                v-model="prescription.medicationType"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.medicationType')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.medicationTypePlaceholder')"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="flex-full flex-column">
                          <div class="flex-full flex-column-680 padding-12-b">
                            <!-- UNIT -->
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('satisfactionSurvey.question') }"
                              >{{ $t('newPrescription.unit') }} *</label>
                              <input
                                v-if="prescription"
                                name="satisfactionSurvey.question"
                                v-validate="{ required: true }"
                                v-model="prescription.unit"
                                type="text"
                                :data-vv-as="'\'' + $t('satisfactionSurveys.questionSatisfactionSurvey')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.unitPlaceholder')"
                              />
                            </div>

                            <!-- pharmaceuticalForm -->
                            <div class="flex flex-column width-39 input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('satisfactionSurvey.question') }"
                              >{{ $t('newPrescription.pharmaceuticalForm') }} *</label>
                              <input
                                name="satisfactionSurvey.question"
                                v-if="prescription"
                                v-validate="{ required: true }"
                                v-model="prescription.pharmaceuticalForm"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.pharmaceuticalFormPlaceholder')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.pharmaceuticalFormPlaceholder')"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column">
                          <div class="flex-full flex-column-680 padding-12-b">
                            <!-- viaAdministrative -->
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('satisfactionSurvey.question') }"
                              >{{ $t('newPrescription.viaAdministrative') }} *</label>
                              <input
                                name="satisfactionSurvey.question"
                                v-if="prescription"
                                v-validate="{ required: true }"
                                v-model="prescription.viaAdministrative"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.viaAdministrativePlaceholder')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.viaAdministrativePlaceholder')"
                              />
                            </div>
                            <!-- atcCode -->
                            <div class="flex flex-column width-39 input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('satisfactionSurvey.question') }"
                              >{{ $t('newPrescription.atcCode') }} *</label>
                              <input
                                name="satisfactionSurvey.question"
                                v-validate="{ required: true }"
                                v-model="prescription.atcCode"
                                v-if="prescription"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.atcCodePlaceholder')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.atcCodePlaceholder')"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column">
                          <!-- internalUse -->
                          <div class="flex-full flex-column-680 padding-12-b">
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('newPrescription.internalUse') }"
                              >{{ $t('newPrescription.internalUse') }} *</label>
                              <select
                                v-if="prescription"
                                name="prescription.internalUse"
                                v-model="prescription.internalUse"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-70"
                              >
                                <option value>{{ $t('newPrescription.internalUsePlaceholder') }}</option>
                                <option value="true">{{ $t('newPrescription.yes') }}</option>
                                <option value="false">{{ $t('newPrescription.no') }}</option>
                              </select>
                            </div>

                            <!-- antimicrobial -->
                            <div class="flex flex-column width-39 input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('newPrescription.antimicrobial') }"
                              >{{ $t('newPrescription.antimicrobial') }} *</label>
                              <select
                                v-if="prescription"
                                name="prescription.antimicrobial"
                                v-model="prescription.antimicrobial"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-70"
                              >
                                <option value>{{ $t('newPrescription.antimicrobialPlaceholder') }}</option>
                                <option value="true">{{ $t('newPrescription.yes') }}</option>
                                <option value="false">{{ $t('newPrescription.no') }}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column-680 padding-12-b">
                          <div class="flex-full flex flex-wrap">
                            <!-- bula -->
                            <div class="width-80 flex-column input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.bula') }"
                              >{{ $t('newPrescription.bula') }} *</label>
                              <input
                                name="satisfactionSurvey.bula"
                                v-validate="{ required: true }"
                                v-if="prescription"
                                v-model="prescription.bula"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.bulaPlaceholder')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.bulaPlaceholder')"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex-full flex-row box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationIssue"></div>
                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-20 w-title f-14-500-gray">
                        <div class="width-100 f-10-840">
                          {{ $t('newTicket.form.issue.title') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationIssue+ '.svg'"
                          />
                        </div>
                      </div>

                      <div class="flex-full flex-column">
                        <div class="flex-full flex-column-680 padding-12-b">
                          <div class="flex-full flex flex-wrap">
                            <div class="width-80 flex-column input-width-100 padding-10-tb">
                              <!-- ordinance344 -->
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.ordinance344') }"
                              >{{ $t('newPrescription.ordinance344') }} *</label>
                              <input
                                v-if="prescription"
                                name="newPrescription.ordinance344"
                                v-validate="{ required: true }"
                                v-model="prescription.ordinance344"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.ordinance344')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.ordinance344Placeholder')"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="flex-full flex-column">
                          <div class="flex-full flex-column-680 padding-12-b">
                            <!-- specialCenter -->
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('newPrescription.specialCenter') }"
                              >{{ $t('newPrescription.specialCenter') }} *</label>
                              <select
                                v-if="prescription"
                                name="prescription.specialCenter"
                                v-model="prescription.specialCenter"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-70"
                              >
                                <option value>{{ $t('newPrescription.specialCenterPlaceholder') }}</option>
                                <option value="true">{{ $t('newPrescription.yes') }}</option>
                                <option value="false">{{ $t('newPrescription.no') }}</option>
                              </select>
                            </div>

                            <div class="flex flex-column width-39 input-width-100 padding-10-tb">
                              <!-- TISS -->
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.tiss') }"
                              >{{ $t('newPrescription.tiss') }} *</label>
                              <input
                                v-if="prescription"
                                name="newPrescription.tiss"
                                v-validate="{ required: true }"
                                v-model="prescription.tiss"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.tiss')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.tiss')"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column">
                          <div class="flex-full flex-column-680 padding-12-b">
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('newPrescription.mip') }"
                              >{{ $t('newPrescription.mip') }} *</label>
                              <select
                                name="prescription.mip"
                                v-if="prescription"
                                v-model="prescription.mip"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-70"
                              >
                                <option value>{{ $t('newPrescription.mipPlaceholder') }}</option>
                                <option value="true">{{ $t('newPrescription.yes') }}</option>
                                <option value="false">{{ $t('newPrescription.no') }}</option>
                              </select>
                            </div>

                            <div class="flex flex-column width-39 input-width-100 padding-10-tb">
                              <label
                                class="f-10-500-darkcyan padding-8-b"
                                :class="{'color-red': errors.has('newPrescription.label') }"
                              >{{ $t('newPrescription.label') }} *</label>
                              <input
                                v-if="prescription"
                                name="newPrescription.label"
                                v-validate="{ required: true }"
                                v-model="prescription.label"
                                type="text"
                                :data-vv-as="'\'' + $t('newPrescription.label')+ '\''"
                                class="input-style f-12-300-gray width-100"
                                :placeholder="$t('newPrescription.labelPlaceholder')"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column">
                          <div class="flex-full flex-column-680 padding-12-b">
                            <div
                              class="flex flex-column width-40 input-width-100 padding-10-tb mr-2"
                            >
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has('newPrescription.unified') }"
                              >{{ $t('newPrescription.unified') }} *</label>
                              <select
                                v-if="prescription"
                                name="prescription.unified"
                                v-model="prescription.unified"
                                v-validate="'required'"
                                class="select-style f-12-500-gray-light width-70"
                              >
                                <option value>{{ $t('newPrescription.unifiedPlaceholder') }}</option>
                                <option value="true">{{ $t('newPrescription.yes') }}</option>
                                <option value="false">{{ $t('newPrescription.no') }}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="flex-full flex-column-680 padding-12-b">
                          <div class="flex-full flex flex-wrap"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="margin-15-tb flex-full">
                <hr class="hr-ticket" />
              </div>

              <div class="flex-full flex flex-justify-end">
                <div class="padding-20-r">
                  <button
                    class="btn-medium btn-cancel font-bold"
                    @click="returnListTickets"
                  >{{ $t('cancel') }}</button>
                </div>

                <div class="padding-20-r">
                  <button class="btn-medium btn-blue" type="submit" @click="newPrescription">
                    <span>{{ $t('newTicket.sendAs') }}</span>
                    &nbsp;
                    <span
                      class="f-14-300-gray color-white"
                    >{{ $t('title.newTicket') }}</span>
                  </button>
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
    <user-modal @refresh="refreshUsers" @saveUserTicket="saveUser"></user-modal>
  </div>
</template>

<script>
import Prescription from "src/backend/models/Prescription.js";
import Patient from "src/backend/models/Patient.js";
import Doctor from "src/backend/models/Doctor.js";
import { Select, Option, Checkbox } from "element-ui";
import TicketReportVue from "../../components/Reports/ReportFilters/TicketReport.vue";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewPrescription",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox,
  },

  methods: {
    updatingTickets() {
      this.$store.commit("setCurrentPageTicket", 0);
      this.$store.commit("setTicketsPages", undefined);
    },

    refreshUsers() {
      this.findUsers();
    },

    saveUser(user) {
      this.prescription.client = user;
      if (user.tempId === -1) {
        user.tempId = this.clientComponentInfo.users.length;
        this.clientComponentInfo.users.push(user);
      } else {
        this.clientComponentInfo.users[user.tempId] = user;
      }
    },

    addUser() {
      this.$modal.show(
        "create-user",
        this.prescription.company.id
          ? { clientId: this.prescription.company.id }
          : {},
        {
          height: "auto",
          dynamic: true,
          injectModalsContainer: true,
          draggable: true,
        }
      );
    },

    validateAllFields() {
      return this.validationGeneral === "validation-sucess" &&
        this.validationIssue === "validation-sucess"
        ? true
        : false;
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (this.validateAllFields()) {
          this.showWarningModal();
        } else {
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: this.$t("swal.errorFields"),
            type: "error",
            showConfirmButton: true,
          });
        }
        return;
      });
    },

    savePrescription() {
      this._getLoading(true);
      Prescription.post(this.prescription)
        .then((result) => {
          this._getLoading(false);
          this.$store.getters.getFunctions.uploads.forEach((element) => {
            prescription
              .upload(element, result.data.id)
              .then((result) => {})
              .catch((e) => {});
          });
          this.$swal
            .fire({
              title: `${this.$t("label.prescription")} ${this.$t(
                "swal.titleSuccessFem"
              )}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true,
            })
            .then((result) => {
              if (result.value) {
                this.submitted = false;
                this.$router.push({
                  name: "Listar Prescrições",
                });
              }
            });
          this.updatingTickets(result.data);
        })
        .catch((e) => {
          this._getLoading(false);
          this.$swal.fire({
            title:
              e.response.status != 400
                ? this.$t("swal.titleError")
                : "Alerta " + e.response.data.name,
            text: e.response.status == 400 ? e.response.data.description : e,
            type: "error",
            showConfirmButton: true,
          });
        });
    },

    newPrescription() {
      this.prescription.patients = [];
      this.prescription.doctors = [];
      this.$store.getters.getPharmacos
        ? this.$store.getters.getPharmacos.forEach((pharmaco) => {
            this.prescription.pharmacos.push(pharmaco.name);
          })
        : "";
      this.$store.getters.getPatients
        ? this.prescription.patients.push(this.$store.getters.getPatients[0].id)
        : "";
      this.$store.getters.getDoctors
        ? this.prescription.doctors.push(this.$store.getters.getDoctors[0].id)
        : "";
      let temp = "newTicket";
      if (this.validateAllFields()) {
        this.savePrescription();
      }
    },

    verifyExistTicket() {
      if (this.prescription.client) {
        let temp = "verifyExistTicket";
        this.existTicketByIssue(temp);
      } else if (this.prescription.company) {
        let temp = "verifyExistTicket";
        this.existTicketByIssue(temp);
      }
    },

    showWarningModal() {
      this._getLoading(false);
      this.$modal.show("comment-warning");
    },

    hideWarningModal() {
      this._getLoading(false);
      this.$modal.hide("comment-warning");
    },

    sendAnswer() {
      if (this.answer.name) {
        this.hideWarningModal();
        this._getLoading(true);
        var answer = this.answer;
        answer.createdBy = this.$store.getters.getUser.username;
        answer.user.id = this.$store.getters.getUser.id;
        answer.prescription.id = this.tickets[0].id;
        answer.name = this.answer.name;
        prescription
          .answer(this.answer)
          .then((result) => {
            this._getLoading(false);
            this.$swal
              .fire({
                title: `${this.$t(
                  "newTicket.form.prescription.answerSaveSuccess"
                )}`,
                text: this.$t("swal.textSuccess"),
                type: "success",
                showConfirmButton: true,
              })
              .then((result) => {
                if (result.value) {
                  this.$router.push({
                    path: "/edit-ticket/" + this.tickets[0].id,
                  });
                }
              });
          })
          .catch((e) => {
            this._getLoading(false);
            this.$swal.fire({
              title: this.$t("swal.titleError"),
              text: e.response.data.message,
              type: "error",
              showConfirmButton: true,
            });
          });
      }
    },

    returnListTickets() {
      this.$router.push({ name: "Listar Prescrições" });
    },

    changeObserver() {},

    addTag(newTag) {
      const tag = {
        name: newTag,
      };
      this.prescription.tags.push(tag);
    },

    addProtocol(protocol) {
      this.prescription.associatedProtocols.push(protocol);
      this.protocols.push(protocol);
    },

    findUsers(query) {
      this.userQuery.query = query;
    },

    selectedUser(user) {
      if (!!user.company && user.company.id !== "") {
        this.prescription.company = user.company;
      } else {
        this.prescription.company = { id: "" };
      }
    },

    nameWithLang({ email }) {
      return `${email}`;
    },

    backListTickets() {
      this.$router.push({
        path: "/list-prescriptions",
      });
    },

    onFileChange(file, doc) {
      if (file) {
        let temp = file.name;
        temp = temp.split(".").pop();
        let fileName = doc + "." + temp;
        let myNewFile = new File([file], fileName, {
          type: file.type,
        });
        this.file = myNewFile;
      } else {
        this.file = null;
      }
    },

    closeModal() {
      this.$emit("close");
    },

    onRegisterSubmit(model, isValid) {
      this.registerModel = model;
    },

    onLoginSubmit(model, isValid) {
      this.loginModel = model;
    },

    onTypeValidationSubmit(model, isValid) {
      this.typeValidationModel = model;
    },

    uploadFiles() {},

    newDraft() {
      if (this.prescription.name) {
        this._getLoading(true);
        //this.prescription.agent.id = this.$store.getters.getUser.id;
        this.prescription.emails = [];
        this.$store.getters.getEmails
          ? this.$store.getters.getEmails.forEach((element) => {
              this.prescription.emails.push(element);
            })
          : "";
        prescription
          .draft(this.ticket)
          .then((result) => {
            this.$store.getters.getFunctions.removedFiles.forEach((element) => {
              prescription
                .deleteFile(element.id)
                .then((result) => {})
                .catch((e) => {});
            });
            const files = result.data.fileUploads;
            this.$store.getters.getFunctions.uploads.forEach((element) => {
              let alreadyExists = false;
              // Checa se o arquivo ja existe nos arquivos associados ao draft
              if (!!files) {
                files.forEach((file) => {
                  alreadyExists = alreadyExists
                    ? alreadyExists
                    : file.nameDocument === element.document;
                });
                // Se ele ja estiver associado checa se o associado não foi removido na edição atual do draft
                if (
                  alreadyExists &&
                  !!this.$store.getters.getFunctions.removedFiles
                ) {
                  this.$store.getters.getFunctions.removedFiles.forEach(
                    (removed) => {
                      alreadyExists = alreadyExists
                        ? !(removed.name === element.document)
                        : alreadyExists;
                    }
                  );
                }
              }
              if (!alreadyExists) {
                prescription
                  .upload(element, result.data.id)
                  .then((result) => {})
                  .catch((e) => {});
              }
            });
            this._getLoading(false);
            this.$router.push({
              name: "Listar Tickets",
            });
            this.$swal.fire({
              title: `${this.$t("label.draft")} ${this.$t(
                "swal.titleSuccess"
              )}`,
              text: this.$t("swal.textSuccess"),
              type: "success",
              showConfirmButton: true,
            });
          })
          .catch((e) => {
            this._getLoading(false);
            this.$swal.fire({
              title: this.$t("swal.titleError"),
              text: e.response.data.message,
              type: "error",
              showConfirmButton: true,
            });
          });
      } else {
        this._getLoading(false);
        this.$swal.fire({
          title: this.$t("newPrescription.draftErrorTitle"),
          text: this.$t("newPrescription.draftErrorText"),
          type: "error",
          showConfirmButton: true,
        });
      }
    },

    handleChange(type, singular, plural, event) {
      type === "emails"
        ? ((this.ticket[type] = []),
          this[type].forEach((element) => {
            if (element[singular] === event.target.value) {
              this.ticket[type].push(element);
            }
          }))
        : this[plural].forEach((element) => {
            if (element[type] === event.target.value) {
              this.ticket[singular]["id"] = element["id"];
            }
          });
    },
  },

  created() {
    this.$store.commit("setUpload", 1);
    this.$store.commit("setRemovedFiles", 1);
    this.$store.commit("setPharmacos", undefined);
    this.$store.commit("setPatients", undefined);
    this.$store.commit("setDoctors", undefined);
    if (this.$router.history.current.params.id) {
      Prescription.getById(this.$router.history.current.params.id)
        .then((result) => {
          this.prescription = result.data;
          this.$store.commit("setPharmacos", result.data.pharmacos);
          this.$store.commit("setPatients", result.data.patients);
          this.$store.commit("setDoctors", result.data.doctors);
        })
        .catch((e) => {});
    } else {
      this.$store.commit("setPharmacos", []);
      this.$store.commit("setPharmacos", []);
      this.$store.commit("setPharmacos", []);
    }
    Patient.getAll()
      .then((result) => {
        const data = [...result.data];
        this.patients = data;
      })
      .catch((e) => {});

    Doctor.getAll()
      .then((result) => {
        const data = [...result.data];
        this.doctors = data;
      })
      .catch((e) => {});
  },

  computed: {
    docList() {
      const list = this.prescription.fileUploads || [];
      return list.map((file) => ({ name: file.nameDocument, ...file }));
    },

    profileIDRefresh: function () {
      return this.value.id ? this.value.id : 0;
    },

    selectedTag() {
      if (this.prescription.tags[0].name) return this.prescription.tags[0].name;
      else return this.selectedOption;
    },

    validationGeneral: function () {
      if (this.prescription) {
        if (
          this.prescription.concentration != "" &&
          this.prescription.unit != "" &&
          this.prescription.medicationType != "" &&
          this.prescription.pharmaceuticalForm != "" &&
          this.prescription.viaAdministrative != "" &&
          this.prescription.atcCode != "" &&
          this.prescription.internalUse != "" &&
          this.prescription.antimicrobial != "" &&
          this.prescription.bula != "" &&
          this.$store.getters.getPharmacos
            ? this.$store.getters.getPharmacos.length > 0
            : false && this.$store.getters.getPatients
            ? this.$store.getters.getPatients.length > 0
            : false && this.$store.getters.getDoctors
            ? this.$store.getters.getDoctors.length > 0
            : false
        ) {
          return "validation-sucess";
        } else {
          return "validation-fail";
        }
      }
    },

    validationIssue: function () {
      if (this.prescription) {
        if (
          this.prescription.ordinance344 != "" &&
          this.prescription.specialCenter != "" &&
          this.prescription.tiss != "" &&
          this.prescription.mip != "" &&
          this.prescription.label != "" &&
          this.prescription.unified != ""
        ) {
          return "validation-sucess";
        } else {
          return "validation-fail";
        }
      }
    },

    // getClients: function() {
    //   let companyId = this.company.id;
    //   this.users = [];
    //   this.prescription.company = {
    //     id: ""
    //   };
    //   if (companyId != "") {
    //     User.getByCompany(companyId)
    //       .then(result => {
    //         this.users = result.data;
    //       })
    //       .catch(e => {});
    //   }
    // }
  },

  watch: {
    "userQuery.query": function () {
      this.userQuery.page = 0;
      this.users = [];
      this.getUsers();
    },
  },

  data() {
    return {
      // prescription: undefined,

      prescription: {
        name: "",
        concentration: "",
        unit: "",
        medicationType: "",
        pharmaceuticalForm: "",
        viaAdministrative: "",
        atcCode: "",
        internalUse: "",
        antimicrobial: "",
        bula: "",
        ordinance344: "",
        specialCenter: "",
        tiss: "",
        mip: "",
        label: "",
        unified: "",
        pharmacos: [],
        doctors: [],
        patients: [],
      },
    };
  },
};
</script>

<style scoped>
.better-position-file-upload {
  margin-top: 8px;
}

.warning-img {
  position: relative;
  bottom: 2px;
}

.loadMore {
  background-color: #0097a7;
  justify-content: center;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.loadMore:hover {
  background-color: #e6e6e6;
  color: #35495e;
  font-weight: 700;
}

.my-row {
  display: -webkit-box;
  /* display: flex; */
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  /* margin-right: -15px; */
  margin-left: -15px;
}

.label-position {
  margin-top: 0rem;
  margin-left: 1rem;
}

.select-position {
  margin-top: 1rem;
  margin-left: -6rem;
}

.icon-position-2 {
  margin-top: 1.2rem;
  margin-left: 1.2rem;
}
</style>
