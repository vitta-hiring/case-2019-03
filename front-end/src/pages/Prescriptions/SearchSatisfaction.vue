<template>
  <div id="main">
    <div id="container-login">
      <div id="container">
        <div id="content-master">
          <div v-if="resultSearch">
            <div
              id="div-validate"
              class="flex-full flex-column f-22-300-gray flex-align-items-center padding-100-tb"
            >
              <div class="width-70 text-center padding-10-b">
                {{ $t('searchSatisfaction.yourOpinion') }}
                <span
                  class="color-green"
                >{{ $t('searchSatisfaction.success') }}!</span>
              </div>
              <div class="padding-30-t width-70 text-center f-18-100-gray">
                <div class="padding-20-b">{{ $t('searchSatisfaction.thanks') }}.</div>
                {{ $t('searchSatisfaction.opinion') }}
              </div>
            </div>
          </div>
          <div v-else>
            <div
              id="div-validate"
              class="flex-full flex-column f-22-300-gray flex-align-items-center padding-100-tb"
            >
              <div class="width-70 text-center padding-10-b">
                <span class="color-red">{{ $t('searchSatisfaction.sorry') }}</span>
                <!-- <span v-html="messageError" v-if="messageError"></span> -->
                <span v-if="messageError">{{ $t(messageError) }}</span>
                <span v-else>&nbsp;{{ $t('searchSatisfaction.tryLater') }}</span>
              </div>
              <div
                class="padding-30-t width-70 text-center f-18-100-gray"
              >{{ $t('searchSatisfaction.opinion') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Prescription from "@/backend/models/Prescription.js";
import store from "@/backend/store";

export default {
  name: "SearchSatisfaction",

  created() {
    this.$whereShouldIPoint;

    let params = this.$route.query;

    if (params.repply && params.hash) {
      this.value.id = params.repply;

      this._getLoading(true);
      Ticket.searchSatisfaction(params.hash, this.value)
        .then(result => {
          let locale = result.data.locale ? result.data.locale : "pt-br";
          this._setLocale(locale);
          if (result.data.message === true) {
            this.resultSearch = true;
          } else {
            this.resultSearch = false;
            this.messageError = result.data.error;
          }
          this._getLoading(false);
        })
        .catch(e => {
          this._getLoading(false);
        });
    }
  },

  data() {
    return {
      resultSearch: false,
      messageError: undefined,
      value: {
        id: undefined
      }
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/login";
</style>

<style scoped>
.background-navbar {
  display: none !important;
}

.color-green {
  color: #28a745;
  font-weight: bold;
}

#content-master {
  width: 40% !important;
}

#container {
  justify-content: center;
}
</style>
