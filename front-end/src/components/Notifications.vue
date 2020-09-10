<template>
  <div class="box div-default pointer">
    <div class="box-padding-small">
      <div class="f-12-500-gray-light-2 padding-15-b">{{ $t('notifications.title') }}</div>
      <div
        class="flex-full flex-column list-notifications"
        v-if="!isEmpty()"
      >
        <div
          v-for="(item, index) in this.$store.getters.getNotifications"
          :key="index"
          class="flex item-notification shadow-notification"
          @click="clickEdit(item.ticket)">
          <div
            v-if="item.ticket.priority"
            class="color-notification"
            :style="'background-color: ' + item.ticket.priority.color"></div>
          <div
            v-if="!item.ticket.priority"
            class="color-notification"
            :style="'background-color: ' + ' - '"></div>
          <div class="flex flex-column width-80">
            <div class="f-10-500-gray padding-2-b padding-5-t uppercase">{{ item.user.displayName }}</div>
            <div class="f-10-300-gray" v-html="item.message">
              <span class="f-10-500-gray">{{ item.ticket.active }}</span>
              {{ item.message }}
              <span class="f-10-500-gray">{{ item.message }}</span>
              {{ item.message }}
            </div>
          </div>
          <div class="time f-12-gray text-right width-20">{{ formatDate(item.createdAt) }}</div>
        </div>
        <div class="text-right f-10-500-darkcyan padding-10-trbl" style="cursor: initial;">
          <span
            @click="goToAllNotifications"
            style="cursor: pointer;"
          >{{ $t('notifications.seeMore') }}</span>
        </div>
      </div>
      <span v-else class="f-12-gray"> {{ $t('notifications.noNotifications') }} </span>
    </div>
  </div>
</template>

<script>
import Notification from "src/backend/models/Notification.js";

export default {
  name: "Notifications",
  data() {
    return {
      notifications: []
    };
  },
  created() {
    // this.$store.getters.getNotifications
    //   ? ""
    //   : Notification.get(this.$store.getters.getUser.locale)
    //       .then(result => {
    //         this.notifications = result.data.content;
    //         this.$store.commit("setNotifications", result.data.content);
    //       })
    //       .catch(e => {});
  },
  methods: {
    clickEdit(ticket) {
      this.$store.commit("setTicket", ticket);

      if (this._isUser()) {
        this.$router.push({
          path: "/edit-ticket-user/" + ticket.id
        });
      } else {
        this.$router.push({
          path: "/edit-ticket/" + ticket.id
        });
      }
    },
    isEmpty(){
      return (this.notifications.length <= 0);
    },
    formatDate(dateValue) {
      return this.$moment
        .utc(dateValue)
        .fromNow({ withSuffix: false, forcePast: true });
    },
    goToAllNotifications() {
      this.$router.push({ name: "Todas Notificações" });
    }
  }
};
</script>

<style>
</style>
