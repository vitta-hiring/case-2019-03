<template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full margin-20-tb flex-space-between">
          <div class="box-shadow">
            <div class="f-18-100-gray f-12-100-gray f-12-100-gray">{{ $t('title.listOfSla') }}</div>
            <div class="margin-20-rl division box-division-margin background-darkcyan"></div>
            <router-link :to="'/new-sla'">
              <a>
                <div class="f-14-300-darkcyan cursor-pointer">
                  {{ $t('title.newSla') }}
                  <img
                    class="padding-5-l icon-position-2"
                    src="/static/icons/business_center_blue.svg"
                  />
                </div>
              </a>
            </router-link>
          </div>
        </div>
        <div class="flex-full flex-column-972 margin-30-t">
          <div class="box div-default list-tickets">
            <div class="flex header-list-tickets" v-if="!_isUser()">
              <div class="flex flex-justify-space-around width-100">
                <div class="flex flex-column width-50">
                  <div
                    class="f-12-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfSlas.header.totalSlas') }}</div>
                  <div class="f-22-300-gray text-center">
                    {{ this.header.slas}}
                    <img
                      class="icon-position icon-size icon-position-2"
                      src="/static/icons/checked.svg"
                    />
                  </div>
                </div>
                <div class="division background-gray-dark division-margin"></div>
                <div class="flex flex-column width-50">
                  <div
                    class="f-12-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfSlas.header.activeSlas') }}</div>
                  <div class="f-22-300-gray text-center">
                    {{ this.header.active}}
                    <img
                      class="icon-position icon-size icon-position-2"
                      src="/static/icons/checked.svg"
                    />
                  </div>
                </div>
                <div class="division background-gray-dark"></div>
                <div class="flex flex-column width-50">
                  <div
                    class="f-12-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfSlas.header.inactiveSlas') }}</div>
                  <div class="f-22-300-gray text-center">
                    {{ this.header.inactive}}
                    <img
                      class="icon-position icon-size icon-position-2"
                      src="/static/icons/error.svg"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-full"></div>
            <div class="box-padding">
              <div class="flex-full padding-5-t" v-if="_isUser()"></div>
              <div class="flex-full flex-space-between flex-column-445">
                <div class="margin-b-445">
                  <img src="/static/icons/list.svg" class />
                  <span class="f-12-300-gray f-10-300-gray uppercase">{{ $t('title.listOfSlas') }}</span>
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
                      :placeholder="$t('listOfSlas.list.search')"
                    />
                  </div>
                </div>
              </div>
              <slas :query="sendQuery"></slas>
            </div>
          </div>
          <div class="widgets">
            <!-- <jira-actions></jira-actions>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import Prescription from "src/backend/models/Prescription.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";
import Sla from "../../backend/models/Sla";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  components: {
    VueHotelDatepicker
  },

  name: "ListOfSlas",

  computed: {
    sendQuery() {
      return { query: this.searchQuery };
    }
  },

  created() {
    Sla.getHeader()
      .then(s => (this.header = s.data))
      .catch();
  },

  methods: {},
  data() {
    return {
      quertString: "",
      informationsByUser: [],
      searchQuery: "",
      toggle: false,
      channels: this.channels,
      states: this.states,
      header: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.btn-red {
  height: 2.5rem;
  padding: 0px 10px 0 18px;
  font-size: 12px;
}
</style>

<style lang="scss">
.vhd-input {
  font-size: 0.85rem !important;
  color: #9a9a9a !important;
  font-weight: 500 !important;
  font-family: Roboto !important;
  min-width: 200px !important;
  height: 30px;
  border-radius: 5px;
  background-color: #ffffff;
  background-size: cover;
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border: none;
  box-sizing: border-box;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-repeat: no-repeat;
  padding: 0 15px 0 15px;
  min-width: 200px;
  cursor: pointer;
}

.icon-position-2 {
  margin-top: 0rem;
  margin-left: 0.4rem;
  margin-right: -0.3rem;
  margin-bottom: 0.2rem;
}
</style>
