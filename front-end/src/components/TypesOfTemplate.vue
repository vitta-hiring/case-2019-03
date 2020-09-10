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
    v-if="getTypesOfTemplates"
    v-model="typeOfTemplate"
    :allow-empty="false"
    :block-keys="['Delete']"
    label="name"
    track-by="name"
    @ticket="addTicket"
    :options="this.$store.getters.getTypesOfTemplates"
    :multiple="false"
    :taggable="false"
    @input="changeObserver()"
    :placeholder="$t('templates.selectTypeOfTemplate')"
  >
    <template slot="afterList" v-if="!ticketQuery.last">
      <div class="loadMore f-12-500-white" @click="getTickets(true)">{{$t('newTicket.loadMore')}}</div>
    </template>
    <span slot="noResult">{{$t('multiselect.noElementsFound')}}</span>
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Template from "src/backend/models/Template";

export default {
  watch: {
    "ticketQuery.query": function() {
      this.ticketQuery.page = 0;
      this.tickets = [];
      this.asyncFind();
    }
  },

  data() {
    return {
      ticketQuery: {
        query: "",
        companyId: "",
        page: 0,
        numberOfElements: 30
      },
      tickets: [],
      typeOfTemplate: [],
      isLoading: false
    };
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    }
  },

  beforeDestroy() {
    this.empty = [];
    // this.$store.commit("setClosedTicketsPerCompany", this.empty);
    // this.$store.commit("setTicketIdFrom", "");
    // this.$store.commit("setTicketIdInto", "");
  },

  methods: {
    addTicket(addTicket) {
      const ticket = {
        description: addTicket
      };

      this.ticket.push(ticket);
    },

    asyncFind(query) {
      //   this.isLoading = true;
      //   Ticket.getClosedTicketsPerCompany(0, query).then(response => {
      //     this.tickets = response.data.content;
      //     this.isLoading = false;
      //   });
    },

    changeObserver() {
      this.typeOfTemplate.keys.forEach(key => {
        if (key.name == "state") {
          key.name = "status";
        }
      });
      this.$store.commit("setTypeOfTemplate", this.typeOfTemplate);
      //   this.ticket ? this.$store.commit("setTicketIdFrom", this.ticket.id) : this.$store.commit("setTicketIdFrom", "");
      //   return this.tickets;
    },

    async getTypesOfTemplates() {
      // Template.getTypesOfTemplates(){

      // }
      Template.getTypesOfTemplates()
        .then(result => {
          this._getLoading(false);
          // this.$router.replace({
          //   params: { id: result.data.content[0].id },
          // });
          this.$store.commit("setTypesOfTemplates", result.data);
          if (this.$store.getters.getTypeOfTemplate) {
            result.data.forEach(element => {
              if (element.name == this.$store.getters.getTypeOfTemplate.name) {
                element.keys.forEach(key => {
                  if (key.name == "state") {
                    key.name = "status";
                  }
                });
                this.$store.commit("setTypeOfTemplate", element);
                this.typeOfTemplate = element;
              }
            });
          }
          // this.$store.commit("setTemplate", result.data);
          // this.template = result.data;
          // this.$store.commit("setTemplate", result.data);
          // this.getRules();
        })
        .catch(e => {
          this._getLoading(false);
        });

      // this.typeOfTemplate = this.$store.getters.getTypeOfTemplate
      //   ? this.$store.getters.getTypeOfTemplate
      //   : "";
      // this.$store.getters.getTypesOfTemplates.lenght > 0
      //   ? this.$store.getters.getTypesOfTemplates.forEach(element => {
      //       if (element.id != this.$store.getters.getTicketIdInto) {
      //         this.tickets.push(element);
      //       }
      //     })
      //   : (this.ticket = []);
    }
  },
  created() {
    this.getTypesOfTemplates();
  }
};
</script>
<style>
</style>
