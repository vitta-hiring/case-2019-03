<template>
  <div id="container">
    <div id="content-master">
      <div class="flex-full margin-20-tb flex-space-between">
        <div class="box-shadow">
          <div class="f-18-100-gray">{{ $t('title.listOfPriorities') }}</div>
          <div class="margin-20-rl division background-darkcyan"></div>
          <router-link :to="'/new-priority'">
            <a>
              <div class="f-14-300-darkcyan cursor-pointer">
                {{ $t('title.newPriority') }}
                <img
                  class="padding-5-l icon-position"
                  src="/static/icons/ticketCyanBig.svg"
                />
              </div>
            </a>
          </router-link>
        </div>
      </div>
      <div class="flex-full flex-column-972 margin-30-t">
        <div class="box div-default list-tickets">
          <div class="flex header-list-tickets">
            <div class="flex flex-justify-space-around width-100">
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan padding-5-b text-center"
                >{{ $t('listOfPriorities.header.totalPriorities') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ infoPriorities.priorities }}
                  <img
                    src="/static/icons/tickets.svg"
                    class="vertical-align-initial"
                  />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan padding-5-b text-center"
                >{{ $t('listOfPriorities.header.activePriorities') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ infoPriorities.active }}
                  <img
                    src="/static/icons/departamentTickets.svg"
                    class="vertical-align-initial"
                  />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan padding-5-b text-center"
                >{{ $t('listOfPriorities.header.inactivePriorities') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ infoPriorities.inactive }}
                  <img
                    src="/static/icons/close.svg"
                    class="vertical-align-initial"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="box-padding">
            <div class="flex-full flex-space-between">
              <div>
                <img src="/static/icons/list.svg" />
                <span class="f-12-300-gray f-10-300-gray">{{ $t('title.listOfPriorities') }}</span>
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
                    :placeholder="$t('listOfPriorities.list.search')"
                  />
                </div>
              </div>
            </div>
            <prioritys :query="sendQuery"></prioritys>
          </div>
        </div>
        <div class="widgets">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Priority from "src/backend/models/Priority.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListPriorities",
  
  data() {
    return {
      infoPriorities: {},
      searchQuery: ""
    };
  },
  computed: {
    sendQuery() {
      return { query: this.searchQuery };
    }
  },
  created() {
    Priority.getHeader()
      .then(result => {
        this.infoPriorities = result.data;
      })
      .catch(e => {});
  }
};
</script>
