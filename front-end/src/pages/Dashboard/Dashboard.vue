<template>
  <div id="container">
    <div id="content-master">
      <!-- START HEADER CONTEUDO -->
      <div class="flex-full margin-20-tb flex-space-between">
        <div class="box-shadow">
          <div>
            <span class="f-18-100-gray padding-20-l">{{ $t('navbar.menu.dashboard') }}</span>
          </div>
          <div class="margin-50-rl division background-darkcyan"></div>

          <div class="flex flex-align-items-center">
            <div class="refresh pointer" @click="filterCharts()">
              <img src="/static/icons/refreshBlue.svg" />
            </div>

            <div class="resfresh padding-15-l">
              <img class="timer" src="/static/icons/clockCyan.svg" />
            </div>

            <div>
              <select
                class="input-style f-12-500-gray-light"
                @change="refreshCharts($event)"
                v-model="valueRefresh"
              >
                <option value="0">{{ $t('dashboard.setUpdateTimer') }}</option>
                <option value="5">5 {{ $t('dashboard.minutes') }}</option>
                <option value="10">10 {{ $t('dashboard.minutes') }}</option>
                <option value="15">15 {{ $t('dashboard.minutes') }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-align-items-center">
          <div
            class="margin-20-r btn-red flex flex-align-items-center"
            v-if="this.cleanFilters"
            v-on:click="removeSearch"
          >
            {{ $t('listOfTickets.filter.cleanFilters') }}
            <img
              src="/static/icons/cancel.svg"
              class="padding-5-l"
            />
          </div>
          <div class="box-shadow-hover flex-right pointer" v-on:click="toggle=!toggle">
            <img src="/static/icons/filter.svg" />
            <span class="f-12-500-gray-light">&nbsp;&nbsp;{{ $t('listOfTickets.filter.title') }}</span>
          </div>
        </div>
      </div>
      <!-- END HEADER CONTEUDO -->

      <!-- START FILTER -->
      <div style="position: relative;">
        <div id="filter" v-if="toggle">
          <div class="filter-title flex flex-align-items-center">
            <img src="/static/icons/filter_dark.svg" />
            <span class="f-14-300-gray-bold">&nbsp;&nbsp;{{ $t('listOfTickets.filter.title') }}</span>
          </div>
          <div class="filter-content">
            <div>
              <div id="search-selects">
                <div
                  class="flex flex-column margin-b-filter margin-b-filter-1100 align-self-center-filter"
                >
                  <div
                    class="f-12-500-gray-medium"
                  >{{ $t('listOfTickets.filter.filterByDepartament') }}</div>
                  <div class="margin-15-r margin-10-t">
                    <select
                      name="filters.department"
                      v-model="filters.department.id"
                      class="select-style f-12-500-gray-light"
                      :placeholder="$t('listOfTickets.filter.selectDepartament')"
                      v-validate="'required'"
                    >
                      <option value>{{ $t('listOfTickets.filter.selectDepartament') }}</option>
                      <option
                        v-for="(department, id) in this.departments"
                        :key="id"
                        :value="department.id"
                      >{{department.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
              {{ getAgents }}
              <div>
                <div>
                  <div
                    class="f-12-500-gray-medium"
                    style="margin-top: 1.5rem;"
                  >{{ $t('editTicket.AGENTSSELECTUP') }}</div>
                  <div class="margin-15-r margin-10-t">
                    <div style="width: 200px">
                      <multiselect
                        :disabled="filters.department.id == ''"
                        v-model="filters.agents"
                        :multiple="true"
                        :options="agents"
                        :placeholder="$t('editTicket.AGENTSSELECTUP')"
                        label="displayName"
                        track-by="displayName"
                        :selectLabel="$t('multiselect.pressEnter')"
                        :deselectLabel="$t('multiselect.pressRemove')"
                      ></multiselect>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="margin-20-rl division-filter"></div>

            <div>
              <div>
                <div>
                  <div class="f-12-500-gray-medium">{{ $t('listOfTickets.filter.channelFilter') }}</div>
                  <div class="margin-15-r margin-10-t">
                    <select
                      name="filters.channel"
                      v-model="filters.channel.id"
                      class="select-style f-12-500-gray-light"
                      :placeholder="$t('listOfTickets.filter.selectChannel')"
                      v-validate="'required'"
                    >
                      <option value>{{ $t('listOfTickets.filter.selectChannel') }}</option>
                      <option
                        v-for="(channel, id) in this.channels"
                        :key="id"
                        :value="channel.id"
                      >{{channel.name}}</option>
                    </select>
                  </div>
                </div>
                <div
                  class="flex flex-column margin-t-filter align-self-center-filter margin-b-filter"
                >
                  <div
                    class="f-12-500-gray-medium"
                    style="margin-top: 1.5rem;"
                  >{{ $t('listOfTickets.filter.filterByDateRange') }}</div>
                  <div>
                    <div class="margin-15-r margin-10-t">
                      <div style="width: 200px">
                        <VueHotelDatepicker
                          :placeholder="this.localeRangeData.placeholder"
                          :fromText="this.localeRangeData.from"
                          :toText="this.localeRangeData.to"
                          :confirmText="this.localeRangeData.confirmText"
                          :resetText="this.localeRangeData.resetText"
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
                  </div>
                </div>
              </div>
            </div>

            <div class="margin-20-rl division-filter"></div>
          </div>
          <div class="filter-footer margin-t-filter">
            <div
              class="f-14-500-gray pointer"
              v-on:click="toggle=!toggle, cleanFields()"
            >{{ $t('cancel') }}</div>
            <div
              class="f-14-500-darkcyan pointer margin-50-l"
              @click="filterCharts"
            >{{ $t('search') }}</div>
          </div>
        </div>
      </div>
      <!-- END FILTER -->

      <div class="flex-full justify-content-left-right">
        <div class="title-section">
          <img src="/static/icons/serviceOverview.svg" class="padding-5-r" />
          <span
            v-if="filters.department.id"
            class="f-14-300-darkcyan"
          >{{$t('dashboard.chart' + surveyType.name + '.header')}}</span>
          <select
            v-else
            name="surveyType"
            v-model="surveyType"
            class="select-style f-14-300-darkcyan"
            :placeholder="'Selecione o tipo de pesquisa'"
          >
            <option
              v-for="surveyType in this.surveyTypes"
              :key="surveyType.id"
              :value="surveyType"
            >{{$t('dashboard.chart' + surveyType.name + '.header')}}</option>
          </select>
        </div>
      </div>

      <!--<chart-nps v-if="surveyType.name === 'NPS'" :key="componentKey" ></chart-nps>-->
      <chart-survey
        v-if="!!surveyType.id"
        :surveyType="surveyType"
        :key="componentKey"
        @surveyType="changedSurveyType"
        :filters="filtersDone"
      ></chart-survey>

      <div class="margin-15-tb flex-full"></div>

      <div class="flex-full justify-content-left-right">
        <div class="flex-1">
          <chart-fcr :filters="filtersDone"></chart-fcr>
        </div>

        <div class="margin-15-rl"></div>

        <div class="flex-1">
          <chart-status :filters="filtersDone"></chart-status>
        </div>
      </div>

      <div class="margin-15-tb flex-full"></div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import Channel from "src/backend/models/Channel.js";
import Dashboard from "src/backend/models/Dashboard";
import Department from "../../backend/models/Department";
import chartFcr from "src/pages/Dashboard/charts/fcr.vue";
import chartNps from "src/pages/Dashboard/charts/nps.vue";
import chartStatus from "src/pages/Dashboard/charts/pieStatus.vue";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";
import i18nRangeData from "src/util/i18nRangeDataLocales.js";
import Functions from "src/util/functions.js";
import Survey from "./charts/survey";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "Dashboard",
  
  components: {
    chartSurvey: Survey,
    chartFcr: chartFcr,
    chartNps: chartNps,
    chartStatus: chartStatus,
    VueHotelDatepicker
  },

  beforeDestroy() {
    clearInterval(this.refresh);
  },

  created() {
    filtersDone: undefined;
    let localeApp = this._getLocale();
    this.$store.commit("setRangeDate", undefined);

    this.localeRangeData =
      localeApp == "pt-br"
        ? i18nRangeData.ptbr
        : localeApp == "en"
        ? i18nRangeData.en
        : i18nRangeData.es;

    this.dateStart = new Date(2018, 12, 1);
    this.dateEnd = new Date();

    this.cleanFields();

    this.refreshCharts();

    Channel.get()
      .then(result => {
        const data = [...result.data];
        this.channels = data;
      })
      .catch(e => {});

    Department.get()
      .then(result => {
        const data = [...result.data];
        this.departments = data;
      })
      .catch(e => {});

    Dashboard.getSurveyTypes().then(result => {
      const data = [...result.data];
      this.surveyTypes = data;
      this.surveyType = { ...data.filter(s => s.name === "NPS")[0] };
    });
  },

  computed: {
    getAgents: function() {
      let departmentID = this.filters.department.id;
      this.filters.agents = [];
      this.agents = [];
      if (departmentID != "") {
        User.usersFromDepartment(departmentID)
          .then(result => {
            result.data.forEach(element => {
              if (element.type === this.$store.getters.getUser.labelAgent) {
                this.agents.push(element);
                this._getLoading(false);
              }
            });
          })
          .catch(e => {});
      }
      return;
    }
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    changedSurveyType(newType) {
      if (newType.id !== this.surveyType.id) {
        this.surveyType = { ...newType };
      }
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

    removeSearch() {
      this.toggle = false;
      this.cleanFields();
    },

    cleanFields() {
      this.filters.channel.id = "";
      this.filters.department.id = "";
      this.filters.agents = "";
      this.$store.commit("setRangeDate", undefined);
      filtersDone: undefined;
      this.filterCharts();
    },

    filterCharts() {
      this.toggle = false;
      this._getLoading(true);

      let filtersDone = { ...this.filters };
      let newArrayAgents = [];

      this.cleanFilters =
        filtersDone.department.id != "" ||
        filtersDone.channel.id != "" ||
        filtersDone.agents != "" ||
        (this.$store.getters.getRangeDate
          ? this.$store.getters.getRangeDate.endDate &&
            this.$store.getters.getRangeDate.startDate
            ? true
            : false
          : false)
          ? true
          : false;

      if (filtersDone.department.id == "") {
        delete filtersDone.department;
      }

      if (filtersDone.channel.id == "") {
        delete filtersDone.channel;
      }

      if (filtersDone.agents == "") {
        delete filtersDone.agents;
      }

      if (filtersDone.agents != undefined) {
        filtersDone.agents.forEach(element => {
          newArrayAgents.push({ id: element.id });
        });

        filtersDone.agents = [...newArrayAgents];
      }
      this.filtersDone = filtersDone;

      this.forceRerender();
    },

    refreshCharts() {
      clearInterval(this.refresh);
      const self = this;
      const timer = this.valueRefresh * 60000;

      if (timer != 0) {
        this.refresh = setInterval(() => {
          self.filterCharts();
        }, timer);
      }
      this.forceRerender();
    }
  },

  data: function() {
    return {
      cleanFilters: false,
      componentKey: 0,
      localeRangeData: undefined,
      dateStart: undefined,
      dateEnd: undefined,
      channels: "",
      departments: "",
      surveyTypes: [],
      surveyType: {},
      agents: this.agents,
      idAgent: undefined,
      idDepartment: "",
      toggle: false,
      filters: {
        channel: {
          id: ""
        },
        department: {
          id: ""
        },
        agents: ""
      },
      filtersDone: undefined,
      refresh: null,
      valueRefresh: 0
    };
  }
};
</script>

<style>
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #fff !important;
  color: #a6a6a6;
}
</style>
