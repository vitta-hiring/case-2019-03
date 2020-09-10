<template>
  <div>
    <div class="flex-full overflow-x-auto">
      <table class="table-grid table-grid-auto">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfTickets.list.ticketId') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfTickets.list.ticketId') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfTickets.list.client') }}</th>
            <th class="f-12-500-gray-light">{{ $t('editTicket.AGENTS') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfTickets.list.state') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfTickets.list.lastUpdate') }}</th>
          </tr>
        </thead>
        <tbody
          v-if="this.$store.getters.getPrescriptions && this.$store.getters.getPrescriptions.length > 0"
        >
          <tr
            v-for="(prescription, id) in this.$store.getters.getPrescriptions"
            :key="id"
            :class="{'line-through': prescription.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(prescription)"
          >
            <td class="padding-20-l">
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                overflow="visible"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <g>
                  <path
                    xmlns:default="http://www.w3.org/2000/svg"
                    d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"
                    :fill="prescription.priority ? prescription.priority.color : ''"
                    vector-effect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </td>
            <td class="f-14-500-gray text-center">{{prescription.id}}</td>                               
            <td class>{{prescription.name}}</td>         
            <td class>{{prescription.medicationType}}</td>         
            <td class>{{prescription.unit}}</td>         
            <td class="color-gray text-center">
              <button
                v-if="prescription.draft"
                class="btn-state color-gray uppercase text-center"
                :class="{'color-darkcyan': (prescription.id === 1) }"
              >{{ $t('listOfTickets.list.draft') }}</button>
              <button
                v-else
                class="btn-state color-gray uppercase text-center"
                :class="{'color-darkcyan': (prescription.id === 1) }"
              >{{prescription.pharmaceuticalForm}}</button>
            </td>
            <td class="f-12-300-gray">
              <div
                class="flex flex-align-items-baseline"
                :class="{'justify-content-center': !prescription.updatedAt }"
              >
                <div
                  class="padding-10-r"
                  v-show="prescription.warning === true && prescription.expired === false"
                  v-if="!_isUser()"
                >
                  <img
                    src="/static/icons/sla_warning.svg"
                    class="padding-3-r"
                    :title="$t('listOfTickets.list.slaWarning')"
                  />
                  <span
                    class="f-12-500-white"
                    style="color: rgb(249,224,26)"
                    :title="$t('listOfTickets.list.slaWarning')"
                  >SLA</span>
                </div>
                <div class="padding-10-r" v-show="prescription.expired === true" v-if="!_isUser()">
                  <img
                    src="/static/icons/sla.svg"
                    class="padding-3-r"
                    :title="$t('listOfTickets.list.slaExpired')"
                  />
                  <span
                    class="f-12-500-white"
                    style="color: rgb(255, 90, 95)"
                    :title="$t('listOfTickets.list.slaExpired')"
                  >SLA</span>
                </div>
                <div>{{prescription.createdAt ? formatDate(prescription.createdAt) : " N/A "}}</div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody
          v-if="this.$store.getters.getPrescriptions && this.$store.getters.getPrescriptions.length == 0"
        >
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfTickets.list.emptyTickets')}}</td>
          </tr>
        </tbody>
        <tbody v-if="!this.$store.getters.getPrescriptions">
          <tr>
            this.$store.getters.getPrescriptions
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfTickets.list.loading')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="this.$store.getters.getPrescriptions"
      class="flex-full flex-space-between flex-align-items-center overflow-x-auto"
    >
      <div
        v-if="this.$store.getters.getPrescriptions && !this.$store.getters.getPrescriptions.length == 0"
        class="f-12-300-gray padding-10-l"
      >{{ $t('listOfTickets.list.showing') }} {{from + 1}} {{ $t('listOfTickets.list.of') }} {{to}} {{ $t('listOfTickets.list.out') }} {{total}} {{ $t('listOfTickets.list.registers') }}</div>
      <l-pagination
        v-if="this.$store.getters.getPrescriptions && !this.$store.getters.getPrescriptions.length == 0"
        style="float:right;"
        class="pagination-no-border"
        v-model="currentPage"
        :per-page="this.$store.getters.getPrescriptions.perPage"
        :listTickets="true"
        :total="this.$store.getters.getPrescriptions.total"
      ></l-pagination>
    </div>
  </div>
</template>

<script>
import Prescription from "src/backend/models/Prescription.js";

export default {
  name: "Prescriptions",
  props: {},

  computed: {
    searchFilter() {
      // SEARCH BY FILTER
      if (this.$store.getters.getFunctions.search) {
        this.$store.commit(
          "setFilters",
          this.$store.getters.getFunctions.search
        );
        this.comingFromTheListingOfTickets = true;
        this.filterTicketsByParameters(0);
      }

      // SEARCH BY QUERYSTRING
      if (this.$store.getters.getFunctions.searchQuery) {
        this.$store.commit(
          "setQueryString",
          this.$store.getters.getFunctions.searchQuery
        );
        this.comingFromTheListingOfTickets = true;
        this.filterTicketsByQueryString(0);
      }

      // CLEAR SEARCH
      if (this.$store.getters.getFunctions.clearSearch) {
        this.clearSearch();
      }

    },

    to() {
      let highBound =
        this.from + this.$store.getters.getTicketPaging.numberOfElements;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },

    from() {
      return (
        this.$store.getters.getTicketPaging.perPage *
        (this.$store.getters.getTicketPaging.currentPage - 1)
      );
    },

    total() {
      return this.$store.getters.getTicketPaging.total;
    }
  },

  created() {
    this.$store.getters.getQueryString
      ? ((this.searchQuery = this.$store.getters.getQueryString),
        (this.comingFromTheListingOfTickets = true))
      : "";
    this.$store.getters.getFilters
      ? ((this.filters = this.$store.getters.getFilters),
        (this.comingFromTheListingOfTickets = true),
        this.$store.commit("setClearFilters", true))
      : "";
    this.$store.getters.getCurrentPageTicket
      ? (this.currentPage = this.$store.getters.getCurrentPageTicket)
      : "";
    this.getPrescriptions();
  },

  beforeDestroy() {
    this.searchQuery
      ? this.$store.commit("setQueryString", this.searchQuery)
      : "";
    this.filters ? this.$store.commit("setFilters", this.filters) : "";
    this.saveCurrentPage();
  },

  watch: {
    currentPage: function(nextPage, currentPageNotObserver) {
      if (currentPageNotObserver != nextPage) {
        this.$store.commit("setCurrentPageTicket", nextPage - 1);
        currentPageNotObserver && !this.searchQuery
          ? (this.nextPageTicket = true)
          : currentPageNotObserver && !this.filters
          ? (this.nextPageTicket = true)
          : "";
        this.filters && !this.comingFromTheListingOfTickets
          ? this.filterTicketsByParameters(nextPage - 1)
          : this.searchQuery && !this.comingFromTheListingOfTickets
          ? this.filterTicketsByQueryString(nextPage - 1)
          : "";
        this.comingFromTheListingOfTickets == true
          ? (this.comingFromTheListingOfTickets = undefined)
          : "";
      }
    }
  },

  methods: {
    filterTicketsByParameters(nextPage) {
      this._getLoading(true);
      this.filters = this.$store.getters.getFunctions.search
        ? this.$store.getters.getFunctions.search
        : this.filters;
      Prescription.getAll(nextPage, this.filters)
        .then(result => {
          this.comingFromTheListingOfTickets = undefined;
          this.searchQuery = undefined;
          this.successPrescriptions(result.data);
          this.searchQuery = undefined;
          this._getLoading(false);
        })
        .catch(e => {
          this.catchError(e);
          this._getLoading(false);
        });
      this.$store.commit("setSearch", undefined);
      this.$store.commit("setSearchQuery", undefined);
    },

    filterTicketsByQueryString(nextPage) {
      this._getLoading(true);
      this.searchQuery = this.$store.getters.getFunctions.searchQuery
        ? this.$store.getters.getFunctions.searchQuery
        : this.searchQuery;

      Prescription.getAll(nextPage, this.filters, this.searchQuery)
        .then(result => {
          // this.$store.commit("setSearch", undefined);
          // this.$store.commit("setFilters", undefined);
          // this.$store.commit("setClearFilters", undefined);
          this.comingFromTheListingOfTickets = undefined;
          this.successPrescriptions(result.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
          this.catchError(e);
        });
      this.$store.commit("setSearchQuery", undefined);
    },

    clearSearch() {
      this.$store.commit("setCurrentPageTicket", 0);
      this.nextPageTicket = true;      
      this.$store.commit("setSearch", undefined);
      this.$store.commit("setSearchQuery", undefined);
      this.$store.commit("setClearSearch", undefined);
      this.$store.commit("setQueryString", undefined);
    },

    successPrescriptions(response) {
      this.$store.commit("setPrescriptions", response);
      this.nextPageTicket = undefined;
      this.currentPage = response.number + 1;
      this.$store.commit("setTicketPaging", this._setPagination(response));
    },

    catchError(e) {
      this.$swal.fire({
        title: this.$t("swal.titleError"),
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true
      });
    },

    getPrescriptions() {
      this._getLoading(true);
      this.filters = this.$store.getters.getFilters
      if (this.filters) {
        this.comingFromTheListingOfTickets = true;
        this.filterTicketsByParameters(0);
      } else {
          this.$store.getters.getTicketsPages && !this.nextPageTicket
              ? this._getLoading(false)
              : Prescription.getAll(
              this.$store.getters.getCurrentPageTicket
                  ? this.$store.getters.getCurrentPageTicket
                  : 0
              ).then(result => {
                this.searchQuery = undefined;
                this.successPrescriptions(result.data);
                this._getLoading(false);
               }).catch(e => {
                 this._getLoading(false);
               });
      }
    },

    saveCurrentPage() {
      this.$store.getters.getTicketPaging
        ? this.$store.commit(
            "setCurrentPageTicket",
            this.$store.getters.getTicketPaging.currentPage
          )
        : "";
    },

    clickEdit(prescription) {
      this.saveCurrentPage();
      if (prescription.draft) {
        if (this._isUser()) {
          this.$router.push({
            path: `new-prescription/${prescription.id}`
          });
        } else {
          this.$router.push({
            path: `new-prescription/${prescription.id}`
          });
        }
      } else {
        if (this._isUser()) {
          this.$router.push({
            path: `new-prescription/${prescription.id}`
          });
        } else {
          this.$router.push({
            path: `new-prescription/${prescription.id}`
          });
        }
      }
    },

    formatDate(dateValue) {
      return this.$moment(dateValue).fromNow();
    }
  },

  data() {
    return {
      nextPageTicket: undefined,
      currentPage: undefined,
      searchQuery: undefined,
      filters: undefined,
      comingFromTheListingOfTickets: undefined
    };
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
