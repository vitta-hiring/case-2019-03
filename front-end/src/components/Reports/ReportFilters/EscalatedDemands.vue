<template>
  <div class="width-100">
    <div class="flex-column">
      <div class="flex width-100 flex-column-700">
        <div class="width-25 flex flex-column width-100-700 margin-10-t-700">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{$t('report.filter.ticket').toUpperCase()}}</label>
          <input
            name="filter.ticketId"
            v-model="query.ticketId"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-700 margin-10-t-700">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{$t('report.list.subject').toUpperCase()}}</label>
          <input
            name="filter.subject"
            v-model="query.subject"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-700 margin-10-t-700">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{$t('report.list.slaName').toUpperCase()}}</label>
          <input
            name="filter.sla"
            v-model="query.sla"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-25 flex flex-column width-100-700 margin-10-t-700">
          <label
            class="f-12-500-gray-medium padding-5-b"
          >{{$t('report.list.relatedIssues').toUpperCase()}}</label>
          <input
            name="filter.jiraKeys"
            v-model="query.jiraKeys"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
      </div>
      <div class="flex width-100 flex-column-600">
        <div class="width-33 flex flex-column width-100-600 margin-10-t">
          <label class="f-12-500-gray-medium padding-5-b">{{$t('report.list.client').toUpperCase()}}</label>
          <input
            name="filter.client"
            v-model="query.client"
            type="text"
            class="input-style f-12-300-gray width-90"
          />
        </div>
        <div class="width-33 flex flex-column width-100-600 margin-10-t">
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
        <div class="width-33 flex flex-column width-100-600 margin-10-t">
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
              class="width-90 right-vhd-picker"
              @update="updateOpenDate"
              @reset="resetOpenDate"
              :i18n="this.localeRangeData"
            ></VueHotelDatepicker>
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
  name: "EscalatedDemands",
  components: {
    VueHotelDatepicker
  },
  data() {
    return {
      query: {
        ticketId: "",
        departmentId: "",
        sla: "",
        subject: "",
        openDate: {
          start: "",
          end: ""
        },
        client: "",
        department: "",
        jiraKeys: "",
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
    resetOpenDate() {
      this.query.openDate = {
        start: "",
        end: ""
      };
    }
  }
};
</script>

<style scoped>
</style>

<style lang="scss">
.right-vhd-picker {
  .vhd-picker {
    right: 0;
    left: unset !important;
  }
}
</style>
