<template>
  <div id="container">
    <div id="content-master">
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="f-18-100-gray">{{ $t('title.listOfDepartments') }}</div>
          <div class="margin-20-rl division background-darkcyan" v-if="_isAdmin()"></div>
          <router-link :to="'/new-department'" v-if="_isAdmin()">
            <a>
              <div class="f-14-300-darkcyan cursor-pointer">
                {{ $t('title.newDepartment') }}
                <img
                  class="padding-5-l icon-position"
                  src="/static/icons/business_center_blue.svg"
                />
              </div>
            </a>
          </router-link>
        </div>
      </div>
      <div class="flex-full margin-30-t">
        <div class="box div-default list-tickets">
          <div class="flex header-list-tickets" v-if="!_isUser()">
            <div class="flex flex-justify-space-around width-100">
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('listOfDepartments.header.totalDepartaments') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ infoDepartments.departments }}
                  <img
                    src="/static/icons/tickets.svg"
                    class="vertical-align-initial"
                  />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center">
                  {{ $t('listOfDepartments.header.activeDepartaments') }}
                  <div class="f-22-300-gray text-center">
                    {{ infoDepartments.active }}
                    <img
                      src="/static/icons/departamentTickets.svg"
                      class="vertical-align-initial"
                    />
                  </div>
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center">
                  {{ $t('listOfDepartments.header.inactiveDepartaments') }}
                  <div class="f-22-300-gray text-center">
                    {{ infoDepartments.inactive }}
                    <img
                      src="/static/icons/close.svg"
                      class="vertical-align-initial"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-padding">
            <div class="flex-full flex-space-between">
              <div>
                <img src="/static/icons/list.svg" />
                <span class="f-12-300-gray f-10-300-gray">{{ $t('title.listOfDepartments') }}</span>
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
                    :placeholder="$t('listOfDepartments.list.search')"
                  />
                </div>
              </div>
            </div>
          </div>
          <departments :query="sendQuery"></departments>
        </div>
        <div class="widgets">
          <!-- <jira-actions></jira-actions>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Department from "src/backend/models/Department.js";
import Prescription from "src/backend/models/Prescription.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListDepartments",

  components: {
    VueHotelDatepicker
  },

  computed: {
    sendQuery() {
      return { query: this.searchQuery };
    }
  },

  created() {
    Department.getHeader()
      .then(s => {
        this.infoDepartments = s.data;
      })
      .catch();
  },
  data() {
    return {
      infoDepartments: {},
      searchQuery: ""
    };
  }
};
</script>
