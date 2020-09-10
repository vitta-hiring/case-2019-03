<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" style="height: 60px" v-if="this.notifications">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light"></th>
            <th class="f-12-500-gray-light">{{ $t('listOfNotifications.list.ticketId') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfNotifications.list.message') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfNotifications.list.createdAt') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(notification, id) in this.notifications"
            :key="id"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickNotification(notification)"
          >
            <div
              v-if="notification.ticket.priority"
              class="color-notification"
              :style="'background-color: ' + notification.ticket.priority.color"
            ></div>
            <div
              v-if="!notification.ticket.priority"
              class="color-notification"
              :style="'background-color: ' + ' - '"
            ></div>
            <td class>{{notification.ticket.id}}</td>
            <td v-html="notification.message"></td>
            <td class="f-12-300-gray">
              <div>{{ formatDate(notification.createdAt) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="this.notifications" class="flex-full flex-space-between flex-align-items-center">
      <div
        class="f-12-300-gray padding-10-l"
      >{{ $t('listOfClients.list.showing') }} {{from + 1}} {{ $t('listOfClients.list.of') }} {{to}} {{ $t('listOfClients.list.out') }} {{total}} {{ $t('listOfClients.list.registers') }}</div>
      <l-pagination
        style="float:right;"
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="pagination.total"
      ></l-pagination>
    </div>
  </div>
</template>

<script>
import Notification from "src/backend/models/Notification.js";
import PaginationNotification from "./PaginationNotification";

export default {
  name: "NotificationTable",

  components: { PaginationNotification },

  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 100,
        startTotalPages: 110,
        numberOfElements: undefined
      },
      notifications: []
    };
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
    }
  },

  created() {
    this.getNotifications();
  },

  watch: {
    "pagination.currentPage": function(next, curr) {
      if (next != curr) {
        this.getNotifications();
      }
    }
  },

  methods: {
    getNotifications() {
      this._getLoading(true);
      const pageSize = 10;
      Notification.getList(
        this.$store.getters.getUser.locale,
        this.pagination.perPage,
        this.pagination.currentPage - 1
      )
        .then(result => {
          this._getLoading(false);
          this.notifications = result.data.content;
          this.pagination = this._setPagination(result.data);
        })
        .catch(e => {
          this._getLoading(false);
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: e.response.data.message,
            type: "error",
            showConfirmButton: true
          });
          this.$router.push({ name: "Listar Tickets" });
        });
    },

    clickNotification(notification) {
      let ticketID = notification.ticket.id;
      this.$store.commit("setTicket", notification.ticket);

      if (this._isUser()) {
        this.$router.push({
          path: "/edit-ticket-user/" + ticketID
        });
      } else {
        this.$router.push({
          path: "/edit-ticket/" + ticketID
        });
      }
    },
    formatDate(dateValue) {
      return this.$moment.utc(dateValue).fromNow();
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.color-notification {
  width: 0.5em;
  height: 100%;
  /* border-radius: 25px; */
}
</style>
