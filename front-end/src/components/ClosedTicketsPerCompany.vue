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
    v-if="tickets"
    v-model="ticket"
    :block-keys="['Delete']"
    label="subject"
    track-by="subject"
    @ticket="addTicket"
    :options="getTickets"
    :multiple="false"
    :taggable="false"
    @input="changeObserver()"
    :placeholder="$t('newTicket.form.issue.selectTicket')"
  >
    <template slot="afterList" v-if="!ticketQuery.last">
      <div class="loadMore f-12-500-white" @click="getTickets(true)">{{$t('newTicket.loadMore')}}</div>
    </template>
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Prescription from "@/backend/models/Prescription.js";

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
      ticket: [],
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
    this.$store.commit("setClosedTicketsPerCompany", this.empty);
    this.$store.commit("setTicketIdFrom", "");
    this.$store.commit("setTicketIdInto", "");
  },

  methods: {
    addTicket(addTicket) {
      const ticket = {
        description: addTicket
      };

      this.ticket.push(ticket);
    },

    asyncFind(query) {
      this.isLoading = true;
      Ticket.getClosedTicketsPerCompany(0, query).then(response => {
        this.tickets = response.data.content;
        this.isLoading = false;
      });
    },

    changeObserver() {
      this.ticket ? this.$store.commit("setTicketIdFrom", this.ticket.id) : this.$store.commit("setTicketIdFrom", "");
      return this.tickets;
    },

    async updateTickets() {
      this.$store.getters.getClosedTicketsPerCompany.lenght > 0
        ? this.$store.getters.getClosedTicketsPerCompany.forEach(element => {
            if (element.id != this.$store.getters.getTicketIdInto) {
              this.tickets.push(element);
            }
          })
        : (this.ticket = []);
    },

    async populatedOptionsTickets(loadMore) {
      this._getLoading(true);
      this.searchingUsers = true;
      if (loadMore) this.ticketQuery.page++;
      await Ticket.getClosedTicketsPerCompany()
        .then(result => {
          result.data.content.forEach(element => {
            if (element.id != this.$store.getters.getTicketIdInto) {
              this.tickets.push(element);
            }
          });
          this.ticketQuery.last = result.data.last;
          this.searchingTickets = false;
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
        });
    }
  },
  created() {
    this.populatedOptionsTickets(true);
    this.updateTickets();
  },
  computed : {
    getTickets() {
      return this.tickets.filter(value => value.id != this.$store.getters.getTicketIdInto);
    }
  }
};
</script>
<style>
</style>
