
<template>
  <div id="container">
    <div id="content-master">
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="f-18-100-gray">{{ $t('satisfactionSurveys.title') }}</div>
          <div class="margin-20-rl division background-darkcyan"></div>
          <router-link :to="'/new-satisfaction-survey'">
            <a>
              <div class="f-14-300-darkcyan cursor-pointer">
                {{ $t('satisfactionSurveys.satisfactionSurvey') }}
                <icon name="new-satisfaction-survey" widthValue="27" />
              </div>
            </a>
          </router-link>
        </div>
      </div>
      <div class="flex-full margin-30-t">
        <div class="box div-default list-tickets">
          <div class="flex header-list-tickets">
            <div class="flex flex-justify-space-around width-100">
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('satisfactionSurveys.header.totalSatisfactionSurveys') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ satisfactionSurveyHeader.total }}
                  <icon name="list-satisfaction-surveys" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('satisfactionSurveys.active') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ satisfactionSurveyHeader.actives }}
                  <icon name="checked" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('satisfactionSurveys.inactive') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ satisfactionSurveyHeader.inactives }}
                  <icon name="error" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
            </div>
          </div>
          <div class="box-padding">
            <div class="flex-full flex-space-between">
              <div>
                <img src="/static/icons/list.svg" />
                <span class="f-12-300-gray f-10-300-gray">{{ $t('satisfactionSurveys.title') }}</span>
              </div>
              <div class="flex flex-row">
                <div class="padding-5-r">
                  <img src="/static/icons/search.svg" />
                </div>
                <div>
                  <input
                    type="text"
                    class="input-style f-12-300-gray"
                    v-model="searchQuery"
                    :placeholder="$t('listOfProfiles.list.search')"
                  />
                </div>
              </div>
            </div>
          </div>
          <satisfaction-surveys :query="sendQuery" />
        </div>
        <div class="widgets">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SatisfactionSurvey from "src/backend/models/SatisfactionSurvey";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListSatisfactionSurveys",

  data() {
    return {
      satisfactionSurveyHeader: [],
      searchQuery: ""
    };
  },
  created() {
    this.$store.commit("setSatisfactionSurvey", undefined);
    this.$store.commit("setSurveyType", undefined);
    SatisfactionSurvey.getHeader()
      .then(result => {
        this.satisfactionSurveyHeader = result.data;
      })
      .catch(e => {});
  },
  computed: {
    sendQuery() {
      return { query: this.searchQuery };
    }
  }
};
</script>
