<template>
  <div>
    <form class="form-inline" @submit.prevent="saveCustomTimer">
      <div class="margin-20-trbl">
        <span class="f-18-100-gray">{{$t('timeTracker.customTime')}}</span>
        <div class="padding-15-b"></div>
        <div class="ml-3 mt-2 form-group">
          <label>{{$t('timeTracker.selectTime')}}:</label>
        </div>
        <div class="ml-3 mt-2 form-group">
          <input class="form-control col-2" type="number" min="0" max="23" v-model="customHours"> h
          <input
            class="form-control col-2 ml-2"
            type="number"
            min="0"
            max="59"
            v-model="customMinutes"
          > min
        </div>
      </div>
      <div class="flex-full flex flex-justify-end margin-50-t padding-20-b">
        <div class="flex-full flex flex-justify-end margin-15-t padding-15-b">
          <div class="padding-20-r">
            <button
              class="btn-medium btn-cancel font-bold"
              @click.prevent="closeCustomTracker"
            >{{$t('timeTracker.cancel')}}</button>
          </div>
          <div class="padding-20-r">
            <button class="btn-medium btn-blue" type="submit">
              <span class="f-14-300-gray color-white">{{$t('timeTracker.send')}}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TimeTracker from "src/backend/models/TimeTracker.js";

export default {
  created() {
    TimeTracker.get(this.$store.getters.getTicket.ticket)
      .then(s => {
        this.timer = s.data.currentTime;
      })
      .catch(e => {
        this.errorHandler(e);
      });
  },
  methods: {
    errorHandler(e) {
      this.$swal.fire({
        title: this.$t("editTicket.edit.errorSwal"),
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true
      });
    },
    successHandler() {
      this.$swal.fire({
        title: this.$t("timeTracker.titleSwal"),
        text: this.$t("timeTracker.textSwal"),
        type: "success",
        showConfirmButton: true
      });
    },
    closeCustomTracker() {
      this._isClose();
    },
    saveCustomTimer() {
      TimeTracker.postCustomTuner({
        ticketId: this.$store.getters.getTicket.ticket,
        milliseconds: this.customHours * 3600000 + this.customMinutes * 60000,
        start: new Date().getTime()
      })
        .then(s => {
          this.totalTime = s.data.totalTime;
          this.$store.commit("setTotalTime", s.data.totalTime);
          this.customHours = 0;
          this.customMinutes = 0;
          this.closeCustomTracker();
          this.successHandler();
        })
        .catch(e => {
          this.errorHandler(e);
        });
    }
  },
  data: function() {
    return {
      id_ticket: this.idTicket,
      timer: 0,
      totalTime: 0,
      interval: undefined,
      customTimer: "",
      customHours: 0,
      customMinutes: 0
    };
  }
};
</script>

<style scoped>
svg:hover #reassign {
  fill: #ff5a5f;
}
.marginCenter {
  margin: 0 auto;
}
</style>
