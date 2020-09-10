<template>
  <div class="width-100">
    <div class="flex-column">
      <div class="flex width-100 flex-column-1000">
        <div class="flex width-50 width-100-1000 flex-column-600">
          <div class="width-50 flex flex-column width-100-600 margin-10-t-600">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.filter.ticket').toUpperCase()}}</label>
            <input
              name="filter.ticketNumber"
              v-model="query.ticketId"
              type="text"
              class="input-style f-12-300-gray width-90"
            />
          </div>
          <div class="width-50 flex flex-column width-100-600 margin-10-t-600">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.client').toUpperCase()}}</label>
            <input
              name="filter.ticketNumber"
              v-model="query.client"
              type="text"
              class="input-style f-12-300-gray width-90"
            />
          </div>
        </div>
        <div class="flex width-50 width-100-1000 flex-column-600">
          <div class="width-50 flex flex-column width-100-600 margin-10-t-1000">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.agent').toUpperCase()}}</label>
            <input
              name="filter.ticketNumber"
              v-model="query.agent"
              type="text"
              class="input-style f-12-300-gray width-90"
            />
          </div>
          <div class="width-50 flex flex-column width-100-600 margin-10-t-1000">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.department').toUpperCase()}}</label>
            <select
              name="filter.department"
              v-model="department"
              @change="selectedDepartment"
              class="select-style width-90 f-12-500-gray-light"
            >
              <option value>{{ $t('newTicket.form.issue.selectDepartment') }}</option>
              <option
                v-for="(department, id) in this.departments"
                :key="id"
                :value="department"
              >{{department.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex width-100 flex-column-1000">
        <div class="flex width-50 width-100-1000 flex-column-600">
          <div class="width-50 flex flex-column width-100-600 margin-10-t justify-content-end">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.surveyReply').toUpperCase()}}</label>
            <input
              name="filter.surveyReply"
              v-model="query.surveyReply"
              type="text"
              class="input-style f-12-300-gray width-90"
            />
          </div>
          <div class="width-50 margin-10-t flex-column width-100-600">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.replyDate').toUpperCase()}}</label>
            <div>
              <VueHotelDatepicker
                :placeholder="this.localeRangeData.placeholder"
                :fromText="this.localeRangeData.from"
                :confirmText="this.localeRangeData.confirmText"
                :resetText="this.localeRangeData.resetText"
                :toText="this.localeRangeData.to"
                :minDate="minDate"
                :maxDate="maxDate"
                :selectForward="false"
                :weekList="this.localeRangeData.dayNames"
                :monthList="this.localeRangeData.monthNames"
                :format="this.localeRangeData.format"
                class="width-90"
                @update="updateReplyDate"
                @reset="resetReplyDate"
                :i18n="this.localeRangeData"
              ></VueHotelDatepicker>
            </div>
          </div>
        </div>

        <div class="flex width-50 width-100-1000 flex-column-600">
          <div class="width-50 margin-10-t flex-column width-100-600">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.openDate').toUpperCase()}}</label>
            <div>
              <VueHotelDatepicker
                :placeholder="this.localeRangeData.placeholder"
                :fromText="this.localeRangeData.from"
                :confirmText="this.localeRangeData.confirmText"
                :resetText="this.localeRangeData.resetText"
                :toText="this.localeRangeData.to"
                :minDate="minDate"
                :maxDate="maxDate"
                :selectForward="false"
                :weekList="this.localeRangeData.dayNames"
                :monthList="this.localeRangeData.monthNames"
                :format="this.localeRangeData.format"
                class="width-90"
                @update="updateOpenDate"
                @reset="resetOpenDate"
                :i18n="this.localeRangeData"
              ></VueHotelDatepicker>
            </div>
          </div>
          <div class="width-50 margin-10-t flex-column width-100-600">
            <label
              class="f-12-500-gray-medium padding-5-b"
            >{{$t('report.list.closeDate').toUpperCase()}}</label>
            <div>
              <VueHotelDatepicker
                :placeholder="this.localeRangeData.placeholder"
                :fromText="this.localeRangeData.from"
                :confirmText="this.localeRangeData.confirmText"
                :resetText="this.localeRangeData.resetText"
                :toText="this.localeRangeData.to"
                :minDate="minDate"
                :maxDate="maxDate"
                :selectForward="false"
                :weekList="this.localeRangeData.dayNames"
                :monthList="this.localeRangeData.monthNames"
                :format="this.localeRangeData.format"
                class="width-90 right-vhd-picker"
                @update="updateCloseDate"
                @reset="resetCloseDate"
                :i18n="this.localeRangeData"
              ></VueHotelDatepicker>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18nRangeData from "src/util/i18nRangeDataLocales.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";

import Department from "../../../backend/models/Department";

export default {
  name: "SurveyReport",
  components: {
    VueHotelDatepicker
  },
  data() {
    return {
      query: {
        ticketId: "",
        client: "",
        agent: "",
        departmentId: "",
        openDate: {
          start: "",
          end: ""
        },
        closeDate: {
          start: "",
          end: ""
        },
        replyDate: {
          start: "",
          end: ""
        },
        surveyReply: "",
        surveyTypeId: "",
        ordenation: {
          ticketId: "DESC"
        }
      },
      localeRangeData: undefined,
      minDate: "",
      maxDate: "",
      departments: [],
      surveyTypes: [],
      department: ""
    };
  },
  created() {
    let localeApp = this._getLocale();

    //Seta o locale do range de data
    this.localeRangeData =
      localeApp === "pt-br"
        ? i18nRangeData.ptbr
        : localeApp === "en"
        ? i18nRangeData.en
        : i18nRangeData.es;

    this.minDate = new Date(2018, 12, 1);
    this.maxDate = false;

    Department.get()
      .then(result => {
        this.departments = result.data;
      })
      .catch();
  },
  methods: {
    updateOpenDate(event) {
      if (!!event.start && !!event.end) {
        this.query.openDate.start = event.start;
        this.query.openDate.end = event.end;
      }
    },
    updateCloseDate(event) {
      if (!!event.start && !!event.end) {
        this.query.closeDate.start = event.start;
        this.query.closeDate.end = event.end;
      }
    },
    updateReplyDate(event) {
      if (!!event.start && !!event.end) {
        this.query.replyDate.start = event.start;
        this.query.replyDate.end = event.end;
      }
    },
    resetOpenDate() {
      this.query.openDate = {
        start: "",
        end: ""
      };
    },
    resetCloseDate() {
      this.query.closeDate = {
        start: "",
        end: ""
      };
    },
    resetReplyDate() {
      this.query.replyDate = {
        start: "",
        end: ""
      };
    },
    selectedDepartment() {
      if (this.department) {
        this.query.surveyTypeId = this.department.surveyType ? this.department.surveyType.id : this.query.surveyTypeId;
        this.query.surveyType = this.department.surveyType;
        this.query.departmentId = this.department.id;
      } else {
        this.query.surveyType = null;
        this.query.departmentId = "";
      }
    }
  }
};
</script>

<style scoped>
</style>
