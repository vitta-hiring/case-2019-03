<template>
  <div class="filter-box">
    <div class="filter-title flex flex-align-items-center f-14-300-gray-bold">
      <img class="filter-icon" src="/static/icons/filter_dark.svg">
      {{ $t('listOfTickets.filter.title') }}
    </div>
    <div class="flex-full">
      <template v-if="type === 'ticket-report'">
        <ticket-report :ref="type === 'ticket-report' ? 'filter' : ''"></ticket-report>
      </template>
      <template v-else-if="type === 'escalation-demands-tracking'">
        <escalated-demands :ref="type === 'escalation-demands-tracking' ? 'filter' : ''"></escalated-demands>
      </template>
      <template v-else-if="type === 'survey-report'">
        <survey-report :ref="type === 'survey-report' ? 'filter' : ''"></survey-report>
      </template>
      <template v-else-if="type === 'fcr-report'">
        <first-contact-resolution :ref="type === 'fcr-report' ? 'filter' : ''"></first-contact-resolution>
      </template>
    </div>
    <div class="flex-full margin-30-t justify-content-end">
      <button type="button" class="btn-medium btn-blue" @click="filter">{{$t('report.filter.button')}}</button>
    </div>
  </div>
</template>

<script>
import TicketReport from "./TicketReport";
import EscalatedDemands from "./EscalatedDemands";
import SurveyReport from "./SurveyReport";
import FirstContactResolution from "./FirstContactResolution";
export default {
  name: "ReportFilters",
  components: {SurveyReport, EscalatedDemands, TicketReport, FirstContactResolution},
  props: ['type', 'surveyType'],
  mounted(){
    this.filter();
  },
  methods: {
    filter(){
      const query = this.$refs.filter.query;

      this.$emit('filter', this.buildConditions(query));
    },
    buildConditions(query){
      const options = {};

      options.ordenation = query.ordenation;
      options.conditions = [];
      options.queryParams = [];

      if(!!query['ticketId']){
        options.conditions.push({
          key: "ticketId",
          value: query['ticketId'],
          operator: "LIKE"
        });
      }

      if(!!query['client']){
        options.conditions.push({
          key: "client",
          value: query['client'],
          operator: "LIKE"
        });
      }

      if(!!query['agent']){
        options.conditions.push({
          key: "agent",
          value: query['agent'],
          operator: "LIKE"
        });
      }

      if(!!query['user']){
        options.conditions.push({
          key: "user",
          value: query['user'],
          operator: "LIKE"
        });
      }

      if(!!query['sla']){
        options.conditions.push({
          key: 'slaName',
          value: query['sla'],
          operator: 'LIKE'
        })
      }

      if(!!query['subject']){
        options.conditions.push({
          key: 'subject',
          value: query['subject'],
          operator: 'LIKE'
        })
      }

      if(!!query['department']){
        options.conditions.push({
          key: 'department',
          value: query['department'],
          operator: 'LIKE'
        })
      }

      if(!!query['departmentId']){
        options.conditions.push({
          key: 'departmentId',
          value: query['departmentId'],
          operator: 'EQ'
        })
      }

      if(!!query['surveyTypeId']){
        options.conditions.push({
          key: 'surveyTypeId',
          value: query['surveyTypeId'],
          operator: 'EQ'
        })
      }

      if(!!query['surveyType']){
        options.surveyType = query['surveyType'];
      }

      if(!!query['jiraKeys']){
        options.conditions.push({
          key: 'jiraKeys',
          value: query['jiraKeys'],
          operator: 'LIKE'
        })
      }

      if(!!query['surveyReply']){
        options.conditions.push({
          key: 'surveyReply',
          value: query['surveyReply'],
          operator: 'EQ'
        })
      }

      if(!!query['openDate']){
        options.queryParams.push(
          'openDateStart=' + query.openDate.start
        );
        options.queryParams.push(
          'openDateEnd=' + query.openDate.end
        )
      }
      if(!!query['closeDate']){
        options.queryParams.push(
          'closeDateStart=' + query.closeDate.start
        );
        options.queryParams.push(
          'closeDateEnd=' + query.closeDate.end
        )
      }
      if(!!query['replyDate']){
        options.queryParams.push(
          'replyDateStart=' + query.replyDate.start
        );
        options.queryParams.push(
          'replyDateEnd=' + query.replyDate.end
        )
      }

      return options;
    }
  },
  watch: {
    surveyType: function(newType, oldType){
      if(!!newType && !!oldType){
        if(newType.id !== oldType.id){
          const query = this.$refs.filter.query;
          query.surveyTypeId = newType.id;
          this.$emit('filter', this.buildConditions(query));
        }
      } else {
        const query = this.$refs.filter.query;
        query.surveyTypeId = newType.id;
        this.$emit('filter', this.buildConditions(query));
      }
    }
  }
}
</script>

<style scoped>
.filter-box{
  width: 100%;
}
</style>
