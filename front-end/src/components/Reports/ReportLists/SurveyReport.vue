<template>
  <table class="table-grid table-grid-auto">
    <thead>
    <tr class="padding-10-tb">
      <th class="f-12-500-gray-light f-10-500-gray-light">ID</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.client')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.agent')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.department')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.openDate')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.closeDate')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.replyDate')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.surveyReply')}}</th>
    </tr>
    </thead>
    <tbody v-if="list.length > 0">
    <tr v-for="item in list"
        class="box-shadow-hover f-14-300-gray">
      <td class="f-12-300-gray">
        {{item.ticketId}}
      </td>
      <td class="f-12-300-gray">
        {{item.client || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.agent || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.department || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.openDate ? $moment(item.openDate).calendar() : '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.closeDate ? $moment(item.closeDate).calendar() : '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.replyDate ? $moment(item.replyDate).calendar() : '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.surveyReply}}
      </td>
    </tr>
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
export default {
  name: "SurveyReport",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
