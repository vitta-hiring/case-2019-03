<template>
  <div>
    <div class="flex-full">
      <div class="width-60 box div-hover">
        <div class="box-padding">
          <div class="box-header">
            <div class="box-title-subtitle">
              <div class="box-title">
                <span class="f-14-300-gray-bold">{{ $t('dashboard.chartNPS.title') }}</span>
              </div>
              <div class="box-subtitle">
                <span class="f-10-300-gray">{{ $t('dashboard.chartNPS.subtitle') }}</span>
              </div>
            </div>
          </div>

          <div class="box-content">
            <div id="nps-chart">
              <apexchart
                ref="chart1"
                type="bar"
                height="300"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="margin-15-rl"></div>

      <statistics :resultNPS="resultNPS"></statistics>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Dashboard from "src/backend/models/Dashboard";
import Statistics from "src/pages/Dashboard/charts/statistics.vue";

export default {
  components: {
    statistics: Statistics
  },
  updated: function() {},
  created() {
    let filtersDone = this.filters == undefined ? {} : { ...this.filters };

    this._getLoading(true);

    if (this.$store.getters.getRangeDate) {
      if (this.$store.getters.getRangeDate.endDate) {
        filtersDone.date = this.$store.getters.getRangeDate;
      }
    }

    Dashboard.nps(filtersDone).then(result => {
      this.chartSeries = [];
      this.chartCategorys = [];

      this.resultNPS = result.data;
      // this.resultNPS.percentReplied =
      //   (100 * this.resultNPS.replied.toFixed(2)) /
      //   this.resultNPS.sended.toFixed(2);
      // this.tempResult = this.resultNPS.percentReplied.toFixed(2);
      // this.resultNPS.percentReplied = this.tempResult;
      let replies = result.data.replies;
      // this.percentPromoters =
      //   (100 * this.resultNPS.promoters) / this.resultNPS.replied;
      // this.percentDetractors =
      //   (100 * this.resultNPS.detractors) / this.resultNPS.replied;

      // this.resultNPS.result =
      //   this.percentPromoters.toFixed(2) - this.percentDetractors.toFixed(2);

      let newReplies = [];
      replies.forEach(element => {
        newReplies.push(element.reply);
        newReplies[newReplies.length - 1].amount = element.amount;
      });

      newReplies.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        }

        if (a.id < b.id) {
          return -1;
        }

        return 0;
      });

      const size = newReplies.length;
      let count = 0;

      const translateRespond = this.$t("dashboard.chartNPS.answered");

      newReplies.forEach(element => {
        count++;
        this.chartSeries.push(parseInt(element.amount));
        this.chartCategorys.push(parseInt(element.value));

        var colors = [
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
        ];

        if (count == size) {
          (this.series = [
            {
              name: this.$t("dashboard.chartNPS.search"),
              data: this.chartSeries
            }
          ]),
            (this.chartOptions = {
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
                categories: this.chartCategorys
              },
              yaxis: {
                title: {
                  text: this.$t("dashboard.chartNPS.quantity")
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
            });

          this._getLoading(false);
        }
      });
    });
  },

  data: function() {
    return {
      chartSeries: undefined,
      chartCategorys: undefined,
      resultNPS: undefined,
      chartOptions: {},
      series: []
    };
  }
};
</script>

<style>
#nps-chart {
  width: 100%;
  /* max-width: 650px; */
}
</style>
