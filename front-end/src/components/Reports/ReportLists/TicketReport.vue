<template>
  <table class="table-grid table-grid-auto">
    <thead>
    <tr class="padding-10-tb">
      <th class="f-12-500-gray-light f-10-500-gray-light">ID</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.client')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.user')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.agent')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.openDate')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.closeDate')}}</th>
      <th class="f-12-500-gray-light f-10-500-gray-light">{{$t('report.list.duration')}}</th>
    </tr>
    </thead>
    <tbody v-if="list.length > 0">
    <tr v-for="(item, id) in list"
        :key="id"
        class="box-shadow-hover f-14-300-gray">
      <td class="f-12-300-gray">
        {{item.ticketId}}
      </td>
      <td class="f-12-300-gray">
        {{item.client || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.user || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.agent || '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.openDate ? $moment(item.openDate).calendar() : '-'}}
      </td>
      <td class="f-12-300-gray">
        {{item.closeDate ? $moment(item.closeDate).calendar() : '-'}}
      </td>
      <td class="f-12-300-gray">
        {{secondsToTime(item.ticketDuration)}}
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
  name: "TicketReport",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    secondsToTime(s){
      let hour = Math.floor(s / 3600);
      hour = hour < 10 ? "0" + hour.toString() : hour.toString();
      let min = Math.floor((s / 60) % 60);
      min = min < 10 ? "0" + min.toString() : min.toString();
      let seconds = Math.floor(s % 3600 % 60);
      seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
      return hour + ":" + min + ":" + seconds;
    }
  }
}
</script>

<style scoped>

</style>
