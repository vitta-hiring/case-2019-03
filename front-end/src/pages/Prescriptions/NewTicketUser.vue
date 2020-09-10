<template>
  <div id="container">
    <div id="content-master">
      <!-- START HEADER CONTEUDO -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow" style="padding-left: 10px;">
          <div class="padding-10-r pointer" @click="backListTickets">
            <img src="/static/icons/back.svg" alt />
          </div>

          <div class="flex flex-column">
            <div class="f-10-500-darkcyan padding-2-b">{{ $t('title.newTicket') }}</div>
            <div>
              <input
                v-model="ticket.subject"
                class="input-ticket-header f-18-100-gray input-style-hover"
                type="text"
                :placeholder="$t('newTicketUser.typeSubjectTicket')"
              />
            </div>
          </div>

          <div class="margin-50-rl division background-darkcyan"></div>

          <div class="padding-20-r">
            <img class="padding-5-r" src="/static/icons/sync.svg" />
            <span
              class="f-14-300-darkcyan pointer"
              @click="newDraft"
            >{{ $t('newTicketUser.saveDraft') }}</span>
          </div>
        </div>
      </div>
      <!-- END HEADER CONTEUDO -->
      <div class="flex-full padding-5-t">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <div class="flex-row padding-15-b">
              <div>
                <img src="/static/icons/alert.svg" class />
                <span class="f-12-300-gray-light">{{ $t('newTicketUser.pleaseFill')}}</span>
              </div>
            </div>

            <form @submit.prevent="verifyExistTicket">
              <div class="flex-full flex-column">
                <!-- <div class="flex-full flex-row box-shadow-hover padding-0-trbl f-10-500-darkcyan">
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>

                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-13 f-14-500-gray flex-space-between">
                        <div class="padding-15-r width-100">{{ $t('newTicketUser.stepOne.title') }}</div>
                        <span>
                          <img :src="'/static/icons/' + validationGeneral+ '.svg'">
                        </span>
                      </div>
                      <div class="flex-full flex flex-wrap">
                        <div class="flex width-50 text-right flex-align-items-center">
                          <div class="width-50">
                            <label
                              class="f-10-500-darkcyan padding-15-r"
                              :class="{'color-red': errors.has('ticket.channel.id') }"
                            >{{ $t('newTicketUser.stepOne.productOrService') }} *</label>
                          </div>
                          <div>
                            <select
                              name="ticket.product.id"
                              v-model="ticket.product.id"
                              class="select-style f-12-500-gray-light"
                              :placeholder="$t('newTicketUser.stepOne.selectProductOrService')"
                              v-validate="'required'"
                            >
                              <option value>{{ $t('newTicketUser.stepOne.selectProductOrService') }}</option>
                              <option
                                v-for="(product, id) in this.products"
                                :key="id"
                                :value="product.id"
                              >{{product.name}}</option>
                            </select>
                          </div>
                        </div>

                        <div class="width-50 text-right"></div>
                      </div>
                    </div>
                  </div>
                </div>-->

                <div class="flex-full padding-10-tb"></div>

                <div class="flex-full flex-row box-shadow-hover padding-0-trbl f-10-500-darkcyan">
                  <div class="flex-full section-form">
                    <div :class="validationIssue"></div>

                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-13 f-14-500-gray flex-space-between">
                        <div class="padding-15-r width-100">{{ $t('newTicketUser.stepOne.title') }}</div>
                        <span>
                          <img :src="'/static/icons/' + validationIssue+ '.svg'" />
                        </span>
                      </div>
                      <div class="flex-full flex flex-wrap">
                        <div class="flex width-50 text-right flex-align-items-center">
                          <div class="width-50">
                            <label
                              class="padding-15-r"
                              :class="{'color-red': errors.has('ticket.issueType.id') }"
                            >{{ $t('newTicketUser.stepTwo.typeIssue') }} *</label>
                          </div>
                          <div>
                            <select
                              name="ticket.issueType.id"
                              v-model="ticket.issueType.id"
                              v-validate="'required'"
                              @change="verifyExistTicket"
                              class="select-style f-12-500-gray-light"
                            >
                              <option value>{{ $t('newTicketUser.stepTwo.selectTypeIssue') }}</option>
                              <option
                                v-for="(issueType, id) in this.issues"
                                :key="id"
                                :value="issueType.id"
                              >{{issueType.name}}</option>
                            </select>
                          </div>
                        </div>

                        <div class="width-50 text-right"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-full padding-10-tb"></div>

                <div class="flex-full flex-row box-shadow-hover padding-0-trbl f-10-500-darkcyan">
                  <div class="flex-full section-form">
                    <div :class="validationTicket"></div>

                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-13 f-14-500-gray flex-space-between">
                        <div class="padding-15-r width-100">{{ $t('newTicketUser.stepTwo.title') }}</div>
                        <span>
                          <img :src="'/static/icons/' + validationTicket+ '.svg'" />
                        </span>
                      </div>

                      <div class="flex-full flex flex-wrap">
                        <div class="flex width-100 text-right margin-20-t flex-align-items-center">
                          <div class="width-25 text-right">
                            <label
                              class="padding-15-r"
                              :class="{'color-red': errors.has('ticket.subject') }"
                            >{{ $t('newTicketUser.stepThree.subject') }} *</label>
                          </div>
                          <div class="width-75">
                            <input
                              name="ticket.subject"
                              v-validate="'required'"
                              v-model="ticket.subject"
                              type="text"
                              class="input-style f-12-300-gray width-100"
                              :placeholder="$t('newTicketUser.stepThree.typeSubject')"
                            />
                          </div>
                        </div>

                        <div class="flex-full padding-10-tb"></div>

                        <div class="flex-full flex">
                          <div class="width-25 text-right">
                            <label
                              class="padding-15-r"
                              :class="{'color-red': errors.has('ticket.description') }"
                            >{{ $t('newTicketUser.stepThree.description') }} *</label>
                          </div>
                          <div class="width-75">
                            <textarea
                              name="ticket.description"
                              v-validate="'required'"
                              v-model="ticket.description"
                              class="textarea-ticket input-style f-12-300-gray width-100"
                              :placeholder="$t('newTicketUser.stepThree.typeDescription')"
                            ></textarea>
                          </div>
                        </div>

                        <div class="flex-full flex padding-20-tb">
                          <div class="width-25 text-right flex">
                            <div
                              class="padding-15-r"
                            >{{ $t('newTicketUser.stepThree.attachFiles') }}</div>
                          </div>
                          <div class="flex width-75">
                            <image-upload
                              :startDocs="this.docList"
                              iconScale="1.3"
                              class
                              v-bind:imageId="file.name"
                              @change="onFileChange($event, file.name)"
                            ></image-upload>
                          </div>
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
                <div class="padding-20-r" @click="returnListTickets">
                  <button class="btn-medium btn-cancel font-bold">{{ $t('cancel') }}</button>
                </div>
                <div class="padding-20-r">
                  <button class="btn-medium btn-blue" type="submit">
                    <span>{{ $t('newTicketUser.sendAs') }}:</span> &nbsp;
                    <span class="f-14-300-gray color-white">{{ $t('title.newTicket') }}</span>
                  </button>
                </div>
              </div>

              <modal name="comment-warning" height="auto" :scrollable="true">
                <div class="div-hover">
                  <form @submit.prevent="sendAnswer">
                    <div class="flex flex-justify-center margin-20-trbl">
                      <span class="f-14-500-darkcyan">{{$t('newTicket.form.ticket.title')}}</span>
                    </div>
                    <div class="flex width-85 flex-tlbr padding-50-b f-18-100-gray">
                      <p>{{ $t('newTicket.form.general.existTicketWarning') }}</p>
                    </div>
                    <div>
                      <span
                        class="flex width-85 flex-tlbr f-14-300-darkcyan"
                      >{{ $t('newTicket.form.general.answer') }}:</span>
                      <div class="width-85 flex-tlbr">
                        <ckeditor :editor="editor" v-model="answer.name" :config="editorConfig"></ckeditor>
                      </div>
                    </div>
                    <div class="flex flex-justify-center padding-50-tb">
                      <div class="padding-20-r pointer" @click="hideWarningModal">
                        <button class="btn-medium btn-cancel font-bold">{{ $t('cancel') }}</button>
                      </div>
                      <div class="padding-20-r pointer">
                        <button
                          class="btn-medium btn-blue"
                          type="submit"
                        >{{ $t('editTicket.answers.send') }}</button>
                      </div>
                    </div>
                  </form>
                </div>
              </modal>
            </form>
          </div>
        </div>

        <div class="widgets">
          <jira-integration></jira-integration>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prescription from "src/backend/models/Prescription.js";
import Channel from "src/backend/models/Channel.js";
import Product from "src/backend/models/Product.js";
import User from "src/backend/models/User.js";
import Issue from "src/backend/models/IssueType.js";
import Workflow from "src/backend/models/Sla.js";
import Department from "src/backend/models/Department.js";
import Priority from "src/backend/models/Priority.js";
import State from "src/backend/models/State.js";
import { Select, Option, Checkbox } from "element-ui";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewTicketUser",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  computed: {
    profileIDRefresh: function() {
      return this.value.id ? this.value.id : 0;
    },
    selectedTag() {
      if (this.ticket.tags[0].name) return this.ticket.tags[0].name;
      else return this.selectedOption;
    }
  },
  methods: {
    updatingTickets() {
      this.$store.commit("setCurrentPageTicket", 0);
      this.$store.commit("setTicketsPages", undefined);
    },

    verifyExistTicket(event) {
      this._getLoading(true);
      Ticket.existTicketByClientAndIssue(
        this.ticket.issueType.id,
        this.$store.getters.getUser.username
      )
        .then(result => {
          this.ticketsTemp = result.data;
          this.tickets = [];
          if (this.ticketsTemp.length > 0) {
            this.ticketsTemp.forEach(element => {
              if (!element.state.closed) {
                this.tickets.push(element);
              }
            });
          }

          if (this.tickets.length > 0) {
            this.showWarningModal();
          } else {
            this._getLoading(false);
            if (event.target.tagName == "FORM") {
              this.validateBeforeSubmit();
            }
          }
        })
        .catch(e => {
          this._getLoading(false);
        });
    },
    showWarningModal() {
      this.answer.name = "";
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
        answer.ticket.id = this.tickets[0].id;
        answer.name = this.answer.name;
        Ticket.answer(this.answer)
          .then(result => {
            this._getLoading(false);
            this.$swal
              .fire({
                title: `${this.$t("newTicket.form.ticket.answerSaveSuccess")}`,
                text: this.$t("swal.textSuccess"),
                type: "success",
                showConfirmButton: true
              })
              .then(result => {
                if (result.value) {
                  this.$router.push({
                    path: "/edit-ticket-user/" + this.tickets[0].id
                  });
                }
              });
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
    returnListTickets() {
      this.$router.push({ name: "Listar Tickets" });
    },
    changeObserver() {},
    addTag(newTag) {
      const tag = {
        name: newTag
      };
      this.ticket.tags.push(tag);
    },
    nameWithLang({ email }) {
      return `${email}`;
    },
    backListTickets() {
      this.$router.push({
        name: "Listar Tickets"
      });
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.newTicket();
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
    onFileChange(file, doc) {
      if (file) {
        let temp = file.name;
        temp = temp.split(".").pop();
        let fileName = doc + "." + temp;
        let myNewFile = new File([file], fileName, {
          type: file.type
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
      this._getLoading(true);
      Ticket.draft(this.ticket)
        .then(result => {
          this.$store.getters.getFunctions.removedFiles.forEach(element => {
            Ticket.deleteFile(element.id)
              .then(result => {})
              .catch(e => {});
          });
          const files = result.data.fileUploads;
          this.$store.getters.getFunctions.uploads.forEach(element => {
            let alreadyExists = false;
            // Checa se o arquivo ja existe nos arquivos associados ao draft
            if (!!files) {
              files.forEach(file => {
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
                  removed => {
                    alreadyExists = alreadyExists
                      ? !(removed.name === element.document)
                      : alreadyExists;
                  }
                );
              }
            }
            if (!alreadyExists) {
              Ticket.upload(element, result.data.id)
                .then(result => {})
                .catch(e => {});
            }
          });
          this._getLoading(false);
          this.$router.push({ name: "Listar Tickets" });
          this.$swal.fire({
            title: `${this.$t("label.draft")} ${this.$t("swal.titleSuccess")}`,
            text: this.$t("swal.textSuccess"),
            type: "success",
            showConfirmButton: true
          });
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
    },
    newTicket() {
      this._getLoading(true);

      this.ticket.draft = false;

      Ticket.post(this.ticket)
        .then(result => {
          this.$store.getters.getFunctions.uploads.forEach(element => {
            Ticket.upload(element, result.data.id)
              .then(result => {})
              .catch(e => {});
          });
          this._getLoading(false);

          this.$router.push({ name: "Listar Tickets" });
          this.$swal.fire({
            title: `${this.$t("label.ticket")} ${this.$t("swal.titleSuccess")}`,
            text: this.$t("swal.textSuccess"),
            type: "success",
            showConfirmButton: true
          });
          this.updatingTickets(result.data);
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
    },
    handleChange(type, singular, plural, event) {
      type === "emails"
        ? ((this.ticket[type] = []),
          this[type].forEach(element => {
            if (element[singular] === event.target.value) {
              this.ticket[type].push(element);
            }
          }))
        : this[plural].forEach(element => {
            if (element[type] === event.target.value) {
              this.ticket[singular]["id"] = element["id"];
            }
          });
    }
  },
  created() {
    this.$store.commit("setUpload", 1);
    this.$store.commit("setRemovedFiles", 1);

    Issue.getActives()
      .then(result => {
        this.issues = result.data;
      })
      .catch(e => {});

    const draftRegex = new RegExp("/new-ticket-user-draft/.*", "g");
    if (draftRegex.test(this.$route.path)) {
      Ticket.getOne(this.$router.history.current.params.id)
        .then(result => {
          if (result.data.draft) {
            this.ticket = result.data;
          }
        })
        .catch(e => {});
    }
  },
  computed: {
    docList() {
      const list = this.ticket.fileUploads || [];
      return list.map(file => ({ name: file.nameDocument, ...file }));
    },
    /*validationGeneral: function() {
      if (
        this.ticket.product.id != ""
      ) {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    },*/

    validationIssue: function() {
      if (this.ticket.issueType.id != "") {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    },

    validationTicket: function() {
      if (this.ticket.subject != "" && this.ticket.description) {
        return "validation-sucess";
      } else {
        return "validation-fail";
      }
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "|",
          "link",
          "undo",
          "redo",
          "blockQuote"
        ]
      },
      file: {
        name: "newFile"
      },
      ticket: {
        client: {
          id: this.$store.getters.getUser.id
        },
        active: true,
        createdBy: this.$store.getters.getUser.username,
        // product: {
        //   id: ""
        // },
        issueType: {
          id: ""
        },
        subject: "",
        description: ""
      },
      answer: {
        name: "",
        active: true,
        private: false,
        createdBy: "",
        user: {
          id: ""
        },
        ticket: {
          id: ""
        }
      },
      // products: this.products,
      issues: this.issues,
      tickets: []
    };
  }
};
</script>

<style>
.better-position-file-upload {
  margin-top: 8px;
}
</style>
