<template>
  <div class="box div-default jira-componente">
    <modals-container/>

    <div class="buttons-jira align-self-center">
      <button class="btn-jira" type="success" wide @click="show">{{ $t('jiraIntegration.create') }}</button>
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
    >{{ $t('jiraIntegration.linkedJiraIssues') }} {{linkedIssues.length}}</div>
    <div
      class="flex flex-column item-ticket"
      v-for="(linkedIssue, index) in linkedIssues"
      :key="linkedIssue.id"
    >
      <div class="flex flex-row flex-space-between">
        <div class="flex flex-row">
          <div class="padding-2-r">
            <img src="/static/icons/review.svg" alt>
          </div>
          <div class="f-12-500-blue-dark align-self-center">{{linkedIssue.name}}</div>
        </div>
        <div class="flex flex-row flex-align-items-start">
          <img
            src="/static/icons/eye.svg"
            alt
            class="text-right pointer"
            wide
            @click="showIssueInfo(linkedIssue, index)"
          >
          <img
            src="/static/icons/close.svg"
            alt
            class="text-right pointer"
            @click="unlinkIssue(linkedIssue)"
          >
        </div>
      </div>
      <div class="padding-20-l">
        <span
          class="f-10-500-gray"
          v-if="linkedIssue.agentNames.length == 0"
        >{{$t('jiraIntegration.unnassigned')}}</span>
        <div
          v-for="ticketIndormation in linkedIssue.ticketInformations"
          :key="ticketIndormation.id"
        >
          <span class="f-10-500-gray">{{$t('jiraIntegration.assigne')}}</span>
          <span class="f-10-300-gray">{{ticketIndormation.username}}</span>
        </div>
      </div>
    </div>
    <modal name="create-issue" :height="365">
      <div class="div-hover margin-10-trbl padding-10-trbl">
        <form @submit.prevent="newIssue">
          <div class="margin-20-trbl">
            <span class="f-18-100-gray">{{$t('jiraIntegration.issueRegister')}}</span>
          </div>

          <div class="flex flex-column padding-100-l">
            <div class="form-title flex flex-column">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">{{$t('jiraIntegration.project')}}</label>
                </div>
                <!-- DropDown escolher Project -->
                <div style="width: 250px">
                  <!-- DropDown escolher Project -->
                  <multiselect
                    v-model="value"
                    @input="changeObserver()"
                    :options="projects"
                    placeholder="Selecione um Projeto *"
                    label="name"
                    track-by="name"
                    :selectLabel="$t('multiselect.pressEnter')"
                    :deselectLabel="$t('multiselect.pressRemove')"
                    >{{ profileIDRefresh }}</multiselect>
                </div>
              </div>
            </div>

            <div class="form-title flex flex-column">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">PENDÊNCIA *</label>
                </div>
                <div style="width: 250px">
                  <!-- DropDown escolher Issue Type -->
                  <multiselect
                    v-model="issue.issuetypeId"
                    :options="issueTypes"
                    placeholder="Selecione Tipo de pendência *"
                    label="name"
                    track-by="name"
                    :selectLabel="$t('multiselect.pressEnter')"
                    :deselectLabel="$t('multiselect.pressRemove')"
                    ></multiselect>
                </div>
              </div>
            </div>

            <div class="form-title flex flex-column">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">SUBJECT</label>
                </div>
                <div style="width: 250px">
                  <input
                    name="issue.summary"
                    v-model="issue.summary"
                    type="text"
                    class="input-style f-12-300-gray width-100"
                    :placeholder="$t('Subject')"
                  >
                </div>
              </div>
            </div>

            <div class="form-title flex flex-column margin-10-b">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">DESCRIPTION *</label>
                </div>
                <div style="width: 250px">
                  <input
                    name="issue.description"
                    v-model="issue.description"
                    type="text"
                    class="input-style f-12-300-gray width-100"
                    :placeholder="$t('Description *')"
                  >
                </div>
              </div>
            </div>

            <div class="flex-full flex flex-justify-end margin-15-t padding-5-b">
              <div class="padding-20-r">
                <button class="btn-medium btn-cancel font-bold" @click.prevent="hide">CANCEL</button>
              </div>
              <div class="padding-20-r">
                <button class="btn-medium btn-blue" type="submit">
                  <span class="f-14-300-gray color-white">NEW ISSUE</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </modal>
    <modal name="link-issue">
      <div class="div-hover margin-10-trbl padding-10-trbl">
        <form @submit.prevent="linkIssue">
          <div class="margin-20-trbl">
            <span class="f-18-100-gray">LINK ISSUE</span>
          </div>

          <div class="flex flex-column padding-60-l">
            <div class="form-title flex flex-column">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">ISSUE *</label>
                </div>
                <!-- DropDown escolher Project -->
                <div style="width: 250px">
                  <!-- DropDown escolher Project -->
                  <!-- DropDown escolher Issue -->
                  <multiselect
                    v-model="link.issueId"
                    :options="issues"
                    placeholder="Selecione a ISSUE *"
                    label="name"
                    track-by="name"
                    :selectLabel="$t('multiselect.pressEnter')"
                    :deselectLabel="$t('multiselect.pressRemove')"
                    ></multiselect>
                </div>
              </div>
            </div>

            <div class="form-title flex flex-column">
              <div class="flex-full flex-align-items-center">
                <div class="width-20 text-right">
                  <label class="f-10-500-darkcyan padding-15-r">Ticket *</label>
                </div>
                <!-- DropDown escolher Project -->
                <div style="width: 250px">
                  <!-- DropDown escolher Project -->
                  <!-- DropDown escolher Issue -->
                  <multiselect
                    v-model="link.ticketId"
                    :options="tickets"
                    placeholder="Ticket *"
                    label="subject"
                    track-by="subject"
                    :selectLabel="$t('multiselect.pressEnter')"
                    :deselectLabel="$t('multiselect.pressRemove')"
                  ></multiselect>
                </div>
              </div>
            </div>

            <div class="flex-full flex flex-justify-end margin-30-t padding-15-b width-90">
              <div class="padding-20-r">
                <button class="btn-medium btn-cancel font-bold" @click.prevent="hideLink">CANCEL</button>
              </div>
              <div class="padding-20-r">
                <button class="btn-medium btn-blue" type="submit">
                  <span class="f-14-300-gray color-white">LINK</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </modal>
    <modal name="linked-issue-info" :height="650">
      <div class="div-hover margin-10-trbl padding-10-trbl">
        <div class="margin-20-trbl">
          <span class="f-18-100-gray">{{this.linkedIssueInfo.name}}</span>
        </div>
        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoDescription')}}</span>
          <span class="f-10-500-gray">{{this.linkedIssueInfo.description}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoJiraUrl')}}</span>
          <span class="f-10-500-gray">{{this.linkedIssueInfo.jiraUrl}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoSummary')}}</span>
          <span class="f-10-500-gray">{{this.linkedIssueInfo.summary}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoCreatedAt')}}</span>
          <span class="f-10-500-gray">{{this.formatedIssueCreationDate}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoProject')}}</span>
          <span class="f-10-500-gray">{{this.linkedIssueProject.name}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoIssueType')}}</span>
          <span class="f-10-500-gray">{{this.linkedIssueType.name}}</span>
          <br>
          <br>
        </div>

        <div class="div-hover margin-10-trbl padding-10-trbl">
          <span class="f-10-500-gray">{{$t('jiraIntegration.infoAssignedTo')}}</span>
          <div class="margin-10-trbl padding-10-trbl">
            <div v-for="agentNameInfo in linkedIssueInfo.agentNames" :key="agentNameInfo">
              <span class="f-10-300-gray">{{agentNameInfo}}</span>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vue from "vue";
import VModal from "vue-js-modal";
import moment from "moment";
import swal from "sweetalert2";
import TimeTracker from "src/backend/models/TimeTracker.js";
import Project from "src/backend/models/Project.js";
import JiraIssue from "src/backend/models/JiraIssue.js";
import Issue from "src/backend/models/Issue.js";
import Prescription from "src/backend/models/Prescription.js";

export default {
  created() {
    Issue.getLinkable()
      .then(result => {
        const data = [...result.data.content];
        this.issues = data;
      })
      .catch(e => {});

    Ticket.getAll()
      .then(result => {
        const data = [...result.data];
        this.tickets = data;
      })
      .catch(e => {});

    Issue.getLinkedIssue()
      .then(result => {
        const data = [...result.data.content];
        this.linkedIssues = data;
      })
      .catch(e => {});

    Project.searchQuery(0)
      .then(result => {
        const data = [...result.data.content];
        this.projects = data;
      })
      .catch(e => {});
  },
  methods: {
    showIssueInfo(linkedIssue) {
      this.linkedIssueInfo = linkedIssue;
      this.formatedIssueCreationDate = moment(
        String(this.linkedIssueInfo.createdAt)
      ).format("hh:mm DD/MM/YYYY");
      this.linkedIssueProject = this.linkedIssueInfo.project;
      this.linkedIssueType = this.linkedIssueInfo.issueType;
      this.$modal.show("linked-issue-info");
    },
    unlinkIssue(linkedIssue, index) {
      self = this;
      var ticketId = 0;
      var obj = {};

      this.issueTickets = linkedIssue.ticketInformations;

      this.issueTickets.forEach(function(data) {
        obj[data.id] = data.subject;
      });

      const { value: id } = swal
        .fire({
          title: "Selecione o ticket para desassociar",
          input: "select",
          inputOptions: obj,
          inputPlaceholder: "Select a ticket",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            Issue.unlink(linkedIssue, result.value)
              .then(response => swal("Unlinked!", response.data.msg, "success"))
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
              self.linkedIssues.splice(index, 1);
            } else {
              linkedIssue.ticketInformations.splice(
                getTicketById(this.issueTickets, result.value),
                1
              );

              self.linkedIssues.splice(index, 1, linkedIssue);
            }
            //this.issueTickets.splice(getTicketById( this.issueTickets, result.value));
            this.linkedIssues = self.linkedIssues;
            this.$swal(
              "Unlinked",
              "You successfully deleted this file",
              "success"
            );
          }
        });
    },
    show() {
      JiraIssue.getMetadata()
        .then(result => {
          const data = [...result.data.content];
        })
        .catch(e => {});
      this.$modal.show("create-issue");
    },
    showLink() {
      this.$modal.show("link-issue");
    },
    hide() {
      this.$modal.hide("create-issue");
    },
    hideLink() {
      this.$modal.hide("link-issue");
    },
    newIssue(event) {
      this.issue.project = this.jiraProjectId;
      this.issue.name = "JIRA - " + this.issue.summary;
      this.issue.issueType = this.issue.issuetypeId;
      Issue.post(this.issue)
        .then(result => {
          this.$store.getters.getFunctions.uploads.forEach(element => {
            Ticket.upload(element, result.data.id)
              .then(result => {})
              .catch(e => {});
          });

          this.$swal.fire({
            title: `${this.$t('label.issue')} ${this.$t('swal.titleSuccess')}`,
            text: this.$t('swal.textSuccess'),
            type: "success",
            showConfirmButton: true
          });

          this.linkedIssues.unshift([...result.data]);
        })
        .catch(e => {
          this.$swal.fire({
            title: this.$t('swal.titleError'),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
        });
      event.target.reset();
      this.$modal.hide("create-issue");
    },
    linkIssue(event) {
      this.link.issueId = this.link.issueId.id;
      this.link.ticketId = this.link.ticketId.id;
      Issue.postLink(this.link)
        .then(result => {
          this.$store.getters.getFunctions.uploads.forEach(element => {
            Ticket.upload(element, result.data.id)
              .then(result => {})
              .catch(e => {});
          });

          this.$swal.fire({
            title: `${this.$t('label.issueLink')} ${this.$t('swal.titleSuccess')}`,
            text: this.$t('swal.textSuccess'),
            type: "success",
            showConfirmButton: true
          });
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
          this.$modal.hide("link-issue");
        })
        .catch(e => {
          this.$swal.fire({
            title: this.$t('swal.titleError'),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
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
        this.issueTypes = changedProject.test;
      }
    }
  },
  computed: {
    profileIDRefresh: function() {
      return this.value.id ? this.value.id : 0;
    },
    isDisabled() {
      if (
        this.value.id != null &&
        this.value.id > 0 &&
        this.test &&
        this.test.length > 0
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
  },
  data() {
    return {
      issue: {
        name: "",
        summary: "",
        project: "",
        issueType: "",
        description: "",
        persistOnJira: true
      },
      link: {
        issueId: 0,
        ticketId: 0
      },
      projects: this.projects,
      issues: this.issues,
      tickets: this.tickets,
      test: [],
      value: {
        name: "Project *"
      },
      projectId: "",
      jiraProjectId: "",
      linkedIssues: [],
      linkedIssueInfo: {},
      linkedIssueProject: {},
      linkedIssueType: {},
      formatedIssueCreationDate: "",
      issueTickets: [],
      showListIssues: true
    };
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
</style>
