<template>
  <div class="width-100">
    <div class="flex-full overflow-x-auto">
      <table class="table-grid table-grid-auto" v-if="this.users">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light" v-if="!reducedList">&nbsp;</th>
            <th
              class="f-12-500-gray-light"
              :class="!reducedList?'text-center':''"
            >{{ $t('listOfUsers.list.username') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfUsers.list.displayName') }}</th>
            <th class="f-12-500-gray-light" v-if="!reducedList">{{ $t('listOfUsers.list.client') }}</th>
            <th
              class="f-12-500-gray-light"
              v-if="!reducedList"
            >{{ $t('listOfUsers.list.userType') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfUsers.list.state') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.users.length > 0">
          <tr
            v-for="(user, id) in this.users"
            :key="id"
            :class="{'line-through': user.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(user)"
          >
            <td class="padding-20-l" v-if="!reducedList">
              <img
                class="padding-5-l icon-position icon-size icon-position-2"
                src="/static/icons/users.svg"
              />
            </td>
            <td class="f-14-500-gray" :class="!reducedList?'text-center':''">{{user.username}}</td>
            <td class>{{user.displayName}}</td>
            <td class v-if="!reducedList">{{user.company ? user.company.name: " - "}}</td>
            <td
              class
              v-if="!reducedList"
            >{{user.type ==='ADMIN'?$t('newUser.listTypeUsers.ADMIN'):(user.type==="AGENT"?$t('newUser.listTypeUsers.AGENT'):$t('newUser.listTypeUsers.USER'))}}</td>
            <td class>{{user.active?$t('state.active'):$t('state.inactive')}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfUsers.list.emptyUsers')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="this.users"
      class="flex-full flex-space-between flex-align-items-center overflow-x-auto"
    >
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
import user from "../backend/models/User";

export default {
  name: "users",
  props: {
    query: {
      type: Object,
      default: () => {
        return { query: "" };
      }
    },
    clientComponentInfo: {
      type: Object,
      default: () => {}
    },
    clientId: {
      type: Number,
      default: null
    },
    reducedList: {
      type: Boolean,
      default: false
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
    }
  },
  watch: {
    "pagination.currentPage": function(next, cur) {
      if (next !== cur) {
        this.getUsers();
      }
    },
    query(next) {
      this.getUsers();
    },
    clientId() {
      this.getUsers();
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      if (this.clientComponentInfo) {
        this.getUsersPaginated();
      } else {
        this._getLoading(true);
        user
          .getUsersPaginated(
            this.pagination.currentPage - 1,
            this.pagination.perPage,
            this.query.query ? this.query.query : "",
            this.clientId ? this.clientId : ""
          )
          .then(s => {
            this.users = s.data.content;
            this.setPagination(s.data);
            this._getLoading(false);
          })
          .catch(e => this.catchError(e));
      }
    },
    getUsersPaginated() {
      let usersPage = [...this.clientComponentInfo.users].filter(user => {
        return (
          user.username.indexOf(this.query.query) !== -1 ||
          user.displayName.indexOf(this.query.query) !== -1
        );
      });
      const listSize = usersPage.length;
      this.users = usersPage.splice(
        10 * (this.pagination.currentPage - 1),
        10 * (this.pagination.currentPage - 1) + 10
      );
      const pageInfo = {
        size: 10,
        number: this.pagination.currentPage - 1,
        totalElements: listSize,
        totalPages: Math.ceil(listSize / 10),
        numberOfElements: this.users.length
      };
      this.setPagination(pageInfo);
    },
    catchError(e) {
      this._getLoading(false);
      this.$swal.fire({
        title: this.$t("swal.titleError"),
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true
      });
    },
    setPagination(response) {
      this.pagination.perPage = response.size;
      this.pagination.currentPage = response.number + 1;
      this.pagination.perPageOptions = response.size;
      this.pagination.total = response.totalElements;
      this.pagination.startTotalPages = response.totalPages;
      this.pagination.numberOfElements = response.numberOfElements;
    },
    clickEdit(user) {
      if (this.reducedList) {
        this.$emit("edit", user);
      } else {
        this.$router.push(`/edit-user/${user.id}`);
      }
    },
    formatDate(dateValue) {
      return this.$moment.utc(dateValue).fromNow();
    }
  },
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
      users: []
    };
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
