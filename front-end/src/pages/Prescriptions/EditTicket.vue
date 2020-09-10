<template>
  <div>
    <div id="container" v-if="ticket">
      {{ updateTotalTime }}
      <div id="content-master">
        <div
          v-if="ticketValidate"
          class="flex-full flex-column f-22-300-gray flex-align-items-center padding-100-tb"
        >
          <div>
            {{$t('editTicket.validate.acessDenied')}}
            <span class="color-red">{{ this.idTicket }}</span>
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
                    :placeholder="$t('editTicket.editYourTicket')"
                  />
                </div>
              </div>

              <div class="margin-20-rl division background-darkcyan"></div>

              <div class="flex">
                <div class="flex flex-row margin-15-rl">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/reviewLight.svg" alt />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-10-500-darkcyan padding-5-b">{{ $t('editTicket.state') }}</div>
                    <div class="f-14-300-gray">{{ ticket.state.name }}</div>
                  </div>
                </div>

                <div class="flex flex-row margin-15-rl">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/clock.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-10-500-darkcyan padding-5-b">{{ $t('editTicket.lastUpdate') }}</div>
                    <div
                      class="f-14-300-gray"
                    >{{ ticket.updatedAt ? this.$moment.utc(ticket.updatedAt).fromNow() : $t('editTicket.noUpdate') }}</div>
                  </div>
                </div>

                <div class="flex flex-row margin-15-rl" v-if="!!ticket.department">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/business_center_blue.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div
                      class="f-10-500-darkcyan padding-5-b"
                    >{{ $t('editTicket.header.department') }}</div>
                    <div class="f-14-300-gray">{{ ticket.department.name }}</div>
                  </div>
                </div>

                <div class="flex flex-row margin-15-rl">
                  <div class="padding-5-trbl">
                    <img clas="vertical-align-initial" src="/static/icons/clientHistory.svg" />
                  </div>
                  <div class="flex flex-column">
                    <div class="f-10-500-darkcyan padding-5-b">{{ $t('editTicket.attributed') }}</div>
                    <div
                      class="f-14-300-gray"
                    >{{ this.atribuido ? this.atribuido : $t('editTicket.noAtributed') }}</div>
                  </div>
                </div>

                <div class="margin-10-rl"></div>
              </div>
            </div>

            <div
              class="f-14-gray-light color-red-hover padding-20-l align-self-center pointer"
              @click="openModalReassign"
              v-if="!ticket.state.merged"
            >
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
                  />
                </g>
              </svg>
              {{ $t('editTicket.reassignTicket') }}
            </div>

            <div
              class="f-14-gray-light color-red-hover padding-20-l align-self-center pointer"
              @click="showAnswerActive"
              v-if="!ticket.state.merged"
            >
              <img class="icon-size-2" src="/static/icons/new-comment.svg" />
              {{ $t('editTicket.answers.answer') }}
            </div>
          </div>

          <!-- END HEADER CONTENT -->
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
                      >{{ $t('editTicket.header.ticketId') }}</div>
                      <div class="f-12-300-gray">{{ ticket.id }}</div>
                    </div>
                  </div>
                  <!-- <div class="margin-50-rl"></div> -->
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="padding-5-l icon-position icon-size icon-position-3"
                        src="/static/icons/target.svg"
                      />
                    </div>
                    <div class="flex flex-column" v-if="ticket.company">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicket.header.clientName') }}</div>
                      <div
                        class="f-12-300-gray"
                        :class="[ !ticket.company || !ticket.company.id ? 'color-red' : '']"
                      >{{ !ticket.company || !ticket.company.id ? " N/A " : ticket.company.name }}</div>
                    </div>
                  </div>
                  <!-- <div class="margin-50-rl"></div> -->
                  <div class="flex flex-row">
                    <div class="padding-5-trbl">
                      <img
                        class="vertical-align-initial padding-5-r"
                        src="/static/icons/username.svg"
                        alt
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('newTicket.form.general.requestBy') }}</div>
                      <div
                        class="f-12-300-gray"
                        :class="[ !ticket.client || !ticket.client.id  ? 'color-red' : '']"
                      >{{ !ticket.client || !ticket.client.id ? " N/A " : ticket.client.displayName }}</div>
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
                      >{{ $t('editTicket.header.attachedFile') }}</div>
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
                        alt
                      />
                    </div>
                    <div class="flex flex-column">
                      <div
                        class="f-12-500-darkcyan padding-5-b"
                      >{{ $t('editTicket.header.creationDate') }}</div>
                      <div
                        class="f-12-300-gray"
                      >{{ (this._getLocale() == 'en') ? this.$moment(ticket.createdAt).format('YYYY/MM/DD | HH:mm') : this.$moment(ticket.createdAt).format('DD/MM/YYYY | HH:mm') }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-full">
                <div class="flex margin-20-rl">
                  <div class="padding-5-trbl">
                    <img
                      class="vertical-align-initial padding-5-r"
                      src="/static/icons/subject.svg"
                      alt
                    />
                  </div>
                  <div class="flex flex-column">
                    <div
                      class="f-12-500-darkcyan padding-5-b"
                    >{{ $t('editTicket.header.description') }}</div>
                    <div
                      class="description f-12-300-gray"
                    >{{ $t('editTicket.createdBy') }} {{ ticket.externalCreator }}</div>
                    <div class="description f-12-300-gray" v-html="ticket.description"></div>
                  </div>
                </div>
              </div>

              <div class="margin-30-t">
                <div class="flex-full">
                  <tabs :options="{ useUrlFragment: false }" cache-lifetime="0">
                    <tab :name="$t('editTicket.details.title')" :prefix="detailsIcon">
                      <div class="flex">
                        <div class="flex padding-100-r">
                          <img src="/static/icons/subject.svg" class="padding-10-r" />
                          <span class="f-14-500-gray-light-2">{{ $t('editTicket.details.subject') }}</span>
                        </div>
                        <div class="f-14-gray-light-2">{{ ticket.subject }}</div>
                      </div>
                      <img
                        src="/static/icons/merge2.svg"
                        v-if="ticket.canMerged && !ticket.state.merged"
                        tooltip.hover
                        :title="$t('editTicket.answer.merge')"
                        @click="makeMerge()"
                        class="icon-size-3 padding-20-r"
                      />
                      <div class="flex-full section-form">
                        <div class="flex-full padding-15-trbl">
                          <div class="width-25 f-14-500-gray-light-2 flex">
                            <div class="width-70 align-self-center">
                              <div class="padding-15-r min-width-100">
                                <span>
                                  <img src="/static/icons/ticketLight.svg" class="padding-10-r" />
                                </span>
                                <span>{{ $t('editTicket.details.form.ticket.title') }}</span>
                              </div>
                            </div>
                            <div class="margin-20-l division-edit"></div>
                          </div>

                          <div class="flex-full flex flex-wrap">
                            <!-- CANAL DE COMUNICAÇÃO -->
                            <div
                              class="width-33 text-right margin-20-t edit-tags"
                              :class="{'width-50' : this.HD}"
                              v-if="ticket.channel"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.ticket.communicationChannel') }}</label>
                              <select
                                name="ticket.channel.id"
                                v-model="ticket.channel.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.ticket.selectChannel')"
                                v-validate="'required'"
                              >
                                <option
                                  value
                                >{{ $t('editTicket.details.form.ticket.selectChannel') }}</option>
                                <option
                                  v-for="(channel, id) in this.channels"
                                  :key="id"
                                  :value="channel.id"
                                >{{channel.name}}</option>
                              </select>
                            </div>
                            <!-- CANAL DE COMUNICAÇÃO END -->

                            <!-- STATUS -->
                            <div
                              class="width-33 text-right margin-20-t edit-tags"
                              v-if="ticket.state"
                              :class="{'width-50' : this.HD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.ticket.state') }}</label>
                              <select
                                name="ticket.state.id"
                                v-model="ticket.state.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.ticket.selectState')"
                                v-validate="'required'"
                              >
                                <option value>{{ $t('editTicket.details.form.ticket.selectState') }}</option>
                                <option
                                  v-for="(state, id) in this.states"
                                  :key="id"
                                  :value="state.id"
                                >{{state.name}}</option>
                              </select>
                            </div>
                            <!-- STATUS END -->

                            <!-- PROTOCOLOS ASSOCIADOS -->
                            <div
                              class="width-33 text-right margin-20-t edit-tags"
                              :class="{'width-50' : this.HD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                                :class="{'color-red': errors.has('ticket.associatedProtocols') }"
                              >{{ $t('newTicket.form.ticket.associatedProtocols') }}</label>

                              <multiselect
                                name="ticket.associatedProtocols"
                                style="width: 200px"
                                :multiple="true"
                                :taggable="true"
                                :block-keys="['Delete']"
                                :options="protocols"
                                :selectLabel="$t('newTicket.form.ticket.enterToSelect')"
                                :tagPlaceholder="$t('newTicket.form.ticket.enterAssociatedProtocol')"
                                @tag="addProtocol"
                                :placeholder="$t('newTicket.form.ticket.typeAssociatedProtocol')"
                                v-model="ticket.associatedProtocols"
                              >
                                <template slot="noOptions">
                                  <div>{{$t('multiselect.empty')}}</div>
                                </template>
                              </multiselect>
                            </div>
                            <!-- PROTOCOLOS ASSOCIADOS END -->

                            <!-- TAGS -->
                            <div
                              class="width-33 margin-20-t edit-tags"
                              :class="{'width-50' : this.HD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.ticket.relatedTags') }}</label>
                              <tags
                                :taggable="true"
                                :placeholder="$t('editTicket.details.form.ticket.typeTags')"
                                style="width: 200px"
                              ></tags>
                            </div>
                            <!-- TAGS END -->

                            <!-- DEPARTAMENTO -->
                            <div
                              class="width-33 text-right margin-20-t"
                              :class="{'width-50' : this.HD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.issue.department') }}</label>
                              <select
                                name="ticket.department.id"
                                v-model="ticket.department.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.issue.selectDepartment')"
                                v-validate="'required'"
                              >
                                <option
                                  value
                                >{{ $t('editTicket.details.form.issue.selectDepartment') }}</option>
                                <option
                                  v-for="(department, id) in this.departments"
                                  :key="id"
                                  :value="department.id"
                                >{{department.name}}</option>
                              </select>
                            </div>
                            <!-- DEPARTAMENTO END -->
                          </div>
                        </div>
                      </div>

                      <div class="flex-full section-form">
                        <div class="flex-full padding-15-trbl">
                          <div class="width-25 f-14-500-gray flex" :class="{'width-35' : this.HD}">
                            <div class="width-56 align-self-center" :class="{'width-40' : this.HD}">
                              <div class="padding-15-r f-14-500-gray-light-2 min-width-100">
                                <span>
                                  <img src="/static/icons/issueLight.svg" class="padding-10-r" />
                                </span>
                                <span>{{ $t('editTicket.details.form.issue.title') }}</span>
                              </div>
                            </div>
                            <div v-if="this.HD" class="margin-16-l division-edit"></div>
                            <div v-if="!this.HD" class="margin-55-l division-edit"></div>
                          </div>

                          <div class="flex-full flex flex-wrap">
                            <!-- TIPO DE PENDÊNCIA -->
                            <div
                              class="width-33 text-right"
                              v-if="ticket.issueType"
                              :class="{'width-46' : this.HD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.issue.typeIssue') }}</label>
                              <select
                                name="ticket.issue.id"
                                v-model="ticket.issueType.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.issue.selectIssueType')"
                                v-validate="'required'"
                              >
                                <option
                                  value
                                >{{ $t('editTicket.details.form.issue.selectIssueType') }}</option>
                                <option
                                  v-for="(issueType, id) in this.issuesType"
                                  :key="id"
                                  :value="issueType.id"
                                >{{issueType.name}}</option>
                              </select>
                            </div>
                            <!-- TIPO DE PENDÊNCIA END -->

                            <!-- SLA -->
                            <div class="width-33 text-right" :class="{'width-54' : this.HD}">
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.issue.levelServiceAgreement') }}</label>
                              <select
                                name="ticket.sla.id"
                                v-model="ticket.sla.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.issue.selectAgreement')"
                                v-validate="'required'"
                              >
                                <option
                                  value
                                >{{ $t('editTicket.details.form.issue.selectAgreement') }}</option>
                                <option
                                  v-for="(sla, id) in this.slas"
                                  :key="id"
                                  :value="sla.id"
                                >{{sla.name}}</option>
                              </select>
                            </div>
                            <!-- SLA END -->

                            <!-- PRIORIDADE -->
                            <div
                              class="width-33 text-right edit-tags"
                              v-if="ticket.priority"
                              :class="{'width-55 margin-priority-hd' : this.HD, 'width-33 text-right': this.fullHD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                              >{{ $t('editTicket.details.form.issue.issuePriority') }}</label>
                              <select
                                name="ticket.priority.id"
                                v-model="ticket.priority.id"
                                class="select-style f-12-500-gray-light"
                                :placeholder="$t('editTicket.details.form.issue.selectPriority')"
                                v-validate="'required'"
                              >
                                <option
                                  value
                                >{{ $t('editTicket.details.form.issue.selectPriority') }}</option>
                                <option
                                  v-for="(priority, id) in this.prioritys"
                                  :key="id"
                                  :value="priority.id"
                                >{{priority.name}}</option>
                              </select>
                            </div>
                            <!-- PRIORIDADE END -->

                            <!-- EMAILS -->
                            <div
                              class="text-left edit-tags"
                              :class="{'width-50 margin-top-emails-hd' : this.HD, 'width-33 margin-top-emails' : this.fullHD, 
                              'width-33 margin-top-emails-more-four' : this.ticket.issueType && this.ticket.sla && this.ticket.priority && this.fullHD}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                                :class="{'color-red': errors.has('ticket.emails.id') }"
                              >{{ $t('newTicket.form.issue.notifyTo') }}</label>
                              <emails style="width: 200px"></emails>
                            </div>
                            <!-- EMAILS END -->

                            <!-- CLIENTE -->
                            <div
                              class="width-33 text-right margin-12-t"
                              :class="{'width-54 margin-22-t' : this.HD, 'margin-20-t' : this.fullHD}"
                              v-if="ticket.company.id == ''"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                                :class="{'color-red': errors.has('company') }"
                              >{{ $t('newTicket.form.general.client') }}</label>

                              <select
                                name="company.id"
                                v-model="company.id"
                                @change="getCompanyUsers"
                                class="select-style f-12-500-gray-light"
                              >
                                <option value>{{ $t('newTicket.form.general.selectClient') }}</option>

                                <option
                                  v-for="(comp, id) in this.companies"
                                  :key="id"
                                  :value="comp.id"
                                >{{comp.name}}</option>
                              </select>
                            </div>
                            <!-- CLIENTE END -->

                            <!-- SOLICITADO POR -->
                            <div
                              v-if="editUser"
                              class="text-right margin-10-t edit-tags"
                              :class="{'width-33 margin-15-t': this.fullHD, 'width-54 margin-request-by-hd' : this.HD && ticket.company.id != '', 'width-46' : this.HD && ticket.company.id == ''}"
                            >
                              <label
                                class="f-10-500-darkcyan padding-15-r"
                                :class="{'color-red': errors.has('ticket.client.id') }"
                              >{{ $t('newTicket.form.general.requestBy') }}</label>
                              <multiselect
                                name="ticket.client"
                                v-model="ticket.client"
                                style="width: 201px"
                                @search-change="findUsers"
                                @select="selectedUser"
                                :options="users"
                                :block-keys="['Delete']"
                                :placeholder="$t('newTicket.form.general.selectUser')"
                                label="displayName"
                                track-by="id"
                                :loading="searchingUsers"
                                :internal-search="false"
                                :selectLabel="$t('multiselect.pressEnter')"
                                :deselectLabel="$t('multiselect.pressRemove')"
                                :selectedLabel="$t('multiselect.selected')"
                                class="f-12-500-gray-light"
                              >
                                <template slot="afterList" v-if="!userQuery.last">
                                  <div
                                    class="loadMore f-12-500-white"
                                    @click="getUsers(true)"
                                  >{{$t('newTicket.loadMore')}}</div>
                                </template>
                                <template slot="noOptions">
                                  <div>{{$t('multiselect.empty')}}</div>
                                </template>
                              </multiselect>
                              <img
                                tooltip.hover
                                :title="$t('newUser.registerNewUser')"
                                v-if="company.id != ''"
                                @click="addUser()"
                                class="icon-size icon-position-2"
                                src="/static/icons/add-user.svg"
                              />
                            </div>
                            <!-- SOLICITADO POR END -->
                          </div>
                        </div>
                      </div>

                      <div class="flex-full flex flex-justify-end">
                        <div class="padding-20-r" @click="returnListTickets">
                          <button
                            v-if="!ticket.state.merged"
                            class="btn-medium btn-cancel font-bold"
                          >{{ $t('cancel') }}</button>
                          <button
                            v-if="ticket.state.merged"
                            class="btn-medium btn-cancel font-bold"
                          >{{ $t('login.back') }}</button>
                        </div>
                        <div
                          v-if="!ticket.state.merged"
                          class="padding-20-r pointer"
                          @click="editTicket"
                        >
                          <button class="btn-medium btn-blue">{{ $t('save') }}</button>
                        </div>
                      </div>
                    </tab>

                    <tab :name="$t('editTicket.answers.title')" :prefix="detailsAnswer">
                      <div class="flex-full section-form">
                        <div class="flex-full padding-15-trbl">
                          <div class="width-25 f-14-500-gray flex">
                            <div class="padding-40-t">
                              <div class="padding-15-r f-14-500-gray-light-2 min-width-100">
                                <div
                                  id="public"
                                  class="flex flex-align-items-center button-answer"
                                  @click="setAnswerTypePrivate(false)"
                                >
                                  <div
                                    :class="[ answerPrivate ? 'button-answer-left-disable' : 'button-answer-left-enable']"
                                  ></div>
                                  <div class="padding-10-r">
                                    <svg
                                      version="1.2"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      overflow="visible"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 24 24"
                                      width="20"
                                      height="20"
                                    >
                                      <g>
                                        <path
                                          :class="[ answerPrivate ? 'button-answer-disable' : 'button-answer-enable']"
                                          xmlns:default="http://www.w3.org/2000/svg"
                                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                                          vector-effect="non-scaling-stroke"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    <span
                                      :class="[ answerPrivate ? 'button-answer-disable' : 'button-answer-enable, f-14-500-darkcyan']"
                                    >{{$t('editTicket.answers.public')}}</span>
                                  </div>
                                </div>
                                <div
                                  id="public"
                                  class="flex flex-align-items-center button-answer"
                                  @click="setAnswerTypePrivate(true)"
                                >
                                  <div
                                    :class="[ !answerPrivate ? 'button-answer-left-disable' : 'button-answer-left-enable']"
                                  ></div>
                                  <div class="padding-10-r">
                                    <svg
                                      version="1.2"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      overflow="visible"
                                      preserveAspectRatio="none"
                                      viewBox="0 0 24 24"
                                      width="20"
                                      height="20"
                                    >
                                      <g>
                                        <path
                                          :class="[ !answerPrivate ? 'button-answer-disable' : 'button-answer-enable']"
                                          xmlns:default="http://www.w3.org/2000/svg"
                                          d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                                          vector-effect="non-scaling-stroke"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    <span
                                      :class="[ !answerPrivate ? 'button-answer-disable' : 'button-answer-enable, f-14-500-darkcyan']"
                                    >{{$t('editTicket.answers.private')}}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="flex-full flex flex-wrap">
                            <div class="flex-full flex-column flex">
                              <div class="width-100 padding-10-b">
                                <label
                                  class="padding-15-r f-12-500-darkcyan"
                                >{{ $t('editTicket.answers.answer') }}</label>
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
                                  :placeholder="$t('editTicket.answers.typeYourAnswer')"
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
                              <div
                                class="padding-20-r pointer"
                                v-if="!ticket.state.merged"
                                @click="sendAnswer"
                              >
                                <button
                                  class="btn-medium btn-blue"
                                >{{ $t('editTicket.answers.send') }}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tab>

                    <tab
                      :name="$t('editTicket.uploads.title')"
                      :prefix="detailsUpload"
                      v-if="ticket.fileUploads && ticket.fileUploads[0]"
                    >
                      <div class="flex-full section-form">
                        <div class="flex-full padding-15-trbl">
                          <div class="width-25 f-14-500-gray flex">
                            <div class="padding-40-t">
                              <div class="padding-15-r f-14-500-gray-light-2 min-width-100">
                                <span>
                                  <img src="/static/icons/upload.svg" class="padding-10-r" />
                                </span>
                                <span>{{$t('editTicket.uploads.title')}}</span>
                              </div>
                            </div>
                            <div class="margin-20-rl division-edit"></div>
                          </div>

                          <div class="flex-full flex flex-wrap">
                            <div class="flex-full flex-column flex">
                              <div class="width-100 padding-10-b">
                                <label
                                  class="padding-15-r f-12-500-darkcyan"
                                >{{ $t('editTicket.uploads.filesAttach') }}</label>
                              </div>
                              <div class="width-100">
                                <div
                                  class="padding-5-b"
                                  v-for="fileUpload in attachments"
                                  :key="fileUpload.id"
                                >
                                  <img src="/static/icons/upload.svg" class="padding-10-r" />
                                  <a
                                    class="f-12-500-blue-dark"
                                    :href="fileUpload.url"
                                    target="_blank"
                                  >{{ fileUpload.nameDocument }}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tab>
                  </tabs>
                </div>

                <div class="flex-full flex-column flex-align-items-center padding-10-b">
                  <div class="separator-edit-ticket">
                    <hr />
                  </div>
                  <div class="f-14-500-darkcyan pointer" @click="getTickeAnswerNotifications">
                    <img src="/static/icons/clockCyan.svg" alt />
                    {{ $t('editTicket.history') }}
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
                        <answer @refreshComments="refreshComments" :answer="answer"></answer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="widgets">
              <time-tracker v-if="!ticket.state.merged" :key="componentKey" :idTicket="idTicket"></time-tracker>
              <jira-actions v-if="!ticket.state.merged" :ticketId="idTicket" ref="jiraActions"></jira-actions>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal name="reassign" height="auto" :scrollable="true">
      <div class="div-hover">
        <form @submit.prevent="reassignTicket">
          <div class="flex-full margin-10-trbl">
            <div class="width-80">
              <span class="f-18-100-gray">{{$t('editTicket.reassignTicket')}}</span>
            </div>
            <div
              class="width-30 flex flex-justify-end f-10-500-darkcyan pointer margin-20-r"
              v-if="_isAgent()"
            >
              <button
                class="btn-blue btn-rounded"
                type="button"
                @click="switchAssign"
              >{{ assigningToLoggedUser ? $t('editTicket.assignToOther') : $t('editTicket.assignToMe')}}</button>
            </div>
          </div>
          {{ getAgents }}
          <div class="width-50 text-right margin-20-t" v-if="idDepartment == ''"></div>

          <div class="flex flex-column">
            <div v-if="!assigningToLoggedUser">
              <div class="flex flex-column margin-20-t flex-justify-center">
                <div class="width-50 marginCenter">
                  <label
                    class="f-10-500-darkcyan padding-15-r"
                  >{{ $t('editTicket.details.form.issue.department') }} *</label>
                </div>
                <div class="width-50 marginCenter">
                  <select
                    name="reasign.department"
                    v-model="idDepartment"
                    class="width-100 select-style f-12-500-gray-light"
                    :placeholder="$t('editTicket.details.form.issue.selectDepartment')"
                    v-validate="'required'"
                  >
                    <option value>{{ $t('editTicket.details.form.issue.selectDepartment') }}</option>
                    <option
                      v-for="(department, id) in assignDepartments"
                      :key="id"
                      :value="department.id"
                    >{{department.name}}</option>
                  </select>
                </div>
              </div>

              <div class="flex flex-column margin-20-t" v-if="idDepartment != ''">
                <div class="width-50 marginCenter">
                  <label class="f-10-500-darkcyan padding-15-r">{{$t('editTicket.AGENTS')}}</label>
                </div>
                <div class="width-50 marginCenter">
                  <multiselect
                    v-model="idAgent"
                    @input="changeObserver()"
                    :options="agents"
                    :placeholder="$t('editTicket.AGENTSSELECT')"
                    label="displayName"
                    :block-keys="['Delete']"
                    track-by="displayName"
                    :selectLabel="$t('multiselect.pressEnter')"
                    :deselectLabel="$t('multiselect.pressRemove')"
                  >
                    {{ profileIDRefresh }}
                    <template slot="noOptions">
                      <div>{{$t('multiselect.empty')}}</div>
                    </template>
                  </multiselect>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="flex margin-20-t">
                <div
                  class="f-14-300-gray marginCenter"
                >{{$t('editTicket.assigningTo') + $store.getters.getUser.name}}</div>
              </div>
              <div class="flex flex-column margin-20-t">
                <div class="width-50 marginCenter">
                  <label
                    class="f-10-500-darkcyan padding-15-r"
                  >{{ $t('editTicket.details.form.issue.department') }} *</label>
                </div>
                <div class="width-50 marginCenter">
                  <select
                    name="reasign.department"
                    v-model="idDepartment"
                    class="width-100 select-style f-12-500-gray-light"
                    :placeholder="$t('editTicket.details.form.issue.selectDepartment')"
                    v-validate="'required'"
                  >
                    <option value>{{ $t('editTicket.details.form.issue.selectDepartment') }}</option>
                    <option
                      v-for="(department, id) in assignDepartments"
                      :key="id"
                      :value="department.id"
                    >{{department.name}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex-full flex flex-justify-end margin-30-t padding-20-b">
              <div class="padding-20-r">
                <button
                  class="btn-medium btn-cancel font-bold"
                  @click.prevent="hide"
                >{{$t('timeTracker.cancel')}}</button>
              </div>
              <div class="padding-20-r">
                <button class="btn-medium btn-blue" type="submit">
                  <span class="f-14-300-gray color-white">{{$t('editTicket.reassignTicket')}}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </modal>

    <modal name="anwser_active" height="auto" :scrollable="true" v-if="ticket">
      <div class="div-hover">
        <form @submit.prevent="sendAnswerActive">
          <div class="flex flex-justify-center margin-25-trbl">
            <span class="f-14-500-darkcyan">{{$t('editTicket.activeSend')}}</span>
          </div>
          <div>
            <span
              style="margin-top: 1rem;"
              class="flex width-85 flex-tlbr f-14-300-darkcyan"
            >{{$t('editTicket.details.form.ticket.communicationChannel')}}</span>
            <div class="flex width-85 flex-tlbr">
              <select
                v-model="answerActive.channel.id"
                class="select-style width-100 f-12-500-gray-light"
                :placeholder="$t('editTicket.details.form.ticket.selectChannel')"
                v-validate="'required'"
              >
                <option value>{{ $t('editTicket.details.form.ticket.selectChannel') }}</option>
                <option
                  v-for="(channel, id) in filteredChannels"
                  :key="id"
                  :value="channel.id"
                >{{channel.name}}</option>
              </select>
            </div>
          </div>

          <div>
            <span
              style="margin-top: 1rem;"
              class="flex width-85 flex-tlbr f-14-300-darkcyan"
            >{{ $t('editTicketUser.placeholderMessage') }}</span>
            <div class="width-85 flex-tlbr">
              <ckeditor :editor="editor" v-model="answerActive.name" :config="editorConfig"></ckeditor>
            </div>
          </div>

          <div class="flex flex-justify-center padding-50-tb">
            <div class="padding-20-r pointer" @click="hideAnswerActive">
              <button class="btn-medium btn-cancel font-bold">{{ $t('cancel') }}</button>
            </div>
            <div class="padding-20-r pointer">
              <button class="btn-medium btn-blue" type="submit">{{ $t('editTicket.answers.send') }}</button>
            </div>
          </div>
        </form>
      </div>
    </modal>
    <user-modal @refresh="refreshUsers" @saveUserTicket="saveUser"></user-modal>
  </div>
</template>

<script>
import TimeTracker from "src/backend/models/TimeTracker.js";
import Prescription from "src/backend/models/Prescription.js";
import Channel from "src/backend/models/Channel.js";
import User from "src/backend/models/User.js";
import State from "src/backend/models/State.js";
import Tag from "src/backend/models/Tag.js";
import IssueType from "src/backend/models/IssueType.js";
import Priority from "src/backend/models/Priority.js";
import Sla from "src/backend/models/Sla.js";
import Product from "../../backend/models/Product";
import Department from "../../backend/models/Department";
import Company from "src/backend/models/Company.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MakeMerge } from "src/components";

export default {
  name: "EditTicket",

  components: {},
  props: ["idTicket"],

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

  created() {
    window.innerWidth > 1919 ? (this.fullHD = true) : (this.HD = true);
    this.reload();
  },

  methods: {
    reload() {
      this._getLoading(true);
      this.refreshANSWER();
      this.getTickeAnswerNotifications();
      this.$refs.jiraActions ? this.$refs.jiraActions.getLinkedIssues() : "";
    },

    refreshComments() {
      this.getTickeAnswerNotifications();
    },

    makeMerge() {
      this.$swal
        .fire({
          title: this.$t("editTicket.answer.confirmMergeTicket"),
          type: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.$t("yes"),
          cancelButtonText: this.$t("no"),
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            this.merge = {
              ticketId: parseInt(this.ticket.id),
              companyId: parseInt(this.ticket.company.id)
            };

            this.$store.commit("setTicketIdInto", this.merge.ticketId);
            this.$store.commit("setMergeCompanyId", this.merge.companyId);
            this.$modal.show(
              MakeMerge,
              {
                text: "This text is passed as a property"
              },
              {
                height: "auto"
              },
              {
                "before-close": event => {
                  this.reload();
                }
              }
            );
          }
        });
    },

    saveUser(user) {
      this.ticket.client = user;
      if (user.tempId === -1) {
        user.tempId = this.users.length;
        this.users.push(user);
      } else {
        this.users[user.tempId] = user;
      }
    },

    addUser() {
      this.$modal.show(
        "create-user",
        this.company.id
          ? { clientId: this.company.id }
          : this.thicket.company.id
          ? { clientId: this.thicket.company.id }
          : {},
        {
          height: "auto",
          dynamic: true,
          injectModalsContainer: true,
          draggable: true
        }
      );
    },

    refreshUsers() {
      this.findUsers();
    },

    forceRerender() {
      this.componentKey += 1;
    },

    openCustomTracker() {
      this._openCustomTracker();
    },

    findUsers(query) {
      this.userQuery.query = query;
    },

    selectedUser(user) {
      if (user.company && user.company.id !== "") {
        this.company = user.company;
      } else {
        this.company = { id: "" };
      }
    },

    getCompanyUsers() {
      this._getLoading(true);
      //this.ticket.client = null;
      if (this.company.id === "") {
        this.userQuery.companyId = "";
        //this.editUser = true;
      } else {
        this.userQuery.companyId = this.company
          ? this.company.id
          : this.ticket.company.id;
        this.ticket.client = null;
      }
      this.userQuery.page = 0;
      this.users = [];
      this.getUsers();
      this._getLoading(false);
    },

    getUsers(loadMore) {
      this._getLoading(true);
      this.userQuery.companyId = this.company.id
        ? this.company.id
        : this.ticket.company
        ? this.ticket.company.id
        : "";
      this.searchingUsers = true;
      if (loadMore) this.userQuery.page++;
      User.getUsersPaginated(
        this.userQuery.page,
        this.userQuery.numberOfElements,
        this.userQuery.query,
        this.userQuery.companyId,
        "USER"
      )
        .then(result => {
          this.users = this.users.concat(result.data.content);
          this.userQuery.last = result.data.last;
          this.searchingUsers = false;
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
        });
    },

    switchAssign() {
      this.idDepartment = "";
      this.idAgent = "";
      this.assigningToLoggedUser = !this.assigningToLoggedUser;
    },
    reassignTicket() {
      if (this.idDepartment === "") {
        this.$swal.fire({
          title: this.$t("editTicket.selectDepartment"),
          text: this.$t("swal.titleError"),
          type: "error",
          showConfirmButton: true
        });
      } else {
        this._getLoading(true);
        let idDepartment = this.idDepartment != null ? this.idDepartment : null;
        let idAgent = "";
        if (this.assigningToLoggedUser) {
          idAgent = this.$store.getters.getUser.id;
        } else {
          idAgent = this.idAgent != null ? this.idAgent.id : null;
        }

        let payload = {
          id: this.idTicket,
          idDepartment: idDepartment,
          idAgent: idAgent
        };

        Ticket.reassign(payload)
          .then(result => {
            result.data.agent
              ? (this.atribuido = result.data.agent.displayName)
              : result.data.department
              ? (this.atribuido = result.data.department.name)
              : (this.atribuido = "");
            // this.getUsers();
            this._getLoading(false);

            this.$swal.fire({
              title: this.$t("editTicket.message.titleSwal"),
              text: this.$t("editTicket.message.textSwal"),
              type: "success",
              showConfirmButton: true
            });

            this.ticket.agent = result.data.agent;
            this.ticket.department = result.data.department;
            this.idDepartment = "";
            this.idAgent = "";
            this.hide();
          })
          .catch(e => {
            this._getLoading(false);
            this.$swal.fire({
              title: this.$t("editTicket.message.errorSwal"),
              text: e.response.data.message,
              type: "error",
              showConfirmButton: true
            });
          });
      }
    },
    hide() {
      this.idDepartment = "";
      this.idAgent = "";
      this.assigningToLoggedUser = false;
      this.$modal.hide("reassign");
    },
    openModalReassign() {
      this.$modal.show(
        "reassign",
        {
          text: "This text is passed as a property"
        },
        {
          height: "auto",
          dynamic: true,
          injectModalsContainer: true,
          draggable: true
        }
      );
    },
    setAnswerTypePrivate(status) {
      this.answerPrivate = status;
    },
    getTickeAnswerNotifications() {
      Ticket.getAnswersNotifications(
        this.idTicket,
        this.$store.getters.getUser.locale
      )
        .then(result => {
          const data = [...result.data];
          this.answerNotifications = data;
          this.answerNotifications.forEach(element => {
            element.ticketId = this.idTicket;
          });
        })
        .catch(e => {});
    },
    refreshANSWER() {
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
      IssueType.getActives()
        .then(result => {
          this.issuesType = result.data;
        })
        .catch(e => {});

      Department.get()
        .then(result => {
          this.departments = result.data;
        })
        .catch(e => {});

      Company.get()
        .then(result => {
          this.companies = result.data;
        })
        .catch(e => {});
      this.$store.commit("setTicket", this.idTicket);
      Ticket.getOne(this.idTicket)
        .then(result => {
          this._getLoading(true);

          this.ticket = result.data;

          this.ticket.channel = !this.ticket.channel
            ? { id: "" }
            : this.ticket.channel;

          this.ticket.priority = !this.ticket.priority
            ? { id: "" }
            : this.ticket.priority;

          this.ticket.agent = !this.ticket.agent
            ? { id: "" }
            : this.ticket.agent;

          this.ticket.sla = !this.ticket.sla ? { id: "" } : this.ticket.sla;

          this.ticket.issueType = !this.ticket.issueType
            ? { id: "" }
            : this.ticket.issueType;

          this.ticket.state = !this.ticket.state
            ? { id: "" }
            : this.ticket.state;

          if (this.ticket.state.merged == true) {
            this.$toaster.warning(this.$t("swal.merged"));
          }

          this.ticket.department = !this.ticket.department
            ? { id: "" }
            : this.ticket.department;

          this.ticket.company = !this.ticket.company
            ? { id: "" }
            : this.ticket.company;

          if (this.ticket.company) {
            this.userQuery.companyId = this.ticket.company.id;
          }

          if (!this.ticket.company) {
            this.editCompany = true;
            this.ticket.company = null;
          }

          this.ticket.client = !this.ticket.client ? null : this.ticket.client;

          if (!this.ticket.client) {
            this.editUser = true;
            this.ticket.client = null;
          }

          this.ticket.tags = !this.ticket.tags ? [] : this.ticket.tags;

          this.ticket.answers = !this.ticket.answers ? [] : this.ticket.answers;

          this.ticket.emailList = !this.ticket.emailList
            ? []
            : this.ticket.emailList;

          this.ticket.emails = !this.ticket.emails ? [] : this.ticket.emails;

          this.ticket.externalCreator = this.ticket.externalCreator || "";

          this.ticket.associatedProtocols = !this.ticket.associatedProtocols
            ? []
            : this.ticket.associatedProtocols;

          this.protocols = [...this.ticket.associatedProtocols];

          this.$store.commit("setTags", this.ticket.tags);

          this.$store.commit("setEmails", this.ticket.emails);

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

          this.atribuido = this.ticket.agent.displayName;

          this.getCompanyUsers();

          this.ticket.answer = this.$t(
            "editTicket.answers.typeYourAnswerLOWER"
          );

          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
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

    showAnswerActive() {
      this.send = true;
      this._getLoading(false);
      this.$modal.show("anwser_active");
      this.answerActive.channel.id = "";
      this.answerActive.name = "";
    },

    hideAnswerActive() {
      this.send = false;
      this._getLoading(false);
      this.answerActive.name = "";
      this.$modal.hide("anwser_active");
    },

    sendAnswerActive() {
      if (this.answerActive.name != "" && this.answerActive.channel.id) {
        this._getLoading(true);
        this.tempAnswer = {
          createdBy: this.$store.getters.getUser.username,
          name: this.answerActive.name,
          active: true,
          private: false,
          user: {
            id: this.$store.getters.getUser.id
          },
          channel: {
            id: this.answerActive.channel.id
          },
          ticket: {
            id: this.ticket.id
          },
          type: "ACTIVE"
        };
        this.hideAnswerActive();
        Ticket.answer(this.tempAnswer)
          .then(result => {
            this.getTickeAnswerNotifications();
            this.$swal.fire({
              title: this.$t("editTicket.answer.titleSwal"),
              text: this.$t("editTicket.answer.textSwal"),
              type: "success",
              showConfirmButton: true
            });
            this._getLoading(false);
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
      } else if (this.send == true) {
        this._getLoading(false);
        this.$swal.fire({
          title: this.$t("editTicket.answer.askMessage"),
          text: this.$t("editTicket.answer.errorSwal"),
          type: "error",
          showConfirmButton: true
        });
      }
    },

    sendAnswer() {
      if (this.ticket.answer) {
        this._getLoading(true);
        this.ticket.answerSend = {
          name: this.ticket.answer,
          active: true,
          private: this.answerPrivate,
          createdBy: this.$store.getters.getUser.username,
          user: {
            id: this.$store.getters.getUser.id
          },
          ticket: {
            id: this.ticket.id
          }
        };
        Ticket.answer(this.ticket.answerSend)
          .then(result => {
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
            this._getLoading(false);
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
    addProtocol(protocol) {
      this.ticket.associatedProtocols.push(protocol);
      this.protocols.push(protocol);
    },
    nameWithLang({ name }) {
      return `${name}`;
    },
    returnListTickets() {
      this.$router.push({ name: "Listar Tickets" });
    },

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

    putTicket() {
      this._getLoading(true);
      this.ticket.company = this.company.id
        ? this.company
        : this.ticket.company;
      this.ticket.client
        ? this.ticket.client.company
          ? this.ticket.client.company.id == this.ticket.company.id
            ? ""
            : (this.ticket.client = null)
          : ""
        : "";
      delete this.ticket.fileUploads;

      Ticket.put(this.ticket)
        .then(result => {
          this.$store.getters.getFunctions.upload
            ? Ticket.upload(
                this.$store.getters.getFunctions.upload,
                result.data.id
              )
                .then(result => {
                  this._getLoading(false);
                })
                .catch(e => {
                  this._getLoading(false);
                })
            : this._getLoading(false);
          this.$swal
            .fire({
              title: this.$t("editTicket.edit.titleSwal"),
              text: this.$t("editTicket.edit.textSwal"),
              type: "success",
              showConfirmButton: true
            })
            .then(result => {
              if (result.value) {
                this.$router.push({ name: "Listar Tickets" });
              }
            });
          this.updatingTickets(result.data);
        })
        .catch(e => {
          this._getLoading(false);
          this.$swal.fire({
            title: this.$t("editTicket.edit.errorSwal"),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
        });
    },
    editTicket() {
      // if (this.ticket.client === null) {
      //   if (this.company.id === "" && this.idClient === "") {
      //     this._getLoading(false);
      //     this.$swal.fire({
      //       title: this.$t("editTicket.edit.errorSwal"),
      //       text: this.$t("editTicket.edit.errorClientUser"),
      //       type: "error",
      //       showConfirmButton: true
      //     });
      //     return;
      //   }
      //   this.ticket.client = {
      //     id: this.idClient
      //   };
      // }
      // this.ticket.client
      //   ? (this.ticket.client = {
      //       id: this.ticket.client.id,
      //       active: true
      //     })
      //   : "";
      //this._getLoading(false);
      //ticket.client ?  : ""
      this.ticket.tags = this.$store.getters.getTags;
      this.ticket.emails = [];
      this.$store.getters.getEmails
        ? this.$store.getters.getEmails.forEach(element => {
            this.ticket.emails.push(element);
          })
        : "";
      this.states.forEach(element => {
        if (this.ticket.state.id === element.id) {
          if (element.closed) {
            TimeTracker.get(this.ticket.id)
              .then(s => {
                this.timer = s.data.currentTime;
                if (s.data.totalTime === 0) {
                  this._getLoading(false);
                  this.$swal
                    .fire({
                      title: this.$t("editTicket.edit.errorSwal"),
                      text: this.$t("editTicket.edit.errorTimeTracker"),
                      type: "error",
                      showCloseButton: true,
                      showCancelButton: true,
                      focusConfirm: false,
                      confirmButtonText: this.$t("lowerYes"),
                      cancelButtonText: this.$t("lowerNo")
                    })
                    .then(result => {
                      if (result.value) {
                        this.openCustomTracker();
                      }
                    });
                } else {
                  this.putTicket();
                }
              })
              .catch(e => {
                this.errorHandler(e);
              });
          } else {
            this.putTicket();
          }
        }
      });
      this.forceRerender();
    },
    backListTickets() {
      this.$router.push({
        name: "Listar Tickets"
      });
    }
  },
  computed: {
    updateTotalTime() {
      if (this.$store.getters.getTotalTime) {
        this.$store.commit("setTotalTime", undefined);
        //localStorage.setItem("totalTime", undefined);
        this.forceRerender();
      }
    },
    assignDepartments: function() {
      if (this.assigningToLoggedUser) {
        return this.$store.getters.getUser.departments;
      } else {
        return this.departments;
      }
    },
    profileIDRefresh: function() {
      return this.value.id ? this.value.id : 0;
    },
    selectedTag() {
      if (this.ticket.tags[0].name) return this.ticket.tags[0].name;
      else return this.selectedOption;
    },
    getAgents: function() {
      if (this.company.id != "") {
        this.editUser = true;
      }
      let departmentID = this.idDepartment;
      this.idAgent = "";
      this.agents = [];
      if (departmentID != "") {
        this._getLoading(true);
        User.usersFromDepartment(departmentID)
          .then(result => {
            this._getLoading(false);
            result.data.forEach(element => {
              if (element.type === this.$store.getters.getUser.labelAgent) {
                this.agents.push(element);
              }
            });
          })
          .catch(e => {
            this._getLoading(false);
          });
      }
      return;
    },
    filteredChannels: function() {
      if (this.channels) {
        return this.channels.filter(
          e => e.name == "EMAIL" || e.name == "WHATSAPP" || e.name == "SMS"
        );
      } else {
        return "";
      }
    }
  },
  beforeDestroy() {
    this.$store.commit("setTags", undefined);
    //this.$store.commit("setTicket", false);
  },
  watch: {
    "userQuery.query": function() {
      this.userQuery.page = 0;
      this.users = [];
      this.getUsers();
    }
  },
  data() {
    return {
      HD: undefined,
      fullHD: undefined,
      answerActive: {
        createdBy: "",
        name: "",
        active: true,
        private: false,
        user: {
          id: ""
        },
        channel: {
          id: ""
        },
        ticket: {
          id: ""
        },
        type: "ACTIVE"
      },
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
      componentKey: 0,
      titleSwal: undefined,
      textSwal: undefined,
      file: {
        name: "newFile"
      },
      company: {
        id: ""
      },
      idClient: "",
      value: [this.ticket ? { name: this.ticket.tags[0].name } : { name: "-" }],
      selectedOption: { name: " - " },
      toggle: false,
      ticket: undefined,
      answer: undefined,
      channels: this.channels,
      states: this.states,
      issuesType: this.issuesType,
      // products: this.products,
      tags: this.tags,
      prioritys: this.prioritys,
      slas: this.slas,
      departments: this.departments,
      companies: this.companies,
      users: [],
      protocols: [],
      notifications: [],
      answerNotifications: [],
      answerPrivate: false,
      atribuido: undefined,
      ticketValidate: undefined,
      idAgent: undefined,
      idDepartment: "",
      agents: this.agents,
      cleanFiles: false,
      attachments: [],
      assigningToLoggedUser: false,
      searchingUsers: false,
      userQuery: {
        query: "",
        companyId: "",
        page: 0,
        numberOfElements: 30
      },
      editUser: false,
      editCompany: false,
      detailsIcon: `<svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      overflow="visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      class="padding-5-r"
                    >
                      <g>
                        <path
                          xmlns:default="http://www.w3.org/2000/svg"
                          d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12.17c-.74 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33 1.33-.6 1.33-1.33-.59-1.33-1.33-1.33zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
                          vector-effect="non-scaling-stroke"
                        ></path>
                      </g>
                    </svg>`,
      detailsAnswer: `<svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      overflow="visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      class="padding-5-r"
                    >
                      <g>
                        <path
                          xmlns:default="http://www.w3.org/2000/svg"
                          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z"
                          vector-effect="non-scaling-stroke"
                        ></path>
                      </g>
                    </svg>`,
      detailsUpload: `<svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      overflow="visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      class="padding-5-r"
                    >
                      <g>
                        <path
                          xmlns:default="http://www.w3.org/2000/svg"
                          d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
                          vector-effect="non-scaling-stroke"
                        ></path>
                      </g>
                    </svg>`
    };
  }
};
</script>

<style scoped>
svg:hover #reassign {
  fill: #ff5a5f;
}

.description {
  line-height: 1.5em;
}

.marginCenter {
  margin: 0 auto;
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

.icon-position-2 {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: -2.3rem;
}

.icon-position-3 {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}

.icon-size {
  width: 32px;
  cursor: pointer;
}

.icon-size-2 {
  width: 22px;
  max-width: 22px;
  margin-right: 0.3rem;
  margin-top: 0.2rem;
}

.icon-size-3 {
  width: 45px;
  max-width: 45px;
  margin-right: -0.5rem;
  margin-left: 0rem;
  margin-top: -1.5rem;
  margin-bottom: 0rem;
  float: right;
  cursor: pointer;
}

.margin-top-emails {
  margin-top: -0.5rem;
}

.margin-top-emails-hd {
  margin-top: 1.5rem;
  margin-left: -1.8rem;
}

.margin-request-hd {
  margin-top: 1.4rem;
  margin-left: -3.5rem;
}

.margin-request-by-hd {
  margin-top: 1.4rem;
  margin-left: 0rem;
}

.margin-priority-hd {
  margin-top: 1.4rem;
  margin-left: -4rem;
  margin-right: 4rem;
}

.margin-top-emails-more-four {
  margin-top: 1rem;
}
</style>
