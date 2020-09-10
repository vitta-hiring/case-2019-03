  <template>
  <div>
    <div id="container">
      <div id="content-master">
        <div class="flex-full margin-20-tb">
          <div class="box-shadow">
            <div class="f-18-100-gray">{{ $t('title.listOfClients') }}</div>
            <div class="margin-20-rl division box-division-margin background-darkcyan"></div>
            <router-link :to="'/new-client'">
              <a>
                <div class="f-14-300-darkcyan cursor-pointer">
                  {{ $t('title.newClient') }}
                  <img
                    class="padding-5-l icon-position icon-size icon-position-2"
                    src="/static/icons/target.svg"
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
                <div class="flex flex-column">
                  <div
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfClients.header.clientsCount') }}</div>
                  <div class="f-22-300-gray text-center">
                    {{ informationsByUser.company }}
                    <img
                      class="icon-position icon-size icon-position-2"
                      src="/static/icons/target.svg"
                    />
                  </div>
                </div>
                <div class="division background-gray-dark division-margin"></div>
                <div class="flex flex-column">
                  <div
                    class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b text-center"
                  >{{ $t('listOfClients.header.totalTickets') }}</div>
                  <div class="f-22-300-gray text-center">
                    {{ informationsByUser.tickets }}
                    <img
                      class="vertical-align-initial"
                      src="/static/icons/tickets.svg"
                    />
                  </div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/newTicket.svg" alt />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfClients.header.newTickets') }}</div>
                  </div>
                  <div class="f-12-300-gray text-center">{{ informationsByUser.newTickets }} Tickets</div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/review.svg" />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfClients.header.inReview') }}</div>
                  </div>
                  <div class="f-12-300-gray text-center">{{ informationsByUser.isReview }} Tickets</div>
                </div>
                <div class="flex flex-column">
                  <div class="flex flex-row">
                    <div class="list-nav-icon">
                      <img class="vertical-align-initial" src="/static/icons/aswered.svg" />
                    </div>
                    <div
                      class="f-12-500-darkcyan f-10-500-darkcyan padding-5-b"
                    >{{ $t('listOfClients.header.answered') }}</div>
                  </div>
                  <div class="f-12-300-gray text-center">{{ informationsByUser.answered }} Tickets</div>
                </div>
              </div>
            </div>

            <div class="box-padding">
              <div class="flex-full padding-5-t" v-if="_isUser()"></div>
              <div class="flex-full flex-space-between">
                <div>
                  <img src="/static/icons/list.svg" class />
                  <span class="f-12-300-gray">{{ $t('title.listOfClients') }}</span>
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
                      :placeholder="$t('listOfClients.list.search')"
                    />
                  </div>
                </div>
              </div>
              <clients :query="query"></clients>
            </div>
          </div>
          <div class="widgets">
            <!--<jira-actions></jira-actions>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "src/backend/models/User.js";
import Prescription from "src/backend/models/Prescription.js";
import State from "src/backend/models/State.js";
import Channel from "src/backend/models/Channel.js";
import Priority from "src/backend/models/Priority.js";
import Notification from "src/backend/models/Notification.js";
import VueHotelDatepicker from "@northwalker/vue-hotel-datepicker";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "ListOfClients",

  components: {
    VueHotelDatepicker
  },

  computed: {
    query() {
      return { query: this.searchQuery };
    }
  },

  created() {
    this.getNotifications();

    Ticket.informationsByUser()
      .then(s => {
        this.informationsByUser = { ...s.data };
      })
      .catch();
  },

  watch: {},

  methods: {
    getNotifications() {
      Notification.get(
        this.$store.getters.getUser.id,
        this.$store.getters.getUser.locale
      )
        .then(result => {
          this.notifications = result.data.content;
        })
        .catch(e => {});
    }
  },

  data() {
    return {
      dateStart: undefined,
      dateEnd: undefined,
      queryString: "",
      searchQuery: "",
      toggle: false,
      prioritys: this.prioritys,
      channels: this.channels,
      states: this.states,
      informationsByUser: {}
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

@media (max-width: 860px) {
  .list-client-scroll {
    min-width: 860px;
    overflow-x: scroll;
  }
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
  margin-left: 0rem;
  height: 24px;
}
</style>
