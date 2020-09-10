<template>
  <div>
    <!-- NOTIFICATIONS -->
    <div
      class="flex-full"
      v-if="answer.typeHistory == 'NOTIFICATION'"
      style="display: inline-block"
    >
      <div class="flex title-message-history min-width-35 float-right">
        <img src="/static/icons/merge.svg" class="padding-10-r" />
        <!-- <span class="f-14-500-gray">AGENT-01 MERGED</span> &nbsp; this ticket with &nbsp; <span class="f-14-500-gray"> TK-FN-02</span> -->
        <span v-html="answer.notificationMessage" class="padding-10-r"></span>
        <img
          src="/static/icons/ticket.svg"
          tooltip.hover
          :title="$t('editTicket.answer.ticketAfterSplit')"
          v-if="answer.mergedId"
          @click="redirectMerge()"
          class="icon-size"
        />
      </div>
    </div>

    <!-- COMMENTS -->
    <div v-if="answer.typeHistory == 'ANSWER'">
      <!-- NOT PRIVATE -->
      <div
        class="flex-full box-shadow-hover padding-0-trbl background-white margin-3-tb"
        :class="{'split-selected': answer.splittedId}"
        v-if="answer.answerPrivateObservation == false"
      >
        <div class="flex-full">
          <div class="validation-none" v-if="answer.typeUser == 'USER'" style="min-height: 61px;"></div>
          <div class="validation-sucess" v-if="answer.typeUser != 'USER'" style="min-height: 61px;"></div>

          <div class="flex-full padding-15-trbl flex-align-items-center">
            <div class="min-width-25 f-14-500-gray flex">
              <span v-if="answer.typeUser == 'USER'">
                <img src="/static/icons/clientHistory.svg" class="padding-10-r" />
              </span>
              <span v-if="answer.typeUser != 'USER'">
                <img src="/static/icons/agent.svg" class="padding-10-r" />
              </span>
              <div class="padding-15-r f-14-500-gray">{{ answer.answerDisplayName }}</div>
            </div>

            <div class="flex flex-column width-85">
              <div class="flex flex-full flex-wrap">
                <div class="flex flex-column width-65">
                  <div class="private-obs" v-if="answer.answerStatus">
                    <div style="position: relative;">
                      <button
                        class="btn-private button-absolute-private-2"
                      >{{ answer.answerStatus }}</button>
                    </div>
                  </div>
                </div>
                <div class="width-80" v-html="answer.answerText" v-if="!answer.showFile"></div>
                <div v-else class="width-80">
                  <img src="/static/icons/upload.svg" class="padding-10-r" />
                  <a
                    class="f-12-500-blue-dark"
                    :href="answer.answerText"
                    target="_blank"
                  >{{$t('editTicket.answers.downloadFile')}}</a>
                </div>
                <div class="width-20 flex flex-column f-12-300-gray text-right">
                  <div>{{ this.$moment.utc(answer.createdAt).fromNow() }}</div>
                  <div class="f-12-300-gray-light padding-5-t" v-if="answer.chanelicon != null">
                    {{answer.channel}}
                    <img
                      :src="'/static/icons/channel/'+answer.chanelicon"
                      class="padding-5-l"
                    />
                  </div>
                </div>
                <div class="padding-10-t">
                  <div
                    class="padding-5-b width-100"
                    v-for="fileUpload in answer.answerUploadFiles"
                    :key="fileUpload.id"
                  >
                    <div
                      v-if="(/\.(gif|jpg|jpeg|tiff|png|webp)$/i).test(fileUpload.url)"
                      class="flex flex-column"
                    >
                      <div>
                        <img src="/static/icons/upload.svg" class="padding-10-r" />
                        <a
                          class="f-12-500-blue-dark"
                          :href="fileUpload.url"
                          target="_blank"
                        >{{ fileUpload.nameDocument }}</a>
                      </div>
                      <div class="width-100 padding-5-t">
                        <img :src="fileUpload.url" class="img-fluid img-thumbnail" />
                      </div>
                    </div>
                    <div v-else>
                      <img src="/static/icons/upload.svg" class="padding-10-r" />
                      <a
                        class="f-12-500-blue-dark"
                        :href="fileUpload.url"
                        target="_blank"
                      >{{ fileUpload.nameDocument }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/static/icons/split.svg"
          tooltip.hover
          :title="$t('editTicket.answer.split')"
          v-if="!answer.splittedId"
          @click="makeSplit()"
          class="padding-10-r icon-size"
        />
        <img
          src="/static/icons/ticket.svg"
          tooltip.hover
          :title="$t('editTicket.answer.ticketAfterSplit')"
          v-if="answer.splittedId"
          @click="redirectSplit()"
          class="padding-10-r icon-size"
        />
      </div>

      <!-- PRIVATE -->
      <div
        class="flex-full box-shadow-hover padding-0-trbl background-white margin-2-tb"
        :class="{'split-selected': answer.splittedId}"
        v-if="answer.answerPrivateObservation == true && answer.TypeUser != 'USER'"
      >
        <div class="flex-full">
          <div class="validation-none" v-if="answer.typeUser == 'USER'" style="min-height: 61px;"></div>
          <div class="validation-sucess" v-if="answer.typeUser != 'USER'" style="min-height: 61px;"></div>

          <div class="flex-full padding-15-trbl flex-align-items-center">
            <div class="min-width-25 f-14-500-gray flex">
              <span v-if="answer.typeUser == 'USER'">
                <img src="/static/icons/clientHistory.svg" class="padding-10-r" />
              </span>
              <span v-if="answer.typeUser != 'USER'">
                <img src="/static/icons/agent.svg" class="padding-10-r" />
              </span>
              <div class="padding-15-r f-14-500-gray">{{ answer.answerDisplayName }}</div>
            </div>

            <div class="flex flex-column width-75">
              <div class="private-obs" v-if="answer.answerPrivateObservation == true">
                <div style="position: relative;">
                  <button class="btn-private button-absolute-private">
                    <img src="/static/icons/private.svg" class="padding-4-r" />
                    {{$t('editTicket.privateObservation')}}
                  </button>
                  <button
                    disabled
                    v-if="answer.splittedId"
                    class="btn-private button-absolute-private"
                  >
                    <img src="/static/icons/private.svg" class="padding-4-r" />
                    {{$t('editTicket.privateObservation')}}
                  </button>
                </div>
                <div
                  class="flex-full box-shadow padding-15-t border-private-obs margin-15-t"
                  style="padding: 5px 0 5px 20px !important;"
                >
                  <div
                    class="flex f-12-500-gray-medium padding-25-t padding-20-b width-100 flex-full flex-wrap"
                  >
                    <div
                      class="width-90"
                      style="word-wrap: break-word; margin-top: 1rem;"
                      v-html="answer.answerText"
                    ></div>
                    <div
                      class="width-10 f-12-300-gray"
                    >{{ this.$moment.utc(answer.createdAt).fromNow() }}</div>
                    <div class="padding-10-t">
                      <div
                        class="padding-5-b width-100"
                        v-for="fileUpload in answer.answerUploadFiles"
                        :key="fileUpload.id"
                      >
                        <div
                          v-if="(/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileUpload.url)"
                          class="flex flex-column"
                        >
                          <div>
                            <img src="/static/icons/upload.svg" class="padding-10-r" />
                            <a
                              class="f-12-500-blue-dark"
                              :href="fileUpload.url"
                              target="_blank"
                            >{{ fileUpload.nameDocument }}</a>
                          </div>
                          <div class="width-100 padding-5-t">
                            <img :src="fileUpload.url" class="img-fluid" />
                          </div>
                        </div>
                        <div v-else>
                          <img src="/static/icons/upload.svg" class="padding-10-r" />
                          <a
                            class="f-12-500-blue-dark"
                            :href="fileUpload.url"
                            target="_blank"
                          >{{ fileUpload.nameDocument }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/static/icons/split.svg"
          tooltip.hover
          :title="$t('editTicket.answer.split')"
          v-if="!answer.splittedId"
          @click="makeSplit()"
          class="padding-10-r icon-size"
        />
        <img
          src="/static/icons/ticket.svg"
          tooltip.hover
          :title="$t('editTicket.answer.ticketAfterSplit')"
          v-if="answer.splittedId"
          @click="redirectSplit()"
          class="padding-10-r icon-size"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { MakeSplit } from "src/components";

export default {
  data() {
    return {
      showMakeSplit: false,
      split: {
        ticketId: this.answer.ticketId,
        answerId: this.answer.splittedId,
        newAnswerDescription: this.answer.answerText,
        subject: ""
      }
    };
  },

  created() {
    //this.answer ? (this.answer.answerText ? this.configTextStorage() : "") : "";
  },

  computed: {},

  methods: {
    configTextStorage() {
      var string = this.answer.answerText,
        substring = "storage/file";

      string.includes(substring) ? (this.answer.showFile = true) : "";
    },

    splitTicket(ticket) {},

    mergeTicket(ticket) {},

    redirectSplit() {
      this.$router.push({
        path: `/edit-ticket/${this.answer.splittedId}`
      });
    },

    redirectMerge() {
      this.$router.push({
        path: `/edit-ticket/${this.answer.mergedId}`
      });
    },

    makeSplit() {
      this.$swal
        .fire({
          title: this.$t("editTicket.answer.confirmSplitTicket"),
          type: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.$t("yes"),
          cancelButtonText: this.$t("no"),
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            this.showMakeSplit = true;
            this.split = {
              ticketId: parseInt(this.answer.ticketId),
              answerId: this.answer.answerId,
              newAnswerDescription: this.answer.answerText,
              subject: ""
            };
            this.$store.commit("setSplit", this.split);
            this.$modal.show(
              MakeSplit,
              {
                text: "This text is passed as a property"
              },
              {
                height: "auto"
              },
              {
                "before-close": event => {
                  this.$emit("refreshComments");
                }
              }
            );
          }
        });
    }
  },

  props: {
    answer: {
      type: Object
    }
  }
};
</script>

<style scoped>
.button-absolute-private-2 {
  margin-bottom: 0.5rem;
  margin-left: 0rem;
  position: relative;
  padding: 10px;
}

.split-selected {
  text-decoration: None !important;
  background: #ccc;
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
