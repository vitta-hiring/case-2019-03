<template>
  <div>
    <div class="title-section">
      <img src="/static/icons/groupOverview.svg" class="padding-5-r">
      <span class="f-14-300-darkcyan">{{ $t('dashboard.chartSPR.header') }}</span>
    </div>

    <div class="box div-hover">
      <div class="box-padding">
        <div class="box-header">
          <div class="box-title-subtitle">
            <div class="box-title">
              <span class="f-12-500-gray-medium">{{ $t('dashboard.chartSPR.title') }}</span>
            </div>
            <div class="box-subtitle">
              <span class="f-10-300-gray">{{ $t('dashboard.chartSPR.subtitle') }}</span>
            </div>
          </div>
        </div>

        <div class="box-content">
          <div id="nps-chart">
            <apexchart type="pie" height="300" :options="chartOptions" :series="chartSeries"/>
          </div>
          {{renderChart}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Dashboard from "src/backend/models/Dashboard";

export default {
  props: {
    filters: {
      required: true
    }
  },

  computed: {
    renderChart: function() {
      let filtersDone = this.filters == undefined ? {} : { ...this.filters };

      if (this.$store.getters.getRangeDate) {
        if (this.$store.getters.getRangeDate.endDate) {
            filtersDone.date = this.$store.getters.getRangeDate;
        }
      }
      
      //this._getLoading(true);
      Dashboard.statusPie(filtersDone).then(result => {
        this.chartSeries = [];
        this.chartLabels = [];

        const size = result.data.length;
        let count = 0;
        const quantityLegend = this.$t("dashboard.chartFCR.quantity");

        result.data.forEach(element => {
          count++;
          this.chartSeries.push(parseInt(element.amout));
          this.chartLabels.push(element.state.name);

          if (count == size) {
            var colors = [
              "#16B7C8",
              "#94DE61",
              "#F9E01A",
              "#de6161",
              "#8A8787",
              "#8061de",
              "#6a9f43",
              "#ab4444"
            ];

            this.chartOptions = {
              tooltip: {
                theme: "light",
                enabled: true,
                fillSeriesColor: false,
                y: {
                  formatter: function(val) {
                    return quantityLegend + ": " + val;
                  },
                  title: {
                    formatter: function(seriesName) {
                      return "";
                    }
                  }
                }
              },
              colors: colors,
              legend: {
                position: "left",
                horizontalAlign: "center"
              },
              theme: {
                // mode: 'dark'
                palette: "palette1",
                monochrome: {
                  enabled: false,
                  color: "#0097a7",
                  shadeTo: "light",
                  shadeIntensity: 0.65
                }
              },
              chart: {
                toolbar: {
                  show: true,
                  tools: {
                    download: '<i class="fas fa-angle-down"></i>'
                  }
                }
              },
              plotOptions: {
                donut: {
                  dataLabels: {
                    name: {
                      fontSize: "22px",
                      fontWeight: "bold"
                    },
                    value: {
                      fontSize: "16px"
                    }
                  }
                }
              },
              labels: this.chartLabels,
              responsive: [
                {
                  breakpoint: 180,
                  options: {
                    chart: {
                      width: 100,
                      height: 200
                    },
                    legend: {
                      position: "right"
                    }
                  }
                }
              ]
            };
            this._getLoading(false);
          }
        });
      });

      return;
    }
  },

  created() {},

  data: function() {
    return {
      chartLabels: undefined,
      chartSeries: [0],

      chartOptions: {},

      params: {
        channel: { id: "1" },
        department: { id: "2" },
        agents: [{ id: "1" }, { id: "2" }]
      }
    };
  }
};
</script>

<style>
/* #chart {
  max-width: 650px;
  margin: 35px auto;
} */

.apexcharts-toolbar {
  top: -40px !important;
}
</style>