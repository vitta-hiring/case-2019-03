<template>
  <div>
    <div>
      <table class="table-grid table-grid-auto margin-0-t">
        <thead>
        <tr class="padding-10-tb">
          <th v-for="header in headers"
              class="f-12-500-gray-light f-10-500-gray-light">
            {{header.label().toUpperCase()}}
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <tr v-for="item in list"
            class="box-shadow-hover f-14-300-gray">
          <td v-for="header in headers" class="f-12-300-gray">
            {{header.value(item)}}
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="7" class="text-center padding-20-tb f-18-300-gray">
            Lista vazia
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="paginated" class="flex-full flex-space-between flex-align-items-center">
      <div class="f-12-300-gray padding-10-l">
        {{ $t('listOfClients.list.showing') }} {{from + 1}} {{ $t('listOfClients.list.of') }} {{to}} {{ $t('listOfClients.list.out') }} {{total}} {{ $t('listOfClients.list.registers') }}
      </div>
      <l-pagination
        style="float:right;"
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="pagination.total">
      </l-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "GenericList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    paginated: {
      type: Boolean,
      default: false
    },
    numberOfElements: {
      type: Number,
      default: null
    }
  },
  created(){
    this.clearPagination();
  },
  watch: {
    'pagination.currentPage': function (next, cur) {
      if (next !== cur) {
        this.$emit("pageChange", this.pagination);
        const paginationInfo = {};
        paginationInfo.number = this.pagination.currentPage-1;
        paginationInfo.size = 10;
        paginationInfo.totalElements = this.numberOfElements;
        paginationInfo.totalPages = Math.ceil(this.numberOfElements/10);
        paginationInfo.numberOfElements = 10;
        this.setPagination(paginationInfo);
      }
    },
    'numberOfElements': function () {
      this.clearPagination();
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
    },
  },
  data(){
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 1,
        startTotalPages: 1,
        numberOfElements: undefined
      }
    }
  },
  methods: {
    setPagination(response) {
      this.pagination.currentPage = response.number+1;
      this.pagination.perPage = response.size;
      this.pagination.perPageOptions = response.size;
      this.pagination.total = response.totalElements;
      this.pagination.startTotalPages = response.totalPages;
      this.pagination.numberOfElements = response.numberOfElements;
    },
    clearPagination(){
      if(this.paginated && this.numberOfElements !== null) {
        const paginationInfo = {};
        paginationInfo.number = 0;
        paginationInfo.size = 10;
        paginationInfo.totalElements = this.numberOfElements;
        paginationInfo.totalPages = Math.ceil(this.numberOfElements / 10);
        paginationInfo.numberOfElements = 10;
        this.setPagination(this.numberOfElements);
      } else if(this.paginated && this.numberOfElements === 0) {
        const paginationInfo = {};
        paginationInfo.number = 0;
        paginationInfo.size = 10;
        paginationInfo.totalElements = this.numberOfElements;
        paginationInfo.totalPages = 0;
        paginationInfo.numberOfElements = undefined;
        this.setPagination(this.numberOfElements);
      }
    }
  }
}
</script>

<style scoped>

</style>
