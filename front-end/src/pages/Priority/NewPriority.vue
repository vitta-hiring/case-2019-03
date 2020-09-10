<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListPriority">
            <img src="/static/icons/back.svg" />
          </div>
          <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
          <div>
            <span
              class="f-18-100-gray"
            >{{ edit ? $t('title.editPriority') : $t('title.newPriority') }}</span>
          </div>
        </div>
      </div>
      <!-- BODY -->
      <div class="flex-full flex-column-1125">
        <div class="box div-default list-tickets">
          <div class="box-padding">
            <!-- FORM -->
            <form @submit.prevent="validateBeforeSubmit">
              <div class="flex-full flex-column">
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>
                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newPriority.priority') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationGeneral + '.svg'"
                          />
                        </div>
                      </div>
                      <div class="flex width-80 w-card-70 w-card-50 flex-column">
                        <div class="flex flex-column width-80 input-width-100">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{ 'color-red': errors.has('priority.name') }"
                          >{{ $t('newPriority.label.name') }}</label>
                          <input
                            name="priority.name"
                            v-validate="'required'"
                            v-model="priority.name"
                            type="text"
                            :data-vv-as="'\'' + $t('newPriority.label.name')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newPriority.placeholder.name')"
                          />
                          <span class="color-red">{{errors.first('priority.name')}}</span>
                        </div>
                        <div class="flex flex-column width-50 input-width-100 padding-20-t">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('priority.active') }"
                          >{{ $t('newPriority.label.color') }} *</label>
                          <swatches
                            v-model="priority.color"
                            colors="material-dark"
                            swatch-size="32"
                            :trigger-style="{ height: '32px', width: '32px'}"
                            row-length="5"
                            shapes="circles"
                            class="padding-5-t"
                            :exceptions="alreadyUsedColors"
                          ></swatches>
                        </div>
                        <div class="flex flex-column width-50 input-width-100 padding-20-t">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('priority.state') }"
                          >{{ $t('newPriority.label.state') }} *</label>
                          <select
                            name="priority.state"
                            v-model="priority.active"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-50"
                          >
                            <option value>{{ $t('newPriority.select.state') }}</option>
                            <option value="true">{{ $t('state.active') }}</option>
                            <option value="false">{{ $t('state.inactive') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-full">
                  <hr class="hr-ticket" />
                </div>
                <!-- BUTTONS -->
                <div class="flex-full flex flex-justify-end">
                  <div class="padding-20-r">
                    <button class="btn-medium btn-cancel font-bold" @click="returnListPriorities">{{ $t('cancel') }}</button>
                  </div>
                  <div class="padding-20-r">
                    <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Priority from "src/backend/models/Priority.js";
import Swatches from "vue-swatches";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewPriority",

  data() {
    return {
      priority: {
        name: "",
        color: "",
        active: ""
      },
      priorityId: "",
      edit: false,
      alreadyUsedColors: []
    };
  },
  components: {
    Swatches
  },
  created() {
    if (this.$router.history.current.params.id) {
      this.priorityId = this.$router.history.current.params.id;
      this.edit = true;
      Priority.getById(this.priorityId)
        .then(result => {
          this.priority = result.data;
        })
        .catch(e => {});
    }
    Priority.getColors(this.priorityId)
      .then(result => {
        this.alreadyUsedColors = result.data;
      })
      .catch(e => {});
  },
  computed: {
    validationGeneral: function() {
      return this.validationClass(
        !this.errors.has("priority.name") &&
          !!this.priority.name &&
          !!this.priority.color  &&
          this.priority.active !== ""
      );
    }
  },
  methods: {
    returnListPriority() {
      this.$router.push({ name: "Lista de Prioridades" });
    },

    validateBeforeSubmit() {
      this._getLoading(true);

      this.$validator.validateAll().then(result => {
        if (result && !!this.priority.color) {
          const priority = { ...this.priority };
          if (this.edit) {
            Priority.put(priority)
              .then(result => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.priority")} ${this.$t(
                    "swal.titleSuccessFem"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.returnListPriority();
              })
              .catch(e => {
                this._getLoading(false);
                this.$swal.fire({
                  title: this.$t("swal.titleError"),
                  text: e.response.data.message,
                  type: "error",
                  showConfirmButton: true
                });
              });
          } else {
            Priority.post(priority)
              .then(result => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${this.$t("label.priority")} ${this.$t(
                    "swal.titleSuccessFem"
                  )}`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.returnListPriority();
              })
              .catch(e => {
                this._getLoading(false);
                this.$swal.fire({
                  title: this.$t("swal.titleError"),
                  text: e.response.data.message,
                  type: "error",
                  showConfirmButton: true
                });
              });
          }
        } else {
          this._getLoading(false);
          this.$swal.fire({
            title: this.$t("swal.titleError"),
            text: this.$t("swal.errorFields"),
            type: "error",
            showConfirmButton: true
          });
        }
      });
    },

    validationClass(boolean) {
      return boolean ? "validation-sucess" : "validation-fail";
    },

    returnListPriorities() {
      this.$router.push({ name: "Lista de Prioridades" });
    }
  }
};
</script>
