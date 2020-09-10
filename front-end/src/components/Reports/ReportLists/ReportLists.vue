<template>
    <div class="box div-default width-100">
      <div class="flex-full overflow-x-auto">
        <template v-if="type === 'escalation-demands-tracking'">
          <escalated-demands :list="list"></escalated-demands>
        </template>
        <template v-if="type === 'ticket-report'">
          <ticket-report :list="list"></ticket-report>
        </template>
        <template v-if="type === 'survey-report'">
          <survey-report :list="list"></survey-report>
        </template>
        <template v-if="type === 'fcr-report'">
          <first-contact-resolution :list="list"></first-contact-resolution>
        </template>
      </div>
      <div class="flex-full flex-space-between flex-align-items-center padding-10-tb">
        <div class="f-12-300-gray padding-10-l">
          {{ $t('listOfClients.list.showing') }} {{from + 1}} {{ $t('listOfClients.list.of') }} {{to}} {{ $t('listOfClients.list.out') }} {{total}} {{ $t('listOfClients.list.registers') }}
        </div>
        <l-pagination
          style="float:right;"
          class="pagination-no-border"
          v-model="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="pagination.total">
        </l-pagination>
      </div>
    </div>
</template>

<script>
import EscalatedDemands from "./EscalatedDemands";
import TicketReport from "./TicketReport";
import SurveyReport from "./SurveyReport";
import FirstContactResolution from "./FirstContactResolution";

export default {
  name: "ReportLists",
  components: {
    SurveyReport,
    TicketReport,
    EscalatedDemands,
    FirstContactResolution
  },
  props: {
    type: {
      type: String,
      default: 'general'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    'pagination.currentPage': function (next, cur) {
      if (next !== cur) {
        this.$emit("pageChange", this.pagination);
      }
    }
  },
  computed: {
    to() {
      let highBound = this.from + this.pagination.numberOfElements;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.pagination.total;
    },
  },
  data(){
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 1,
        startTotalPages: 1,
        numberOfElements: undefined
      }
    }
  },
  methods: {
    setPagination(response) {
      this.pagination.currentPage = response.number+1;
      this.pagination.perPage = response.size;
      this.pagination.perPageOptions = response.size;
      this.pagination.total = response.totalElements;
      this.pagination.startTotalPages = response.totalPages;
      this.pagination.numberOfElements = response.numberOfElements;
    }
  }
}
</script>

<style scoped>

</style>
