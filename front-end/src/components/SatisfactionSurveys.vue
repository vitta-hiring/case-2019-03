<template>
  <div>
    <div class="flex-full">
      <table class="table-grid" v-if="this.satisfactionSurveys">
        <thead>
          <tr class="padding-10-tb">
            <th class="f-12-500-gray-light">&nbsp;</th>
            <th class="f-12-500-gray-light">{{ $t('newPriority.label.name') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.type') }}</th>
            <!-- <th class="f-12-500-gray-light text-center">{{ $t('satisfactionSurveys.numberOfQuestions') }}</th> -->
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.status') }}</th>
            <th class="f-12-500-gray-light text-center">{{ $t('listOfProfiles.list.lastUpdate') }}</th>
          </tr>
        </thead>
        <tbody v-if="this.satisfactionSurveys.length > 0">
          <tr
            v-for="(item, id) in this.satisfactionSurveys"
            :key="id"
            :class="{ 'line-through' : item.draft }"
            class="box-shadow-hover pointer f-14-300-gray"
            @click="clickEdit(item)"
          >
            <td class="padding-20-l">
              <icon name="edit-satisfaction-survey" widthValue="28" marginTopValue="-0.4" />
            </td>
            <td class="f-15-500-gray">{{ item.surveyName }}</td>
            <td class="f-15-500-gray-light text-center">{{ item.surveyType.name }}</td>
            <!-- <td class="f-15-500-gray-light text-center">{{ item.numberOfQuestions }}</td> -->
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
            >{{$t('satisfactionSurveys.emptySatisfactionSurveys')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination-in-table :data="satisfactionSurveys" :pagination="pagination" @getRefresh="getRefresh" />
  </div>
</template>

<script>
import SatisfactionSurvey from "src/backend/models/SatisfactionSurvey";

export default {
  name: "SatisfactionSurveys",

  props: ["query"],

  data() {
    return {
      satisfactionSurveyQuery: {
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
      satisfactionSurveys: []
    };
  },

  created() {
    //this.$store.commit("setListSatisfactionSurveys", undefined);
    this._renewParametersVueX();
    this.getRefresh();
  },

  methods: {
    getSatisfactionSurveys() {
      SatisfactionSurvey.get(this.satisfactionSurveyQuery ? this.satisfactionSurveyQuery : "")
        .then(result => {
          this.satisfactionSurveys = result.data.content;
          this.pagination = this._setPagination(result.data);
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
          this._catchError(e);
        });
    },

    getRefresh(next) {
      this._getLoading(true);
      next
        ? ((this.satisfactionSurveyQuery.page = next - 1), this.getSatisfactionSurveys())
        : this.getSatisfactionSurveys();
    },

    clickEdit(satisfactionSurvey) {
      //this.$store.commit("setListSatisfactionSurveys", true);
      this.$router.push({ path: `/edit-satisfaction-survey/${satisfactionSurvey.id}` });
    }
  },

  watch: {
    query(next) {
      this.satisfactionSurveyQuery.query = next.query;
      this.getRefresh();
    }
  }
};
</script>