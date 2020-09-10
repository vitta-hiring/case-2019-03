<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.profiles">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light">{{ $t('listOfProfiles.list.profile') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.type') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.status') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.lastUpdate') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.profiles.length > 0">
          <tr
            v-for="(item, id) in this.profiles"
            :key="id"
            :class="{ 'line-through' : item.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(item)"
          >
            <td class="padding-20-l">
              <icon name="config-profile" />
            </td>
            <td class="f-15-500-gray">{{ item.name }}</td>
            <td class="f-15-500-gray-light text-center">{{ item.type }}</td>
            <td
              class="f-15-500-gray-light text-center"
              v-if="item.active"
            >{{ $t('listOfProfiles.list.active') }}</td>
            <td
              class="f-15-500-gray-light text-center"
              v-else
            >{{ $t('listOfProfiles.list.inactive') }}</td>
            <td
              class="f-15-500-gray-light text-center"
            >{{ item.updatedAt === null ? '-' : $moment(item.updatedAt).calendar()}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="text-center padding-20-tb f-18-300-gray"
            >{{$t('listOfProfiles.list.emptyDepartment')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="this.profiles"
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
import Authority from "../backend/models/Authority";

export default {
  name: "profiles",

  props: ["query"],

  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 100,
        startTotalPages: 110,
        numbersOfElements: undefined
      },
      searchQuery: this.query,
      profiles: []
    };
  },

  created() {
    this._renewParametersVueX();
    this.getProfiles();
  },

  methods: {
    getProfiles() {
      this._getLoading(true);
      Authority.getPaginated(
        this.pagination.currentPage - 1,
        this.pagination.perPage,
        this.searchQuery ? `?name=${this.query.query}` : ""
      )
        .then(result => {
          this.profiles = result.data.content;
          this.pagination = this._setPagination(result.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._catchError(e);
        });
    },

    clickEdit(profile) {
      this.$router.push({ path: `/edit-profile/${profile.id}` });
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
    "pagination.currentPage": function(next, curr) {
      if (next != curr) {
        this.getProfiles();
      }
    },

    query(next) {
      this.getProfiles();
    }
  }
};
</script>