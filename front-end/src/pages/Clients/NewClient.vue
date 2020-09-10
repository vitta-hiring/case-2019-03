<template>
  <div id="container">
    <div id="content-master">
      <!-- HEADER -->
      <div class="flex-full margin-20-tb">
        <div class="box-shadow">
          <div class="padding-10-r pointer" @click="returnListClients">
            <img src="/static/icons/back.svg" alt />
          </div>
          <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
          <div>
            <span
              class="f-18-100-gray"
            >{{this.edit? $t('title.editClient'): $t('title.newClient') }}</span>
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
                <!-- FIRST STEP: GENERAL INFO -->
                <!-- Empresa, Descrição, CNPJ, -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationGeneral"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- VALIDATION LABEL -->
                      <div class="flex width-20 w-title-30 w-title-50 f-10-500-gray">
                        <div class="width-100">
                          {{ $t('newClient.stepOne') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationGeneral + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT TAGS -->
                      <div class="flex width-80 w-card-70 w-card-50 flex-column">
                        <!-- Text : EMPRESA -->
                        <div class="flex flex-column width-40 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.name') }"
                          >{{ $t('newClient.label.name') }} *</label>
                          <input
                            name="client.name"
                            v-validate="'required'"
                            pattern="^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$"
                            v-model="client.name"
                            type="text"
                            :data-vv-as="'\'' + $t('newClient.label.name')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newClient.placeholder.name')"
                          />
                          <span class="color-red">{{errors.first('client.name')}}</span>
                        </div>
                        <!-- Text/Number to be Masked: CNPJ -->
                        <div class="flex flex-column width-40 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.cnpj') }"
                          >{{ $t('newClient.label.cnpj') }} *</label>
                          <the-mask
                            name="client.cnpj"
                            v-validate="{ required: true, min: 14}"
                            v-model="client.cnpj"
                            :data-vv-as="'\'' + $t('newClient.label.cnpj')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newClient.placeholder.cnpj')"
                            mask="##.###.###/####-##"
                          />
                          <span class="color-red">{{errors.first('client.cnpj')}}</span>
                        </div>
                        <!-- Text: DESCRIÇÃO -->
                        <div class="flex flex-column width-40 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.description') }"
                          >{{ $t('newClient.label.description') }} *</label>
                          <input
                            name="client.description"
                            v-validate="'required'"
                            v-model="client.description"
                            type="text"
                            :data-vv-as="'\'' + $t('newClient.label.description')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newClient.placeholder.description')"
                          />
                          <span class="color-red">{{errors.first('client.description')}}</span>
                        </div>
                        <!-- Text: candidate to be masked INSCRIÇÃO ESTADUAL -->
                        <div class="flex flex-column width-40 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.stateSubscription') }"
                          >{{ $t('newClient.label.stateSubscription') }} *</label>
                          <input
                            name="client.stateSubscription"
                            v-validate="'required'"
                            v-model.trim="client.stateSubscription"
                            type="text"
                            :data-vv-as="'\'' + $t('newClient.label.stateSubscription')+ '\''"
                            class="input-style f-12-300-gray width-100"
                            :placeholder="$t('newClient.placeholder.stateSubscription')"
                          />
                          <span class="color-red">{{errors.first('client.stateSubscription')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECOND STEP : ADDRESS INFO -->
                <!-- Empresa, Descrição, CNPJ, Inscrição Estadual, Endereço (Logradouro, Nro, Complemento, CEP, Cidade e Estado), Telefone. -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationAddress"></div>
                    <!-- STEP CONTNET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-card-50 f-12-500-gray">
                        <div class="padding-15-r">
                          {{ $t('newClient.stepTwo') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationAddress + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT TAGS -->
                      <div class="flex flex-column width-80 w-card-70 w-card-50">
                        <!-- Text/Number: candidate to be masked: CEP -->
                        <div class="flex-full flex-column-680 input-width-100">
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.cep') }"
                            >{{ $t('newClient.label.address.cep') }} *</label>
                            <the-mask
                              name="client.address.cep"
                              v-validate="'required|min:8'"
                              v-model="client.address.cep"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :placeholder="$t('newClient.placeholder.address.cep')"
                              :data-vv-as="'\'' + $t('newClient.label.address.cep')+ '\''"
                              mask="#####-###"
                            />
                            <span class="color-red">{{errors.first('client.address.cep')}}</span>
                          </div>
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.publicPlace') }"
                            >{{ $t('newClient.label.address.publicPlace') }} *</label>
                            <input
                              name="client.address.publicPlace"
                              v-validate="'required'"
                              v-model="client.address.publicPlace"
                              type="text"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :data-vv-as="'\'' + $t('newClient.label.address.publicPlace')+ '\''"
                              :placeholder="$t('newClient.placeholder.address.publicPlace')"
                            />
                            <span class="color-red">{{errors.first('client.address.publicPlace')}}</span>
                          </div>
                        </div>
                        <!-- Text: NÚMERO -->
                        <div class="flex-full flex-column-680 input-width-100">
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.number') }"
                            >{{ $t('newClient.label.address.number') }} *</label>
                            <input
                              name="client.address.number"
                              v-validate="'required|alpha_num'"
                              v-model.number="client.address.number"
                              type="number"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :data-vv-as="'\'' + $t('newClient.label.address.number')+ '\''"
                              :placeholder="$t('newClient.placeholder.address.number')"
                              min="1"
                            />
                            <span class="color-red">{{errors.first('client.address.number')}}</span>
                          </div>
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.complement') }"
                            >{{ $t('newClient.label.address.complement') }}</label>
                            <input
                              name="client.address.complement"
                              v-model="client.address.complement"
                              type="text"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :placeholder="$t('newClient.placeholder.address.complement')"
                            />
                          </div>
                        </div>
                        <!-- Text: Bairro -->
                        <div class="flex-full flex-column-680 input-width-100">
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.neighborhood') }"
                            >{{ $t('newClient.label.address.neighborhood') }} *</label>
                            <input
                              name="client.address.neighborhood"
                              v-validate="'required'"
                              v-model="client.address.neighborhood"
                              type="text"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :data-vv-as="'\'' + $t('newClient.label.address.neighborhood')+ '\''"
                              :placeholder="$t('newClient.placeholder.address.neighborhood')"
                            />
                            <span class="color-red">{{errors.first('client.address.neighborhood')}}</span>
                          </div>
                          <div class="flex flex-column width-50 input-width-100 padding-20-b">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.address.city') }"
                            >{{ $t('newClient.label.address.city') }} *</label>
                            <input
                              name="client.address.city"
                              v-validate="'required'"
                              v-model="client.address.city"
                              type="text"
                              class="input-style f-12-300-gray width-60 input-width-100"
                              :data-vv-as="'\'' + $t('newClient.label.address.city')+ '\''"
                              :placeholder="$t('newClient.placeholder.address.city')"
                            />
                            <span class="color-red">{{errors.first('client.address.city')}}</span>
                          </div>
                        </div>
                        <!-- Text : Estado -->
                        <div class="flex flex-column width-50 input-width-100 padding-20-b">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.address.state') }"
                          >{{ $t('newClient.label.address.state') }} *</label>
                          <input
                            name="client.address.state"
                            v-validate="'required'"
                            v-model="client.address.state"
                            type="text"
                            class="input-style f-12-300-gray width-60 input-width-100"
                            :data-vv-as="'\'' + $t('newClient.label.address.state')+ '\''"
                            :placeholder="$t('newClient.placeholder.address.state')"
                          />
                          <span class="color-red">{{errors.first('client.address.state')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- THIRD STEP : CONTACT INFO -->
                <!-- Campos usuário responsável, telefone e e-mail da empresa -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationContact"></div>
                    <!-- STEP CONTNET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-card-50 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newClient.stepThree') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationContact + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT TAGS -->
                      <div class="flex flex-column width-80 w-card-70 w-card-50">
                        <!-- Text : Phone Number -->
                        <div class="flex-full flex-column-680 input-width-100 padding-20-b">
                          <div class="flex flex-column width-50 input-width-100">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.phoneContact') }"
                            >{{ $t('newClient.label.phoneContact') }} *</label>
                            <vue-phone-number-input
                              name="client.phoneContact"
                              v-if="showDefaultCountry"
                              style="margin-top: 2px"
                              v-validate="{ required: true }"
                              class="width-80"
                              :default-country-code="defaultCountry"
                              :translations="translations"
                              :formatInternational="client.phoneContact"
                              :data-vv-as="'\'' + $t('newUser.label.phone')+ '\''"
                              v-model="client.phoneContact"
                              @update="updatePhone"
                            />
                            <!-- <the-mask
                              name="client.phoneContact"
                              v-validate="'required|min:10'"
                              v-model="client.phoneContact"
                              class="input-style f-12-300-gray width-80"
                              :data-vv-as="'\'' + $t('newClient.label.phoneContact')+ '\''"
                              :placeholder="$t('newClient.placeholder.phoneContact')"
                              :mask="['(##) ####-####', '(##) #####-####']"
                            />-->
                            <span class="color-red">{{errors.first('client.phoneContact')}}</span>
                            <span
                              v-if="tryValidate == true"
                              class="color-red"
                            >{{ $t('newUser.invalidPhone') }}</span>
                          </div>
                          <div class="flex flex-column width-50 input-width-100">
                            <label
                              class="f-10-500-darkcyan"
                              :class="{'color-red': errors.has('client.emailContact') }"
                            >{{ $t('newClient.label.emailContact') }} *</label>
                            <input
                              name="client.emailContact"
                              style="margin-top: 5px"
                              v-validate="'required|email'"
                              v-model="client.emailContact"
                              type="email"
                              :data-vv-as="'\'' + $t('newClient.label.emailContact')+ '\''"
                              class="input-style f-12-300-gray width-80"
                              :placeholder="$t('newClient.placeholder.emailContact')"
                            />
                            <span class="color-red">{{errors.first('client.emailContact')}}</span>
                          </div>
                        </div>
                        <!-- DROPDOWN: User Name Responsible -->
                        <div class="flex flex-column width-50 input-width-100 padding-20-b">
                          <label
                            class="padding-15-r"
                            :class="{'color-red': errors.has('client.responsibleUser') }"
                          >{{ $t('newClient.label.responsibleUser') }} *</label>
                          <input
                            name="client.responsibleUser"
                            v-validate="'required'"
                            v-model="client.responsibleUser"
                            class="input-style f-12-300-gray width-80 margin-5-b"
                            :data-vv-as="'\'' + $t('newClient.label.responsibleUser')+ '\''"
                            :placeholder="$t('newClient.placeholder.responsibleUser')"
                          />
                          <span class="color-red">{{errors.first('client.responsibleUser')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- FOUTH STEP -->
                <!-- Propriedades: preenche os campos de SLA e status do cliente. -->
                <div
                  class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div :class="validationPropriety"></div>
                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-card-50 f-12-500-gray">
                        <div class="width-100">
                          {{ $t('newClient.stepFourth') }}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + validationPropriety + '.svg'"
                          />
                        </div>
                      </div>
                      <!-- INPUT TAGS -->
                      <div class="flex flex-column width-80 w-card-70 w-card-50">
                        <div class="flex flex-column width-100">
                          <label
                            class="f-10-500-darkcyan"
                          >{{ $t('newClient.label.levelServiceAgreement') }}</label>
                          <!-- Number Dynamic V-for: Workflow SLAS -->
                          <div v-for="index in indexSlas" :key="index">
                            <label
                              class="f-10-500-darkcyan margin-20-t"
                            >{{ client.slas[index].sla.name }}</label>
                            <!-- DEADLINE -->
                            <div
                              class="flex text-right flex-align-items-center margin-10-t"
                              v-if="client.slas.length > 0"
                            >
                              <label
                                class="f-10-500-darkcyan padding-10-l"
                                :class="{'color-red': errors.has( labelSlas[index] + '_hour' ) || errors.has( labelSlas[index] + '_min' ) }"
                              >{{$t('newSla.form.sla.deadline')}} *</label>
                              <div class="flex flex-column-780 width-50 sla-width">
                                <div class="col input-group input-group-sm padding-b-780">
                                  <input
                                    :name=" labelSlas[index] + '_hour' "
                                    v-model.number="slas[index].hourDeadline"
                                    min="0"
                                    v-validate="'required'"
                                    class="form-control"
                                    type="number"
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text">h</span>
                                  </div>
                                </div>
                                <div class="col input-group input-group-sm">
                                  <input
                                    :name=" labelSlas[index] + '_min'"
                                    v-model.number="slas[index].minDeadline"
                                    min="0"
                                    max="59"
                                    v-validate="'required'"
                                    class="form-control"
                                    type="number"
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text">min</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- INITIAL TIME -->
                            <div
                              class="flex text-right flex-align-items-center margin-10-t"
                              v-if="client.slas.length > 0"
                            >
                              <label
                                class="f-10-500-darkcyan padding-10-l"
                                :class="{'color-red': errors.has( labelSlas[index] + '_hour' ) || errors.has( labelSlas[index] + '_min' ) }"
                              >{{$t('newSla.form.sla.initial')}} *</label>
                              <div class="flex flex-column-780 width-50 sla-width">
                                <div class="col input-group input-group-sm padding-b-780">
                                  <input
                                    :name=" labelSlas[index] + '_hour' "
                                    v-model.number="slas[index].hourInitialTime"
                                    min="0"
                                    v-validate="'required'"
                                    class="form-control"
                                    type="number"
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text">h</span>
                                  </div>
                                </div>
                                <div class="col input-group input-group-sm">
                                  <input
                                    :name=" labelSlas[index] + '_min'"
                                    v-model.number="slas[index].minInitialTime"
                                    min="0"
                                    max="59"
                                    v-validate="'required'"
                                    class="form-control"
                                    type="number"
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text">min</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- STATUS -->
                        <div class="flex flex-column width-50 input-width-100 padding-20-t">
                          <label
                            class="f-10-500-darkcyan"
                            :class="{'color-red': errors.has('client.state') }"
                          >{{ $t('newClient.label.state') }} *</label>
                          <select
                            name="client.state"
                            v-model="client.state"
                            v-validate="'required'"
                            class="select-style f-12-500-gray-light width-40"
                          >
                            <option value="true">{{ $t('state.active') }}</option>
                            <option value="false">{{ $t('state.inactive') }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- SEPARATOR OF STEPS -->
                <div class="flex-full padding-10-tb"></div>

                <!-- FIFTH STEP -->
                <!-- Usuários associados ao Cliente -->
                <div
                  class="flex-full flex-row box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan"
                >
                  <div class="flex-full section-form">
                    <div class="validation-sucess"></div>

                    <!-- STEP CONTET -->
                    <div class="flex-full padding-15-trbl">
                      <!-- LABEL VALIDATION -->
                      <div class="flex width-20 w-title-30 w-card-50 f-12-500-gray">
                        <div class="width-100">
                          {{$t('newClient.stepFive')}}
                          <img
                            class="validation-img w-14-840"
                            :src="'/static/icons/' + 'validation-sucess' + '.svg'"
                          />
                        </div>
                      </div>

                      <!-- INPUT TAGS -->
                      <div class="flex flex-column width-80 w-card-70 w-card-50">
                        <div class="flex-full flex-space-between">
                          <div>
                            <button
                              class="btn-blue btn-rounded"
                              type="button"
                              @click="addUser"
                            >{{$t('newClient.addUser')}}</button>
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
                                :placeholder="$t('listOfUsers.list.search')"
                              />
                            </div>
                          </div>
                        </div>
                        <users
                          :client-id="edit?+$router.history.current.params.id:null"
                          :client-component-info="!edit?clientComponentInfo:null"
                          @edit="onUserEdit($event)"
                          :query="query"
                          :reduced-list="true"
                          ref="usersList"
                        ></users>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- FINAL SEPARATOR -->
                <div class="flex-full">
                  <hr class="hr-ticket" />
                </div>

                <!-- BUTTONS -->
                <div class="flex-full flex flex-justify-end">
                  <div class="padding-20-r">
                    <button
                      class="btn-medium btn-cancel font-bold"
                      @click="returnListClients"
                    >{{ $t('cancel') }}</button>
                  </div>
                  <div class="padding-20-r">
                    <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="widgets">
          <!-- <time-tracker></time-tracker> -->
          <!--        <jira-actions></jira-actions>-->
        </div>
      </div>
    </div>
    <user-modal @refresh="refreshUsers" @save="saveUser"></user-modal>
  </div>
</template>

<script>
import { Select, Option, Checkbox } from "element-ui";
import Notification from "src/backend/models/Notification.js";
import Sla from "src/backend/models/Sla.js";
import Company from "src/backend/models/Company.js";
import User from "src/backend/models/User.js";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._renewParametersVueX(to, from);
    });
  },

  name: "NewClient",

  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Checkbox
  },

  data() {
    return {
      postOrPut: false,
      currentCountry: this.$store.getters.getCountryDefault,
      isValid: false,
      showDefaultCountry: false,
      phone: "",
      defaultCountry: this.$store.getters.getCountryDefault,
      translations: {
        countrySelectorLabel: this.$t(
          "newUser.placeholder.countrySelectorLabel"
        ),
        countrySelectorError: this.$t(
          "newUser.placeholder.countrySelectorError"
        ),
        phoneNumberLabel: this.$t("newUser.placeholder.phoneNumberLabel"),
        example: this.$t("newUser.placeholder.example")
      },
      client: {
        name: "",
        description: "",
        cnpj: "",
        stateSubscription: "",
        phoneContact: "",
        emailContact: "",
        responsibleUser: "",
        state: true,
        address: {
          publicPlace: "",
          neighborhood: "",
          number: "",
          complement: "",
          city: "",
          state: "",
          cep: ""
        },
        slas: []
      },
      edit: false,
      indexSlas: [],
      slasLength: [],
      labelSlas: [],
      forceCallComputedFlag: true,
      slaValid: {
        required: true,
        min: 3
      },
      slas: [],
      clientComponentInfo: {
        users: []
      },
      searchQuery: ""
    };
  },

  created() {
    this.getNotifications();
  },

  computed: {
    tryValidate() {
      return this.postOrPut == true && this.phone
        ? this.isValid
          ? false
          : true
        : false;
    },

    setDefaultCountry() {
      return this.defaultCountry;
    },

    validationGeneral: function() {
      return this.validationClass(
        !this.errors.has("client.name") &&
          !!this.client.name &&
          !this.errors.has("client.cnpj") &&
          !!this.client.cnpj &&
          !this.errors.has("client.description") &&
          !!this.client.description &&
          !this.errors.has("client.stateSubscription") &&
          !!this.client.stateSubscription
      );
    },

    validationAddress: function() {
      return this.validationClass(
        !this.errors.has("client.address.cep") &&
          !!this.client.address.cep &&
          !this.errors.has("client.address.publicPlace") &&
          !!this.client.address.publicPlace &&
          !this.errors.has("client.address.number") &&
          !!this.client.address.number &&
          !this.errors.has("client.address.neighborhood") &&
          !!this.client.address.neighborhood &&
          !this.errors.has("client.address.city") &&
          !!this.client.address.city &&
          !this.errors.has("client.address.state") &&
          !!this.client.address.state
      );
    },

    validationContact: function() {
      return this.validationClass(
        !this.errors.has("client.phoneContact") &&
          this.client.phoneContact &&
          !this.errors.has("client.emailContact") &&
          this.client.emailContact &&
          !this.errors.has("client.responsibleUser") &&
          this.client.responsibleUser &&
          this.isValid &&
          (this.currentCountry == "BR"
            ? this.phone.length == 13 || this.phone.length == 14
              ? true
              : false
            : true)
      );
    },

    validationPropriety: function() {
      let booleanSlas = true;
      for (var i = 0; i < this.slas.length; i++) {
        booleanSlas =
          booleanSlas &&
          !this.errors.has(this.labelSlas[i] + "_hour") &&
          !this.errors.has(this.labelSlas[i] + "_min") &&
          this.slas[i].hourDeadline !== "" &&
          this.slas[i].minDeadline !== "";
        if (!booleanSlas) {
          return "validation-fail";
        }
      }
      return this.validationClass(this.client.state != "" && booleanSlas);
    },

    query: function() {
      return { query: this.searchQuery };
    }
  },

  methods: {
    verifyAndGet() {
      if (this.$router.history.current.params.id) {
        this.edit = true;
        Company.getById(this.$router.history.current.params.id)
          .then(s => {
            this.client = s.data;
            this.client.phoneContact = this.formatPhone(this.client.phoneContact);
            this.loadSlas();
          })
          .catch(e => {});
      } else {
        this.showDefaultCountry = true;
        this.loadSlas();
      }
    },
    showError() {
      this._getLoading(false);
      this.$swal.fire({
        title: this.$t("swal.titleError"),
        text: this.$t("swal.errorFields"),
        type: "error",
        showConfirmButton: true
      });
    },

    findCountryAcronym(DDI) {
      this.find = false;
      this.$store.getters.getCountryList.forEach(element => {
        if (element.dialCode == DDI) {
          this.defaultCountry = element.iso2.toUpperCase();
          this.showDefaultCountry = true;
          this.find = true;
        }
      });
      return this.find ? true : false;
    },

    removeDialCode(number, phone) {
      return (phone = phone.substring(0, number));
    },

    findDialCode: function(phone) {
      let firstThree = phone.substring(0, 3);
      let firstTwo = phone.substring(0, 2);
      let first = phone.substring(0, 1);
      this.findCountryAcronym(firstThree) == false
        ? this.findCountryAcronym(firstTwo) == false
          ? this.findCountryAcronym(first) == false
            ? ""
            : (phone = phone.substr(1))
          : (phone = phone.substr(2))
        : (phone = phone.substr(3));
      return phone;
    },

    formatPhone(phone) {
      phone = phone.replace("+", "");
      phone = phone.replace("-", "");
      phone = phone.replace(".", "");
      phone.length == 8 || phone.length == 9 || phone.length == 10
        ? ((this.defaultCountry = this.$store.getters.getCountryDefault),
          (this.showDefaultCountry = true))
        : "";
      phone.length > 10
        ? (phone = this.findDialCode(phone))
        : (this.showDefaultCountry = true);
      return phone;
    },

    updatePhone(event) {
      event.countryCode
        ? (this.currentCountry = event.countryCode)
        : this.$store.getters.getCountryDefault;
      event.isValid == true ? (this.isValid = true) : (this.isValid = false);
      event.formattedNumber ? (this.phone = event.formattedNumber) : "";
    },

    loadSlas() {
      Sla.get()
        .then(result => {
          if (result.data.length) {
            for (var i = 0; i < result.data.length; i++) {
              let found = !!this.client.slas && this.client.slas.some(sla => sla.sla.id == result.data[i].id);
              let deadline = result.data[i].deadline;
              let initialTime = result.data[i].initialTime;
              if (!found) {
                this.client.slas.splice(i, 0, {
                  sla: result.data[i],
                  deadline: deadline,
                  initialTime: initialTime
                });
              }
              this.slas.push({
                hourDeadline: Math.floor(this.client.slas[i].deadline / 3600),
                minDeadline: Math.floor((this.client.slas[i].deadline / 60) % 60),
                hourInitialTime: Math.floor(this.client.slas[i].initialTime / 3600),
                minInitialTime: Math.floor((this.client.slas[i].initialTime / 60) % 60)
              });
              this.indexSlas.push(i);
              this.labelSlas.push("client.sla.sla" + "[" + String(i) + "]");
            }
          }
        })
        .catch(e => {});
    },

    activeWatch() {
      this.forceCallComputedFlag = !this.forceCallComputedFlag;
    },

    validationClass(boolean) {
      return boolean ? "validation-success" : "validation-fail";
    },

    returnListClients() {
      this.$router.push({ name: "Listar Clientes" });
    },

    onUserEdit(user) {
      this.$modal.show(
        "create-user",
        this.client.id
          ? {
              clientId: this.client.id,
              user: user
            }
          : {
              user: user
            }
      );
    },

    addUser() {
      this.$modal.show(
        "create-user",
        this.client.id ? { clientId: this.client.id } : {}
      );
    },

    refreshUsers() {
      this.$refs.usersList.getUsers();
    },

    saveUser(user) {
      if (user.tempId === -1) {
        user.tempId = this.clientComponentInfo.users.length;
        this.clientComponentInfo.users.push(user);
      } else {
        this.clientComponentInfo
          ? (this.clientComponentInfo.users[user.tempId] = user)
          : "";
      }
      this.refreshUsers();
    },

    validateCNPJ(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");

      if (cnpj == "") return false;

      if (cnpj.length != 14) return false;

      /* Elimina CNPJs invalidos conhecidos */
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return false;

      /* Valida DVs */
      let size = cnpj.length - 2;
      let numbers = cnpj.substring(0, size);
      let digits = cnpj.substring(size);
      let sum = 0;
      let pos = size - 7;
      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result != digits.charAt(0)) return false;

      size = size + 1;
      numbers = cnpj.substring(0, size);
      sum = 0;
      pos = size - 7;
      for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result != digits.charAt(1)) return false;

      return true;
    },

    validateBeforeSubmit() {
      this._getLoading(true);
      const client = { ...this.client };
      this.$validator.validateAll().then(result => {
        if (result) {
          this.postOrPut = true;
          const validCnpj = this.validateCNPJ(client.cnpj);
          if (validCnpj) {
            this.indexSlas.forEach(index => {
              client.slas[index].deadline =
                this.slas[index].minDeadline * 60 +
                this.slas[index].hourDeadline * 3600;
              client.slas[index].initialTime =
                this.slas[index].minInitialTime * 60 +
                this.slas[index].hourInitialTime * 3600;
            });
            if (this.edit && this.validationContact == "validation-success") {
              client.phoneContact = this.phone;
              Company.put(client)
                .then(r => {
                  this._getLoading(false);
                  this.$swal.fire({
                    title: `${this.$t("label.client")} ${this.$t(
                      "swal.titleSuccess"
                    )}`,
                    text: this.$t("swal.textSuccess"),
                    type: "success",
                    showConfirmButton: true
                  });

                  this.returnListClients();
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
            if (!this.edit && this.validationContact == "validation-success") {
              client.users = this.clientComponentInfo.users;
              client.phoneContact = this.phone;
              Company.post(client)
                .then(r => {
                  this._getLoading(false);
                  this.$swal.fire({
                    title: `${this.$t("label.client")} ${this.$t(
                      "swal.titleSuccess"
                    )}`,
                    text: this.$t("swal.textSuccess"),
                    type: "success",
                    showConfirmButton: true
                  });
                  this.returnListClients();
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
            if (this.validationContact == "validation-fail") {
              this.showError();
            }
          }
          if (!validCnpj && client.cnpj) {
            this._getLoading(false);
            this.$swal.fire({
              title: this.$t("swal.titleError"),
              text: this.$t("newClient.invalidCnpj"),
              type: "error",
              showConfirmButton: true
            });
          }
          if (this.validationContact == "validation-fail") {
            this.showError();
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

    getNotifications() {
      Notification.get(
        this.$store.getters.getUser.id,
        this.$store.getters.getUser.locale
      )
        .then(result => {
          this.notifications = result.data.content;
          this.getSlas();
        })
        .catch(e => {});
    },
    getSlas() {
      Sla.get().then(result => {
        const data = [...result.data];
        this.slasLength = data.length;
        this.verifyAndGet();
      });
    }
  },
  watch: {
    "client.stateSubscription": function(newSub) {
      let cleanSub = newSub.replace(/[^\d]/gi, "").trim();
      this.client.stateSubscription = cleanSub;
    },
    client: eee => {},
    defaultCountry: function(newDefaultCountry) {
      this.defaultCountry = newDefaultCountry;
    }
  }
};
</script>

<style scoped>
.input-group-append {
  margin-left: -5px;
}
</style>
