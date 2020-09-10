<template>
  <div id="container">
    <div id="content-master">
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="f-18-100-gray">{{ $t('templates.title') }}</div>
          <!-- <div class="margin-20-rl division background-darkcyan"></div>
          <router-link :to="'/new-template'">
            <a>
              <div class="f-14-300-darkcyan cursor-pointer">
                {{ $t('templates.newTemplate') }}
                <icon name="new-template" widthValue="27" />
              </div>
            </a>
          </router-link> -->
        </div>
      </div>
      <div class="flex-full margin-30-t">
        <div class="box div-default list-tickets">
          <div class="flex header-list-tickets">
            <div class="flex flex-justify-space-around width-100">
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('templates.header.totalTemplates') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ templateHeader.total }}
                  <icon name="list-templates" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('templates.header.activeTemplates') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ templateHeader.actives }}
                  <icon name="checked" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
              <div class="division background-gray-dark division-margin"></div>
              <div class="flex flex-column">
                <div
                  class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                >{{ $t('templates.header.inactiveTemplates') }}</div>
                <div class="f-22-300-gray text-center">
                  {{ templateHeader.inactives }}
                  <icon name="error" widthValue="28" marginTopValue="-0.4" />
                </div>
              </div>
            </div>
          </div>
          <div class="box-padding">
            <div class="flex-full flex-space-between">
              <div>
                <img src="/static/icons/list.svg" />
                <span class="f-12-300-gray f-10-300-gray">{{ $t('templates.title') }}</span>
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
                    :placeholder="$t('listOfProfiles.list.search')"
                  />
                </div>
              </div>
            </div>
          </div>
          <templates :query="sendQuery"></templates>
        </div>
        <div class="widgets">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Template from "src/backend/models/Template";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListTemplates",

  data() {
    return {
      templateHeader: [],
      searchQuery: ""
    };
  },
  created() {
    Template.getHeader()
      .then(result => {
        this.templateHeader = result.data;
      })
      .catch(e => {});
  },
  computed: {
    sendQuery() {
      return { query: this.searchQuery };
    }
  }
};
</script>
