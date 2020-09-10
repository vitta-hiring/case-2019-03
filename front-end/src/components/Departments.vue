<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.departments">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light">{{ $t('listOfDepartments.list.department') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfDepartments.list.status') }}</th>
            <th class="f-12-500-gray-light">{{ $t('listOfDepartments.list.lastUpdate') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.departments.length > 0">
          <tr
            v-for="(item, id) in this.departments"
            :key="id"
            :class="{ 'line-through' : item.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(item)"
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
                    :fill="''"
                    vector-effect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </td>
            <td class="f-14-500-gray">{{ item.name }}</td>
            <td
              class="f-13-500-gray-light"
              v-if="item.active"
            >{{ $t('listOfDepartments.list.active') }}</td>
            <td class="f-13-500-gray-light" v-else>{{ $t('listOfDepartments.list.inactive') }}</td>
            <td
              class="f-12-500-gray-light"
            >{{ item.updatedAt == null ? '' : $moment(item.updatedAt).calendar()}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfDepartments.list.emptyDepartment')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="this.departments"
      class="flex-full flex-space-between flex-align-items-center padding-10-trbl"
    >
      <div
        class="f-12-300-gray padding-10-l"
      >{{ $t('listOfDepartments.list.showing') }} {{ from + 1 }} {{ $t('listOfDepartments.list.of') }} {{ to }} {{ $t('listOfDepartments.list.out') }} {{ total }} {{ $t('listOfDepartments.list.registers') }}</div>
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
import Department from "../backend/models/Department";

export default {
  name: "department",
  props: ["query"],
  computed: {
    to() {
      var highBound = this.from + this.pagination.numberOfElements;

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
    "pagination.currentPage": function(next, curr) {
      if (next != curr) {
        this.getDepartments();
      }
    },

    query(next) {
      this.getDepartments();
    }
  },
  created() {
    this._renewParametersVueX();
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      this._getLoading(true);
      Department.getPaginated(
        this.pagination.currentPage - 1,
        this.pagination.perPage,
        this.searchQuery ? `?name=${this.query.query}` : ""
      )
        .then(s => {
          this.departments = s.data.content;
          this.setPagination(s.data);
          this._getLoading(false);
        })
        .catch(e => {
          this.catchError(e);
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
      this.pagination.perPage = response.size;
      this.pagination.currentPage = response.number + 1;
      this.pagination.perPageOptions = response.size;
      this.pagination.total = response.totalElements;
      this.pagination.startTotalPages = response.totalPages;
      this.pagination.numberOfElements = response.numberOfElements;
    },

    clickEdit(department) {
      if (this._isAdmin()) {
        this.$router.push({ path: `/edit-department/${department.id}` });
      }
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
      departments: [],
      departmentTime: ""
    };
  }
};
</script>
