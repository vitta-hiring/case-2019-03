<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListDepartments">
            <img src="/static/icons/back.svg">
          </div>
          <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
          <div>
            <span class="f-18-100-gray">
              {{ isEdit ? $t('title.editDepartment') : $t('title.newDepartment') }}
            </span>
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
                <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>
                    <div class="flex-full padding-15-trbl">
                      <div class="flex width-20 w-title-30 w-title-50 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newDepartment.attribute') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationGeneral + '.svg'">
                        </div>
                      </div>

                      <!-- Text : NAME -->
                      <div class="flex width-80 w-card-70 w-card-50 flex-column">
                        <div class="flex flex-column width-80 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{ 'color-red': errors.has('department.name') }">
                              {{ $t('newDepartment.label.name') }}
                          </label>
                          <input
                            name="department.name"
                            v-validate="'required'"
                            v-model="department.name"
                            type="text"
                            :data-vv-as="'\'' + $t('newDepartment.label.name')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newDepartment.placeholder.name')">
                            <span class="color-red">{{errors.first('departament.name')}}</span>
                        </div>

                        <!-- Text : EMAIL -->
                        <div class="flex width-80 w-card-70 w-card-50 flex-column">
                          <div class="flex flex-column width-80 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('department.email') }"
                            >{{ $t('newDepartment.label.email') }}</label>
                            <input
                              name="department.email"
                              v-validate="'email'"
                              v-model="department.email"
                              :data-vv-as="'\'' + $t('newDepartment.label.email')+ '\''"
                              type="email"
                              class="input-style f-12-300-gray width-100 margin-5-b"
                              :placeholder="$t('newDepartment.label.email')"
                            />
                            <span class="color-red">{{errors.first('department.email')}}</span>
                          </div>
                        </div>


                        <div class="flex flex-column width-100">
                          <label class="f-10-500-darkcyan">
                              {{ $t('newDepartment.label.levelServiceAgreement') }}
                          </label>
                          <div v-for="index in indexSlas" :key="index">
                            <label
                                class="f-10-500-darkcyan margin-20-t"
                                :class="{'color-red': errors.has( labelSlas[index] + '_deadline_hour' ) || errors.has( labelSlas[index] + '_deadline_min' ) || errors.has( labelSlas[index] + '_initial_hour' ) || errors.has( labelSlas[index] + '_initial_min' ) }">
                                  {{ department.slas[index].sla.name }} *
                              </label>
                            <div class="flex text-right flex-align-items-center margin-10-t padding-10-l" v-if="department.slas.length > 0">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has( labelSlas[index] + '_deadline_hour' ) || errors.has( labelSlas[index] + '_deadline_min' ) }">
                                  {{$t('newSla.form.sla.deadline')}} *
                              </label>
                              <div class="flex flex-column-780 width-50 sla-width">
                                <div class="col input-group input-group-sm padding-b-780">
                                  <input
                                    :name=" labelSlas[index] + '_deadline_hour' "
                                    v-model.number="slas[index].hourDeadline"
                                    v-validate="'required|numeric|between:0,999'"
                                    :data-vv-as="'\'' + $t('newSla.form.sla.deadline') + ' H \''"
                                    class="form-control"
                                    type="text">
                                  <div class="input-group-append">
                                    <span class="input-group-text">h</span>
                                  </div>
                                  <span class="color-red">{{errors.first(labelSlas[index] + '_deadline_hour')}}</span>
                                </div>
                                <div class="col input-group input-group-sm">
                                  <input
                                    :name=" labelSlas[index] + '_deadline_min'"
                                    v-model.number="slas[index].minDeadline"
                                    v-validate="'required|numeric|between:0,59'"
                                    :data-vv-as="'\'' + $t('newSla.form.sla.deadline') + ' MIN \''"
                                    class="form-control"
                                    type="text">
                                  <div class="input-group-append">
                                    <span class="input-group-text">min</span>
                                  </div>
                                  <span class="color-red">{{errors.first(labelSlas[index] + '_deadline_min')}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="flex text-right flex-align-items-center margin-10-t padding-10-l" v-if="department.slas.length > 0">
                              <label
                                class="f-10-500-darkcyan"
                                :class="{'color-red': errors.has( labelSlas[index] + '_initial_hour' ) || errors.has( labelSlas[index] + '_initial_min' ) }">
                                  {{$t('newSla.form.sla.initial')}} *
                              </label>
                              <div class="flex flex-column-780 width-50 sla-width">
                                <div class="col input-group input-group-sm padding-b-780">
                                  <input
                                    :name=" labelSlas[index] + '_initial_hour' "
                                    v-model.number="slas[index].hourInitial"
                                    v-validate="'required|numeric'"
                                    :data-vv-as="'\'' + $t('newSla.form.sla.initial') + ' H \''"
                                    class="form-control"
                                    type="text">
                                  <div class="input-group-append">
                                    <span class="input-group-text">h</span>
                                  </div>
                                  <span class="color-red">{{errors.first(labelSlas[index] + '_initial_hour')}}</span>
                                </div>
                                <div class="col input-group input-group-sm">
                                  <input
                                    :name=" labelSlas[index] + '_initial_min'"
                                    v-model.number="slas[index].minInitial"
                                    v-validate="'required|numeric|between:0,59'"
                                    :data-vv-as="'\'' + $t('newSla.form.sla.initial') + ' MIN\''"
                                    class="form-control"
                                    type="text">
                                  <div class="input-group-append">
                                    <span class="input-group-text">min</span>
                                  </div>
                                  <span class="color-red">{{errors.first(labelSlas[index] + '_initial_min')}}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-column width-50 input-width-100 padding-20-t">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('department.active') }">
                              {{ $t('newDepartment.label.state') }} *
                          </label>
                          <select
                            name="department.active"
                            v-model="department.active"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-50">
                            <option value>{{ $t('newDepartment.select.state') }}</option>
                            <option value="true">{{ $t('state.active') }}</option>
                            <option value="false">{{ $t('state.inactive') }}</option>
                          </select>
                        </div>
                        <div class="flex flex-column width-50 input-width-100 padding-20-t">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{ 'color-red' : errors.has('department.surveyType.id') }">
                              {{ $t('newDepartment.label.surveyType') }} *
                          </label>
                          <select
                            name="department.surveyType.id"
                            v-model="department.surveyType.id"
                            class="select-style f-12-500-gray-light width-70"
                            v-validate="'required'">
                              <option value>{{ $t('newDepartment.select.survey') }}</option>
                              <option
                                v-for="(survey, id) in this.surveys"
                                :key="id"
                                :value="survey.id">
                                  {{ survey.name }}
                              </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-full">
                  <hr class="hr-ticket">
                </div>
                <!-- BUTTONS -->
                <div class="flex-full flex flex-justify-end">
                  <div class="padding-20-r">
                    <button class="btn-medium btn-cancel font-bold" @click.prevent="returnListDepartments">
                      {{ $t('cancel') }}
                    </button>
                  </div>
                  <div class="padding-20-r">
                    <button class="btn-medium btn-blue" type="submit">
                      {{ $t('save') }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="widgets">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option, Checkbox } from "element-ui";
import Department from "src/backend/models/Department.js";
import Sla from "src/backend/models/Sla.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewDepartment",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  data() {
    return {
      department: {
        name: "",
        email: "",
        active: true,
        slas: [],
        surveyType: {
          id: ""
        }
      },
      slas: [],
      slasLength: [],
      indexSlas: [],
      labelSlas: [],
      isEdit: false,
      surveys: this.surverys
    };
  },
  created() {
    Department.getSurveyType()
      .then(result => {
        const data = [...result.data];
        this.surveys = data;
        this.getSla();
      });

  },
  computed: {
    validationGeneral: function() {
      var booleanSlas = true;

      for (var i = 0; i < this.slas.length; i++) {
        booleanSlas =
          booleanSlas &&
          !(this.errors.has(this.labelSlas[i] + '_hour')) &&
          !(this.errors.has(this.labelSlas[i] + '_min')) &&
          this.slas[i].hourDeadline !== '' && this.slas[i].minDeadline !== '';

          if (!booleanSlas) {
            return "validation-fail";
          }
      }

      this.department.surveyType ? "" : (this.department.surveyType = {}, this.department.surveyType.id = "");

      return this.validationClass(
        (!this.errors.has("department.name") && !!this.department.name)
        && booleanSlas
        && this.department.surveyType.id != ""
        && !this.errors.has("department.email")
      );
    }
  },
  methods: {
    getSla() {
      Sla.get()
        .then(result => {
          const data = [...result.data];
          this.slasLength = data.length;
          this.verifyAndGet();
        })
    },
    verifyAndGet() {
      if (this.$router.history.current.params.id) {
        this.isEdit = true;
        Department.getById(this.$router.history.current.params.id)
          .then(s => {
            this.department = s.data;
            this.loadSlas();
          }).catch(e => {});
      } else {
        this.loadSlas();
      }
    },

    returnListDepartments() {
      this.$router.push({ name: "Lista de Departamentos" });
    },

    validateBeforeSubmit() {
      this._getLoading(true);
      const department = { ...this.department };
      this.$validator.validateAll().then(result => {
        if (result) {
          this.indexSlas.forEach(index => {
            department.slas[index].deadline = this.slas[index].minDeadline * 60 + this.slas[index].hourDeadline * 3600;
            department.slas[index].initialTime = this.slas[index].minInitial * 60 + this.slas[index].hourInitial * 3600;
          });
          if (this.isEdit) {
            Department.put(department)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${ this.$t("label.department") } ${ this.$t("swal.titleSuccess") }`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                // this.$router.push({ name: "Lista de Departamentos" });
                this.returnListDepartments();
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
            Department.post(department)
              .then(r => {
                this._getLoading(false);
                this.$swal.fire({
                  title: `${ this.$t("label.department") } ${ this.$t("swal.titleSuccess") }`,
                  text: this.$t("swal.textSuccess"),
                  type: "success",
                  showConfirmButton: true
                });
                this.returnListDepartments();
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

    loadSlas() {
      Sla.get()
        .then(result => {
          if (result.data.length) {
            for (var i = 0; i < result.data.length; i++) {
              let found = !!this.department.slas && this.department.slas.some(sla => sla.sla.id == result.data[i].id);
              let deadline = result.data[i].deadline;
              let initialTime = result.data[i].initialTime;
              if (!found) {
                this.department.slas.splice(i, 0, {
                  sla: result.data[i],
                  deadline: deadline,
                  initialTime: initialTime
                });
              }
              this.slas.push({
                hourDeadline: Math.floor(this.department.slas[i].deadline / 3600),
                minDeadline: Math.floor((this.department.slas[i].deadline / 60) % 60),
                hourInitial: Math.floor(this.department.slas[i].initialTime / 3600),
                minInitial: Math.floor((this.department.slas[i].initialTime / 60) % 60)
              });
              this.indexSlas.push(i);
              this.labelSlas.push("department.sla.sla" + "[" + String(i) + "]");
            }
          }
        })
        .catch(e => {});
    },

    validationClass(boolean) {
      return boolean ? "validation-sucess" : "validation-fail";
    }
  }
};
</script>
