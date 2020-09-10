<template>
    <div>
        <div id="container">
            <div id="content-master">
                <div class="flex-full margin-20-tb">
                    <div class="box-shadow">
                        <div class="padding-10-r pointer" @click="returnListTemplates">
                            <img src="/static/icons/back.svg" />
                        </div>
                        <div class="margin-20-rl division division-new-ticket background-darkcyan"></div>
                        <div>
                            <span class="f-18-100-gray">{{ isEdit ? $t('templates.editTemplate') : $t('templates.newTemplate') }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-full flex-column-1125">
                    <div class="box div-default list-tickets">
                        <div class="box-padding">
                            <form @submit.prevent="validateBeforeSubmit">
                                <div class="flex-full flex-column">
                                    <div class="flex-full box-shadow-hover margin-20-b padding-0-trbl f-10-500-darkcyan">
                                        <div class="flex-full section-form">
                                            <div :class="validationGeneral"></div>
                                            <div class="flex-full padding-15-trbl">
                                                <div class="flex width-20 w-title-30 w-title-50 f-15-500-gray">
                                                    <div class="width-100">
                                                        {{ $t('newProfile.generalInfo') }}
                                                        <img class="validation-img w-14-840" :src="'/static/icons/' + validationGeneral + '.svg'" />
                                                    </div>
                                                </div>
                                                <div class="flex width-80 w-card-70 w-card-50 flex-column">
                                                    <form @submit.prevent="postForAddTemplate">
                                                        <div class="flex flex-column width-87 input-width-100">
                                                            <label class="f-10-500-darkcyan padding-8-b" :class="{'color-red': errors.has('template.name') }">{{ $t('templates.name') }} *</label>
                                                            <input v-if="this.$store.getters.getTemplate" name="template.name" v-validate="{ required: true }" v-model="template.name" type="text" :data-vv-as="'\'' + $t('templates.name')+ '\''" class="input-style f-12-300-gray width-100" :placeholder="$t('templates.placeholder.name')"
                                                            />
                                                        </div>
    
                                                        <div class="flex flex-column width-100 input-width-100 padding-20-t"
                                                            :class="{'ml-0': this.fullHD, 'ml-0': this.HD}"
                                                        >
                                                            <div class="flex-full flex flex-wrap">                                             
                                                                {{ revertError }}
                                                                <div v-if="this.fullHD" class="flex width-15 padding-10-tb">
                                                                </div>
                                                                <div v-if="this.HD" class="flex width-33 padding-10-tb">
                                                                </div>
                                                                <div :class="{'width-33 flex-full flex flex-wrap position-type-of-template': this.fullHD, 'width-33 flex-full flex flex-wrap position-type-of-template-hd': this.HD}">
                                                                    <label class="f-10-500-darkcyan" :class="{'color-red': errorType }">{{ $t('templates.typeOfTemplate') }} *</label>
                                                                    <types-of-template v-if="this.$store.getters.getTypeOfTemplate" />
                                                                </div>
                                                                <div class="width-33 flex-full flex flex-wrap position-channels">
                                                                    <label class="f-10-500-darkcyan" :class="{'color-red': errorChannel }">{{ $t('templates.channels') }} *</label>
                                                                    <channels v-if="this.$store.getters.getChannelTM2" />
                                                                </div>
                                                                <div class="flex width-33 padding-10-tb">
                                                                </div>
                                                            </div>
                                                        </div>
    
                                                        <div :class="{'flex flex-column width-100 input-width-100 padding-25-tb position-keys-length-equal-4': this.$store.getters.getTypeOfTemplate && this.$store.getters.getTypeOfTemplate.keys && this.$store.getters.getTypeOfTemplate.keys.length > 4,
                                                              'flex flex-column width-100 input-width-100 padding-25-t padding-100-b position-keys-length-less-3': this.$store.getters.getTypeOfTemplate && this.$store.getters.getTypeOfTemplate.keys && this.$store.getters.getTypeOfTemplate.keys.length <= 3,
                                                              'flex flex-column width-100 input-width-100 padding-25-t padding-100-b position-keys-length-equal-4': this.$store.getters.getTypeOfTemplate && this.$store.getters.getTypeOfTemplate.keys && this.$store.getters.getTypeOfTemplate.keys.length == 4,}">
                                                            <div class="row">
    
                                                                <div :class="{'position-active-hd row': this.fullHD, 'position-active-hd': this.HD}">
                                                                    {{ (template.active ? $t('templates.active') : $t('templates.inactive')) }}
                                                                    <b-form-checkbox :class="{'position-checkbox pointer': this.fullHD, 'position-checkbox-hd pointer': this.HD}" v-model="template.active"></b-form-checkbox>
                                                                </div>
    
                                                                <div :class="{'width-1': this.fullHD, 'width-1': this.HD }" tooltip.hover style="margin-top: -0.5rem;" v-if="this.$store.getters.getTypeOfTemplate" :title="$t(this.$store.getters.getTypeOfTemplate.description)">
                                                                    <icon name="question" />
                                                                </div>
    
                                                                <div v-if="this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL' && !showPreviewPTBR" :class="{'width-1 position-eye-preview': this.fullHD, 'width-5 position-eye-preview-hd': this.HD }" tooltip.hover class="pointer" @click="showPreviewHTML('PTBR')"
                                                                    :title="$t('templates.showPreviewHTML')">
                                                                    <icon name="eye-preview" widthValue="25" marginTopValue="-0.4" leftTopValue="0" />
                                                                </div>
    
                                                                <div v-if="this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL' && showPreviewPTBR" :class="{'width-3 position-eye-preview': this.fullHD, 'width-3 position-eye-preview-hd': this.HD }" tooltip.hover class="pointer" @click="notPreviewHTML('PTBR')"
                                                                    :title="$t('templates.notShowPreviewHTML')">
                                                                    <icon name="eye-preview" widthValue="25" marginTopValue="-0.4" leftTopValue="0" />
                                                                </div>
    
                                                            </div>
    
                                                            <div class="flex padding-35-b">
                                                                <label class="f-10-500-darkcyan"></label>
                                                                <tabs class="position-tabs width-53" @clicked="tabClicked" @changed="tabChanged">
                                                                    <!-- PTBR -->
                                                                    <tab :name="$t('templates.pt-br')">
                                                                        <!-- SUBJECT -->
                                                                        <textarea v-if="this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL'" name="jiraComment.comment" v-model="subjectHTMLptbr" :placeholder="$t('templates.subjectEmail')" 
                                                                            :class="{
                                                                            'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject input-style f-12-300-gray': this.fullHD, 
                                                                            'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject-without-preview input-style f-12-300-gray': this.fullHD && !showPreviewPTBR, 
                                                                            'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-without-preview': this.HD && !showPreviewPTBR, 
                                                                            'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-with-preview': this.HD && showPreviewPTBR, 
                                                                            'border-red': error}"></textarea>
                                                                        <!-- SUBJECT END-->
    
                                                                        <!-- TEXT -->
                                                                        <div class="flex pointer position-text">
                                                                            <textarea v-if="!showPreviewPTBR || (this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name != 'EMAIL')" name="jiraComment.comment" v-model="textHTMLptbr" :placeholder="$t('templates.text')" class="flex text-shadow div-hover textarea-modal input-style f-12-300-gray width-100 text-shadow textarea-template input-style f-12-300-gray"
                                                                                :class="{'border-red': error}"></textarea>
                                                                            <div class="position-editor-html"></div>
                                                                            <ckeditor class="ck-editor__editable ck-content" v-if="showPreviewPTBR && this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL'" :editor="editor" v-model="textHTMLptbr" :config="editorConfig" tag-name="textarea"></ckeditor>
                                                                            <!-- TEXT END -->
                                                                        </div>
                                                                    </tab>
                                                                    <!-- PTBR END -->
    
                                                                    <!-- EN -->
                                                                    <tab :name="$t('templates.en')">
                                                                        <!-- SUBJECT -->
                                                                        <textarea name="jiraComment.comment" v-model="subjectHTMLen" :placeholder="$t('templates.subjectEmail')" :class="{'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject input-style f-12-300-gray': this.fullHD, 
                                                                        'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject-without-preview input-style f-12-300-gray': this.fullHD && !showPreviewPTBR, 
                                                                              'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-without-preview': this.HD && !showPreviewPTBR, 
                                                                              'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-with-preview': this.HD && showPreviewPTBR, 
                                                                              'border-red': error}" v-if="this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL'"></textarea>
                                                                        <!-- SUBJECT END-->
    
                                                                        <!-- TEXT -->
                                                                        <div class="flex pointer position-text">
                                                                            <textarea name="jiraComment.comment" v-model="textHTMLen" :placeholder="$t('templates.text')" class="flex text-shadow div-hover textarea-modal input-style f-12-300-gray width-100 text-shadow textarea-template input-style f-12-300-gray width-100" :class="{'border-red': error}"
                                                                                v-if="!showPreviewPTBR"></textarea>
                                                                            <div class="position-editor-html"></div>
                                                                            <ckeditor class="ck-editor__editable ck-content" v-if="showPreviewPTBR" :editor="editor" v-model="textHTMLen" :config="editorConfig" tag-name="textarea"></ckeditor>
                                                                        </div>
                                                                        <!-- TEXT END -->
                                                                    </tab>
                                                                    <!-- EN END-->
    
                                                                    <!-- ES -->
                                                                    <tab :name="$t('templates.es')">
                                                                        <!-- SUBJECT -->
                                                                        <textarea name="jiraComment.comment" v-model="subjectHTMLes" :placeholder="$t('templates.subjectEmail')" :class="{'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject input-style f-12-300-gray': this.fullHD, 
                                                                        'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow textarea-subject-without-preview input-style f-12-300-gray': this.fullHD && !showPreviewPTBR, 
                                                                              'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-without-preview': this.HD && !showPreviewPTBR, 
                                                                              'flex text-shadow div-hover textarea-modal input-style f-12-300-gray text-shadow input-style f-12-300-gray textarea-subject-hd-with-preview': this.HD && showPreviewPTBR, 
                                                                              'border-red': error}" v-if="this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL'"></textarea>
                                                                        <!-- SUBJECT END-->
    
                                                                        <!-- TEXT -->
                                                                        <div class="flex pointer position-text">
                                                                            <textarea name="jiraComment.comment" v-model="textHTMLes" :placeholder="$t('templates.text')" class="flex text-shadow div-hover textarea-modal input-style f-12-300-gray width-100 text-shadow textarea-template input-style f-12-300-gray width-100" :class="{'border-red': error}"
                                                                                v-if="!showPreviewPTBR"></textarea>
                                                                            <div class="position-editor-html"></div>
                                                                            <ckeditor class="ck-editor__editable ck-content" v-if="showPreviewPTBR" :editor="editor" v-model="textHTMLes" :config="editorConfig" tag-name="textarea"></ckeditor>
                                                                        </div>
                                                                        <!-- TEXT END -->
                                                                    </tab>
                                                                    <!-- ES END -->
                                                                </tabs>
                                                            </div>
                                                            <div v-if="this.$store.getters.getTypeOfTemplate" class="width-2" :class="{'position-keys-with-email': this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL',
                                                                  'position-keys-without-email': !this.$store.getters.getChannelTM2 || (this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name != 'EMAIL'),
                                                                  'position-keys-with-html': showPreviewPTBR && this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL',
                                                                  'position-keys-without-html': !showPreviewPTBR && this.$store.getters.getChannelTM2 && this.$store.getters.getChannelTM2.name == 'EMAIL'
                                                                }">
                                                                <div class="position-key-name row" v-for="(item, index) in this.$store.getters.getTypeOfTemplate.keys" :key="index">
                                                                    <!-- {{ item.name }} -->
                                                                    <div class="position-key-name row">
                                                                        <!--<div class="position-name-attribute"> -->
                                                                        {{ $t(item.name) }}
                                                                        <!--</div>-->
                                                                        <div tooltip.hover @click="addValue(item)" :title="$t('templates.addValue')">
                                                                            <icon name="add-key" class="pointer" widthValue="25" marginTopValue="-2" marginLeftValue="10" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-if="this.$store.getters.getTypeOfTemplate.hasAnnex" class="position-has-annex">
                                                                    <b-form-checkbox class="position-checkbox-hasAnnex pointer" v-model="template.hasAnnex">{{ $t('templates.hasAnnex') }}</b-form-checkbox>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-full flex-justify-end">
                                        <div class="padding-20-r">
                                            <button class="btn-medium btn-cancel font-bold" @click="returnListTemplates">{{ $t('cancel') }}</button>
                                        </div>
                                        <div class="padding-20-r">
                                            <button class="btn-medium btn-blue" type="submit">{{ isEdit ? $t('edit') : addTemplate ? $t('save') : $t('templates.addTemplate')}}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Template from "src/backend/models/Template";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm._renewParametersVueX(to, from);
        });
    },

    name: "RegisterAndEditTemplate",

    props: ["query"],
    data() {
        return {
            HD: undefined,
            fullHD: undefined,
            iDptbr: undefined,
            iDen: undefined,
            iDes: undefined,
            templateQuery: {
                query: "",
                page: 0,
                size: 10
            },
            errorType: false,
            errorChannel: false,
            showPreviewPTBR: undefined,
            showPreviewEN: undefined,
            showPreviewES: undefined,
            editor: ClassicEditor,
            editorData: this.$t("editTicket.answers.typeYourAnswerLOWER"),
            editorConfig: {
                language: "es",
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
            textHTMLptbr: undefined,
            textHTMLen: undefined,
            textHTMLes: undefined,
            subjectHTMLptbr: undefined,
            subjectHTMLen: undefined,
            subjectHTMLes: undefined,
            error: undefined,
            template: {
                active: true
            },
            firstAccess: true,
            template: {
                name: "",
                active: true,
                hasAnnex: true
            },
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
            isEdit: false,
            afterPost: false,
            addTemplate: false,
            selectedWrite: [],
            selectedRead: [],
            searchQuery: this.query
        };
    },
    created() {
        //this.template.name = "";
        window.innerWidth > 1919 ? (this.fullHD = true) : (this.HD = true);
        if (this.$router.history.current.params.id) {
            this.isEdit = true;
            this.addTemplate = true;
            this.$store.getters.getListTemplates ?
                (this.$store.commit("setListTemplates", undefined),
                    this.getTemplates(this.$router.history.current.params.id)) :
                this.$store.getters.getTemplate ?
                (this.template = this.$store.getters.getTemplate) :
                this.getTemplates(this.$router.history.current.params.id);
        }
    },
    beforeDestroy() {
        this.clear();
    },

    methods: {
        putTemplate() {
            let template = {};
            template.active = this.template.active;
            template.channel = this.$store.getters.getChannelTM2;
            template.id = this.$router.history.current.params.id;
            (template.locales = [{
                    body: this.textHTMLptbr,
                    id: this.$store.getters.getIdPtbr,
                    locale: "PT_BR",
                    subject: this.subjectHTMLptbr,
                    template: {
                        id: template.id
                    }
                },
                {
                    body: this.textHTMLen,
                    id: this.$store.getters.getIdEn,
                    locale: "EN",
                    subject: this.subjectHTMLen,
                    template: {
                        id: template.id
                    }
                },
                {
                    body: this.textHTMLes,
                    id: this.$store.getters.getIdEs,
                    locale: "ES",
                    subject: this.subjectHTMLes,
                    template: {
                        id: template.id
                    }
                }
            ]),
            (template.name = this.template.name);
            template.type = this.$store.getters.getTypeOfTemplate.name;
            template.hasAnnex = this.template.hasAnnex == true ? true : false;
            Template.put(template)
                .then(result => {
                    this._successfulResult("template", "/list-templates");
                    this.$store.commit("setPtbr", undefined);
                    this.$store.commit("setEn", undefined);
                    this.$store.commit("setEs", undefined);
                    this.$store.commit("setSubjectPtbr", undefined);
                    this.$store.commit("setSubjectEn", undefined);
                    this.$store.commit("setSubjectEs", undefined);
                    this.$store.commit("setTypeOfTemplate", undefined);
                    this.$store.commit("setChannelTM2", undefined);
                    this.$store.commit("setTemplate", undefined);
                    this.$store.commit("setIdPtbr", undefined);
                    this.$store.commit("setIdEn", undefined);
                    this.$store.commit("setIdEs", undefined);
                })
                .catch(e => {
                    this._catchError("error.templates.duplicated.name");
                });
        },

        clear() {
            this.empty = [];
            this.$store.commit("setClosedTicketsPerCompany", this.empty);
            this.$store.commit("setTicketIdFrom", undefined);
            this.$store.commit("setTicketIdInto", undefined);
            this.$store.commit("setRefresh", undefined);
        },

        changePreviewHTML(value) {
            this.showPreviewPTBR = value;
            // var language = window.location.hash.substr(1);
            // this._getLocale() == "pt-br"
            //   ? language.includes("portugu") || !language
            //     ? ()
            //     : language.includes("ingl")
            //     ? (this.showPreviewPTBR = value)
            //     : language.includes("espanhol")
            //     ? (this.showPreviewPTBR = value)
            //     : ""
            //   : "";
            // this._getLocale() == "en"
            //   ? language.includes("portugues") || !language
            //     ? (this.showPreviewPTBR = value)
            //     : language.includes("ingles")
            //     ? (this.showPreviewPTBR = value)
            //     : language.includes("espa")
            //     ? (this.showPreviewPTBR = value)
            //     : ""
            //   : "";
            // this._getLocale() == "es"
            //   ? language == this.$t("templates.pt-br") || !language
            //     ? (this.showPreviewPTBR = value)
            //     : language == this.$t("templates.en")
            //     ? (this.showPreviewPTBR = value)
            //     : language == this.$t("templates.es")
            //     ? (this.showPreviewPTBR = value)
            //     : ""
            //   : "";
        },

        notPreviewHTML() {
            this.changePreviewHTML(undefined);
        },

        showPreviewHTML() {
            this.changePreviewHTML(true);
        },

        tabClicked() {},

        tabChanged() {
            this.textHTMLptbr ? this.$store.commit("setPtbr", this.textHTMLptbr) : "";
            this.subjectHTMLptbr ?
                this.$store.commit("setSubjectPtbr", this.setSubjectPtbr) :
                "";

            this.textHTMLen ? this.$store.commit("setEn", this.textHTMLen) : "";
            this.subjectHTMLen ?
                this.$store.commit("setSubjectEn", this.setSubjectEn) :
                "";

            this.textHTMLes ? this.$store.commit("setEs", this.textHTMLes) : "";
            this.subjectHTMLes ?
                this.$store.commit("setSubjectEs", this.setSubjectEs) :
                "";
            this.ptbr();
            this.en();
            this.es();
        },

        ptbr(key) {
            key
                ?
                (this.textHTMLptbr = this.textHTMLptbr ?
                    this.textHTMLptbr + " " + key.variable :
                    this.$store.getters.getPtbr ?
                    this.$store.getters.getPtbr :
                    key.variable) :
                this.$store.getters.getPtbr ?
                (this.textHTMLptbr = this.$store.getters.getPtbr) :
                "";
            key
                ?
                (this.subjectHTMLptbr = this.subjectHTMLptbr ?
                    this.subjectHTMLptbr + " " + key.variable :
                    this.$store.getters.getSubjectPtbr ?
                    this.$store.getters.getSubjectPtbr :
                    key.variable) :
                this.$store.getters.getSubjectPtbr ?
                (this.subjectHTMLptbr = this.$store.getters.getSubjectPtbr) :
                "";
            this.$store.commit("setSubjectPtbr", this.subjectHTMLptbr);
            this.$store.commit("setPtbr", this.textHTMLptbr);
        },

        en(key) {
            key
                ?
                (this.textHTMLen = this.textHTMLen ?
                    this.textHTMLen + " " + key.variable :
                    this.$store.getters.getEn ?
                    this.$store.getters.getEn :
                    key.variable) :
                this.$store.getters.getEn ?
                (this.textHTMLen = this.$store.getters.getEn) :
                "";
            key
                ?
                (this.subjectHTMLen = this.subjectHTMLen ?
                    this.subjectHTMLen + " " + key.variable :
                    this.$store.getters.getSubjectEn ?
                    this.$store.getters.getSubjectEn :
                    key.variable) :
                this.$store.getters.getSubjectEn ?
                (this.subjectHTMLen = this.$store.getters.getSubjectEn) :
                "";
            this.$store.commit("setSubjectEn", this.subjectHTMLen);
            this.$store.commit("setEn", this.textHTMLen);
        },

        es(key) {
            key
                ?
                (this.textHTMLes = this.textHTMLes ?
                    this.textHTMLes + " " + key.variable :
                    this.$store.getters.getEs ?
                    this.$store.getters.getEs :
                    key.variable) :
                this.$store.getters.getEs ?
                (this.textHTMLes = this.$store.getters.getEs) :
                "";
            key
                ?
                (this.subjectHTMLes = this.subjectHTMLes ?
                    this.subjectHTMLes + " " + key.variable :
                    this.$store.getters.getSubjectEs ?
                    this.$store.getters.getSubjectEs :
                    key.variable) :
                this.$store.getters.getSubjectEs ?
                (this.subjectHTMLes = this.$store.getters.getSubjectEs) :
                "";
            this.$store.commit("setSubjectEs", this.subjectHTMLes);
            this.$store.commit("setEs", this.textHTMLes);
        },

        addValue(key) {
            var language = window.location.hash.substr(1);
            this._getLocale() == "pt-br" ?
                language.includes("portugu") || !language ?
                this.ptbr(key) :
                language.includes("ingl") ?
                this.en(key) :
                language.includes("espanhol") ?
                this.es(key) :
                "" :
                "";
            this._getLocale() == "en" ?
                language == this.$t("templates.pt-br") || !language ?
                this.ptbr(key) :
                language == this.$t("templates.en") ?
                this.en(key) :
                language == this.$t("templates.es") ?
                this.es(key) :
                "" :
                "";
            this._getLocale() == "es" ?
                language.includes("portugues") || !language ?
                this.ptbr(key) :
                language.includes("ingles") ?
                this.en(key) :
                language.includes("espa") ?
                this.es(key) :
                "" :
                "";
        },

        getTemplates(id) {
            Template.getById(id)
                .then(result => {
                    this._getLoading(false);
                    // this.$router.replace({
                    //   params: { id: result.data.content[0].id },
                    // });
                    let typeOfTemplate = {
                        name: result.data.type
                    };
                    this.$store.getters.getTypeOfTemplate ?
                        "" :
                        this.$store.commit("setTypeOfTemplate", typeOfTemplate);
                    this.$store.commit("setChannelTM2", result.data.channel);
                    this.$store.commit("setTemplate", result.data);
                    this.template = result.data;
                    result.data.locales.forEach(element => {
                        if (element.locale == "PT_BR") {
                            this.subjectHTMLptbr = element.subject;
                            this.textHTMLptbr = element.body;
                            this.$store.commit("setIdPtbr", element.id);
                            this.iDptbr = element.id;
                        }
                        if (element.locale == "EN") {
                            this.subjectHTMLen = element.subject;
                            this.textHTMLen = element.body;
                            this.$store.commit("setIdEn", element.id);
                            this.iDen = element.id;
                        }
                        if (element.locale == "ES") {
                            this.subjectHTMLes = element.subject;
                            this.textHTMLes = element.body;
                            this.$store.commit("setIdEs", element.id);
                            this.iDes = element.id;
                        }
                    });
                })
                .catch(e => {
                    this._getLoading(false);
                });
        },

        postForAddTemplate(profile) {
            // this.addTemplate = true;
            // this.$validator.validateAll().then(result => {
            //   if (result) {
            //     this._getLoading(true);
            //     Template.post(profile)
            //       .then(result => {
            //         this.afterPost = true;
            //         this._warning("newProfile.txt.afterCreate");
            //         this.profile.id = result.data.id;
            //         if (this.profile.id) {
            //           this.getRules();
            //         }
            //         this._getLoading(false);
            //       })
            //       .catch(e => {
            //         this._getLoading(false);
            //         this._catchError(e);
            //       });
            //   }
            // });
        },

        putForEditProfile(profile, viaPaginated) {
            // profile.rules.forEach((element, index) => {
            //   element.rule.route == "/list-tickets"
            //     ? profile.rules.splice(index, 1)
            //     : "";
            // });
            // profile.rules.push(this.listTickets);
            Template.put(profile)
                .then(result => {
                    viaPaginated ? "" : this._getLoading(false);
                    this._commitRoles(undefined);
                    this._renewParametersVueX();
                    viaPaginated
                        ?
                        "" :
                        this.$swal.fire({
                            title: `${this.$t("label.template")} ${this.$t(
                  "swal.titleSuccess"
                )}`,
                            text: this.$t("swal.textSuccess"),
                            type: "success",
                            showConfirmButton: true
                        });
                    viaPaginated ? "" : this._getLoading(false);
                    viaPaginated ? "" : this.returnListTemplates();
                })
                .catch(e => {
                    viaPaginated ? "" : this._getLoading(false);
                    viaPaginated
                        ?
                        "" :
                        this.$swal.fire({
                            title: this.$t("swal.titleError"),
                            text: e.response.data.message,
                            showConfirmButton: true
                        });
                });
        },

        returnListTemplates() {
            this._getLoading(false);
            this.$router.push({ path: "/list-templates" });
        },

        validationClass(boolean) {
            return boolean ? "validation-success" : "validation-fail";
        },

        validateBeforeSubmit() {
            this.$store.commit("setRefresh", true);
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.validationGeneral == "validation-fail" ?
                        this.$toaster.error(this.$t("swal.errorFields")) :
                        this.putTemplate();
                } else {
                    this.$toaster.error(this.$t("swal.errorFields"));
                }
            });
        },

        returnListTemplates() {
            this.$router.push({ path: `/list-templates` });
        }
    },
    computed: {
        revertError() {
            this.$store.getters.getRefresh ?
                ((this.errorType = this.$store.getters.getTypeOfTemplate ?
                        false :
                        true),
                    (this.errorChannel = this.$store.getters.getChannelTM2 ?
                        this.$store.getters.getChannelTM2.length > 0 ?
                        false :
                        true :
                        true)) :
                "";
        },

        validationGeneral: function() {
            return this.validationClass(
                this.$store.getters.getTemplate ?
                this.$store.getters.getTemplate.name &&
                this.$store.getters.getTypeOfTemplate &&
                this.$store.getters.getChannelTM2 &&
                this.subjectHTMLptbr &&
                this.textHTMLptbr &&
                this.subjectHTMLen &&
                this.textHTMLen &&
                this.subjectHTMLes &&
                this.textHTMLes :
                ""
                // let teste = true;
                // this.errors.has("template.name") &&
                //   this.template.name &&
                //   this.template.type !== "" &&
            );
        }
    }
};
</script>

<style scoped>
.position-checkbox {
    margin-top: -0.3rem;
    margin-right: 2rem; 
}

.option-write {
    position: center;
    left: 0px;
}

.option-read {
    left: 12px;
}

.position-key-name {
    margin: auto;
}

.position-add-value {
    margin-top: -1.2rem;
    margin-left: 8rem;
}

.rule-border {
    border-bottom: 1px solid;
}

.position-type-of-template {
    margin-left: -11.5rem;
    margin-right: 2.5rem;
}

.position-tabs {
    margin-left: 12.5rem;
    margin-right: 0rem;
}

.position-keys-with-email {
    margin-top: -25.2rem;
}

.position-keys-without-email {
    margin-top: -25.6rem;
    width: 30px;
}

.position-keys-with-html {
    margin-top: -33.1rem;
    width: 30px;
    margin-bottom: 113px;
}

.position-keys-without-html {
    margin-top: -27.3rem;
    width: 30px;
    margin-bottom: 34px;
}

svg:hover #reassign {
    fill: #ff5a5f;
}

.linkformulary {
    padding-top: 30px;
    padding-right: 30px;
    padding-bottom: 50px;
    padding-left: 30px;
}

.form-title {
    padding: 15px 0 0 0;
}

.form-field {
    padding-bottom: 15px;
}

.v--modal-overlay .v--modal-box {
    overflow: visible !important;
    padding: 15px 13px;
}

.jira-componente .btn-jira {
    width: 50%;
}

.option__image {
    height: 20px;
}

.option__image_30 {
    height: 30px;
}

.message-icon {
    width: 16px;
    margin: 1px 5px 0 5px;
}

.position-active {
    margin-top: 1.1rem;
    margin-bottom: -3.7rem;
}

.comment-btn-div {
    padding: 35px 150px 35px 150px;
}

.border-red {
    border-color: red;
    border-style: solid;
}

.textarea-template {
    height: 22rem;
    width: 36.6rem;
    margin-left: -2.1rem;
}

.ck-editor__editable {
    min-height: 500px;
}

.position-keys-length-less-3 {
    margin-bottom: 16rem;
}

.position-keys-length-equal-4 {
    margin-bottom: 10rem;
}

.ck-content {
    height: 500px;
}

.position-question {
    margin-top: -5.1rem;
    margin-bottom: 4.1rem;
    margin-left: 8.9rem;
}

.textarea-subject {
    height: 2rem;
    margin-left: -29px;
    width: 30rem;
    margin-bottom: 0rem;
}

.textarea-subject-without-preview {
    height: 2rem;
    margin-left: -29px;
    width: 36.5rem;
    margin-bottom: 0rem;
}

.position-text {
    margin-top: 0.3rem;
}

.position-eye-preview {
    margin-top: 0.1rem;
    margin-right: 22rem;
    margin-left: 0.5rem;
    cursor: pointer;
    margin-bottom: 0rem;
}

.position-eye-preview-hd {
    margin-top: 0rem;
    margin-right: 12rem;
    margin-left: 2rem;
    cursor: pointer;
    margin-bottom: 0rem;
}

.position-editor-html {
    margin-left: -2.1rem;
}

.position-checkbox-hd {
    width: 1rem;
    margin-top: -1.3rem;
    margin-left: 7.4rem;
}

.position-active-hd {
    margin-top: 0rem;
    margin-bottom: 0rem;
    margin-left: 1rem;
}

.position-question-hd {
    margin-top: -2.3rem;
    margin-bottom: 2rem;
    margin-left: 8.9rem;
}

.position-type-of-template-hd {
    margin-left: -16.6rem;
    margin-right: 2.5rem;
}

.textarea-subject-hd-without-preview {
    height: 2rem;
    margin-left: -29px;
    width: 24.6rem;
    margin-bottom: 0rem;
}

.textarea-subject-full-hd-without-preview {
    height: 2rem;
    margin-left: -29px;
    width: 24.6rem;
    margin-bottom: 0rem;
}

.textarea-subject-hd-with-preview {
    height: 2rem;
    margin-left: -29px;
    width: 30rem;
    margin-bottom: 0rem;
}

.position-has-annex {
    margin-left: 0rem;
    margin-top: 2rem;
    margin-bottom: -3rem;
    width: 10rem;
}
</style>
