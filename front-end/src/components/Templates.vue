<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.templates">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light">{{ $t('newPriority.label.name') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.type') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.status') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.lastUpdate') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.templates.length > 0">
          <tr
            v-for="(item, id) in this.templates"
            :key="id"
            :class="{ 'line-through' : item.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(item)"
          >
            <td class="padding-20-l">
              <icon name="edit-template" widthValue="28" marginTopValue="-0.4" />
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
            >{{$t('templates.emptyTemplates')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination-in-table :data="templates" :pagination="pagination" @getRefresh="getRefresh" />
  </div>
</template>

<script>
import Template from "src/backend/models/Template";

export default {
  name: "Templates",

  props: ["query"],

  data() {
    return {
      templateQuery: {
        query: "",
        page: 0,
        size: 10
      },
      pagination: {
        perPage: 0,
        currentPage: 1,
        perPageOptions: [10, 30, 50],
        total: 0,
        startTotalPages: 0,
        numbersOfElements: undefined
      },
      templates: []
    };
  },

  created() {
    this.$store.commit("setListTemplates", undefined);
    this._renewParametersVueX();
    this.getRefresh();
  },

  methods: {
    getTemplates() {
      Template.get(this.templateQuery ? this.templateQuery : "")
        .then(result => {
          this.templates = result.data.content;
          this.pagination = this._setPagination(result.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
          let error = "Error: Request failed with status code 500";
          this._catchError(error);
        });
    },

    getRefresh(next) {
      this._getLoading(true);
      next
        ? ((this.templateQuery.page = next - 1), this.getTemplates())
        : this.getTemplates();
    },

    clickEdit(template) {
      this.$store.commit("setListTemplates", true);
      this.$router.push({ path: `/edit-template/${template.id}` });
    }
  },

  watch: {
    query(next) {
      this.templateQuery.query = next.query;
      this.getRefresh();
    }
  }
};
</script>