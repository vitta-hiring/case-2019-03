<template>
  <div class="new-div-hover">
    <form class @submit.prevent="splitTicket">
      <div class>
        <!-- TITLE -->
        <div class="flex flex-justify-center margin-25-trbl">
          <span class="f-14-500-darkcyan">{{$t('editTicket.answer.splitTicketUP')}}</span>
        </div>
        <!-- TITLE-END -->
        {{ revertError }}
        <!-- SUBJECT -->
        <div class="flex width-85 flex-tlbr">
          <label
            class="width-100 f-12-500-gray-light"
            :class="{ 'color-red': error }"
          >{{ $t('newTicket.form.ticket.subjectOfTheNewTicket') }} *</label>
        </div>
        <div class="flex width-85 flex-tlbr margin-10-t">
          {{ refresh }}
          <textarea
            name="subject"
            v-validate="'required'"
            v-model="subject"
            class="textarea-ticket input-style f-12-300-gray width-100 input-width-80"
            :placeholder="$t('newTicket.form.ticket.typeSubjectOfTheNewTicket')"
          ></textarea>
        </div>
        <!-- SUBJECT-END -->

        <!-- DESCRIPTION -->
        <div>
          <div class="flex width-85 flex-tlbr margin-top-1">
            <label
              class="width-100 f-12-500-gray-light"
              :class="{ 'color-red': error }"
            >{{ $t('newTicket.form.ticket.description') }}</label>
          </div>
          <div class="width-85 flex-tlbr">
            <ckeditor :editor="editor" v-model="newAnswerDescription" :config="editorConfig"></ckeditor>
          </div>
        </div>
        <!-- DESCRIPTION-END -->

        <!-- BUTTONS -->
        <div class="flex-full flex flex-justify-end margin-15-tb">
          <div class="padding-20-r">
            <button
              class="btn-medium btn-cancel font-bold"
              @click.prevent="closeModal()"
            >{{ $t('cancel') }}</button>
          </div>
          <div class="padding-42-r">
            <button class="btn-medium btn-blue" type="submit">{{ $t('split') }}</button>
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
  methods: {
    closeModal() {
      this.$emit("close");
    },

    splitTicket() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this._getLoading(true);
          this.split.description = this.newAnswerDescription;
          this.split.subject = this.subject;
          Ticket.split(this.split)
            .then(result => {
              this.newTicketId = result.data;
              this.$toaster.success(this.$t("swal.success"));
              this._getLoading(false);

              this.$swal
                .fire({
                  title: this.$t("editTicket.answer.redirectSplitTicket"),
                  type: "warning",
                  showConfirmButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.$t("yes"),
                  cancelButtonText: this.$t("no"),
                  showCancelButton: true
                })
                .then(result => {
                  if (result.value) {
                    this.$router.push({
                      path: `/edit-ticket/${this.newTicketId}`
                    });
                  }
                });
              this.closeModal();
            })
            .catch(e => {
              this._getLoading(false);
              this._errorHandler(e);
            });
        } else {
          this._getLoading(false);

          this.error = true;
          this.$toaster.error(this.$t("swal.errorFields"));
        }
      });
    }
  },

  computed: {
    revertError() {
      this.split ? (this.split.subject ? (this.error = false) : "") : "";
    },
    refresh() {
      this.$store.getters.getSplit.split
        ? (this.newAnswerDescription = this.$store.getters.getSplit.split.newAnswerDescription)
        : "";
      this.$store.getters.getSplit.split
        ? (this.split = this.$store.getters.getSplit.split)
        : "";
    }
  },

  data: function() {
    return {
      subject: "",
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
      split: this.$store.getters.getSplit.split,
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

.margin-top-1 {
  margin-top: 1rem;
}
</style>
