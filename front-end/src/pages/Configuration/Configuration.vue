<template>
    <div>
      <div id="container">
        <div id="content-master">
          <!-- HEADER -->
          <div class="flex-full margin-20-tb">
            <div class="box-shadow">
              <div class="padding-10-r pointer">
                <icon name="settings" />
              </div>
              <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
              <div>
                <span class="f-18-100-gray">{{ $t('title.configuration') }}</span>
              </div>
            </div>
          </div>
          <!-- BODY -->
          <!-- FORM -->
          <form @submit.prevent="validateBeforeSubmit">

          <tabs>
            <tab :name="$t('configuration.tab.general')">
              <div class="flex-full flex-column-1125">
                <div class="box div-default configuration">
                  <div class="box-padding">
                    <div class="flex-full flex-column">
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div :class="validationGeneral"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.generalProperties') }}
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
                                  :class="{ 'color-red': errors.has('configuration.urlSatisfactionSurvey') }"
                                >{{ $t('configuration.label.urlSatisfactionSurvey') }}</label>
                                <input
                                  name="configuration.urlSatisfactionSurvey"
                                  v-validate="'required'"
                                  v-model="configuration.urlSatisfactionSurvey"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.urlSatisfactionSurvey')"
                                />
                                <span class="color-red">{{errors.first('configuration.urlSatisfactionSurvey')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.endPointSatisfactionSurvey') }"
                                >{{ $t('configuration.label.endPointSatisfactionSurvey') }}</label>
                                <input
                                  name="configuration.endPointSatisfactionSurvey"
                                  v-validate="'required'"
                                  v-model="configuration.endPointSatisfactionSurvey"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.endPointSatisfactionSurvey')"
                                />
                                <span class="color-red">{{errors.first('configuration.endPointSatisfactionSurvey')}}</span>
                              </div>
                              <div class="flex flex-column width-50 input-width-100 padding-20-t">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{'color-red': errors.has('configuration.notifierChangeStatusClosed') }"
                                >{{ $t('configuration.label.notifierChangeStatusClosed') }} *</label>
                                <select
                                  name="configuration.notifierChangeStatusClosed"
                                  v-model="configuration.notifierChangeStatusClosed"
                                  v-validate="'required'"
                                  class="select-style f-12-500-gray-light width-50"
                                >
                                  <option value>{{ $t('configuration.select.select') }}</option>
                                  <option value="true">{{ $t('configuration.select.yes') }}</option>
                                  <option value="false">{{ $t('configuration.select.no') }}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div :class="validationSLA"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.slaProperties') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/' + validationSLA + '.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <div class="flex-full width-80 flex-column-680 input-width-100">
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.slaConfig.slaWarning') }"
                                  >{{ $t('configuration.label.bootSla') }}</label>
                                  <input
                                    name="configuration.slaConfig.slaWarning"
                                    v-validate="'required|numeric'"
                                    v-model="configuration.slaConfig.slaWarning"
                                    :data-vv-as="$t('configuration.label.bootSla')"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.bootSla')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.slaConfig.slaWarning')}}</span>
                                </div>
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.slaConfig.sla') }"
                                  >{{ $t('configuration.label.sla') }}</label>
                                  <input
                                    name="configuration.slaConfig.slaExpired"
                                    v-validate="'required|numeric'"
                                    v-model="configuration.slaConfig.slaExpired"
                                    :data-vv-as="$t('configuration.label.sla')"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.sla')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.slaConfig.slaExpired')}}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div :class="validationTm2"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.tm2Properties') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/' + validationTm2 + '.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <div class="flex flex-column width-30 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.groupSendMessage') }"
                                >{{ $t('configuration.label.groupSendMessage') }}</label>
                                <input
                                  name="configuration.tm2Config.groupSendMessage"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.groupSendMessage"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('newPriority.placeholder.name')"
                                />
                                <span class="color-red">{{errors.first('configuration.label.groupSendMessage')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.urlSendMessage') }"
                                >{{ $t('configuration.label.urlSendMessage') }}</label>
                                <input
                                  name="configuration.tm2Config.urlSendMessage"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.urlSendMessage"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.urlSendMessage')"
                                />
                                <span class="color-red">{{errors.first('configuration.tm2Config.urlSendMessage')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.saveTmaUrl') }"
                                >{{ $t('configuration.label.saveTmaUrl') }}</label>
                                <input
                                  name="configuration.tm2Config.saveTmaUrl"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.saveTmaUrl"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.saveTmaUrl')"
                                />
                                <span class="color-red">{{errors.first('configuration.tm2Config.saveTmaUrl')}}</span>
                              </div>

                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.urlUpload') }"
                                >{{ $t('configuration.label.urlUpload') }}</label>
                                <input
                                  name="configuration.tm2Config.urlUpload"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.urlUpload"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.urlUpload')"
                                />
                                <span class="color-red">{{errors.first('configuration.tm2Config.urlUpload')}}</span>
                              </div>

                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.webdavToken') }"
                                >{{ $t('configuration.label.webdavToken') }}</label>
                                <input
                                  name="configuration.tm2Config.webdavToken"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.webdavToken"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.webdavToken')"
                                />
                                <span class="color-red">{{errors.first('configuration.tm2Config.webdavToken')}}</span>
                              </div>


                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.tm2Config.callBackSendMessage') }"
                                >{{ $t('configuration.label.callBackSendMessage') }}</label>
                                <input
                                  name="configuration.tm2Config.callBackSendMessage"
                                  v-validate="'required'"
                                  v-model="configuration.tm2Config.callBackSendMessage"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.callBackSendMessage')"
                                />
                                <span class="color-red">{{errors.first('configuration.tm2Config.callBackSendMessage')}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div :class="validationSmtp"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.smtpProperties') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/' + validationSmtp + '.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <div class="flex-full width-80 flex-column-680 input-width-100">
                                <div class="flex flex-column width-80 input-width-100 margin-20-r" >
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.smtpConfig.host') }"
                                  >{{ $t('configuration.label.host') }}</label>
                                  <input
                                    name="configuration.smtpConfig.host"
                                    v-validate="'required'"
                                    v-model="configuration.smtpConfig.host"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.host')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.smtpConfig.host')}}</span>
                                </div>
                                <div class="flex flex-column width-20 input-width-100 margin-20-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.smtpConfig.port') }"
                                  >{{ $t('configuration.label.port') }}</label>
                                  <input
                                    name="configuration.smtpConfig.port"
                                    v-validate="'required|max_value:99999'"
                                    v-model="configuration.smtpConfig.port"
                                    type="text"
                                    :data-vv-as="$t('configuration.label.port')"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.port')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.smtpConfig.port')}}</span>
                                </div>
                              </div>
                              <div class="flex-full width-80 flex-column-680 input-width-100">
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.smtpConfig.user') }"
                                  >{{ $t('configuration.label.user') }}</label>
                                  <input
                                    name="configuration.smtpConfig.user"
                                    v-validate="'required'"
                                    v-model="configuration.smtpConfig.user"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.user')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.smtpConfig.user')}}</span>
                                </div>
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.smtpConfig.password') }"
                                  >{{ $t('configuration.label.password') }}</label>
                                  <input
                                    name="configuration.smtpConfig.password"
                                    v-validate="'required'"
                                    v-model="configuration.smtpConfig.password"
                                    type="password"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.password')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.smtpConfig.password')}}</span>
                                </div>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.smtpConfig.mailFrom') }"
                                >{{ $t('configuration.label.from') }}</label>
                                <input
                                  name="configuration.smtpConfig.mailFrom"
                                  v-validate="'required'"
                                  v-model="configuration.smtpConfig.mailFrom"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.from')"
                                />
                                <span class="color-red">{{errors.first('configuration.smtpConfig.from')}}</span>
                              </div>
                              <div class="flex-full flex-column-680 input-width-100">
                                <div class="flex flex-column width-50 input-width-100 padding-20-t">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{'color-red': errors.has('configuration.smtpConfig.auth') }"
                                  >{{ $t('configuration.label.auth') }} *</label>
                                  <select
                                    name="configuration.smtpConfig.auth"
                                    v-model="configuration.smtpConfig.auth"
                                    v-validate="'required'"
                                    class="select-style f-12-500-gray-light width-50"
                                  >
                                    <option value>{{ $t('configuration.select.select') }}</option>
                                    <option value="true">{{ $t('configuration.select.yes') }}</option>
                                    <option value="false">{{ $t('configuration.select.no') }}</option>
                                  </select>
                                </div>
                                <div class="flex flex-column width-50 input-width-100 padding-20-t">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{'color-red': errors.has('configuration.smtpConfig.enableTls') }"
                                  >{{ $t('configuration.label.enableTls') }} *</label>
                                  <select
                                    name="configuration.smtpConfig.enableTls"
                                    v-model="configuration.smtpConfig.enableTls"
                                    v-validate="'required'"
                                    class="select-style f-12-500-gray-light width-50"
                                  >
                                    <option value>{{ $t('configuration.select.select') }}</option>
                                    <option value="true">{{ $t('configuration.select.yes') }}</option>
                                    <option value="false">{{ $t('configuration.select.no') }}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div :class="validationJira"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.jiraProperties') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/' + validationJira + '.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <div class="flex-full width-80 flex-column-680 input-width-100">
                                <div class="flex flex-column width-50 input-width-100 margin-20-r" >
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.jiraConfig.secret') }"
                                  >{{ $t('configuration.label.secret') }}</label>
                                  <input
                                    name="configuration.jiraConfig.secret"
                                    v-validate="'required'"
                                    v-model="configuration.jiraConfig.secret"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.secret')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.jiraConfig.secret')}}</span>
                                </div>
                                <div class="flex flex-column width-50 input-width-100 margin-20-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                    :class="{ 'color-red': errors.has('configuration.jiraConfig.consumerKey') }"
                                  >{{ $t('configuration.label.consumerKey') }}</label>
                                  <input
                                    name="configuration.jiraConfig.consumerKey"
                                    v-validate="'required'"
                                    v-model="configuration.jiraConfig.consumerKey"
                                    type="text"
                                    class="input-style f-12-300-gray width-100"
                                    :placeholder="$t('configuration.label.consumerKey')"
                                  />
                                  <span class="color-red">{{errors.first('configuration.jiraConfig.consumerKey')}}</span>
                                </div>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.jiraConfig.privateKey') }"
                                >{{ $t('configuration.label.privateKey') }}</label>
                                <textarea
                                  name="configuration.jiraConfig.privateKey"
                                  v-validate="'required'"
                                  v-model="configuration.jiraConfig.privateKey"
                                  class="textarea-ticket input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.privateKey')"
                                ></textarea>
                                <span class="color-red">{{errors.first('configuration.jiraConfig.privateKey')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.jiraConfig.baseUrl') }"
                                >{{ $t('configuration.label.baseUrl') }}</label>
                                <input
                                  name="configuration.jiraConfig.baseUrl"
                                  v-validate="'required'"
                                  v-model="configuration.jiraConfig.baseUrl"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.baseUrl')"
                                />
                                <span class="color-red">{{errors.first('configuration.jiraConfig.baseUrl')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                  :class="{ 'color-red': errors.has('configuration.jiraConfig.link') }"
                                >{{ $t('configuration.label.link') }}</label>
                                <input
                                  name="configuration.jiraConfig.link"
                                  v-validate="'required'"
                                  v-model="configuration.jiraConfig.link"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.link')"
                                />
                                <span class="color-red">{{errors.first('configuration.label.link')}}</span>
                              </div>
                              <div class="flex flex-column width-80 input-width-100">
                                <label
                                  class="f-10-500-darkcyan"
                                >{{ $t('configuration.label.callback') }}</label>
                                <input
                                  name="priority.name"
                                  v-model="configuration.jiraConfig.callback"
                                  type="text"
                                  class="input-style f-12-300-gray width-100"
                                  :placeholder="$t('configuration.label.callback')"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab>
            <tab :name="$t('configuration.tab.notification')">
              <div class="flex-full flex-column-1125">
                <div class="box div-default configuration">
                  <div class="box-padding">
                    <div class="flex-full flex-column">
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div class="validation-sucess"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.channel') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/validation-sucess.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <div class="flex-full width-80 flex-column-680 input-width-100">
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                  >{{ $t('configuration.label.channel') }}</label>

                                </div>
                                <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                  <label
                                    class="f-10-500-darkcyan"
                                  >{{ $t('configuration.label.group') }}</label>

                                </div>
                              </div>

                              <div v-for="index in indexChannelGroups" :key="index">
                                <div class="flex-full width-80 flex-column-680 input-width-100">
                                  <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                    <div class="input-container">
                                      <img
                                        :src="'/static/icons/channel/'+configuration.channelGroups[index].channel.faicon"
                                        class="channel"
                                      />

                                      <input
                                      name="channelGroups.email.name"
                                      v-model.number="configuration.channelGroups[index].channel.name"
                                      type="text"
                                      :disabled="true"
                                      class="input-style f-12-300-gray width-100"
                                      :placeholder="$t('configuration.label.user')"
                                    >
                                    </div>
                                  </div>
                                  <div class="flex flex-column width-50 input-width-100 margin-40-r">
                                    <input
                                      name="channelGroups.email.group"
                                      v-model.number="configuration.channelGroups[index].groupName"
                                      type="text"
                                      class="input-style f-12-300-gray width-100"
                                      :placeholder="$t('configuration.label.group')"
                                    />
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                        <div class="flex-full section-form">
                          <div class="validation-sucess"></div>
                          <div class="flex-full padding-15-trbl">
                            <div class="flex width-20 w-title 30 w-title-50 f-12-500-gray">
                              <div class="width-100">
                                {{ $t('configuration.notifiers') }}
                                <img
                                  class="validation-img w-14-840"
                                  :src="'/static/icons/validation-sucess.svg'"
                                />
                              </div>
                            </div>
                            <div class="flex width-80 w-card-70 w-card-50 flex-column">
                              <label class="f-10-500-darkcyan">
                                {{ $t('configuration.label.configType') }}
                              </label>

                              <div v-for="index in indexNotifiers" :key="index">

                                <div class="flex-full width-100 flex-column-780 input-width-100 margin-20-t" >
                                  <div class="flex flex-column width-40 input-width-100 margin-40-r">
                                    <label
                                      class="f-10-500-darkcyan"
                                    >{{ $t('configuration.label.type') }}</label>
                                    <input
                                      name="channelGroups.sms.name"
                                      v-model.number="configuration.notifiers[index].type"
                                      type="text"
                                      :disabled="true"
                                      class="input-style f-12-300-gray width-100"
                                      :title="configuration.notifiers[index].type"
                                    >
                                  </div>

                                  <div class="flex flex-column width-20 input-width-100 margin-40-r">
                                    <label
                                      class="f-10-500-darkcyan"
                                    >{{ $t('configuration.label.internal') }}</label>
                                    <select
                                      name="configuration.notifierChangeStatusClosed"
                                      v-model.number="configuration.notifiers[index].internal"
                                      v-validate="'required'"
                                      class="select-style f-12-500-gray-light width-50"
                                    >
                                      <option value>{{ $t('configuration.select.select') }}</option>
                                      <option value="true">{{ $t('configuration.select.yes') }}</option>
                                      <option value="false">{{ $t('configuration.select.no') }}</option>
                                    </select>
                                  </div>

                                  <div class="flex flex-column width-20 input-width-100 margin-40-r">
                                    <label
                                      class="f-10-500-darkcyan"
                                    >{{ $t('configuration.label.external') }}</label>
                                    <select
                                      name="configuration.notifierChangeStatusClosed"
                                      v-model.number="configuration.notifiers[index].external"
                                      v-validate="'required'"
                                      class="select-style f-12-500-gray-light width-50"
                                    >
                                      <option value>{{ $t('configuration.select.select') }}</option>
                                      <option value="true">{{ $t('configuration.select.yes') }}</option>
                                      <option value="false">{{ $t('configuration.select.no') }}</option>
                                    </select>
                                  </div>

                                  <div class="flex flex-column width-20 input-width-100 margin-40-r">
                                    <label
                                      class="f-10-500-darkcyan"
                                    >{{ $t('configuration.label.channel') }}</label>
                                    <div class="input-container">
                                      <img
                                        :src="'/static/icons/channel/'+configuration.notifiers[index].channel.faicon"
                                        class="channel"
                                      />
                                      <input
                                        name="configuration.notifiers.channel"
                                        v-model.number="configuration.notifiers[index].channel.name"
                                        type="text"
                                        :disabled="true"
                                        class="input-style f-12-300-gray width-100"
                                        :title="configuration.notifiers[index].channel.name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab>
          </tabs>

          <div class="flex-full">
            <hr class="hr-ticket" />
          </div>
          <!-- BUTTONS -->
          <div class="flex-full flex flex-justify-end">
            <div class="padding-20-r">
              <button class="btn-medium btn-blue" type="submit">{{ $t('save') }}</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
  import Channel from "src/backend/models/Channel.js";
  import TicketConfig from "src/backend/models/TicketConfig";

    export default {
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm._renewParametersVueX(to, from);
          });
        },      
        name: "Configuration",  
        methods: {
          validateBeforeSubmit() {
            this._getLoading(true);
            this.$validator.validateAll().then(result => {
              if (result ) {
                TicketConfig.put(this.configuration).then(result => {
                  this._getLoading(false);
                  this.$swal.fire({
                    title: `${this.$t("label.configuration")} ${this.$t(
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
          }
        },
        created() {
          this._renewParametersVueX();
          Channel.get()
            .then(result => {
              const data = [...result.data];
              this.channels = data;
            })
            .catch(e => {});
          TicketConfig.get().then(result => {
            const data = result.data;
            this.configuration = data;
            this.indexNotifiers = this.configuration.notifiers.map((value, index) => index);
            this.indexChannelGroups = this.configuration.channelGroups.map((value, index) => index);
          });
        },
        data() {
          return {
            channels: [],
            configuration : {
              customerCreate : false,
              notifierChangeStatusClosed : false,
              urlSatisfactionSurvey: "",
              tm2Config: {},
              phoneNumberConfig: {},
              slaConfig: {},
              smtpConfig: {},
              jiraConfig: {},
              slaConfig: {},
              notifiers: [],
              channelGroups: []
            },
            indexNotifiers: [ ],
            indexChannelGroups: [ ]
          }
        },
        computed: {
          validationGeneral: function() {
            return this.validationClass(
              !this.errors.has("configuration.notifierChangeStatusClosed") &&
              this.configuration.urlSatisfactionSurvey != ""
            );
          },
          validationSLA: function() {
            return this.validationClass(
              !this.errors.has("configuration.slaConfig.slaWarning") &&
              this.configuration.slaConfig.slaWarning != "" &&
              !this.errors.has("configuration.slaConfig.slaExpired") &&
              this.configuration.slaConfig.slaExpired != ""
            );
          },
          validationTm2: function() {
            return this.validationClass(
              !this.errors.has("configuration.tm2Config.groupSendMessage") &&
              this.configuration.tm2Config.groupSendMessage != "" &&
              !this.errors.has("configuration.tm2Config.urlSendMessage") &&
              this.configuration.tm2Config.urlSendMessage != "" &&
              !this.errors.has("configuration.tm2Config.callBackSendMessage") &&
              this.configuration.tm2Config.callBackSendMessage != "" &&
              !this.errors.has("configuration.tm2Config.saveTmaUrl") &&
              this.configuration.tm2Config.saveTmaUrl != ""
            );
          },
          validationSmtp: function() {
            return this.validationClass(
              !this.errors.has("configuration.smtpConfig.host") &&
              this.configuration.smtpConfig.host != "" &&
              !this.errors.has("configuration.smtpConfig.port") &&
              this.configuration.smtpConfig.port != "" &&
              !this.errors.has("configuration.smtpConfig.user") &&
              this.configuration.smtpConfig.user != "" &&
              !this.errors.has("configuration.smtpConfig.password") &&
              this.configuration.smtpConfig.password != "" &&
              !this.errors.has("configuration.smtpConfig.mailFrom") &&
              this.configuration.smtpConfig.mailFrom != "" &&
              !this.errors.has("configuration.smtpConfig.auth") &&
              !this.errors.has("configuration.smtpConfig.enableTls")
            );
          },
          validationJira: function() {
            return this.validationClass(
              !this.errors.has("configuration.jiraConfig.secret") &&
              this.configuration.jiraConfig.secret != "" &&
              !this.errors.has("configuration.jiraConfig.consumerKey") &&
              this.configuration.jiraConfig.consumerKey != "" &&
              !this.errors.has("configuration.jiraConfig.privateKey") &&
              this.configuration.jiraConfig.privateKey != "" &&
              !this.errors.has("configuration.jiraConfig.baseUrl") &&
              this.configuration.jiraConfig.baseUrl != "" &&
              !this.errors.has("configuration.jiraConfig.link") &&
              this.configuration.jiraConfig.link != ""
            );
          },
          validationChannel: function() {
            return this.validationClass(
              !this.errors.has("configuration.notifierChangeStatusClosed") &&
              !!this.configuration.notifierChangeStatusClosed &&
              this.configuration.urlSatisfactionSurvey != ""
            );
          },

        }
    }
</script>

<style scoped lang="scss">
  @import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: #0097a7;
    background-color: #0097a7;
  }
  .inputDisabled {
    color: #a6a6a6;
    background-color: #f2f2f2;
  }

  .input-container {
    display: -ms-flexbox; /* IE10 */
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }

  .channel {
    padding: 1px;
    position: relative;
    top: 4px;
    width: 16px;
    height: 16px;
  }

  .configuration {
    width: 100%;
    margin-right: 10px;
  }

</style>
