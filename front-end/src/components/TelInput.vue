<template></template>

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

    updateTags: async function() {
      this.$store.getters.getTags
        ? (this.tag = this.$store.getters.getTags)
        : (this.tag = []);
    },

    populatedOptionsTags: async function() {
      await Tag.get()

        .then(result => {
          this.tags = result.data.content;
        })

        .catch(e => {});
    }
  },

  created() {}
};
</script>
<style>
</style>
