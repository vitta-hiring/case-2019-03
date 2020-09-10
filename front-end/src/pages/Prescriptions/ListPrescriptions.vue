<template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full flex-space-between flex-column-445 margin-20-tb">
          <div class="box-shadow flex flex-justify-space-around-445" v-if="_isUserCreate()">
            <div class="f-18-100-gray">{{ $t('title.listOfTickets') }}</div>
            <div class="margin-20-rl division box-division-margin background-darkcyan"></div>
            <router-link :to="_isUser() ? '/new-prescription' :  '/new-prescription'">
              <a>
                <div class="f-14-300-darkcyan cursor-pointer">
                  {{ $t('title.newTicket') }}
                  <img
                    class="padding-5-r icon-position"
                    src="/static/icons/ticketCyanBig.svg"
                  />
                </div>
              </a>
            </router-link>
          </div>
          <div class="flex flex-justify-end-445 margin-t-filter">
            <div
              class="margin-20-r btn-red flex flex-align-items-center"
              v-if="this.$store.getters.getClearFilters"
              v-on:click="cleanFields(true)"
            >
              {{ $t('listOfTickets.filter.cleanFilters') }}
              <img
                src="/static/icons/cancel.svg"
                class="padding-5-l"
              />
            </div>
            <div class="box-shadow-hover f-12-500-gray-light pointer" v-on:click="toggle=!toggle">
              <img src="/static/icons/filter.svg" />
              <span class="f-12-500-gray-light">&nbsp;&nbsp;{{ $t('listOfTickets.filter.title') }}</span>
            </div>
          </div>
        </div>
        <div style="position: relative;">
          <div id="filter" v-if="toggle">
            <div class="filter-title flex flex-align-items-center f-14-300-gray-bold">
              <img class="filter-icon" src="/static/icons/filter_dark.svg" />
              {{ $t('listOfTickets.filter.title') }}
            </div>
            <div class="filter-content">
              <div class="flex width-50 width-filter-100 flex-column-filter">
                <div class="width-50 width-filter-100 height-90 flex-1100 flex-justify-center-1100">
                  <div
                    id="search-selects"
                    class="flex flex-column flex-justify-space-around height-100"
                  >
                    <div
                      v-if="this.$store.getters.getStates"
                      class="flex flex-column margin-b-filter margin-b-filter-1100 align-self-center-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.state') }}</div>
                      <select
                        name="query.state.name"
                        v-model="query.state.name"
                        class="select-style f-12-500-gray-light"
                        :placeholder="$t('listOfTickets.filter.selectState')"
                        v-validate="'required'"
                      >
                        <option value>{{ $t('listOfTickets.filter.selectState') }}</option>
                        <option
                          v-for="(state, id) in this.$store.getters.getStates"
                          :key="id"
                          :value="state.name"
                        >{{state.name}}</option>
                      </select>
                    </div>
                    <div
                      class="flex flex-column margin-b-filter align-self-center-filter"
                      v-if="!_isUser() && this.$store.getters.getChannels"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.channelFilter') }}</div>
                      <select
                        name="query.channel.name"
                        v-model="query.channel.name"
                        class="select-style f-12-500-gray-light"
                        :placeholder="$t('listOfTickets.filter.selectChannel')"
                        v-validate="'required'"
                      >
                        <option value>{{ $t('listOfTickets.filter.selectChannel') }}</option>
                        <option
                          v-for="(channel, id) in this.$store.getters.getChannels"
                          :key="id"
                          :value="channel.name"
                        >{{channel.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="width-50 width-filter-100 height-90 flex-1100 flex-justify-center-1100">
                  <div
                    class="flex flex-column flex-justify-space-around height-100 margin-b-filter"
                  >
                    <div
                      v-if="this.$store.getters.getPriorities"
                      class="flex flex-column margin-b-filter margin-b-filter-1100 align-self-center-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.priority') }}</div>
                      <select
                        name="query.priority.name"
                        v-model="query.priority.name"
                        class="select-style f-12-500-gray-light"
                        :placeholder="$t('listOfTickets.filter.selectPriority')"
                        v-validate="'required'"
                      >
                        <option value>{{ $t('listOfTickets.filter.selectPriority') }}</option>
                        <option
                          v-for="(priority, id) in this.$store.getters.getPriorities"
                          :key="id"
                          :value="priority.name"
                        >{{priority.name}}</option>
                      </select>
                    </div>
                    <div
                      class="flex flex-column margin-b-filter align-self-center-filter"
                      v-if="!_isUser()"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.tags') }}</div>
                      <div>
                        <tags :listTickets="true" style="width: 200px"></tags>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="division-filter"></div>

              <div class="flex width-25 width-filter-100">
                <div class="width-100 height-90 flex flex-justify-center">
                  <div
                    id="search-selects"
                    class="flex flex-row-1100 flex-column flex-justify-space-around width-filter-100 height-100"
                  >
                    <div
                      v-if="blockRangeDate"
                      class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.filterByDateRange') }}</div>
                      <div>
                        <VueHotelDatepicker
                          :placeholder="this.localeRangeData.placeholder"
                          :fromText="this.localeRangeData.from"
                          :confirmText="this.localeRangeData.confirmText"
                          :resetText="this.localeRangeData.resetText"
                          :toText="this.localeRangeData.to"
                          :minDate="dateStart"
                          :maxDate="dateEnd"
                          :selectForward="false"
                          :weekList="this.localeRangeData.dayNames"
                          :monthList="this.localeRangeData.monthNames"
                          :format="this.localeRangeData.format"
                          :i18n="this.localeRangeData"
                          @update="update"
                        ></VueHotelDatepicker>
                      </div>
                    </div>
                    <div
                      class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.filterByDateRangeDefined') }}</div>
                      <select
                        name="query.interval.name"
                        v-model="query.interval.name"
                        class="select-style f-12-500-gray-light"
                        :placeholder="$t('listOfTickets.filter.selectInterval')"
                        v-validate="'required'"
                      >
                        <option value>{{ $t('listOfTickets.filter.selectInterval') }}</option>
                        <option
                          v-for="(interval, name) in this.intervals"
                          :key="name"
                          :value="interval.name"
                        >{{interval.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="division-filter"></div>

              <div class="width-25 width-filter-100">
                <div class="width-100 height-90 flex flex-justify-center">
                  <div
                    id="search-selects"
                    class="flex flex-row-1100 flex-column flex-justify-space-around width-filter-100 height-100"
                  >
                    <div
                      class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.searchDrafts') }}</div>
                      <select class="select-style f-12-500-gray-light" v-model="query.filterDraft">
                        <option value="false" selected>{{ $t('no') }}</option>
                        <option value="true">{{ $t('yes') }}</option>
                      </select>
                    </div>
                    <div
                      class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.merged') }}</div>
                      <select class="select-style f-12-500-gray-light" v-model="query.merged">
                        <option value="false" selected>{{ $t('no') }}</option>
                        <option value="true">{{ $t('yes') }}</option>
                      </select>
                    </div>
                    <div
                      class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                    >
                      <div
                        class="f-12-500-gray-medium padding-5-b"
                      >{{ $t('listOfTickets.filter.searchAssignments') }}</div>
                      <select
                        class="select-style f-12-500-gray-light"
                        v-model="query.filterAssignments"
                      >
                        <option value="false">{{ $t('listOfTickets.filter.selectOption') }}</option>
                        <option value="reportedByMe">{{ $t('listOfTickets.header.reportedByMe') }}</option>
                        <option
                          value="myTickets"
                          selected
                        >{{ $t('listOfTickets.filter.myTickets') }}</option>
                        <option value="unassigned">{{ $t('listOfTickets.header.unassigned') }}</option>
                        <option value="assigned">{{ $t('listOfTickets.header.assigned') }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="filter-footer margin-t-filter">
              <div class="f-14-500-gray pointer" v-on:click="toggle=!toggle">{{ $t('cancel') }}</div>
              <div
                class="f-14-500-darkcyan pointer margin-50-l"
                @click="searchTicket"
              >{{ $t('search') }}</div>
            </div>
          </div>
        </div>
        <div class="flex-full flex-column-972 margin-30-t">
          <div class="box div-default list-tickets">
            <div class="flex header-list-tickets">
              <div class="flex flex-justify-space-around width-100 ticket-nav-info">
                <div class="flex flex-column">
                  <div
                    v-if="_isUser() || _isAgent()"
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfTickets.header.yourTickets') }}</div>
                  <div
                    v-if="_isAdmin()"
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfTickets.header.totalTickets') }}</div>
                  <div
                    class="f-22-300-gray f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >
                    {{ this.$store.getters.getInformationsByUser.tickets }}
                    <img
                      class="vertical-align-initial"
                      src="/static/icons/tickets.svg"
                    />
                  </div>
                </div>
                <div
                  class="division background-gray-dark ticket-division"
                  v-if="_isAdmin() || _isAgent()"
                ></div>
                <div class="flex flex-column" v-if="_isAdmin() || _isAgent()">
                  <div
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfTickets.header.departmentTickets') }}</div>
                  <div
                    class="f-22-300-gray f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >
                    {{ this.$store.getters.getInformationsByUser.departament }}
                    <img
                      class="vertical-align-initial"
                      src="/static/icons/departamentTickets.svg"
                    />
                  </div>
                </div>
                <div
                  class="division background-gray-dark ticket-division"
                  v-if="_isAdmin() || _isAgent()"
                ></div>
                <div class="flex flex-column" v-if="_isAdmin() || _isAgent()">
                  <div
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfTickets.header.unassigned') }}</div>
                  <div
                    class="f-22-300-gray f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >
                    {{ this.$store.getters.getInformationsByUser.unassigned }}
                    <img
                      class="vertical-align-initial"
                      src="/static/icons/alert.svg"
                    />
                  </div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/newTicket.svg" />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfTickets.header.newTickets') }}</div>
                  </div>
                  <div
                    class="f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >{{ this.$store.getters.getInformationsByUser.newTickets }} Tickets</div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/review.svg" />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfTickets.header.inReview') }}</div>
                  </div>
                  <div
                    class="f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >{{ this.$store.getters.getInformationsByUser.isReview }} Tickets</div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/aswered.svg" />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfTickets.header.answered') }}</div>
                  </div>
                  <div
                    class="f-12-300-gray text-center"
                    v-if="this.$store.getters.getInformationsByUser"
                  >{{ this.$store.getters.getInformationsByUser.answered }} Tickets</div>
                </div>
              </div>
            </div>
            <div class="box-padding">
              <div class="flex-full padding-5-t" v-if="_isUser()"></div>
              <div class="flex-full flex-space-between">
                <div>
                  <img src="/static/icons/list.svg" class="padding-5-r" />
                  <span class="f-12-300-gray">{{ $t('title.listOfTickets') }}</span>
                </div>
                <div class="flex flex-row">
                  <div class="padding-5-r">
                    <img src="/static/icons/search.svg" />
                  </div>
                  <div>
                    <input
                      type="text"
                      class="input-style f-12-300-gray"
                      v-model="searchQuery"
                      :placeholder="$t('listOfTickets.list.search')"
                    />
                  </div>
                </div>
              </div>
              <prescriptions></prescriptions>
            </div>
          </div>
          <div class="widgets">
            <notifications v-if="!_isUser()"></notifications>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Functions from "src/util/functions.js";
import User from "src/backend/models/User.js";
import State from "src/backend/models/State.js";
import Prescription from "src/backend/models/Prescription.js";
import Channel from "src/backend/models/Channel.js";
import Priority from "src/backend/models/Priority.js";
import i18nRangeData from "src/util/i18nRangeDataLocales.js";
import Notification from "src/backend/models/Notification.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";
import CustomTimer from "src/components/AddTimer.vue";
import Authority from "src/backend/models/Authority.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
      if (from.params.idTicket) {
        Prescription.getOne(from.params.idTicket).then(res => {
          if (res.data.state.closed) {
            vm.$router.go();
          }
        });
      }
    });
  },

  name: "ListPrescrictions",

  components: {
    VueHotelDatepicker
  },
  computed: {
    blockRangeDate() {
      return this.query.interval.name === "" ? true : false;
    },
    rangeDateOrSpecificDate() {
      this.$store.getters.getRangeDate ? "" : "";
      return this.$store.getters.getRangeDate
        ? this.$store.getters.getRangeDate.startDate +
            " ~ " +
            this.$store.getters.getRangeDate.endDate
        : "Selecione um intervalo";
    },
    endDate() {
      return this.$moment.utc(Date.now()._d)._d;
    },
    startDate() {
      return this.$moment.utc(Date.now()._d)._d;
    },
    startingDateValue() {
      return this.$moment.utc(Date.now()._d)._d;
    },
    endingDateValue() {
      return this.$moment.utc(Date.now()._d)._d;
    }
  },

  created() {
    this.$store.getters.getQueryString
      ? ((this.searchQuery = this.$store.getters.getQueryString),
        (this.comingFromTheListingOfTickets = true))
      : "";
    this.setLocaleFiltersAndDates();
    this.cleanFields(false);
    // this.getInformationsByUser();
  },
  watch: {
    searchQuery: function(nextPage, currentPageNotObserver) {
      if (nextPage != currentPageNotObserver) {
        if (this.searchQuery != "" && !this.comingFromTheListingOfTickets) {
          this.$store.commit("setSearchQuery", this.searchQuery);
        } else if (this.searchQuery == "") {
          this.$store.commit("setClearSearch", true);
          this.$store.commit("setSearch", undefined);
          this.$store.commit("setSearchQuery", undefined);
          this.provideButtonSearch = undefined;
          this.$store.commit("setQueryString", undefined);
        }
        this.comingFromTheListingOfTickets = undefined;
      }
    },
    toggle: function(old, next) {
      if (old != next) {
        this.getChannels();
        this.getStates();
        this.getPriorities();
      }
    }
  },
  methods: {
    getChannels() {
      this.$store.getters.getChannels
        ? (this.channels = this.$store.getters.getChannels)
        : this.toggle == true
        ? Channel.get()
            .then(result => {
              const data = [...result.data];
              this.$store.commit("setChannels", data);
            })
            .catch(e => {})
        : "";
    },

    getStates() {
      this.$store.getters.getStates
        ? (this.states = this.$store.getters.getStates)
        : this.toggle == true
        ? State.get()
            .then(result => {
              const data = [...result.data];
              this.$store.commit("setStates", data);
            })
            .catch(e => {})
        : "";
    },

    getInformationsByUser() {
      this.$store.getters.getInformationsByUser
        ? (this.informationsByUser = this.$store.getters.getInformationsByUser)
        : Prescription.informationsByUser()
            .then(result => {
              this.$store.commit("setInformationsByUser", result.data);
            })
            .catch(e => {});
    },

    getPriorities() {
      this.$store.getters.getPriorities
        ? (this.priorities = this.$store.getters.getPriorities)
        : this.toggle == true
        ? Priority.get()
            .then(result => {
              const data = [...result.data];
              this.$store.commit("setPriorities", data);
            })
            .catch(e => {})
        : "";
    },

    setLocaleFiltersAndDates() {
      let localeApp = this._getLocale();
      this.query.filterAssignments = "";
      this.localeRangeData =
        localeApp == "pt-br"
          ? i18nRangeData.ptbr
          : localeApp == "en"
          ? i18nRangeData.en
          : i18nRangeData.es;
      this.dateStart = new Date(2018, 12, 1);
      this.dateEnd = false;
    },

    cancel() {
      this.toggle = false;
    },

    cleanFields(value) {
      this.toggle = false;
      this.queryString = "";
      this.searchQuery = "";
      this.query.state.name = "";
      this.query.channel.name = "";
      this.query.priority.name = "";
      this.query.interval.name = "";
      this.query.filterDraft = "false";
      this.query.merged = "false";
      this.query.filterAssignments = "false";
      this.$store.commit("setSearch", undefined);
      this.$store.commit("setClearSearch", value);
      this.$store.commit("setClearFilters", undefined);
      this.$store.commit("setTags", undefined);
      this.$store.commit("setRangeDate", "");
      this.$store.commit("setFilters", undefined);
    },

    searchTicket(searchQuery) {
      this.queryString = "";

      //BUSCAR POR INTERVALO DE DATAS
      this.query.interval.name &&
      this.query.interval.name != "SELECIONE UM INTERVALO"
        ? (this.result = this.intervals.filter(obj => {
            return obj.name === this.query.interval.name;
          }))
        : "";

      //BUSCAR POR CANAL
      this.query.channel.name &&
      this.query.channel.name != this.$t("listOfTickets.filter.selectChannel")
        ? (this.queryString =
            this.queryString + "&channel=" + this.query.channel.name)
        : "";

      //BUSCAR POR INTERVALO
      this.query.interval.name &&
      this.query.interval.name != "listOfTickets.filter.selectInterval"
        ? ((this.queryString =
            this.queryString + "&endDate=" + this.result[0].endDate._d),
          (this.queryString =
            this.queryString + "&startDate=" + this.result[0].startDate._d))
        : "";

      //BUSCAR POR PRIORIDADE
      this.query.priority.name &&
      this.query.priority.name != this.$t("listOfTickets.filter.selectPriority")
        ? (this.queryString =
            this.queryString + "&priority=" + this.query.priority.name)
        : "";

      //BUSCAR POR STATUS
      this.query.state.name &&
      this.query.state.name != this.$t("listOfTickets.filter.selectState")
        ? (this.queryString =
            this.queryString + "&state=" + this.query.state.name)
        : "";

      this.$store.getters.getRangeDate
        ? ((this.queryString =
            this.queryString +
            "&startDate=" +
            this.$store.getters.getRangeDate.startDate),
          (this.queryString =
            this.queryString +
            "&endDate=" +
            this.$store.getters.getRangeDate.endDate))
        : "";

      this.$store.getters.getTags && this.$store.getters.getTags.length > 0
        ? ((this.queryString = this.queryString + "&tag="),
          (this.length = 0),
          this.$store.getters.getTags.forEach(element => {
            this.length = this.length + 1;
            this.$store.getters.getTags.length === this.length
              ? (this.queryString = this.queryString + element.name)
              : (this.queryString = this.queryString + element.name + ",");
          }))
        : "";

      if (this.query.filterDraft == "true") {
        this.queryString = this.queryString + "&draft=true";
      }

      if (this.query.merged == "true") {
        this.queryString = this.queryString + "&merged=true";
      }

      if (this.query.filterAssignments == "reportedByMe") {
        this.queryString = this.queryString + "&reportedByMe=true";
      } else if (this.query.filterAssignments == "myTickets") {
        this.queryString = this.queryString + "&me=true";
      } else if (this.query.filterAssignments == "assigned") {
        this.queryString = this.queryString + "&assigned=true";
      } else if (this.query.filterAssignments == "unassigned") {
        this.queryString = this.queryString + "&notAssigned=true";
      }

      if (this.queryString == "" && !this.$store.getters.getTags) {
        this.$store.commit("setSearch", undefined);
        this.$store.commit("setClearSearch", true);
        this.$store.commit("setClearFilters", undefined);
      } else {
        this.provideButtonSearch = true;
        this.searchQuery = undefined;
        this.$store.commit("setClearFilters", true);
        this.$store.commit("setSearch", this.queryString);
        this.$store.commit("setSearchQuery", undefined);
      }

      this.toggle = false;
    },

    update(event) {
      this.tempRangeDate = {};
      if (this._getLocale() !== "en") {
        event.start
          ? (this.tempRangeDate.startDate = Functions.formatDateEN(event.start))
          : "";
        event.end
          ? (this.tempRangeDate.endDate = Functions.formatDateEN(event.end))
          : "";
      } else {
        event.start ? (this.tempRangeDate.startDate = event.start) : "";
        event.end ? (this.tempRangeDate.endDate = event.end) : "";
      }
      this.$store.commit("setRangeDate", this.tempRangeDate);
    },

    reset(event) {
      this.tempRangeDate = {
        startDate: "",
        endDate: ""
      };
      this.$store.commit("setRangeDate", this.tempRangeDate);
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
  },
  data() {
    return {
      comingFromTheListingOfTickets: undefined,
      localeRangeData: undefined,
      dateStart: undefined,
      dateEnd: undefined,
      queryString: "",
      searchQuery: "",
      toggle: false,
      query: {
        channel: {
          name: ""
        },
        priority: {
          name: ""
        },
        state: {
          name: ""
        },
        filterDraft: false,
        filterAssignments: false,
        tags: this.$store.getters.getTags,
        rangeDate: this.$store.getters.getFunctions.rangeDate,
        interval: {
          startDate: "",
          endDate: "",
          name: ""
        }
      },
      intervals: [
        {
          startDate: this.$moment.utc().subtract(29, "days"),
          endDate: this.$moment.utc(new Date()),
          name: this.$t("listOfTickets.filter.last30Days")
        },
        {
          startDate: this.$moment.utc().subtract(14, "days"),
          endDate: this.$moment.utc(new Date()),
          name: this.$t("listOfTickets.filter.last15Days")
        },
        {
          startDate: this.$moment.utc().subtract(6, "days"),
          endDate: this.$moment.utc(new Date()),
          name: this.$t("listOfTickets.filter.last7Days")
        },
        {
          startDate: this.$moment.utc().subtract(1, "days"),
          endDate: this.$moment.utc().subtract(1, "days"),
          name: this.$t("listOfTickets.filter.yesterday")
        },
        {
          startDate: this.$moment.utc(new Date()),
          endDate: this.$moment.utc(new Date()),
          name: this.$t("listOfTickets.filter.today")
        }
      ],
      // informationsByUser: this.informationsByUser,
      priorities: undefined,
      channels: undefined,
      states: undefined,
      provideButtonSearch: undefined
    };
  }
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.btn-red {
  height: 2.5rem;
  padding: 0px 10px 0 18px;
  font-size: 12px;
}
</style>

<style lang="scss">
.vhd-input {
  font-size: 0.85rem !important;
  color: #9a9a9a !important;
  font-weight: 500 !important;
  font-family: Roboto !important;
  min-width: 200px !important;
  height: 30px;
  border-radius: 5px;
  background-color: #ffffff;
  background-size: cover;
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border: none;
  box-sizing: border-box;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-repeat: no-repeat;
  padding: 0 15px 0 15px;
  min-width: 200px;
  cursor: pointer;
}
</style>
