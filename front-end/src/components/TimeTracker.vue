<template>
  <div id="tracker" v-if="!_isUser()">
    <div class="f-12-500-gray-light title-widget">{{ $t('timeTracker.title') }}</div>
    <div class="box div-default jira-componente">
      <div class="f-12-500-darkcyan padding-11-trbl pointer" @click="openCustomTracker">
        <img src="/static/icons/add.svg" alt>
        {{ $t('timeTracker.customTime') }}
      </div>
      <div class="flex flex-column item-ticket">
        <div class="flex flex-row flex-space-between">
          <div class="flex flex-row">
            <span class="f-18-300-gray" v-html="this.currentTimerVisual"></span>
          </div>
          <div class="flex flex-row">
            <div
              class="button-time-tracker play margin-10-rl pointer"
              v-if="showStart"
              @click="startTracker"
            >
              <img src="/static/icons/play.svg" alt>
            </div>
            <div class="button-time-tracker margin-10-rl pointer" v-else @click="pauseTracker">
              <img src="/static/icons/pause.svg" alt>
            </div>
            <div class="button-time-tracker pointer" @click="resetTracker">
              <img src="/static/icons/refresh.svg" alt>
            </div>
          </div>
        </div>
        <div class="padding-10-t">
          <div class="flex flex-align-items-center">
            <div class="f-12-500-gray-medium">{{ $t('timeTracker.totalTime') }}:</div>
            <div class="padding-10-l f-12-300-gray" v-html="this.totalTimeShow"></div>
          </div>
        </div>
      </div>
    </div>
    <modal name="custom-timer">
      <div class="div-hover margin-10-trbl padding-50-trbl">
        <form class="form-inline" @submit.prevent="saveCustomTimer">
          <div class="margin-20-trbl">
            <span class="f-18-100-gray">{{$t('timeTracker.customTime')}}</span>
            <div class="padding-15-b"></div>
            <div class="ml-3 mt-2 form-group">
              <label>{{$t('timeTracker.selectTime')}}:</label>
            </div>
            <div class="ml-3 mt-2 form-group">
              <input
                class="form-control col-2"
                type="number"
                min="0"
                max="23"
                v-model="customHours"
              > h
              <input
                class="form-control col-2 ml-2"
                type="number"
                min="0"
                max="59"
                v-model="customMinutes"
              > min
            </div>
          </div>
          <div class="flex flex-column padding-100-l">
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
    </modal>
  </div>
</template>

<script>
import TimeTracker from "src/backend/models/TimeTracker.js";
//import CustomTimer from "src/components/AddTimer.vue";

export default {
  components: {
    //CustomTimer
  },
  props: ["idTicket"],
  created() {
    TimeTracker.get(this.id_ticket)
      .then(s => {
        this.timer = s.data.currentTime;
        this.totalTime = s.data.totalTime;
        if (this.timer > 0) {
          this.startTracker(false);
        }
      })
      .catch(e => {
        this.errorHandler(e);
      });
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
  },
  destroyed: function() {
    clearInterval(this.interval);
  },
  computed: {
    currentTimerVisual() {
      let seconds = Math.floor((this.timer / 1000) % 60);
      let minutes = Math.floor(this.timer / 1000 / 60) % 60;
      let hours = Math.floor(this.timer / 1000 / 3600);
      return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
    },
    totalTimeShow() {
      let seconds = Math.floor((this.totalTime / 1000) % 60);
      let minutes = Math.floor(this.totalTime / 1000 / 60) % 60;
      let hours = Math.floor(this.totalTime / 1000 / 3600);
      return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
    },
    showStart() {
      return !this.interval;
    }
  },
  methods: {
    updateCurrentTime() {
      this.timer += 1000;
    },
    startTracker(save = true) {
      if (save) {
        TimeTracker.save({ ticketId: this.id_ticket, status: "STARTED" })
          .then(s => {
            this.interval = setInterval(this.updateCurrentTime, 1000);
          })
          .catch(e => {
            this.errorHandler(e);
          });
      } else {
        this.interval = setInterval(this.updateCurrentTime, 1000);
      }
    },
    openCustomTracker() {
      this._openCustomTracker();
    },
    closeCustomTracker() {
      this.$modal.hide("custom-timer");
    },
    pauseTracker() {
      TimeTracker.save({ ticketId: this.id_ticket, status: "PAUSED" })
        .then(s => {
          clearInterval(this.interval);
          this.interval = undefined;
          this.totalTime += this.timer;
          this.timer = 0;
        })
        .catch(e => {
          this.errorHandler(e);
        });
    },
    resetTracker() {
      if (this.currentTimerVisual != "00:00:00") {
        this.$swal
          .fire({
            title: this.$t("timeTracker.confirmReset"),
            type: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: this.$t("yes"),
            cancelButtonText: this.$t("no"),
            showCancelButton: true
          })
          .then(result => {
            if (result.value) {
              TimeTracker.restart(this.id_ticket)
                .then(s => {
                  this.timer = 0;
                })
                .catch(e => {
                  this.errorHandler(e);
                });
            }
          });
      } else {
        this.$swal.fire({
          title: this.$t("timeTracker.pleaseStartTheAccountant"),
          //text: this.$t("editTicket.edit.textSwal"),
          type: "error",
          showConfirmButton: true,
          confirmButtonColor: "#DD6B55",
          // confirmButtonText: this.$t("yes"),
          // cancelButtonText: this.$t("no"),
          // showCancelButton: true
        });
      }
    },
    errorHandler(e) {
      this.$swal.fire({
        title: this.$t("editTicket.edit.errorSwal"),
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true
      });
    },
    saveCustomTimer() {
      TimeTracker.postCustomTuner({
        ticketId: this.id_ticket,
        milliseconds: this.customHours * 3600000 + this.customMinutes * 60000,
        start: new Date().getTime()
      })
        .then(s => {
          this.totalTime = s.data.totalTime;
          this.customHours = 0;
          this.customMinutes = 0;
          this.closeCustomTracker();
        })
        .catch(e => {
          this.errorHandler(e);
        });
    }
  }
};
</script>

<style>
</style>
