<template>
  <multiselect
    :searchable="true"
    :loading="isLoading"
    :internal-search="true"
    :clear-on-select="true"
    :close-on-select="true"
    :selectLabel="$t('multiselect.select')"
    :selectedLabel="$t('multiselect.selected')"
    :deselectLabel="$t('multiselect.pressRemove')"
    :tagPlaceholder="$t('multiselect.pressCreate')"
    @search-change="asyncFind"
    v-if="this.$store.getters.getChannelsTM2"
    v-model="channelTM2"
    :allow-empty="false"
    :block-keys="['Delete']"
    label="name"
    track-by="name"
    :options="this.$store.getters.getChannelsTM2"
    :multiple="false"
    :taggable="false"
    @input="changeObserver()"
    :placeholder="$t('templates.selectChannel')"
  >
    {{ last }}
    <template slot="afterList" v-if="last == false">
      <div
        class="loadMore f-12-500-white"
        @click="refreshChannelsTM2(undefined, true)"
      >{{$t('newTicket.loadMore')}}</div>
    </template>
    <span slot="noResult">{{$t('multiselect.noElementsFound')}}</span>
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Channel from "src/backend/models/Channel";

export default {
  watch: {
    "channelQuery.query": function(next, curr) {
      this.channelQuery.page = 0;
      this.channelsTM2 = [];
    }
  },

  data() {
    return {
      channelQuery: {
        query: "",
        page: 0,
        size: 10
      },
      last: false,
      first: undefined,
      initList: undefined,
      channelTM2: [],
      channelsTM2: [],
      isLoading: false
    };
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    },
    channel: {
      type: Object,
      default: undefined
    }
  },

  beforeDestroy() {},

  methods: {
    asyncFind(query) {
      query
        ? this.refreshChannelsTM2(query, undefined)
        : (this.channelQuery = {
            query: "",
            page: 0,
            size: 10
          }),
        this.refreshChannelsTM2(undefined, undefined);
    },

    changeObserver() {
      this.$store.commit(
        "setChannelTM2",
        this.channelTM2 ? this.channelTM2 : undefined
      );
    },

    refreshChannelsTM2(query, loadMore) {
      loadMore ? this.channelQuery.page++ : "";
      query ? (this.channelQuery.query = query) : "";
      this.isLoading = true;
      Channel.getChannelsTM2(this.channelQuery ? this.channelQuery : "").then(
        response => {
          this.isLoading = false;
          loadMore
            ? (this.channelsTM2 = this.channelsTM2.concat(
                response.data.content
              ))
            : response.data.content.length > 0
            ? (this.channelsTM2 = response.data.content)
            : "";
          this.last = response.data.last;
          this.$store.commit("setChannelsTM2", this.channelsTM2);
        }
      );
      this.isLoading = false;
    },

    async getChannelsTM2() {
      if (this.$store.getters.getChannelTM2) {
        this.channelTM2 = this.$store.getters.getChannelTM2;
        this.refreshChannelsTM2(undefined, undefined);
      } else if (!this.$store.getters.getChannelsTM2) {
        this.refreshChannelsTM2(undefined, undefined);
      }
    }
  },
  created() {
    this.getChannelsTM2();
  }
};
</script>
<style scoped>
.loadMore {
  background-color: #0097a7;
  justify-content: center;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.loadMore:hover {
  background-color: #e6e6e6;
  color: #35495e;
  font-weight: 700;
}
</style>

</style>
