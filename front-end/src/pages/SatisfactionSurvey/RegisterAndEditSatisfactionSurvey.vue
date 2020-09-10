<template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full margin-20-tb">
          <div class="box-shadow">
            <div class="padding-10-r pointer" @click="returnListSatisfactionSurveys">
              <img src="/static/icons/back.svg" />
            </div>
            <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
            <div>
              <span
                class="f-18-100-gray"
              >{{ isEdit ? $t('satisfactionSurveys.editSatisfactionSurvey') : $t('satisfactionSurveys.newSatisfactionSurvey') }}</span>
            </div>
          </div>
        </div>
        <div class="flex-full flex-column-1125">
          <div class="box div-default list-tickets">
            <div class="box-padding">
              <form @submit.prevent="validateBeforeSubmit">
                <div class="flex-full flex-column">
                  <div
                    class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                  >
                    <div class="flex-full section-form">
                      <div :class="validationGeneral"></div>
                      <div class="flex-full padding-15-trbl">
                        <div class="flex width-20 w-title-30 w-title-50 f-15-500-gray">
                          <div class="width-100">
                            {{ $t('newProfile.generalInfo') }}
                            <img
                              class="validation-img w-14-840"
                              :src="'/static/icons/' + validationGeneral + '.svg'"
                            />
                          </div>
                        </div>
                        {{ revertError }}
                        <div class="flex width-100 w-card-70 w-card-50 flex-column">
                          <form @submit.prevent>
                            <div class="flex-full flex flex-wrap">
                              <!-- {{ satisfactionSurvey }} -->
                              <div
                                class="width-80 input-width-100 padding-20-tb"
                                v-if="!this.isEdit || this.$store.getters.getSatisfactionSurvey"
                              >
                                <label
                                  class="f-10-500-darkcyan padding-8-b"
                                  :class="{'color-red': errors.has('satisfactionSurvey.name') }"
                                >{{ $t('satisfactionSurveys.nameSatisfactionSurvey') }} *</label>
                                <input
                                  name="satisfactionSurvey.name"
                                  v-validate="{ required: true }"
                                  :key="componentKey"
                                  v-model="satisfactionSurvey.name"
                                  type="text"
                                  :data-vv-as="'\'' + $t('satisfactionSurveys.nameSatisfactionSurvey')+ '\''"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('satisfactionSurveys.namePlaceholderSatisfactionSurvey')"
                                />
                              </div>

                              <div class="width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan padding-8-b"
                                  :class="{'color-red': errors.has('satisfactionSurvey.question') }"
                                >{{ $t('satisfactionSurveys.questionSatisfactionSurvey') }} *</label>
                                <input
                                  name="satisfactionSurvey.question"
                                  v-validate="{ required: true }"
                                  v-model="satisfactionSurvey.question"
                                  type="text"
                                  :data-vv-as="'\'' + $t('satisfactionSurveys.questionSatisfactionSurvey')+ '\''"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('satisfactionSurveys.questionPlaceholderSatisfactionSurvey')"
                                />
                              </div>
                            </div>

                            <div class="flex-full flex flex-wrap">
                              <div class="width-100 input-width-100">
                                <div class="flex-full flex flex-wrap">
                                  <div
                                    class="width-33 flex-full flex flex-wrap position-search-type padding-20-tb"
                                  >
                                    <label
                                      class="f-10-500-darkcyan"
                                      :class="{'color-red': errorSearchType }"
                                    >{{ $t('satisfactionSurveys.selectSearchType') }} *</label>

                                    <search-type
                                      :key="componentKey"
                                      :isEditDisabled="isEditDisabled"
                                    />
                                  </div>
                                  <div class="flex width-30 padding-40-tb">
                                    <div
                                      :class="{'width-30 input-width-20': this.fullHD, 'width-20 input-width-20 position-active': this.HD}"
                                    >{{ (satisfactionSurvey.active ? $t('satisfactionSurveys.activeSatisfactionSurvey') : $t('satisfactionSurveys.inactiveSatisfactionSurvey')) }}</div>
                                    <div class="width-4 input-width-5">
                                      <b-form-checkbox
                                        class="position-checkbox"
                                        :key="componentKey"
                                        v-model="satisfactionSurvey.active"
                                      ></b-form-checkbox>
                                    </div>
                                  </div>
                                  <div
                                    class="flex width-30 padding-40-tb position-radios"
                                    v-if="this.$store.getters.getSurveyType && this.$store.getters.getSurveyType.name == 'CSAT' && !this.cameFromTheListing"
                                  >
                                    <div
                                      class="width-26 input-width-20"
                                    >{{ $t('satisfactionSurveys.scaleOneSatisfactionSurvey') }}</div>
                                    <div class="width-4 input-width-5 position-search-type">
                                      <b-form-radio
                                        class="position-checkbox"
                                        v-model="satisfactionSurvey.scale"
                                        :key="componentKey"
                                        name="some-radios"
                                        value="5"
                                      ></b-form-radio>
                                    </div>
                                    <div
                                      class="width-26 input-width-20"
                                    >{{ $t('satisfactionSurveys.scaleTwoSatisfactionSurvey') }}</div>
                                    <div class="width-4 input-width-5">
                                      <b-form-radio
                                        class="position-checkbox"
                                        v-model="satisfactionSurvey.scale"
                                        :key="componentKey"
                                        name="some-radios"
                                        value="10"
                                      ></b-form-radio>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-full flex-justify-end">
                    <div class="padding-20-r">
                      <button
                        class="btn-medium btn-cancel font-bold"
                        @click="returnListSatisfactionSurveys"
                      >{{ $t('cancel') }}</button>
                    </div>
                    <div class="padding-20-r">
                      <button
                        class="btn-medium btn-blue"
                        type="submit"
                      >{{ isEdit ? $t('edit') : addSatisfactionSurvey ? $t('save') : $t('satisfactionSurveys.addSatisfactionSurvey')}}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="widgets">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SatisfactionSurvey from "src/backend/models/SatisfactionSurvey";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  beforeDestroy() {
    this.$store.commit("setSatisfactionSurvey", undefined);
    this.$store.commit("setSurveyType", undefined);
  },

  name: "RegisterAndEditSatisfactionSurvey",

  props: ["query"],
  data() {
    return {
      isEditDisabled: undefined,
      numberOfQuestions: undefined,
      cameFromTheListing: undefined,
      questions: [],
      componentKey: 0,
      HD: undefined,
      fullHD: undefined,
      satisfactionSurveyQuery: {
        query: "",
        page: 0,
        size: 10
      },
      errorType: false,
      errorChannel: false,
      errorSearchType: false,
      error: undefined,
      firstAccess: true,
      satisfactionSurvey: {
        name: "",
        scale: "",
        active: true
      },
      isEdit: false,
      afterPost: false,
      addSatisfactionSurvey: false,
      selectedWrite: [],
      selectedRead: [],
      searchQuery: this.query
    };
  },
  created() {
    window.innerWidth > 1919 ? (this.fullHD = true) : (this.HD = true);
    if (this.$router.history.current.params.id) {
      this.isEdit = true;
      this.addSatisfactionSurvey = true;
      this.getSatisfactionSurveys(this.$router.history.current.params.id);
    }
  },
  beforeDestroy() {
    this.clear();
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    postSatisfactionSurvey() {
      SatisfactionSurvey.post(this.setCurrentSatisfactionSurvey())
        .then(result => {
          this._successfulResult(
            "satisfactionSurvey",
            "/list-satisfaction-surveys",
            true
          );
        })
        .catch(e => {
          if (e == "Error: Request failed with status code 400") {
            this.$toaster.error(this.$t("satisfactionSurveys.duplicated"));
          } else {
            this._catchError(e);
          }
        });
    },

    putSatisfactionSurvey() {
      SatisfactionSurvey.put(this.setCurrentSatisfactionSurvey())
        .then(result => {
          this._successfulResult(
            "satisfactionSurvey",
            "/list-satisfaction-surveys",
            true
          );
        })
        .catch(e => {
          if (e == "Error: Request failed with status code 400") {
            this.$toaster.error(this.$t("satisfactionSurveys.duplicated"));
          } else {
            this._catchError(e);
          }
        });
    },

    setCurrentSatisfactionSurvey() {
      // private String name;
      // private Boolean active;
      // private SurveyType surveyType;
      // private String question;
      // private Long scale;

      let satisfactionSurvey = {};
      this.isEdit
        ? (satisfactionSurvey.numberOfQuestions = this.numberOfQuestions)
        : "";
      this.isEdit
        ? (satisfactionSurvey.surveyName = this.satisfactionSurvey.name)
        : (satisfactionSurvey.name = this.satisfactionSurvey.name);
      satisfactionSurvey.active = this.satisfactionSurvey.active;
      this.isEdit
        ? (satisfactionSurvey.id = this.$router.history.current.params.id)
        : "";
      satisfactionSurvey.surveyType = this.$store.getters.getSurveyType;
      this.isEdit
        ? (this.questions[0].questionName = this.satisfactionSurvey.question)
        : "";
      this.isEdit
        ? ((satisfactionSurvey.questions = []),
          (satisfactionSurvey.questions = this.questions))
        : (satisfactionSurvey.question = this.satisfactionSurvey.question);
      satisfactionSurvey.scale = this.satisfactionSurvey.scale;
      return satisfactionSurvey;
    },

    clear() {
      this.empty = [];
      this.$store.commit("setClosedTicketsPerCompany", this.empty);
      this.$store.commit("setTicketIdFrom", undefined);
      this.$store.commit("setTicketIdInto", undefined);
      this.$store.commit("setRefresh", undefined);
    },

    getSatisfactionSurveys(id) {
      SatisfactionSurvey.getById(id)
        .then(result => {
          this._getLoading(false);
          this.$store.commit("setSurveyType", result.data.surveyType);
          let currentSatisfactionSurvey = {
            name: result.data.surveyName,
            question: result.data.questions[0].questionName,
            active: result.data.active
          };
          this.satisfactionSurvey = currentSatisfactionSurvey;
          this.numberOfQuestions = result.data.numberOfQuestions;
          this.questions = [];
          this.questions.push(result.data.questions[0]);
          this.$store.commit("setSatisfactionSurvey", this.satisfactionSurvey);
          result.data.surveyType.name == "CSAT"
            ? (this.cameFromTheListing = true)
            : "";
          this.isEditDisabled = true;
          this.forceRerender();
        })
        .catch(e => {
          this._getLoading(false);
        });
    },

    returnListSatisfactionSurveys() {
      this._getLoading(false);
      this.$router.push({ path: "/list-satisfaction-surveys" });
    },

    validationClass(boolean) {
      return boolean ? "validation-success" : "validation-fail";
    },

    validateBeforeSubmit() {
      this.$store.commit("setRefresh", true);
      this.$validator.validateAll().then(result => {
        if (result) {
          if (
            this.satisfactionSurvey.name == this.satisfactionSurvey.question
          ) {
            this.$toaster.error(
              this.$t("satisfactionSurveys.sameNameAndQuestion")
            );
          } else {
            if (this.validationGeneral == "validation-fail") {
              this.$toaster.error(this.$t("swal.errorFields"));
            } else {
              if (this.satisfactionSurvey.active) {
                SatisfactionSurvey.existActiveSurvey(
                  this.$store.getters.getSurveyType.name
                )
                  .then(result => {
                    if (result.data == true) {
                      this.$swal
                        .fire({
                          title: this.$t(
                            "satisfactionSurveys.confirmPutOrPostSatisfactionTitle"
                          ),
                          text: this.$t(
                            "satisfactionSurveys.confirmPutOrPostSatisfactionText"
                          ),
                          type: "warning",
                          showConfirmButton: true,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: this.$t("yes"),
                          cancelButtonText: this.$t("no"),
                          showCancelButton: true
                        })
                        .then(result => {
                          if (result.value) {
                            this.isEdit
                              ? this.putSatisfactionSurvey()
                              : this.postSatisfactionSurvey();
                          } else {
                            this.$router.push({
                              path: `/list-satisfaction-surveys`
                            });
                          }
                        });
                    } else if (result.data == false) {
                      this.isEdit
                        ? this.putSatisfactionSurvey()
                        : this.postSatisfactionSurvey();
                    }
                  })
                  .catch(e => {});
              } else {
                this.isEdit
                  ? this.putSatisfactionSurvey()
                  : this.postSatisfactionSurvey();
              }
            }
          }
        } else {
          this.$toaster.error(this.$t("swal.errorFields"));
        }
      });
    },

    returnListSatisfactionSurveys() {
      this.$router.push({ path: `/list-satisfaction-surveys` });
    }
  },

  computed: {
    revertError() {
      this.$store.getters.getRefresh
        ? this.$store.getters.getSurveyType
          ? (this.errorSearchType = false)
          : (this.errorSearchType = true)
        : "";
    },

    validationGeneral: function() {
      return this.validationClass(
        this.$store.getters.getSurveyType
          ? (this.$store.getters.getSurveyType.name == "CSAT" && !this.isEdit
              ? this.satisfactionSurvey.scale == "5" ||
                this.satisfactionSurvey.scale == "10"
              : true) &&
              this.satisfactionSurvey.name &&
              this.satisfactionSurvey.question &&
              this.satisfactionSurvey.name != this.satisfactionSurvey.question
          : ""
      );
    }
  }
};
</script>

<style scoped>
.position-checkbox {
  margin-top: -0.3rem;
}
.position-search-type {
  margin-right: 4.5rem;
}
.position-radios {
  margin-left: -10.7rem;
}
.position-active{
  margin-left: -2.5rem;
}
</style>