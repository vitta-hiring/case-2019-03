<template>
  <div>
    <div class="fileinput-new thumbnail labels-preview">
      <div class="flex flex-align-items-center margin-8-b">
        <img src="/static/icons/upload.svg" class="image-upload">
        <input
          type="file"
          name="..."
          :multiple="true"
          aria-invalid="false"
          id="file"
          class="inputfile"
          v-bind:file="this.imageId"
          @change="handlePreview"
          data-multiple-caption="{count} files selected"
        >
        <label for="file">{{ $t('newTicket.form.ticket.selectFile') }}</label>
      </div>

      <div class="span-file" v-if="fileExists">
        <span v-for="(doc, index) in docs" :key="index">
          <span v-if="doc.url"><a :href="doc.url" target="_blank">{{doc.name}}</a></span>
          <span v-else>{{doc.name}}</span>
          <img
            src="/static/icons/validation-fail.svg"
            style="height: 1rem; padding-left: 5px; cursor: pointer"
            v-on:click="removeFile(index)"
          >
        </span>
      </div>

      <div class="labels-position">
        <div v-show="!fileExists" class="btn btn-info text-center btn-simple btn-file">
          <span class="justify-content-center fileinput-new"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Prescription from "src/backend/models/Prescription.js";
import Store from "src/backend/store";

export default {
  name: "image-upload",
  props: {
    ticketId: {
      type: String
    },
    imageId: {
      type: String,
      default: "id"
    },
    logo: {
      type: String,
      default: "/static/icons/folder.svg"
    },
    type: {
      type: String,
      default: "",
      description: 'Image upload type (""|avatar)'
    },
    src: {
      type: String,
      default: "../../public/static/img/file.svg",
      description: "Initial image to display"
    },
    selectText: {
      type: String,
      default: "Selecionar"
    },
    changeText: {
      type: String,
      default: "Alterar"
    },
    removeText: {
      type: String,
      default: "Remover"
    },
    iconScale: {
      type: String,
      default: "1"
    },
    startDocs:{
      type: Array,
      default: ()=>[]
    },
    cleanFiles: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let avatarPlaceholder = "../../public/static/img/files.png";
    return {
      placeholder: this.type === "avatar" ? avatarPlaceholder : "",
      imagePreview: null,
      fileName: undefined,
      docs: [...this.startDocs]
    };
  },
  watch:{
    startDocs(next){
      this.docs = next;
    },
    cleanFiles: function(value){
      if(value){
        this.docs = [];
        this.$emit("cleaned");
      }
    }
  },
  computed: {
    fileExists() {
      return this.file !== null;
    },
    image() {
      return this.imagePreview || this.logo || this.placeholder;
    }
  },
  methods: {
    sendFile(file, extension, name) {
      this.temp = file.split(";base64").pop();
      file = this.temp;
      let fileUpload = {
        encodedBytes: file,
        extension: extension,
        document: name
      };
      Store.commit("setUpload", fileUpload);
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    handlePreview(event) {
      this.upload = undefined;
      const filesToUpload = [];
      for (var [key, value] of Object.entries(event.target.files)) {
        value.extension = "." + value.name.split(".").pop();
        this.docs.push(value);
        filesToUpload.push(value);
      }
      filesToUpload.forEach(element => {
        this.getBase64(element)
          .then(result => {
            this.sendFile(result, element.extension, element.name);
          })
          .catch(e => {});
      });
      file.value = '';
      this.$emit("change", file);
    },
    removeFile: function(index) {
      const removedFile = this.docs[index];
      if(!!removedFile.id){
        Store.commit("setRemovedFiles", removedFile);
      } else {
        Store.commit("removeUpload", removedFile.name);
      }
      this.docs.splice(index, 1);
    }
  }
};
</script>

<style>
.logo-sidebar {
  max-width: 48px;
  position: relative;
  border-style: none;
  background-color: #ffffff;
}
.icon-custom {
  margin-bottom: 12px;
}
.labels-preview {
  min-width: 210px;
}
.labels-position {
  margin-left: 2%;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  /* btn-jira */
}
.inputfile + label {
  height: 2rem;
  border-radius: 5px;
  background-color: #ffffff;
  background-size: cover;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  color: #9a9a9a;
  font-weight: 500;
  line-height: 14px;
  padding: 8px 10px 10px 25px;
  cursor: pointer;
}
.inputfile:focus + label,
.inputfile + label:hover {
  background-color: rgb(72, 186, 198);
  background-image: none;
  color: #fff;
}
.inputfile + label {
  cursor: pointer; /* "hand" cursor */
}
.inputfile:focus + label {
  background-color: rgb(0, 151, 167);
  background-image: none;
  color: #fff;
}
.inputfile + label * {
  pointer-events: none;
}

.image-upload {
  position: absolute;
  margin-left: 5px;
}

.span-file {
  padding: 2px 0px 1px 15px;
}
</style>
