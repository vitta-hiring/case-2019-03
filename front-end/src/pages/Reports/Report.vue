<template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full flex-column flex-space-between flex-column-445 margin-20-tb">
          <div v-if="type === 'survey-report'" class="padding-20-t flex-column">
            <div
              class="f-18-100-gray"
              v-if="surveyTypeDisabled"
            >{{$t('report.' + type + '-' + surveyType.name).toUpperCase()}}</div>
            <select
              name="surveyType"
              v-model="surveyType"
              class="select-style f-18-100-gray"
              style="width: 300px"
              v-else
              :placeholder="$t('report.choseSurveyType')"
            >
              <option
                v-for="surveyType in this.surveyTypes"
                :key="surveyType.id"
                :value="surveyType"
              >{{$t('report.' + type + '-' + surveyType.name).toUpperCase()}}</option>
            </select>
          </div>
          <div v-else class="f-18-100-gray">{{$t(`report.${type}`).toUpperCase()}}</div>
        </div>
        <div class="flex-full flex-column-972 margin-30-t">
          <report-filters :type="type" :surveyType="surveyType" @filter="setFilter" :ref="'filter'"></report-filters>
        </div>
        <div class="flex-full flex-column-972 margin-30-t">
          <div class="box div-default width-100">
            <report-lists :type="type" :list="list" @pageChange="setPage" :ref="'reportLists'"></report-lists>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Report from "../../backend/models/Report";
import Dashboard from "../../backend/models/Dashboard";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "Report",

  props: ["type"],
  created() {
    if (this.type === "survey-report") {
      Dashboard.getSurveyTypes().then(result => {
        const data = [...result.data];
        this.surveyTypes = data;
        this.surveyType = { ...data.filter(s => s.name === "NPS")[0] };
      });
    }
  },
  data() {
    return {
      list: [],
      headers: [],
      pagination: null,
      queryObject: null,
      surveyTypes: undefined,
      surveyType: undefined,
      surveyTypeDisabled: false
    };
  },
  methods: {
    setPage(pagination) {
      this.pagination = pagination;
      this.getReport();
    },
    setFilter(query) {
      if (this.type === "survey-report") {
        if (!!query.surveyType) {
          this.surveyType = query.surveyType;
          this.surveyTypeDisabled = false;
        } else {
          this.surveyTypeDisabled = false;
        }
      }

      this.queryObject = query;
      this.getReport();
    },
    getReport() {
      this._getLoading(true);
      let url = this.buildUrl(this.queryObject, this.pagination);
      Report.get(this.type, url)
        .then(result => {
          this.list = result.data.data;
          const paginationInfo = {};
          if (!!this.pagination) {
            paginationInfo.number = this.pagination.currentPage - 1;
          } else {
            paginationInfo.number = 0;
          }
          paginationInfo.size = 10;
          paginationInfo.totalElements = result.data.totalElements;
          paginationInfo.totalPages = Math.ceil(result.data.totalElements / 10);
          paginationInfo.numberOfElements = 10;
          this.$refs.reportLists.setPagination(paginationInfo);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
        });
    },

    buildUrl(query, pagination) {
      const paginationOptions = {
        size: 10,
        pag: 0,
        ordenation: {},
        conditions: []
      };
      let urlParams = "";
      if (!!pagination) {
        paginationOptions.size = pagination.perPage;
        paginationOptions.pag = pagination.currentPage - 1;
      }
      if (!!query) {
        if (!!query.ordenation) {
          paginationOptions.ordenation = query.ordenation;
        }
        if (!!query.conditions) {
          paginationOptions.conditions = query.conditions;
        }
        if (!!query.queryParams) {
          query.queryParams.forEach(param => {
            urlParams += "&" + param;
          });
        }
      }

      let url = JSON.stringify(paginationOptions);
      url = "paginationOptions=" + encodeURI(url) + urlParams;

      return url;
    }
  }
};
</script>

<style scoped>
</style>
