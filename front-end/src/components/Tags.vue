<template>
  <multiselect
    :searchable="true"
    :loading="isLoading"
    :internal-search="true"
    :clear-on-select="true"
    :close-on-select="true"
    @search-change="asyncFind"
    v-if="tags"
    :block-keys="['Delete']"
    label="name"
    v-model="tag"
    :options="tags"
    track-by="name"
    :multiple="true"
    :taggable="taggable"
    @tag="addTag"
    @input="changeObserver()"
    :placeholder="$t('listOfTickets.filter.filterByTags')"
  >
    {{ tagsRefresh }}
    <template slot="noOptions">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Tag from "src/backend/models/Tag";

export default {
  components: {
    Tag
  },

  data() {
    return {
      selectedCountries: [],
      countries: [],
      isLoading: false,
      tags: [],
      tag: []
    };
  },

  props: {
    taggable: {
      type: Boolean,
      default: false
    },
    listTickets: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    tagsRefresh: function() {
      return "";
    },

    isDisabled() {
      return false;
    }
  },

  methods: {
    limitText(count) {
      return `and ${count} other countries`;
    },

    asyncFind(query) {
      this.isLoading = true;
      Tag.query(query).then(response => {
        this.tags = response.data.content;
        this.isLoading = false;
      });
    },

    clearAll() {
      this.selectedCountries = [];
    },

    addTag(newTag) {
      const tag = {
        name: newTag
      };
      this.tag.push(tag);
    },

    changeObserver() {
      this.$store.commit("setTags", this.tag);
      return this.tags;
    },

    tagRequest() {
      Tag.get()
        .then(result => {
          this.$store.commit("setTagsArray", result.data.content);
          this.tags = result.data.content;
        })
        .catch(e => {});
    },

    getTags() {
      this.$store.getters.getTags
        ? ((this.tag = this.$store.getters.getTags),
          this.$store.getters.getTagsArray
            ? (this.tags = this.$store.getters.getTagsArray)
            : this.tagRequest())
        : this.$store.getters.getTagsArray
        ? (this.tags = this.$store.getters.getTagsArray)
        : this.tagRequest();
    }
  },

  created() {
    this.getTags();
  }
};
</script>
<style>
</style>
