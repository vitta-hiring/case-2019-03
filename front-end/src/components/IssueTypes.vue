<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.issueTypes">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light">{{'ID'}}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfIssueTypes.list.name') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfIssueTypes.list.state') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.issueTypes.length > 0">
          <tr
            v-for="(item, id) in this.issueTypes"
            :key="id"
            :class="{'line-through': item.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(item)"
          >
            <td class>
              <img data-v-3bc910a2 src="/static/icons/issueLight.svg" class="icon-position-2" />
            </td>
            <td class="f-14-500-gray">{{item.id}}</td>
            <td class="f-13-500-gray-light">{{item.name}}</td>
            <td class="f-12-500-gray-light">{{item.status?$t('state.active'):$t('state.inactive')}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfIssueTypes.list.emptyIssueTypes')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="this.issueTypes" class="flex-full flex-space-between flex-align-items-center">
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
import issueType from "../backend/models/IssueType";

export default {
  name: "issueTypes",
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
  watch: {
    "pagination.currentPage": function(next, cur) {
      if (next !== cur) {
        this.getIssueTypes();
      }
    },
    query(next) {
      this.getIssueTypes();
    }
  },
  created() {
    this.getIssueTypes();
  },
  methods: {
    getIssueTypes() {
      this._getLoading(true);
      issueType
        .getPagineted(
          this.pagination.currentPage - 1,
          this.pagination.perPage,
          this.searchQuery ? `?name=${this.query.query}` : ""
        )
        .then(s => {
          this.issueTypes = s.data.content;
          this.pagination = this._setPagination(s.data);
          this._getLoading(false);
        })
        .catch(e => this.catchError(e));
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
    clickEdit(issueType) {
      this.$router.push({ path: `/edit-issue-type/${issueType.id}` });
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
      searchQuery: this.query,
      issueTypes: []
    };
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
