<template>
  <div>
    <div class="title-section">
      <img src="/static/icons/channelOverview.svg" class="padding-5-r">
      <span class="f-14-300-darkcyan">{{ $t('dashboard.chartFCR.header') }}</span>
    </div>

    <div class="box div-hover">
      <div class="box-padding">
        <div class="box-header">
          <div class="box-title-subtitle">
            <div class="box-title">
              <span class="f-12-500-gray-medium">{{ $t('dashboard.chartFCR.title') }}</span>
            </div>
            <div class="box-subtitle">
              <span class="f-10-300-gray">{{ $t('dashboard.chartFCR.subtitle') }}</span>
            </div>
          </div>
        </div>

        <div class="box-content">
          <div id="fcr-chart">
            <apexchart
              type="donut"
              height="300"
              :options="chartOptions"
              :series="chartFcr"
              :total="30"
            />
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
      let filtersDone = this.filters == undefined ? "{}" : { ...this.filters };
      //this._getLoading(true);

      if (this.$store.getters.getRangeDate) {
        if (this.$store.getters.getRangeDate.endDate) {
            filtersDone.date = this.$store.getters.getRangeDate;
        }
      }

      Dashboard.fcr(filtersDone).then(result => {
        this.chartFcr = [];
        this.chartFcr.push(parseInt(result.data.noFcr));
        this.chartFcr.push(parseInt(result.data.fcr));

        const quantityLegend = this.$t("dashboard.chartFCR.quantity");

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
          theme: {
            // mode: 'dark'
            palette: "palette4"
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
          legend: {
            position: "bottom",
            horizontalAlign: "center"
          },
          labels: [
            this.$t("dashboard.chartFCR.withOutFCR"),
            this.$t("dashboard.chartFCR.withFCR")
          ],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 500
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ],
          tooltip: {
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
          plotOptions: {
            pie: {
              size: undefined,
              customScale: 1,
              offsetX: 0,
              offsetY: 0,
              expandOnClick: true,
              dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10
              },
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    fontFamily: "Roboto",
                    color: undefined,
                    offsetY: -10
                  },
                  value: {
                    show: true,
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: undefined,
                    offsetY: 16,
                    formatter: function(val) {
                      return val;
                    }
                  },
                  total: {
                    show: true,
                    label: this.$t("dashboard.chartFCR.total"),
                    color: "#373d3f",
                    style: {
                      cssClass: "f-10-500-gray"
                    },
                    formatter: function(w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0);
                    }
                  }
                }
              }
            }
          }
        };

        this._getLoading(false);
      });

      return;
    }
  },

  created() {},

  data: function() {
    return {
      chartFcr: [0],
      chartOptions: {}
    };
  }
};
</script>

<style>
#fcr-chart {
  width: 100%;
  /* max-width: 650px; */
}
</style>