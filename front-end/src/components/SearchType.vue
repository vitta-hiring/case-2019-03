<template>
  <multiselect
    :searchable="true"
    :loading="isLoading"
    :internal-search="true"
    :clear-on-select="true"
    :close-on-select="true"
    :selectLabel="$t('multiselect.select')"
    :selectedLabel="$t('multiselect.selected')"
    :deselectLabel="$t('multiselect.pressRemove')"
    :tagPlaceholder="$t('multiselect.pressCreate')"
    @search-change="asyncFind"
    v-if="this.$store.getters.getSurveyTypes"
    v-model="surveyType"
    :allow-empty="false"
    :block-keys="['Delete']"
    label="name"
    track-by="name"
    :options="this.$store.getters.getSurveyTypes"
    :multiple="false"
    :disabled="disabled"
    :taggable="false"
    @input="changeObserver()"
    :placeholder="$t('satisfactionSurveys.placeholderSearchType')"
  >
    <span slot="noResult">{{$t('multiselect.noElementsFound')}}</span>
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Department from "src/backend/models/Department.js";

export default {
  watch: {
    "surveyTypeQuery.query": function(next, curr) {
      this.surveyTypeQuery.page = 0;
      this.surveyTypes = [];
    }
  },

  data() {
    return {
      surveyTypeQuery: {
        page: 0,
        size: 10,
        query: ""
      },
      surveyType: [],
      surveyTypes: [],
      disabled: false
    };
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    },
    isEditDisabled: {
      type: Boolean,
      default: false
    }
  },

  beforeDestroy() {},

  methods: {
    asyncFind(query) {
      query
        ? this.refreshSurveyTypes(query, undefined)
        : (this.surveyTypeQuery = {
            type: this.userType,
            query: "",
            page: 0,
            size: 10
          }),
        this.refreshSurveyTypes(undefined, undefined);
    },

    changeObserver() {
      this.$store.commit(
        "setSurveyType",
        this.surveyType ? this.surveyType : undefined
      );
    },

    refreshSurveyTypes(query, loadMore) {
      loadMore ? this.surveyTypeQuery.page++ : "";
      query ? (this.surveyTypeQuery.query = query) : "";
      this.isLoading = true;
      Department.getSurveyType(
        this.surveyTypeQuery ? this.surveyTypeQuery : ""
      ).then(response => {
        this.surveyTypes = response.data;
        this.$store.commit("setSurveyTypes", this.surveyTypes);
      });
      this.isLoading = false;
    },

    async getSurveyTypes() {
      this.surveyType = this.$store.getters.getSurveyType
        ? this.$store.getters.getSurveyType
        : "";
      this.$store.getters.getSurveyTypes
        ? ""
        : this.refreshSurveyTypes(undefined, undefined);
    }
  },
  created() {
    this.isEditDisabled == true
      ? (this.disabled = true)
      : (this.disabled = false);
    this.$store.commit("setSurveyTypes", undefined);
    this.getSurveyTypes();
  },
  beforeDestroy() {
    //this.$store.commit("setSurveyType", undefined);
  }
};
</script>
<style scoped>
.loadMore {
  background-color: #0097a7;
  justify-content: center;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.loadMore:hover {
  background-color: #e6e6e6;
  color: #35495e;
  font-weight: 700;
}
</style>

</style>
