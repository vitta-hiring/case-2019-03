<template>
  <div>
    <div class="f-12-500-gray-light title-widget">{{ $t('jiraIntegration.title') }}</div>
    <div class="box div-default jira-componente">
      <div class="buttons-jira align-self-center width-100 padding-10-rl padding-15-t flex">
        <button
          class="btn-jira margin-5-r"
          type="success"
          wide
          @click="show"
        >{{ $t('jiraIntegration.create') }}</button>
        <button
          class="btn-jira"
          style="margin: 0 5px"
          wide
          @click="showLink"
        >{{ $t('jiraIntegration.link') }}</button>
        <!--<button class="btn-jira">{{ $t('jiraIntegration.notify') }}</button>-->
      </div>
      <div
        class="f-10-500-gray padding-10-trbl"
      >{{ $t('jiraIntegration.linkedJiraIssues') }} {{ linkedIssues.length }}</div>
      <div
        class="flex flex-column item-ticket"
        v-for="(linkedIssue, index) in linkedIssues"
        :key="linkedIssue.id"
      >
        <div class="flex flex-row flex-space-between">
          <div class="flex flex-row">
            <div class="padding-2-r">
              <img :src="linkedIssue.issueAvatar" class="option__image padding-7-r" />
            </div>
            <div class="align-self-center">
              <a
                class="f-12-500-blue-dark"
                :href="linkedIssue.jiraUrl"
                target="_blank"
              >{{ linkedIssue.jiraKey }}</a>
            </div>
          </div>
          <div class="flex flex-row flex-align-items-start pointer">
            <img
              src="/static/icons/eye.svg"
              class="text-right"
              wide
              @click="showIssueInfo(linkedIssue, index)"
            />
            <img
              src="/static/icons/message.svg"
              class="text-right message-icon"
              @click="showJiraComment(linkedIssue, index)"
            />
            <img src="/static/icons/close.svg" class="text-right" @click="unlinkIssue(linkedIssue)" />
          </div>
        </div>
        <div class="padding-30-l">
          <div>
            <span class="f-10-500-gray">{{ $t('jiraIntegration.projectLinked') }}:</span>
            <span class="f-10-300-gray">{{ linkedIssue.issueProject }}</span>
          </div>
        </div>
        <div class="padding-30-l">
          <div>
            <span class="f-10-500-gray">{{ $t('jiraIntegration.summary') }}:</span>
            <span class="f-10-300-gray">{{ linkedIssue.name }}</span>
          </div>
        </div>
      </div>
      <!-- MODAL DE CRIAR JIRA  -->
      <modal name="create-issue" height="auto" :scrollable="true">
        <div class="div-hover">
          <form @submit.prevent="validateBeforeSubmit">
            <div class="margin-20-trbl">
              <span class="f-18-100-gray">{{ $t('jiraIntegration.issueRegister') }}</span>
            </div>
            <div class="flex flex-column padding-70-l">
              <div class="form-title flex flex-column">
                <div class="flex-full flex-align-items-center">
                  <div class="width-20 text-right">
                    <label
                      :class="{'color-red': errors.has('value') }"
                      class="f-10-500-darkcyan padding-15-r"
                    >{{$t('jiraIntegration.project')}}</label>
                  </div>
                  <!-- DROPDOWN ESCOLHER PROJECT -->
                  <div style="width: 250px">
                    <multiselect
                      name="value"
                      v-validate="'required'"
                      v-if="this.projects"
                      :block-keys="['Delete']"
                      v-model="value"
                      @input="changeObserver()"
                      :options="projects"
                      :placeholder="$t('jiraIntegration.selectProject')"
                      label="name"
                      track-by="name"
                      :max-height="240"
                      :selectLabel="$t('multiselect.pressEnter')"
                      :deselectLabel="$t('multiselect.pressRemove')"
                      :selectedLabel="$t('multiselect.selected')"
                    >
                      {{ profileIDRefresh }}
                      <template slot="singleLabel" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.avatar" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.name }}</span>
                          </div>
                        </div>
                      </template>
                      <template slot="option" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.avatar" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.name }}</span>
                          </div>
                        </div>
                      </template>
                    </multiselect>
                    <p class="f-12-300-gray" v-else>{{ $t('jiraIntegration.loading') }}</p>
                  </div>
                </div>
              </div>
              <div class="form-title flex flex-column">
                <div class="flex-full flex-align-items-center">
                  <div class="width-20 text-right">
                    <label
                      :class="{'color-red': errors.has('issue.issuetype') }"
                      class="f-10-500-darkcyan padding-15-r"
                    >{{$t('jiraIntegration.issue')}}</label>
                  </div>
                  <!-- DROPDOWN ESCOLHER ISSUE TYPE -->
                  <div style="width: 250px">
                    <multiselect
                      name="issue.issuetype"
                      v-validate="'required'"
                      v-if="this.issuetypes"
                      v-model="issue.issuetype"
                      :block-keys="['Delete']"
                      :options="issuetypes"
                      :placeholder="$t('jiraIntegration.selectTypeIssue')"
                      label="name"
                      track-by="name"
                      :max-height="200"
                      :selectLabel="$t('multiselect.pressEnter')"
                      :deselectLabel="$t('multiselect.pressRemove')"
                    >
                      <template slot="singleLabel" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.iconUrl" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.name }}</span>
                          </div>
                        </div>
                      </template>
                      <template slot="option" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.iconUrl" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.name }}</span>
                          </div>
                        </div>
                      </template>
                    </multiselect>
                    <p class="f-12-300-gray" v-else>{{ $t('jiraIntegration.loading') }}</p>
                  </div>
                </div>
              </div>
              <div class="form-title flex flex-collum">
                <div class="flex-full flex-align-items-center">
                  <div class="width-20 text-right">
                    <label
                      :class="{'color-red': errors.has('issue.assignee') }"
                      class="f-10-500-darkcyan padding-15-r uppercase"
                    >{{$t('jiraIntegration.assigned')}}</label>
                  </div>
                  <!-- DROPDOWN ESCOLHER  ISSUE ASSIGNEE-->
                  <div style="width: 250px">
                    <!-- <img src="https://wavyglobal.atlassian.net/secure/projectavatar?size=xsmall&s=xsmall&pid=10003&avatarId=10512"> -->
                    <multiselect
                      name="issue.assignee"
                      v-model="issue.assignee"
                      @search-change="asyncFind"
                      :options-limit="10"
                      :options="assigneds"
                      :block-keys="['Delete']"
                      :placeholder="$t('jiraIntegration.searchForUser')"
                      label="name"
                      track-by="name"
                      :loading="isLoading"
                      :max-height="240"
                      :selectLabel="$t('multiselect.pressEnter')"
                      :deselectLabel="$t('multiselect.pressRemove')"
                      :selectedLabel="$t('multiselect.selected')"
                    >
                      <template slot="singleLabel" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.avatar" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.displayName }}</span>
                          </div>
                        </div>
                      </template>
                      <template slot="option" slot-scope="props">
                        <div class="flex">
                          <div class="padding-5-r">
                            <img class="option__image" :src="props.option.avatar" />
                          </div>
                          <div>
                            <span class="option__title">{{ props.option.displayName }}</span>
                          </div>
                        </div>
                      </template>
                    </multiselect>
                  </div>
                </div>
              </div>
              <div class="form-title flex flex-column">
                <div class="flex-full flex-align-items-center">
                  <div class="width-20 text-right">
                    <label
                      :class="{ 'color-red': errors.has('issue.summary') }"
                      class="f-10-500-darkcyan padding-15-r"
                    >{{ $t('jiraIntegration.subjectUP') }} *</label>
                  </div>
                  <div class="width-70">
                    <input
                      name="issue.summary"
                      v-validate="'required'"
                      v-model="issue.summary"
                      type="text"
                      class="input-style f-12-300-gray width-100"
                      :placeholder="$t('jiraIntegration.subject')"
                    />
                  </div>
                </div>
              </div>
              <div class="form-title flex flex-collum margin-10-b">
                <div class="flex-full">
                  <div class="width-20 text-right">
                    <label
                      :class="{'color-red': errors.has('issue.description') }"
                      class="f-10-500-darkcyan padding-15-r"
                    >{{$t('jiraIntegration.descriptionUP')}}</label>
                  </div>
                  <div class="width-70">
                    <textarea
                      name="issue.description"
                      v-model="issue.description"
                      v-validate="'required'"
                      class="text-shadow textarea-ticket input-style f-12-300-gray width-100"
                      :placeholder="$t('jiraIntegration.description')"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="flex-full margin-15-t padding-20-b">
                <div
                  class="width-30 flex flex-align-items-center f-10-500-darkcyan color-red pointer"
                  @click="copyFieldsTicket"
                >{{ $t('jiraIntegration.copyFieldsTicket') }}</div>
                <div class="flex flex-justify-end width-70">
                  <div class="padding-20-r">
                    <button
                      class="btn-medium btn-cancel font-bold"
                      @click.prevent="hide"
                    >{{ $t('jiraIntegration.cancel') }}</button>
                  </div>
                  <div class="padding-20-r">
                    <button class="btn-medium btn-blue" type="submit">
                      <span class="f-14-300-gray color-white">{{ $t('jiraIntegration.newIssue') }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </modal>
      <!-- MODAL DE LINKAGEM DE JIRA-->
      <modal name="link-issue" height="auto" :scrollable="true">
        <div class="div-hover">
          <form @submit.prevent="linkIssue">
            <div class="margin-20-trbl">
              <span class="f-18-100-gray">{{ $t('jiraIntegration.linkIssue') }}</span>
            </div>
            <div class="flex flex-column padding-60-l">
              <div class="form-title flex flex-column">
                <div class="flex-full flex-align-items-center">
                  <div class="width-20 text-right">
                    <label class="f-10-500-darkcyan padding-15-r">{{ $t('jiraIntegration.issue') }}</label>
                  </div>
                  <!-- DROPDOWN ESCOLHER ISSUE -->
                  <div style="width: 250px">
                    <multiselect
                      v-if="issues"
                      v-model="link.issueId"
                      :options="issues"
                      :block-keys="['Delete']"
                      :placeholder="$t('jiraIntegration.selectIssue')"
                      label="name"
                      track-by="name"
                      :selectLabel="$t('multiselect.pressEnter')"
                      :deselectLabel="$t('multiselect.pressRemove')"
                    ></multiselect>
                    <p class="f-12-300-gray" v-else>{{ $t('jiraIntegration.loading') }}</p>
                  </div>
                </div>
              </div>
              <!-- <div class="form-title flex flex-colum">
                  <div class="flex-full flex-align-items-center">
                    <div class="width-20 text-right"><label class="f-10-500-darkcyan padding-15-r">TICKET *</label></div>
                    <div style="width: 250px">
                      <multiselect
                        v-if="tickets"
                        v-model="link.ticketId"
                        :options="tickets"
                        placeholder="TICKET *"
                        label="subject"
                        :block-keys="['Delete']"
                        track-by="subject"
                        :selectLabel="$t('multiselect.pressEnter')"
                        :deselectLabel="$t('multiselect.pressRemove')"
                        ></multiselect>
                      <p class="f-12-300-gray" v-else>{{$t('jiraIntegration.loading')}}</p>
                    </div>
                  </div>
              </div>-->
              <div class="flex-full flex flex-justify-end margin-30-t padding-15-b width-90">
                <div class="padding-20-r">
                  <button
                    class="btn-medium btn-cancel font-bold"
                    @click.prevent="hideLink"
                  >{{ $t('jiraIntegration.cancel') }}</button>
                </div>
                <div class="padding-20-r">
                  <button class="btn-medium btn-blue" type="submit">
                    <span class="f-14-300-gray color-white">{{ $t('jiraIntegration.linkButton') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </modal>
      <!-- MODAL DE  VISUALIZADO DO JIRA -->
      <modal name="linked-issue-info" height="auto" :scrollable="true">
        <div class="div-hover">
          <div class="flex flex-space-between">
            <div class="flex margin-20-trbl flex-align-items-center">
              <img class="padding-5-r option__image_30" :src="this.linkedIssueInfo.issueAvatar" />
              <a class="f-12-500-blue-dark" :href="this.linkedIssueInfo.jiraUrl" target="_blank">
                <span class="f-18-100-gray">{{this.linkedIssueInfo.jiraKey}}</span>
              </a>
            </div>
            <div>
              <button
                class="f-18-100-gray color-gray-light padding-5-trbl"
                @click="$modal.hide('linked-issue-info')"
              >❌</button>
            </div>
          </div>
          <div class="padding-70-l">
            <div class="flex-full flex-align-items-center">
              <div
                class="width-20 padding-20-r text-right f-10-500-darkcyan uppercase"
              >{{ $t('jiraIntegration.projectLinked') }}:</div>
              <div
                class="width-80 padding-5-rl f-12-300-gray"
              >{{ this.linkedIssueInfo.issueProject }}</div>
            </div>
            <div class="flex-full flex-align-items-center padding-10-t">
              <div
                class="width-20 padding-20-r text-right f-10-500-darkcyan uppercase"
              >{{ $t('jiraIntegration.infoIssueType') }}:</div>
              <div class="width-80 padding-5-rl f-12-300-gray">{{ this.linkedIssueInfo.issueType }}</div>
            </div>
            <!-- <div class="flex-full flex-align-items-center padding-10-t">
                <div class="width-20 padding-20-r text-right f-10-500-darkcyan uppercase">
                  {{$t('jiraIntegration.assigned')}}
                </div>
                <div class="width-80 padding-5-rl f-12-300-gray">
                  <div v-for="agentNameInfo in linkedIssueInfo.agentNames" :key="agentNameInfo">
                    <span class="f-12-300-gray">{{agentNameInfo}}</span>
                  </div>
                </div>
            </div>-->
            <div class="flex-full flex-align-items-center padding-10-t">
              <div
                class="width-20 padding-20-r text-right f-10-500-darkcyan uppercase"
              >{{$t('jiraIntegration.subjectUP')}}:</div>
              <div class="width-80 padding-5-rl f-12-300-gray">{{ this.linkedIssueInfo.summary }}</div>
            </div>
            <div class="flex-full flex-align-items-center padding-10-t">
              <div
                class="width-20 text-right padding-20-r f-10-500-darkcyan uppercase align-self-start"
              >{{ $t('jiraIntegration.infoDescription') }}</div>
              <div class="width-80 padding-5-rl f-12-300-gray">{{this.linkedIssueInfo.description}}</div>
            </div>
            <div class="flex-full flex-align-items-center padding-10-t">
              <div
                class="width-20 text-right padding-20-r f-10-500-darkcyan uppercase"
              >{{ $t('jiraIntegration.infoJiraUrl') }}</div>
              <div class="width-80 padding-5-rl f-12-300-gray">
                <a
                  class
                  :href="this.linkedIssueInfo.jiraUrl"
                  target="_blank"
                >{{ this.linkedIssueInfo.jiraUrl }}</a>
              </div>
            </div>
            <div class="flex-full flex-align-items-center padding-10-t padding-30-b">
              <div
                class="width-20 text-right padding-20-r f-10-500-darkcyan uppercase"
              >{{ $t('jiraIntegration.infoCreatedAt') }}</div>
              <div class="width-80 padding-5-rl f-12-300-gray">{{ this.formatedIssueCreationDate }}</div>
            </div>
          </div>
        </div>
      </modal>
      <!-- MODAL INCLUIR COMENTÁRIO NO JIRA -->
      <modal name="jira-comment" height="auto" :scrollable="true">
        <div class="div-hover">
          <form @submit.prevent="postComment">
            <div class="flex flex-justify-center margin-20-trbl">
              <span class="f-14-500-darkcyan">{{ $t('jiraIntegration.addComment') }}</span>
            </div>
            <div class="flex flex-justify-center">
              <textarea
                name="jiraComment.comment"
                v-model="jiraComment.comment"
                :placeholder="$t('jiraIntegration.typeComment')"
                class="text-shadow div-hover textarea-modal input-style f-12-300-gray width-85 border-red"
                v-if="error"
                style="border-color: red;border-style: solid;"
              ></textarea>
              <textarea
                name="jiraComment.comment"
                v-model="jiraComment.comment"
                v-if="!error"
                :placeholder="$t('jiraIntegration.typeComment')"
                class="text-shadow div-hover textarea-modal input-style f-12-300-gray width-85 border-red"
              ></textarea>
            </div>
            <div class="flex flex-justify-space-around comment-btn-div">
              <button
                class="btn-medium btn-cancel font-bold"
                type="button"
                @click="hideJiraComment"
              >{{ $t('cancel') }}</button>
              {{ refreshErrorCommentJiraIssue }}
              <button
                class="btn-medium btn-blue"
                type="submit"
              >{{ $t('save') }}</button>
            </div>
          </form>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vue from "vue";
import VModal from "vue-js-modal";
import moment from "moment";
import swal from "sweetalert2";
import Project from "src/backend/models/Project.js";
import JiraIssue from "src/backend/models/JiraIssue.js";
import Issue from "src/backend/models/Issue.js";
import Prescription from "src/backend/models/Prescription.js";
import { link } from "fs";

export default {
  props: ["ticketId"],
  data() {
    return {
      error: undefined,
      refresh: true,
      issue: {
        name: "",
        summary: "",
        project: "",
        issuetype: "",
        description: "",
        persistOnJira: true,
        idTicket: ""
      },
      link: {
        issueId: "",
        ticketId: ""
      },
      jiraComment: {
        jira: "",
        comment: ""
      },
      projects: this.projects,
      issues: this.issues,
      // tickets: this.tickets,
      issuetypes: [],
      value: "",
      // value: {
      //   name: "Project *"
      // },
      projectId: "",
      jiraProjectId: "",
      linkedIssues: [],
      linkedIssueInfo: {},
      linkedIssueProject: {},
      linkedIssueType: {},
      formatedIssueCreationDate: "",
      issueTickets: [],
      assigneds: [],
      showListIssues: true,
      checkboxTicket: false,
      isLoading: false
    };
  },
  created() {
    Issue.getLinkable()
      .then(result => {
        const data = [...result.data];
        this.issues = data;
      })
      .catch(e => {});
    /*Ticket.getAll()
        .then(result => {
          const data = [...result.data];
          this.tickets = data;
        })
        .catch(e => {});*/
    this.getMetadados();
    this.getLinkedIssues();
  },
  methods: {
    getMetadados() {
      JiraIssue.getMetadata()
        .then(result => {
          const data = [...result.data];
          this.projects = data;
        })
        .catch(e => {});
    },

    getLinkedIssues() {
      Issue.getLinkedIssue(this.ticketId)
        .then(result => {
          const data = [...result.data.content];
          this.linkedIssues = data;
        })
        .catch(e => {});
    },

    postComment() {
      if (this.jiraComment.comment != "") {
        this._getLoading(true);
        JiraIssue.postComment(this.jiraComment)
          .then(result => {
            this.$modal.hide("jira-comment");
            this._getLoading(false);
            this.$swal.fire({
              title: `${this.$t("label.comment")} ${this.$t(
                "swal.titleSuccess"
              )}`,
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
      } else {
        this._getLoading(false);
        this.$store.commit("setCommentIssueJiraError", true);
        this.error = true;
        this.$toaster.error(this.$t("swal.errorFields"));
      }
    },

    //Sincroniza de acordo com a busca pelos usuarios no criar jira
    asyncFind(query) {
      if (query !== "") {
        this.isLoading = true;
        JiraIssue.assigned(query, this.jiraProjectId.key).then(response => {
          this.assigneds = response.data;
          this.isLoading = false;
        });
      }
    },

    //Copia assunto e descricao do ticket para o criar jira
    copyFieldsTicket() {
      this.issue.summary = this.$parent.ticket.subject;
      this.issue.description = this.$parent.ticket.description;
    },

    //Mostra as informacoes do olho do jira
    showIssueInfo(linkedIssue) {
      this.linkedIssueInfo = { ...linkedIssue };
      this.formatedIssueCreationDate = moment(
        String(this.linkedIssueInfo.createdAt)
      ).format("hh:mm DD/MM/YYYY");
      this.linkedIssueProject = this.linkedIssueInfo.project;
      this.linkedIssueType = this.linkedIssueInfo.issueType;
      this.$modal.show("linked-issue-info");
    },

    show() {
      this.changeObserver();
      this.$modal.show("create-issue");
    },

    showLink() {
      this.$modal.show("link-issue");
    },

    hide() {
      this.cleanIssue();
      this.$modal.hide("create-issue");
    },

    hideLink() {
      this.link.issueId = "";
      this.$modal.hide("link-issue");
    },

    showJiraComment(linkedIssue) {
      this.$store.commit("setCommentIssueJiraError", false);
      this.linkedIssueInfo = { ...linkedIssue };
      this.jiraComment.jira = this.linkedIssueInfo.jiraId;
      this.$modal.show("jira-comment");
    },

    hideJiraComment() {
      this.cleanJiraComment();
      this.$modal.hide("jira-comment");
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitted = true;
          this.newIssue();
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

    newIssue(event) {
      this._getLoading(true);
      this.issue.project = this.jiraProjectId;
      this.issue.name = "JIRA - " + this.issue.summary;
      this.issue.idTicket = this.ticketId;
      this.issue.active = true;

      Issue.postJira(this.issue)
        .then(result => {
          this._getLoading(false);

          this.$swal.fire({
            title: `${this.$t("label.jira")} ${this.$t("swal.titleSuccess")}`,
            text: this.$t("swal.textSuccess"),
            type: "success",
            showConfirmButton: true
          });
          //Retira sempre o que estava e add o novo
          // this.linkedIssues.push(result)
          // this.linkedIssues.splice(0, 1);

          // if (
          //   this.linkedIssues.some(issue => issue.id == result.data.id) == false
          // ) {
          //   this.linkedIssues.unshift(result.data);
          // } else {
          //   this.linkedIssues.splice(
          //     this.linkedIssues.indexOf(result.data),
          //     1,
          //     result.data
          //   );
          // }

          // event.target.reset();
          this.getLinkedIssues();
        })
        .catch(e => {
          this._getLoading(false);
          this.cleanIssue();

          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
        });
      this.$modal.hide("create-issue");
    },

    linkIssue(event) {
      this.link.issueId = this.link.issueId.id;
      this.link.ticketId = this.ticketId;
      if (this.link.issueId == undefined) {
        this.$swal.fire({
          title: this.$t("jiraIntegration.selectIssuePlease"),
          text: this.$t("swal.titleError"),
          type: "error",
          showConfirmButton: true
        });

        return false;
      }

      this._getLoading(true);
      Issue.postLink(this.link)
        .then(result => {
          /*this.$store.getters.getFunctions.uploads.forEach(element => {
              Ticket.upload(element, result.data.id)
                .then(result => {
                  Issue.getLinkedIssue(this.ticketId)
                    .then(result => {
                      const data = [...result.data.content];
                      this.linkedIssues = data;
                    })
                    .catch(e => {
                      this.$swal.fire({
                        title: this.$t('swal.titleError'),
                        text: e.response.data.message,
                        type: "error",
                        showConfirmButton: true
                      });
                    });

                })
                .catch(e => {
                  this._getLoading(false);

                  this.$swal.fire({
                    title: this.$t('swal.titleError'),
                    text: e.response.data.message,
                    type: "error",
                    showConfirmButton: true
                  });

                });
            });*/

          this._getLoading(false);
          this.link.issueId = "";

          this.$swal.fire({
            title: `${this.$t("label.issueLink")}`,
            text: this.$t("swal.textSuccess"),
            type: "success",
            showConfirmButton: true
          });

          //Retira sempre o que estava e add o novo
          this.linkedIssues.splice(0, 1);

          if (
            this.linkedIssues.some(issue => issue.id == result.data.id) == false
          ) {
            this.linkedIssues.unshift(result.data);
          } else {
            this.linkedIssues.splice(
              this.linkedIssues.indexOf(result.data),
              1,
              result.data
            );
          }

          event.target.reset();
          this.getLinkedIssues();
          this.$modal.hide("link-issue");
        })
        .catch(e => {
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
        });
    },

    //Deslinka um jira do ticket
    unlinkIssue(linkedIssue, index) {
      var ticketId = 0;
      var obj = {};

      this.issueTickets = linkedIssue.ticketInformations;

      this.issueTickets.forEach(function(data) {
        obj[data.id] = data.subject;
      });

      const { value: id } = swal
        .fire({
          title: this.$t("jiraIntegration.unlinktText"),
          type: "warning",
          // input: 'select',
          // inputOptions: obj,
          // inputPlaceholder: 'Select a ticket',
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.$t("yes"),
          cancelButtonText: this.$t("no"),
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            Issue.unlink(linkedIssue, this.ticketId)
              .then(response =>
                this.$swal(
                  this.$t("jiraIntegration.unlink"),
                  this.$t("swal.textSuccess"),
                  "success"
                )
              )
              .catch();

            const getTicketById = function(ticketInformations, id) {
              for (var i = 0; i < ticketInformations.length; i++) {
                if (ticketInformations[i].id === id) {
                  return i;
                }
              }
              return null;
            };

            if (this.issueTickets.length == 1) {
              this.linkedIssues.splice(index, 1);
            } else {
              this.linkedIssues.splice(index, 1);
              linkedIssue.ticketInformations.splice(
                getTicketById(this.issueTickets, result.value),
                1
              );

              TouchList.linkedIssues.splice(index, 1, linkedIssue);
            }
            //this.issueTickets.splice(getTicketById( this.issueTickets, result.value));
            this.linkedIssues = [...this.linkedIssues];
          }
        });
    },

    changeObserver() {
      let projectId = this.profileIDRefresh;

      if (projectId) {
        // Decidir novo profile
        let changedProject = null;
        for (let i in this.projects) {
          if (projectId == this.projects[i].id) {
            changedProject = this.projects[i];
            this.jiraProjectId = this.projects[i];
            break;
          }
        }

        this.issuetypes = changedProject.issuetypes;
      } else {
        this.issuetypes = [];
        this.issue.issuetype = "";
      }
    },

    cleanIssue() {
      this.issue = {
        name: "",
        summary: "",
        project: null,
        issuetype: null,
        assignee: null,
        description: "",
        persistOnJira: true,
        idTicket: ""
      };
      this.checkboxTicket = false;
      this.value = "";
    },
    cleanJiraComment() {
      this.jiraComment = {
        jira: "",
        comment: ""
      };
    }
  },
  computed: {
    profileIDRefresh: function() {
      return this.value ? this.value.id : "";
    },

    refreshErrorCommentJiraIssue: function() {
      this.$store.getters.getCommentIssueJiraError &&
      this.jiraComment.comment == ""
        ? (this.error = true)
        : (this.error = false);
    },

    isDisabled() {
      if (
        this.value.id != null &&
        this.value.id > "0" &&
        this.issuetypes &&
        this.issuetypes.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },

    linkedIssuesContains: function(issue) {
      for (var i = 0; i < this.linkedIssues.length; i++) {
        if (this.linkedIssues[i].id == issue.id) {
          return true;
        }
        return false;
      }
    }
  }
};
</script>

<style>
svg:hover #reassign {
  fill: #ff5a5f;
}

.linkformulary {
  padding-top: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 30px;
}

.form-title {
  padding: 15px 0 0 0;
}

.form-field {
  padding-bottom: 15px;
}

.v--modal-overlay .v--modal-box {
  overflow: visible !important;
  padding: 15px 13px;
}

.jira-componente .btn-jira {
  width: 50%;
}

.option__image {
  height: 20px;
}

.option__image_30 {
  height: 30px;
}

.message-icon {
  width: 16px;
  margin: 1px 5px 0 5px;
}

.comment-btn-div {
  padding: 35px 150px 35px 150px;
}

.border-red {
  border-color: red;
  border-style: solid;
}
</style>

