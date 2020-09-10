<template>
  <div class="new-div-hover">
    <form class @submit.prevent="mergeTicket">
      <div class>
        <!-- TITLE -->
        <div class="flex flex-justify-center margin-25-trbl">
          <span class="f-14-500-darkcyan">{{$t('editTicket.answer.mergeTicketUP')}}</span>
        </div>
        <!-- TITLE-END -->
        {{ revertError }}
        <!-- SELECT TICKER INTO MERGE -->
        <div class="width-100 margin-28-trbl">
          <div class="flex width flex-tlbr">
            <label
              class="width-100 f-12-500-gray-light"
              :class="{ 'color-red': error }"
            >{{ $t('newTicket.form.general.merge') }} *</label>
          </div>
          <closed-tickets-per-company class="margin-10-t" style="width: 500px"></closed-tickets-per-company>
          <img
            tooltip.hover
            :title="$t('newUser.registerNewUser')"
            v-if="company.id != ''"
            @click="addUser()"
            class="icon-size icon-position-2"
            src="/static/icons/add-user.svg"
          />
        </div>
        <!-- SELECT TICKER INTO MERGE - END-->

        <!-- BUTTONS -->
        <div class="flex-full flex flex-justify-end margin-15-tb">
          <div class="padding-20-r">
            <button
              class="btn-medium btn-cancel font-bold"
              @click.prevent="closeModal()"
            >{{ $t('cancel') }}</button>
          </div>
          <div class="padding-42-r">
            <button class="btn-medium btn-blue" type="submit">{{ $t('merge') }}</button>
          </div>
        </div>
        <!-- BUTTONS-END -->
      </div>
    </form>
  </div>
</template>

<script>
import Prescription from "@/backend/models/Prescription.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  created() {
    this.getTickets();
  },

  beforeDestroy() {
    this.clear();
  },

  methods: {
    clear() {
      this.empty = [];
      this.$store.commit("setClosedTicketsPerCompany", this.empty);
      this.$store.commit("setTicketIdFrom", "");
      this.$store.commit("setTicketIdInto", "");
      this.$store.commit("setRefresh", undefined);
    },

    selectedTicket(ticket) {
      if (Ticket.company && Ticket.company.id !== "") {
        this.company = Ticket.company;
      } else {
        this.company = { id: "" };
      }
    },

    findTickets(query) {
      this.ticketQuery.query = query;
    },

    refreshTickets() {
      this.findTickets();
    },

    getTickets() {
      this.$store.commit("setTicketIdFrom", "");
      let numberPag = this.$store.getters.getPagination;
      this._getLoading(true);
      // if (numberPag !== undefined && numberPag !== 1) {
      //   Ticket.get(numberPag)
      //     .then(result => {
      //       this.tickets = result.data.content;
      //       this.setPagination(result.data);
      //       this.pagination.currentPage -= 1;

      //       this._getLoading(false);
      //     })
      //     .catch(e => {
      //       this._getLoading(false);
      //     });
      // } else {
      //   Ticket.get("0")
      //     .then(result => {
      //       this.tickets = result.data.content;
      //       this.setPagination(result.data);
      //       this._getLoading(false);
      //     })
      //     .catch(e => {
      //       this._getLoading(false);
      //     });
      // }
    },

    closeModal() {
      this.$emit("close");
    },

    mergeTicket() {
      this.$validator.validateAll().then(result => {
        if (this.$store.getters.getTicketIdFrom != "") {
          this._getLoading(true);
          this.merge.ticketIdInto = this.$store.getters.getTicketIdInto;
          this.merge.ticketIdFrom = this.$store.getters.getTicketIdFrom;
          Ticket.merge(this.merge)
            .then(result => {
              this.newTicketId = result.data;
              this.$emit("mergeTicket", this.split);
              this.$toaster.success(this.$t("swal.successMerge"));
              this._getLoading(false);
              this.closeModal();
            })
            .catch(e => {
              this._getLoading(false);
              this._errorHandler(e);
            });
        } else {
          this._getLoading(false);
          this.$store.commit("setRefresh", true);
          this.$toaster.error(this.$t("swal.errorFields"));
        }
      });
    }
  },

  computed: {
    revertError() {
      this.$store.getters.getTicketIdFrom == "" &&
      this.$store.getters.getRefresh == true
        ? (this.error = true)
        : (this.error = false);
    },
    refresh() {
      this.$store.getters.getTicketIdFrom != ""
        ? (this.getTicketIdFrom = this.$store.getters.getTicketIdFrom)
        : "";
    }
  },

  watch: {
    "ticketQuery.query": function() {
      this.userQuery.page = 0;
      this.tickets = [];
      this.getTickets();
    }
  },

  data: function() {
    return {
      getTicketIdFrom: {},
      searchingTickets: false,
      company: {
        id: ""
      },
      tickeyQuery: {
        query: "",
        companyId: "",
        page: 0,
        numberOfElements: 30
      },
      subject: "",
      tickets: [],
      newAnswerDescription: "",
      editor: ClassicEditor,
      editorData: this.$t("editTicket.answers.typeYourAnswerLOWER"),
      editorConfig: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "|",
          "link",
          "undo",
          "redo",
          "blockQuote"
        ]
      },
      ticket: {
        name: ""
      },
      merge: {},
      error: false
    };
  }
};
</script>

<style scoped>
svg:hover #reassign {
  fill: #ff5a5f;
}

.marginCenter {
  margin: 0 auto;
}

.new-form-inline {
  -ms-flex-flow: row wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-flow: row wrap;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
}

.new-div-hover {
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  background-color: #ffffff;
  background-size: cover;
  transition: all 300ms;
}

.description {
  line-height: 1.5em;
}
</style>
