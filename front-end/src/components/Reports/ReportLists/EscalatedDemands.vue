<template xmlns:table="http://www.w3.org/1999/html">
  <table class="table-grid table-grid-auto">
    <thead>
    <tr class="padding-10-tb">
      <th class="f-12-500-gray-light f-10-500-gray-light width-5">
        ID
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-25">
        {{$t('report.list.subject')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-10">
        {{$t('report.list.openDate')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-7">
        {{$t('report.list.slaName')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-12">
        {{$t('report.list.client')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-7">
        {{$t('report.list.clientSla')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-12">
        {{$t('report.list.department')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-7">
        {{$t('report.list.departmentSla')}}
      </th>
      <th class="f-12-500-gray-light f-10-500-gray-light width-15">
        {{$t('report.list.relatedIssues')}}
      </th>
    </tr>
    </thead>
    <tbody v-if="list.length > 0">
    <template v-for="(item, id) in list">
      <tr class="box-shadow-hover f-14-300-gray">
        <td class="f-12-300-gray">
          {{item.ticketId}}
        </td>
        <td class="f-12-300-gray">
          {{item.subject}}
        </td>
        <td class="f-12-300-gray">
          {{item.openDate ? $moment(item.openDate).calendar() : '-'}}
        </td>
        <td class="f-12-300-gray">
          {{item.slaName || '-'}}
        </td>
        <td class="f-12-300-gray">
          {{item.client || '-'}}
        </td>
        <td class="f-12-300-gray">
          {{item.clientDeadline === null ? '-' : secondsToTime(item.clientDeadline)}}
        </td>
        <td class="f-12-300-gray">
          {{item.department || '-'}}  <i class="fas fa-history pointer padding-10-l" @click="findDepartmentHistory(item.ticketId, id)"></i>
        </td>
        <td class="f-12-300-gray">
          {{item.departmentDeadline === null ? '-' : secondsToTime(item.departmentDeadline)}}  <i class="fas fa-history pointer padding-10-l" @click="findDepartmentHistory(item.ticketId, id)"></i>
        </td>
        <td class="f-12-300-gray">
          {{!item.jiraKeys ? '-' : ''}}<generic-list :list="item.jiraIssues" :headers="item.jiraHeaders" v-if="item.jiraKeys"></generic-list>
        </td>
        <td>
          {{item.departmentHist}}
        </td>
      </tr>
      <tr v-if="departmentHist.listId === id">
        <td class="f-12-300-gray" colspan="9">
          <div class="box div-default padding-10-trbl">
            <generic-list :list="departmentHist.hist"
                          :headers="departmentHist.headers"
                          :paginated="true"
                          :ref="'departmentList'"
                          :numberOfElements="departmentHist.numberOfElements"
                          @pageChange="(pagination) => findDepartmentHistory(item.ticketId, id, pagination)">
            </generic-list>
          </div>
        </td>
      </tr>
    </template>
    </tbody>
    <tbody v-else>
    <tr>
      <td colspan="7" class="text-center padding-20-tb f-18-300-gray">
        {{$t('report.list.empty')}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Report from '../../../backend/models/Report';
export default {
  name: "EscalatedDemands",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      departmentHist: {
        listId: '',
        hist: [],
        headers: [],
        numberOfElements: 0
      }
    }
  },
  methods: {
    findDepartmentHistory(ticketId, id, paginationInfo){
      const paginationOptions = {
        size: 10,
        pag: paginationInfo !== undefined ? paginationInfo.currentPage-1 : 0,
        ordenation: { changeDate: "ASC"},
        conditions: []
      };
      let url = JSON.stringify(paginationOptions);
      url = 'paginationOptions=' + encodeURI(url) + '&ticketId=' + ticketId;
      Report.get('ticket-department-hist', url)
        .then(result => {
          this.departmentHist.listId = id;
          this.departmentHist.hist = result.data.data;
          this.departmentHist.headers = [];
          ['department', 'departmentDeadline', 'changeDate'].forEach(key => {
            const h = {
              label: () => this.$t('report.list.'+key),
              value: (e) => {
                if(key === 'changeDate'){
                  return this.$moment(e[key]).calendar();
                } else if(key === 'departmentDeadline'){
                  return this.secondsToTime(e[key]);
                }
                return e[key];
              }
            };
            this.departmentHist.headers.push(h);
          });
          this.departmentHist.numberOfElements = result.data.totalElements;
        })
        .catch(e => {
        })

    },
    secondsToTime(s){
      let hour = Math.floor(s / 3600);
      hour = hour < 10 ? "0" + hour.toString() : hour.toString();
      let min = Math.floor((s / 60) % 60);
      min = min < 10 ? "0" + min.toString() : min.toString();
      let seconds = Math.floor(s % 3600 % 60);
      seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
      return hour + ":" + min + ":" + seconds;
    }
  },
  watch: {
    list(){
      if(!!this.list){
        this.departmentHist = {
          listId: '',
            hist: [],
            headers: [],
            numberOfElements: 0
        };
        this.list.forEach(item => {
          if(!!item.jiraKeys){
            item.jiraIssues = [];
            let issues = item.jiraKeys.split(',');
            if(!!issues){
              issues.forEach(issue => {
                item.jiraIssues.push({
                  jiraKey: issue
                });
              });
              item.jiraHeaders = [];
              Object.keys(item.jiraIssues[0]).forEach(key => {
                const h = {
                  label: () => key,
                  value: (e) => e[key]
                };
                item.jiraHeaders.push(h);
              });
            }
          }
        });
      }


    }
  }
}
</script>

<style scoped>

</style>
