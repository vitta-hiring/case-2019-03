<template>
  <div>
    <div id="container">
      <div id="content-master">
        <!-- HEADER -->
        <div class="flex-full margin-20-tb">
          <div class="box-shadow" style="padding-left: 10px; height: 55px;">
            <div class="padding-10-r pointer" @click="returnListTickets">
              <img src="/static/icons/back.svg" alt />
            </div>
            <div class="margin-20-rl division background-darkcyan"></div>
            <div>
              <span class="f-18-100-gray padding-20-l">{{ $t('title.listOfNotifications') }}</span>
            </div>
          </div>
        </div>

        <div class="flex-full">
          <div class="box div-default width-100">
            <div class="box-padding">
              <div class="flex-full flex-space-between">
                <div>
                  <img src="/static/icons/list.svg" class />
                  <span class="f-12-300-gray">{{ $t('title.listOfNotifications') }}</span>
                </div>
              </div>
              <notification-table></notification-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "src/backend/models/Notification.js";
import NotificationTable from "../../components/NotificationsTable";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListNotifications",

  components: { NotificationTable },

  created() {},

  methods: {
    returnListTickets() {
      this.$router.push({ name: "Listar Tickets" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
