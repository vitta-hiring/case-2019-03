<template>
  <div>
    <div id="container" v-if="ticket">
      <div id="content-master">
        <div
          v-if="ticketValidate"
          class="flex-full flex-column f-22-300-gray flex-align-items-center padding-100-tb"
        >
          <div>
            {{$t('editTicket.validate.acessDenied')}}&nbsp;
            <span
              class="color-red"
            >{{ this.idTicket }}</span>
          </div>
          <div class="padding-10-t pointer">
            <router-link
              tag="span"
              to="/list-tickets"
              class="color-darkcyan"
            >{{$t('editTicket.validate.returnListTickets')}}</router-link>
          </div>
        </div>

        <div v-if="!ticketValidate">
          <!-- START HEADER CONTEUDO -->
          <div class="flex-full margin-20-tb">
            <div class="box-shadow" style="padding-left: 10px;">
              <div class="padding-10-r pointer" @click="backListTickets">
                <img src="/static/icons/back.svg" alt />
              </div>

              <div class="flex flex-column">
                <div class="f-10-500-darkcyan padding-2-b">TICKET {{ ticket.id }}</div>
                <div>
                  <input
                    class="input-ticket-header f-18-100-gray input-style-hover"
                    type="text"
                    v-model="ticket.subject"
                    :placeholder="$t('editTicketUser.editSubject')"
                  />
                </div>
              </div>

              <div class="margin-20-rl division background-darkcyan"></div>

              <div class="flex">
                <div class="flex flex-row">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/reviewLight.svg" alt />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-10-500-darkcyan padding-5-b">{{ $t('editTicketUser.state') }}</div>
                    <div class="f-14-300-gray">{{ ticket.state.name }}</div>
                  </div>
                </div>
                <div class="margin-20-rl"></div>
                <div class="flex flex-row">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/clock.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-10-500-darkcyan padding-5-b">{{ $t('editTicketUser.lastUpdate') }}</div>
                    <div
                      class="f-14-300-gray"
                    >{{ ticket. updatedAt ? this.$moment.utc(ticket.updatedAt).fromNow() : " - "}}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="f-14-gray-light color-red padding-20-l align-self-center pointer" @click="discardTicket">
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                class="color-red"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                overflow="visible"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <g>
                  <path
                    id="reassign"
                    xmlns:default="http://www.w3.org/2000/svg"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5
                      9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"
                    fill="rgb(209, 209, 209)"
                    vector-effect="non-scaling-stroke"
                  ></path>
                </g>
              </svg>
              {{ $t('editTicketUser.discardTicket') }}
            </div>-->
          </div>
          <!-- END HEADER CONTEUDO -->
          <div class="margin-15-tb flex-full"></div>

          <div class="flex-full">
            <div class="box div-default list-tickets">
              <!-- Componente header tickets -->
              <div class="flex flex-space-between header-edit-tickets">
                <div class="flex flex-full flex-justify-space-around">
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="vertical-align-initial padding-5-r"
                        src="/static/icons/tickets.svg"
                        alt
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicketUser.header.ticketId') }}</div>
                      <div class="f-12-300-gray">{{ ticket.id }}</div>
                    </div>
                  </div>
                  <!-- <div class="margin-50-rl"></div>
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="vertical-align-initial padding-5-r"
                        src="/static/icons/product.svg"
                        alt
                      >
                    </div>
                    <div class="flex flex-column">
                      <div class="f-12-500-darkcyan padding-5-b">{{ $t('editTicketUser.header.productName') }}</div>
                      <div class="f-12-300-gray">{{ ticket.product === null ? "-" : ticket.product.name }}</div>
                    </div>
                  </div>
                  <div class="margin-50-rl"></div>-->
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        data-v-3bc910a2
                        src="/static/icons/issueLight.svg"
                        class="icon-position-edit-user"
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicketUser.header.typeOfProblem') }}</div>
                      <div class="f-12-300-gray">{{ ticket.issueType.name }}</div>
                    </div>
                  </div>
                  <!-- <div class="margin-50-rl"></div> -->
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="vertical-align-initial padding-5-r"
                        src="/static/icons/upload.svg"
                        alt
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicketUser.header.attachedFile') }}</div>
                      <div
                        class="f-12-300-gray"
                      >{{ ticket.fileUploads ? ticket.fileUploads[0] ? $t('editTicket.uploads.filesAttach') : $t('editTicket.uploads.noArchives') : $t('editTicket.uploads.noArchives')}}</div>
                    </div>
                  </div>
                  <!-- <div class="margin-50-rl"></div> -->
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="vertical-align-initial padding-5-r"
                        src="/static/icons/calendar.svg"
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicketUser.header.creationDate') }}</div>
                      <div
                        class="f-12-300-gray"
                      >{{ (this._getLocale() == 'en') ? this.$moment.utc(ticket.createdAt).format('YYYY/MM/DD') : this.$moment.utc(ticket.createdAt).format('DD/MM/YYYY') }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-full">
                <div class="flex margin-20-rl">
                  <div class="padding-5-trbl">
                    <img class="vertical-align-initial padding-5-r" src="/static/icons/subject.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div
                      class="f-12-500-darkcyan padding-5-b"
                    >{{ $t('editTicket.header.description') }}</div>
                    <div class="description f-12-300-gray" v-html="ticket.description"></div>
                  </div>
                </div>
              </div>

              <div class="flex-full margin-20-t" v-if="attachments[0]">
                <div class="flex margin-20-rl">
                  <div class="padding-5-trbl">
                    <img class="vertical-align-initial padding-5-r" src="/static/icons/upload.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-12-500-darkcyan padding-5-b">{{$t('editTicket.uploads.title')}}</div>
                    <div class="padding-5-b" v-for="fileUpload in attachments" :key="fileUpload.id">
                      <img src="/static/icons/select.svg" class="padding-10-r" />
                      <a
                        class="f-12-500-blue-dark"
                        :href="fileUpload.url"
                        target="_blank"
                      >{{ fileUpload.nameDocument }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex-full">
                  <div class="flex-full margin-10-trbl margin-30-l div-hover">
                    <div class="flex-full">
                      <div
                        v-if="!newComment"
                        class="flex flex-align-items-center flex-justify-center new-comment-user"
                      >
                        <button
                          v-on:click="newComment=!newComment"
                          class="btn-medium btn-blue"
                          type="button"
                          style="width: 160px;"
                        >
                          <span>{{ $t('editTicketUser.newComment') }}</span> &nbsp;
                        </button>

                        <div class="margin-20-rl division background-darkcyan"></div>

                        <img
                          v-on:click="newComment=!newComment"
                          class="pointer"
                          src="/static/icons/comment.svg"
                        />
                      </div>

                      <div v-if="newComment" class="flex-full">
                        <div class="flex-full section-form">
                          <div class="flex-full padding-15-trbl">
                            <div class="width-25 f-14-500-gray flex">
                              <div class="padding-40-t">
                                <div class="padding-15-r f-14-500-gray min-width-100">
                                  <span>{{ $t('editTicketUser.reply') }}</span>
                                </div>
                              </div>
                              <div class="margin-20-l division-answer" style="height: 170px"></div>
                            </div>

                            <div class="flex-full flex flex-wrap">
                              <div class="flex-full flex-column flex">
                                <div class="width-100 padding-10-b">
                                  <label
                                    class="padding-15-r f-12-500-darkcyan"
                                  >{{ $t('editTicketUser.comment') }}</label>
                                </div>
                                <div class="width-100">
                                  <ckeditor
                                    :editor="editor"
                                    v-model="ticket.answer"
                                    :config="editorConfig"
                                  ></ckeditor>
                                  <!-- <textarea
                                    v-model="ticket.answer"
                                    class="text-shadow textarea-ticket input-style f-12-300-gray width-100"
                                    :placeholder="$t('editTicketUser.placeholderMessage')"
                                  ></textarea>-->
                                </div>
                              </div>

                              <div class="flex-full flex padding-20-tb">
                                <div class="flex width-100">
                                  <image-upload
                                    iconScale="1.3"
                                    class
                                    v-bind:cleanFiles="cleanFiles"
                                    v-bind:imageId="file.name"
                                    @change="onFileChange($event, file.name)"
                                    @cleaned="cleanFiles = false"
                                  ></image-upload>
                                </div>
                                <div class="padding-20-r pointer" @click="sendAnswer">
                                  <button
                                    class="btn-medium btn-blue"
                                  >{{ $t('editTicket.answers.send') }}</button>
                                </div>
                              </div>
                            </div>

                            <div class="pointer">
                              <img
                                v-on:click="newComment=!newComment"
                                src="/static/icons/close.svg"
                                alt
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div></div>
                    </div>
                  </div>
                </div>

                <div class="flex-full flex-column flex-align-items-center padding-10-b">
                  <div class="separator-edit-ticket">
                    <hr />
                  </div>
                  <div class="f-14-500-darkcyan pointer" @click="getTickeAnswerNotifications">
                    <img src="/static/icons/clockCyan.svg" alt />
                    {{ $t('editTicketUser.history') }}
                  </div>
                </div>
                <div id="answers" class="flex-full background-gray-light flex-justify-end">
                  <div class="flex-full flex-column box-padding f-14-300-gray">
                    <div class="item-history flex-column" v-if="this.answerNotifications">
                      <div
                        :key="index"
                        v-for="(answer, index) in this.answerNotifications"
                        :placeholder="$t('editTicket.answers.answer')"
                      >
                        <answer :answer="answer"></answer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="widgets">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prescription from "src/backend/models/Prescription.js";
import Channel from "src/backend/models/Channel.js";
import User from "src/backend/models/User.js";
import State from "src/backend/models/State.js";
import Tag from "src/backend/models/Tag.js";
import Issue from "src/backend/models/IssueType.js";
import Priority from "src/backend/models/Priority.js";
import Sla from "src/backend/models/Sla.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
      Ticket.validateTicket(vm.idTicket)
        .then(result => {
          if (parseInt(result.data.id) === parseInt(vm.idTicket)) {
            vm.ticketValidate = false;
          } else {
          }
        })
        .catch(e => {
          if (e.response.data.code == "TICKET_UNASSESSIBLIE_FOR_YOU") {
            vm.ticketValidate = true;
          }
        });
    });
  },

  name: "EditTicketUser",

  props: ["idTicket"],

  created() {
    this.refreshANSWER();
    this.getTickeAnswerNotifications();
  },
  methods: {
    updatingTickets(ticket) {
      const ticketsEdited = this.$store.getters.getTicketsPages;
      ticketsEdited.forEach(element => {
        if (element.id == ticket.id) {
          var id = element.id;
          var index = ticketsEdited
            .map(x => {
              return x.id;
            })
            .indexOf(id);
          ticketsEdited.splice(index, 1);
          ticketsEdited.unshift(ticket);
          this.$store.commit("setTicketsPages", undefined);
          this.$store.commit("setTicketsPages", ticketsEdited);
        }
      });
    },

    discardTicket() {},
    refreshANSWER() {
      this._getLoading(true);
      this.$store.commit("setUpload", 1);
      Channel.get()
        .then(result => {
          const data = [...result.data];
          this.channels = data;
        })
        .catch(e => {});
      Sla.get()
        .then(result => {
          const data = [...result.data];
          this.slas = data;
        })
        .catch(e => {});
      State.get()
        .then(result => {
          this.states = result.data;
        })
        .catch(e => {});
      Priority.get(true)
        .then(result => {
          this.prioritys = result.data;
        })
        .catch(e => {});
      Issue.getActives()
        .then(result => {
          this.issues = result.data;
        })
        .catch(e => {});
      Tag.get()
        .then(result => {
          this.tags = result.data.content;
        })
        .catch(e => {});
      Ticket.getOne(this.idTicket)
        .then(result => {
          this.ticket = result.data;
          this.ticket.channel = !this.ticket.channel ? {} : this.ticket.channel;
          this.ticket.priority = !this.ticket.priority
            ? {}
            : this.ticket.priority;
          this.ticket.product = !this.ticket.product ? {} : this.ticket.product;
          this.ticket.agent = !this.ticket.agent ? {} : this.ticket.agent;
          this.ticket.issueType = !this.ticket.issueType
            ? {}
            : this.ticket.issueType;
          this.ticket.state = !this.ticket.state ? {} : this.ticket.state;
          this.ticket.department = !this.ticket.department
            ? {}
            : this.ticket.department;
          this.ticket.sla = !this.ticket.sla ? {} : this.ticket.sla;
          this.ticket.tags = !this.ticket.tags ? [] : this.ticket.tags;
          this.ticket.answers = !this.ticket.answers ? [] : this.ticket.answers;
          this.ticket.answer = this.$t(
            "editTicket.answers.typeYourAnswerLOWER"
          );
          this.ticket.emailList = !this.ticket.emailList
            ? []
            : this.ticket.emailList;
          this.$store.commit("setTags", this.ticket.tags);
          this.attachments = this.ticket.fileUploads
            ? this.ticket.fileUploads
            : [];
          if (!!this.ticket.answers) {
            this.ticket.answers.forEach(answer => {
              answer.uploads.forEach(file => {
                this.attachments.push(file);
              });
            });
          }
        })
        .catch(e => {});
      this._getLoading(false);
    },
    getTickeAnswerNotifications() {
      this._getLoading(true);
      Ticket.getAnswersNotifications(
        this.idTicket,
        this.$store.getters.getUser.locale
      )
        .then(result => {
          const data = [...result.data];
          this.answerNotifications = data;
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
        });
    },
    sendAnswer() {
      if (this.ticket.answer) {
        this.ticket.answerSend = {
          name: this.ticket.answer,
          active: true,
          createdBy: this.$store.getters.getUser.username,
          user: {
            id: this.$store.getters.getUser.id
          },
          ticket: {
            id: this.ticket.id
          }
        };
        this._getLoading(true);
        Ticket.answer(this.ticket.answerSend)
          .then(result => {
            this._getLoading(false);
            result.data.user.displayName = this.$store.getters.getUser.displayName;
            this.ticket.answers.push(result.data);
            const uploads = this.$store.getters.getFunctions.uploads;
            if (!!uploads && uploads.length > 0) {
              let uploadedItems = 0;
              uploads.forEach(element => {
                if (element != null && element != undefined) {
                  Ticket.uploadAnswer(element, result.data.id)
                    .then(result => {
                      this.attachments.push(result.data);
                    })
                    .catch(e => {})
                    .finally(() => {
                      uploadedItems++;
                      if (uploadedItems === uploads.length) {
                        this.getTickeAnswerNotifications();
                      }
                    });
                }
              });
              this.cleanFiles = true;
              this.$store.commit("setUpload", 1);
            }
            this.getTickeAnswerNotifications();
            this.ticket.answer = "";
            this.$swal.fire({
              title: this.$t("editTicket.answer.titleSwal"),
              text: this.$t("editTicket.answer.textSwal"),
              type: "success",
              showConfirmButton: true
            });
          })
          .catch(e => {
            this._getLoading(false);
            this.$swal.fire({
              title: this.$t("editTicket.answer.errorSwal"),
              text: e.response.data.message,
              type: "error",
              showConfirmButton: true
            });
          });
      } else {
        this._getLoading(false);
        this.$swal.fire({
          title: this.$t("editTicket.answer.askMessage"),
          text: this.$t("editTicket.answer.errorSwal"),
          type: "error",
          showConfirmButton: true
        });
      }
    },
    changeObserver() {},
    addTag(newTag) {
      const tag = {
        name: newTag
      };
      this.ticket.tags.push(tag);
    },
    nameWithLang({ name }) {
      return `${name}`;
    },
    returnListTickets() {
      this.$router.push({ name: "Listar Tickets" });
    },
    editTicket() {
      this.ticket.client = {
        id: this.$store.getters.getUser.id
      };
      this.ticket.client.active = true;
      this.ticket.agent = {
        id: this.$store.getters.getUser.id
      };
      this.ticket.tags = this.$store.getters.getTags;
      delete this.ticket.fileUploads;

      Ticket.put(this.ticket)
        .then(result => {
          this.$store.getters.getFunctions.upload
            ? Ticket.upload(
                this.$store.getters.getFunctions.upload,
                result.data.id
              )
                .then(result => {})
                .catch(e => {})
            : "";
          this.$router.push({ name: "Listar Tickets" });
          this.$swal.fire({
            title: this.$t("editTicket.edit.titleSwal"),
            text: this.$t("editTicket.edit.textSwal"),
            type: "success",
            showConfirmButton: true
          });
          this.updatingTickets(result.data);
        })
        .catch(e => {
          this.$swal.fire({
            title: this.$t("editTicket.edit.errorSwal"),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
        });
    },
    backListTickets() {
      this.$router.push({
        name: "Listar Tickets"
      });
    }
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
  beforeDestroy() {
    this.$store.commit("setTags", undefined);
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.$t("editTicket.answers.typeYourAnswerLOWER"),
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
      //value: [this.ticket ? { name: this.ticket.tags[0].name } : { name: "-" }],
      selectedOption: { name: " - " },
      toggle: false,
      ticket: undefined,
      answer: undefined,
      channels: this.channels,
      states: this.states,
      issues: this.issues,
      tags: this.tags,
      prioritys: this.prioritys,
      slas: this.slas,
      notifications: [],
      answerNotifications: [],
      newComment: false,
      ticketValidate: undefined,
      cleanFiles: false,
      attachments: []
    };
  }
};
</script>

<style scoped>
svg:hover #reassign {
  fill: #ff5a5f;
}
.icon-position-edit-user {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}
</style>
