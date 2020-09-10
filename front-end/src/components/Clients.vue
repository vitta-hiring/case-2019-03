<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.clients">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light f-10-500-gray-light">&nbsp;</th>
            <th
              class="f-12-500-gray-light f-10-500-gray-light"
            >{{ $t('listOfClients.list.clientPartnerName') }}</th>
            <th class="f-12-500-gray-light f-10-500-gray-light">{{ $t('listOfClients.list.admin') }}</th>
            <th class="f-12-500-gray-light f-10-500-gray-light">{{ $t('listOfClients.list.state') }}</th>
            <!--<th class="f-12-500-gray-light">{{ $t('listOfClients.list.lastUpdate') }}</th>-->
          </tr>
        </thead>
        <tbody v-if="this.clients.length > 0">
          <tr
            v-for="(client, id) in this.clients"
            :key="id"
            :class="{'line-through': client.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(client)"
          >
            <td class="padding-20-l">
              <img
                class="padding-5-l icon-position icon-size icon-position-2"
                src="/static/icons/target.svg"
              />
            </td>
            <td class="f-14-500-gray f-12-500-gray">{{client.name}}</td>
            <td
              class="f-13-500-gray-light f-12-500-gray-light"
            >{{client.responsibleUser?client.responsibleUser: '-'}}</td>
            <td
              class="f-13-500-gray-light f-12-500-gray-light"
            >{{client.state? $t('state.active'):$t('state.inactive ')}}</td>
            <!--          <td class>{{client.lastUpdate}}</td>-->
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfClients.list.emptyClients')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="this.clients" class="flex-full flex-space-between flex-align-items-center">
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
import Prescription from "src/backend/models/Prescription.js";
import Priority from "src/backend/models/Priority.js";
import Company from "../backend/models/Company";

export default {
  name: "clients",
  props: ["query"],
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
    this.getClients();
  },
  watch: {
    "pagination.currentPage": function(next, cur) {
      if (next !== cur) {
        this.getClients();
      }
    },
    query(next) {
      this.getClients();
    }
  },
  methods: {
    getClients() {
      this._getLoading(true);
      Company.getPaginated(
        this.pagination.currentPage - 1,
        this.pagination.perPage,
        `?name=${this.query.query}`
      )
        .then(s => {
          this.clients = s.data.content;
          this.setPagination(s.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);          
          this._catchError(e);
        });
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
      this.pagination.currentPage = response.number + 1;
      this.pagination.perPage = response.size;
      this.pagination.perPageOptions = response.size;
      this.pagination.total = response.totalElements;
      this.pagination.startTotalPages = response.totalPages;
      this.pagination.numberOfElements = response.numberOfElements;
    },
    clickEdit(company) {
      this.$router.push({ path: `/edit-client/${company.id}` });
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
        total: 1,
        startTotalPages: 1,
        numberOfElements: undefined
      },
      clients: []
    };
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.icon-position-2 {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}
</style>
