<template>
  <div class="width-100">
    <div class="flex-column">
      <div class="flex width-100 flex-column-600">
        <div class="width-25 flex flex-column width-100-600 margin-10-t-600">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{ $t('report.filter.ticket').toUpperCase() }}</label>
          <input
            name="filter.ticketNumber"
            v-model="query.ticketId"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-600 margin-10-t-600">
          <label class="f-12-500-gray-medium padding-5-b">{{$t('report.list.client').toUpperCase()}}</label>
          <input
            name="filter.ticketNumber"
            v-model="query.client"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-600 margin-10-t-600">
          <label class="f-12-500-gray-medium padding-5-b">{{$t('report.list.agent').toUpperCase()}}</label>
          <input
            name="filter.ticketNumber"
            v-model="query.agent"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-600 margin-10-t-600">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{$t('report.list.department').toUpperCase()}}</label>
          <select
            name="filter.department"
            v-model="query.departmentId"
            class="select-style width-90 f-12-500-gray-light"
          >
            <option value>{{ $t('newTicket.form.issue.selectDepartment') }}</option>
            <option
              v-for="(department, id) in this.departments"
              :key="id"
              :value="department.id"
            >{{department.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex width-100 flex-column-470">
      <div class="width-50 width-100-470 margin-10-t flex-column">
        <label
          class="f-12-500-gray-medium padding-5-b"
        >{{ $t('report.list.openDate').toUpperCase() }}</label>
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
      <div class="width-50 width-100-470 margin-10-t flex-column">
        <label
          class="f-12-500-gray-medium padding-5-b"
        >{{ $t('report.list.closeDate').toUpperCase() }}</label>
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
</template>

<script>
import i18nRangeData from "src/util/i18nRangeDataLocales.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";
import Department from "../../../backend/models/Department";

export default {
  name: "FirstContactResolution",
  components: {
    VueHotelDatepicker
  },
  data() {
    return {
      query: {
        ticketId: "",
        client: "",
        agent: "",
        department: "",
        departmentId: "",
        openDate: {
          start: "",
          end: ""
        },
        closeDate: {
          start: "",
          end: ""
        },
        ordenation: {
          ticketId: "DESC"
        }
      },
      localeRangeData: undefined,
      minDate: "",
      maxDate: "",
      departments: []
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
    }
  }
};
</script>
