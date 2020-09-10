<template>
  <div>
    <div class="flex-full flex-column-1000">
      <div class="survey-chart box div-hover">
        <div class="box-padding">
          <div class="box-header">
            <div class="box-title-subtitle">
              <div class="box-title">
                <span class="f-14-300-gray-bold">{{ $t('dashboard.chartNPS.title') }}</span>
              </div>
              <div class="box-subtitle">
                <span class="f-10-300-gray">{{ $t('dashboard.chart' + surveyType.name + '.subtitle') }}</span>
              </div>
            </div>
          </div>

          <div class="box-content">
            <div id="survey-chart">
              <apexchart
                ref="chart1"
                type="bar"
                :height="surveyType.name === 'CSAT' ? 400 : 300"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="margin-15-rl"></div>

      <statistics :result="result" :surveyType="surveyType"></statistics>
    </div>
  </div>
</template>

<script>
import Dashboard from "../../../backend/models/Dashboard";
import statistics from "./statistics";

export default {
  name: "survey",
  components: {
    statistics
  },
  props: {
    surveyType: {
      type: Object,
      default: () => {
        return {
          id: 1,
          name: "NPS"
        }
      }
    },
    filters: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    surveyType: function(newType, oldType){
      if(newType.id !== oldType.id){
        this.getData();
      }
    }
  },
  methods: {
    getData(){
      let filtersDone = this.filters;
      filtersDone.surveyType = {...this.surveyType};

      this._getLoading(true);

      Dashboard.getSurvey(filtersDone)
        .then(result => {
          this.chartSeries = [];
          this.chartCategories = [];

          this.result = result.data;

          this.$emit("surveyType", result.data.surveyType);
          let replies = result.data.replies;

          let newReplies = [];
          replies.forEach(element => {
            const el = {...element.reply};
            el.amount = element.amount;
            newReplies.push(el);
          });

          newReplies.sort(function(a, b){
            if(a.id > b.id){
              return 1;
            }

            if(a.id < b.id){
              return -1;
            }

            return 0;
          });

          const size = newReplies.length;
          let count = 0;

          const translateRespond = this.$t("dashboard.chart" + this.surveyType.name + ".answered");

          newReplies.forEach(element => {
            count++;
            this.chartSeries.push(parseInt(element.amount));
            this.chartCategories.push(element.value);

            const colors = this.surveyType.name === 'NPS' ? [
              "#FF7249",
              "#FF7249",
              "#FF7249",
              "#FF7249",
              "#FF7249",
              "#FF7249",
              "#FF7249",
              "#F9E01A",
              "#F9E01A",
              "#94DE61",
              "#94DE61"
            ] : [
              '#BB1122',
              '#FF7249',
              '#F9E01A',
              '#94DE61',
              '#29894E'
            ];

            if (count == size) {
              this.series = [
                {
                  name: this.$t("dashboard.chart" + this.surveyType.name +".search"),
                  data: this.chartSeries
                }
              ];
              this.chartOptions = {
                theme: {
                  // mode: 'dark'
                  palette: "palette1"
                },
                chart: {
                  toolbar: {
                    show: true,
                    tools: {
                      download: '<i class="fas fa-angle-down"></i>'
                    }
                  }
                },
                colors: colors,
                plotOptions: {
                  bar: {
                    horizontal: false,
                    endingShape: "flat",
                    columnWidth: "55%",
                    distributed: true
                  }
                },
                dataLabels: {
                  enabled: true,
                  textAnchor: "start",
                  dropShadow: {
                    enabled: true
                  }
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"]
                },

                xaxis: {
                  categories: this.chartCategories
                },
                yaxis: {
                  title: {
                    text: this.$t("dashboard.chart" + this.surveyType.name + ".quantity")
                  },
                  labels: {
                    show: true,
                    align: "right",
                    style: {
                      cssClass: "f-10-500-gray"
                    },
                    formatter: function(val) {
                      return val;
                    }
                  }
                },
                // xaxis: {
                //   title: {
                //     text: this.$t('dashboard.chartNPS.punctuation')
                //   },
                //   labels: {
                //     show: true,
                //   }
                // },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function(val) {
                      return val + " " + translateRespond;
                    }
                  }
                }
              };

              this._getLoading(false);
            }
          });
        });
    }
  },
  created(){
    this.getData();
  },
  data: function() {
    return {
      chartSeries: undefined,
      chartCategories: undefined,
      result: undefined,
      chartOptions: {},
      series: []
    };
  }

}
</script>

<style scoped>
  #survey-chart {
    width: 100%;
    /* max-width: 650px; */
  }
</style>
