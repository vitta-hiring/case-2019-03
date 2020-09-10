<template>
  <div id="tabs-and-map" class="results-box first-row-second-collum" v-if="this.result">
    <div class="flex flex-column">
      <div class="flex width-100">
        <div class="mini-box div-hover margin-20-r">
          <div class="imgLabel default">
            <i class="fas fa-check fa-w-16 fa-2x" style="color:#fff;"></i>
          </div>

          <div class="results">
          <span
            class="f-12-300-gray-bold f-14-300-gray-bold-1000"
          >{{ $t('dashboard.chartNPS.statistics.totalFinalizedTickets') }}</span>
            <br>
            <span class="f-18-100-gray f-20-100-gray-1000">{{this.result.finalized}}</span>
          </div>
        </div>

        <div class="mini-box div-hover">
          <div class="imgLabel default">
            <i class="fas fa-paper-plane fa-w-16 fa-2x" style="color:#fff;"></i>
          </div>

          <div class="results">
            <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.totalSentSearch') }}</span>
            <br>
            <span class="f-18-100-gray f-20-100-gray-1000">{{result.sended}}</span>
          </div>
        </div>
      </div>

      <div class="flex-full margin-15-b"></div>

      <div class="flex width-100">
        <div class="mini-box div-hover margin-20-r">
          <div class="imgLabel default">
            <i class="fas fa-reply fa-w-16 fa-2x" style="color:#fff;"></i>
          </div>

          <div class="results">
          <span
            class="f-12-300-gray-bold f-14-300-gray-bold-1000"
          >{{ $t('dashboard.chartNPS.statistics.totalSearchAnswered') }}</span>
            <br>
            <span class="f-18-100-gray f-20-100-gray-1000">{{result.replied}}</span>
          </div>
        </div>

        <div class="mini-box div-hover">
          <div class="imgLabel default">
            <i class="fas fa-percentage fa-w-16 fa-2x" style="color:#fff;"></i>
          </div>

          <div class="results">
          <span
            class="f-12-300-gray-bold f-14-300-gray-bold-1000"
          >{{ $t('dashboard.chartNPS.statistics.percentSearchAnswered') }}</span>
            <br>
            <span class="f-18-100-gray f-20-100-gray-1000">{{result.percentReplied}}</span>
          </div>
        </div>
      </div>

      <div class="flex-full margin-15-b"></div>

      <template v-if="surveyType.name === 'NPS'">
        <div class="flex width-100">
          <div class="mini-box div-hover margin-20-r">
            <div class="imgLabel detractors">
              <i class="far fa-frown fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.detractors') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.detractors}}</span>
            </div>
          </div>

          <div class="mini-box div-hover">
            <div class="imgLabel neutrals">
              <i class="far fa-meh fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.neutrals') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.neutral}}</span>
            </div>
          </div>
        </div>

        <div class="flex-full margin-15-b"></div>

        <div class="flex width-100">
          <div class="mini-box div-hover margin-20-r">
            <div class="imgLabel promoters">
              <i class="far fa-smile fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.promoters') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.promoters}}</span>
            </div>
          </div>

          <div class="mini-box div-hover">
            <div class="imgLabel darkCyan">
              <i class="fas fa-chart-line fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.result') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.result}}</span>
            </div>
          </div>
        </div>

      </template>
      <template v-else>
        <div class="flex width-100">
          <div class="mini-box div-hover margin-20-r">
            <div class="imgLabel veryUnsatisfied">
              <i class="far fa-frown fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartCSAT.statistics.veryUnsatisfied') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.indicators.veryUnsatisfied}}</span>
            </div>
          </div>

          <div class="mini-box div-hover">
            <div class="imgLabel unsatisfied">
              <i class="far fa-frown-open fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartCSAT.statistics.unsatisfied') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.indicators.unsatisfied}}</span>
            </div>
          </div>
        </div>

        <div class="flex-full margin-15-b"></div>

        <div class="flex width-100">
          <div class="mini-box div-hover margin-20-r">
            <div class="imgLabel indifferent">
              <i class="far fa-meh fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartCSAT.statistics.indifferent') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.indicators.indifferent}}</span>
            </div>
          </div>

          <div class="mini-box div-hover">
            <div class="imgLabel satisfied">
              <i class="far fa-smile fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartCSAT.statistics.satisfied') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.indicators.satisfied}}</span>
            </div>
          </div>
        </div>

        <div class="flex-full margin-15-b"></div>

        <div class="flex width-100">
          <div class="mini-box div-hover margin-20-r">
            <div class="imgLabel verySatisfied">
              <i class="far fa-smile-beam fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartCSAT.statistics.verySatisfied') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.indicators.verySatisfied}}</span>
            </div>
          </div>

          <div class="mini-box div-hover">
            <div class="imgLabel darkCyan">
              <i class="fas fa-chart-line fa-w-16 fa-2x" style="color:#fff;"></i>
            </div>

            <div class="results">
              <span class="f-12-300-gray-bold f-14-300-gray-bold-1000">{{ $t('dashboard.chartNPS.statistics.result') }}</span>
              <br>
              <span class="f-18-100-gray f-20-100-gray-1000">{{result.result}}</span>
            </div>
          </div>
        </div>

      </template>


    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {},
    surveyType: {}
  },

  computed: {
    renderChart: function() {
      let filtersDone = this.filters == undefined ? "{}" : { ...this.filters };

      Dashboard.fcr(filtersDone).then(result => {
        this.chartFcr = [];
        this.chartFcr.push(parseInt(result.data.noFcr));
        this.chartFcr.push(parseInt(result.data.fcr));
      });

      return;
    }
  },

  created() {

  },

  data: function() {
    return {};
  }
};
</script>

<style>

.darkCyan {
  background-color: #16b7c8;
}

.default {
  background-color: #8a8787;
}

.detractors {
  background-color: #FF7249; 
}

.neutrals {
  background-color: #F9E01A;
}

.promoters {
  background-color: #94DE61;
}

.veryUnsatisfied{
  background-color: #BB1122;
}

.unsatisfied{
  background-color: #FF7249;
}

.indifferent{
  background-color: #F9E01A;
}

.satisfied{
  background-color: #94DE61;
}

.verySatisfied{
  background-color: #29894E;
}

</style>
