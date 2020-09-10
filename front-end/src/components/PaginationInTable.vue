<template>
  <div
    v-if="data.length > 0"
    class="flex-full flex-space-between flex-align-items-center padding-10-trbl"
  >
    <div
      class="f-12-300-gray padding-10-l"
    >{{ $t('listOfDepartments.list.showing') }} {{ from + 1 }} {{ $t('listOfDepartments.list.of') }} {{ to }} {{ $t('listOfDepartments.list.out') }} {{ total }} {{ $t('listOfDepartments.list.registers') }}</div>
    <l-pagination
      style="float:right;"
      class="pagination-no-border"
      v-model="pagination.currentPage"
      :per-page="pagination.perPage"
      :total="pagination.total"
    ></l-pagination>
  </div>
</template>

<script>
export default {
  created() {
  },

  computed: {
    to() {
      return this._to(this.from, this.pagination.numberOfElements, this.total);
    },

    from() {
      return this._from(this.pagination.perPage, this.pagination.currentPage);
    },

    total() {
      return this.pagination.total;
    }
  },

  watch: {
    "pagination.currentPage": function(next, curr) {
      if (next != curr) {
        this.$emit("getRefresh", next)
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: undefined
    },
    pagination: {
      type: Object
    }
  }
};
</script>
</script>