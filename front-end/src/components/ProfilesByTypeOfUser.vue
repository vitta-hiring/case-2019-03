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
    v-if="this.$store.getters.getProfilesByTypeOfUser"
    v-model="profileByTypeOfUser"
    :allow-empty="false"
    :block-keys="['Delete']"
    label="name"
    track-by="name"
    :options="this.$store.getters.getProfilesByTypeOfUser"
    :multiple="false"
    :taggable="false"
    @input="changeObserver()"
    :placeholder="$t('newUser.select.profile')"
    :disabled="isTm2"
  >
    {{ last }}
    <template slot="afterList" v-if="last == false">
      <div
        class="loadMore f-12-500-white"
        @click="refreshProfilesByTypeOfUser(undefined, true)"
      >{{$t('newTicket.loadMore')}}</div>
    </template>
    <span slot="noResult">{{$t('multiselect.noElementsFound')}}</span>
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Authority from "src/backend/models/Authority";

export default {
  watch: {
    "profileQuery.query": function(next, curr) {
      this.profileQuery.page = 0;
      this.profilesByTypeOfUser = [];
    }
  },

  data() {
    return {
      profileQuery: {
        type: this.userType,
        active: true,
        page: 0,
        size: 10,
        query: ""
      },
      last: false,
      first: undefined,
      initList: undefined,
      profileByTypeOfUser: [],
      profilesByTypeOfUser: [],
      isLoading: false
    };
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      default: undefined
    },
    isTm2: {
      type: Boolean,
       default : false
    },
    profile: {
      type: Object,
      default: undefined
    }
  },

  beforeDestroy() {},

  methods: {
    asyncFind(query) {
      query
        ? this.refreshProfilesByTypeOfUser(query, undefined)
        : (this.profileQuery = {
            type: this.userType,
            query: "",
            page: 0,
            size: 10
          }),
        this.refreshProfilesByTypeOfUser(undefined, undefined);
    },

    changeObserver() {
      this.$store.commit(
        "setProfileByTypeOfUser",
        this.profileByTypeOfUser ? this.profileByTypeOfUser : undefined
      );
    },

    refreshProfilesByTypeOfUser(query, loadMore) {
      loadMore ? this.profileQuery.page++ : "";
      query ? (this.profileQuery.query = query) : "";
      this.isLoading = true;
      Authority.get(this.profileQuery ? this.profileQuery : "").then(
        response => {
          this.isLoading = false;
          loadMore
            ? (this.profilesByTypeOfUser = this.profilesByTypeOfUser.concat(
                response.data.content
              ))
            : response.data.content.length > 0
            ? (this.profilesByTypeOfUser = response.data.content)
            : "";
          this.last = response.data.last;
          this.$store.commit(
            "setProfilesByTypeOfUser",
            this.profilesByTypeOfUser
          );
        }
      );
      this.isLoading = false;
    },

    async getProfilesByTypeOfUser() {
      this.profileByTypeOfUser = this.$store.getters.getProfileByTypeOfUser
        ? this.$store.getters.getProfileByTypeOfUser
        : "";
      this.$store.getters.getProfilesByTypeOfUser
        ? ""
        : this.refreshProfilesByTypeOfUser(undefined, undefined);
    }
  },
  created() {
    this.$store.commit("setProfilesByTypeOfUser", undefined);
    // this.$store.commit("setProfileByTypeOfUser", undefined);
    this.getProfilesByTypeOfUser();
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
