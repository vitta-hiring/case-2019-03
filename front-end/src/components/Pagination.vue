<template>
  <ul class="pagination" :class="paginationClass">
    <li class="page-item prev-page" :class="{disabled: value === 1}">
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <span>«</span>
      </a>
    </li>
    <li
      class="page-item"
      :class="{active: value === item}"
      v-for="item in range(minPage, maxPage)"
      v-bind:key="item.id"
    >
      <a class="page-link" @click="changePage(item)">{{item}}</a>
    </li>
    <li class="page-item page-pre next-page" :class="{disabled: value === totalPages}">
      <a class="page-link" aria-label="Next" @click="nextPage">
        <span>»</span>
      </a>
    </li>
  </ul>
</template>
<script>
import Prescription from "src/backend/models/Prescription.js";

import swal from "sweetalert2";
export default {
  name: "l-pagination",
  props: {
    listTickets: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "",
      validator: value => {
        return [
          "",
          "blue",
          "azure",
          "green",
          "orange",
          "red",
          "purple"
        ].includes(value);
      }
    },
    pageCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 3
    },
    value: {
      type: Number,
      default: 1
    }
  },
  created() {},
  computed: {
    paginationClass() {
      return `pagination-${this.color}`;
    },
    totalPages() {
      if (this.pageCount > 0) return this.pageCount;
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage);
      }
      return 1;
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages;
      }
      return this.defaultPagesToDisplay;
    },
    minPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1;
        }
        return this.value - pagesToAdd;
      } else {
        return 1;
      }
    },
    maxPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage < this.totalPages) {
          return newMaxPage;
        } else {
          return this.totalPages;
        }
      } else {
        return this.pagesToDisplay;
      }
    }
  },
  data() {
    return {
      defaultPagesToDisplay: 11
    };
  },
  methods: {
    catchError(e) {
      swal.fire({
        title: "Erro na busca dos registros",
        text: e.response.data.message,
        type: "error",
        showConfirmButton: true,
        timer: 5000
      });
    },
    setArray(result) {
      let fname = null;
      let lname = null;
      let array_result = null;
      let result_query = result.data.content;
      array_result = result.data.content;
      for (var index in result_query) {
        fname = !result_query[index]["firstName"]
          ? ""
          : result_query[index]["firstName"];
        lname = !result_query[index]["lastName"]
          ? ""
          : result_query[index]["lastName"];
        array_result[index]["name"] = fname + " " + lname;
        array_result[index]["active"]
          ? (array_result[index]["active"] = "Ativo")
          : (array_result[index]["active"] = "Inativo");
      }
      this.$store.commit("setTicketsPages", result.data.content);
      //this._getLoading(false);
    },
    range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    changePage(item) {
      this.callUsers(item);
      this.$emit("input", item);
    },
    nextPage() {
      this.callUsers(this.value + 1);
      if (this.value < this.totalPages) {
        this.$emit("input", this.value + 1);
      }
    },
    prevPage() {
      this.callUsers(this.value - 1);
      if (this.value > 1) {
        this.$emit("input", this.value - 1);
      }
    },
    page(profileDynamic, numberPage) {
    },

    setTicketsPage(numberPage) {
      this._getLoading(true);
      Ticket.get(numberPage - 1)
        .then(result => {
          this.setArray(result);
        })
        .catch(e => {
          this.catchError(e);
        });
    },

    callUsers(numberPage) {
      if (this.$store.getters.getUser.profile) {
        if (this.$store.getters.getUser.admin) {
          this.profileDynamic = "ROLE_ADMIN";
          this.page(this.profileDynamic, numberPage);
        } else {
          this.profileDynamic = this.$store.getters.getUser.profile;
          this.page(this.profileDynamic, numberPage);
        }
      } else {
        this.profileDynamic = this.profile;
        this.page(this.profileDynamic, numberPage);
      }
    }
  },
  watch: {
    perPage(value) {
      this.$emit("input", 1);
    },
    total(value) {
      this.$emit("input", 1);
    }
  }
};
</script>
<style scoped>
.pagination {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
.pagination .page-item .page-link {
  border-radius: 50%;
  margin: 0 2px;
  color: #797979;
  padding: 6px 12px;
}

.pagination .page-item .page-link:hover {
  background-color: #eee;
  border-color: #ddd;
}

.pagination .page-item.active .page-link {
  background-color: #0097a7;
  border: 0;
  color: #ffffff !important;
  padding: 7px 13px;
}

.pagination .page-item:first-child .page-link,
.pagination .page-item:last-child .page-link {
  border-radius: 50%;
}

.pagination > li.disabled {
  opacity: 0.4;
}

.pagination.pagination-no-border > li > a,
.pagination.pagination-no-border > li > span {
  border: 0;
}

.pagination > li > a,
.pagination > li > span,
.pagination > li:first-child > a,
.pagination > li:first-child > span,
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-radius: 50%;
  margin: 0 2px;
  color: #797979;
}

.pagination > li.active > a,
.pagination > li.active > span,
.pagination > li.active > a:hover,
.pagination > li.active > span:hover,
.pagination > li.active > a:focus,
.pagination > li.active > span:focus {
  background-color: #23ccef;
  border: 0;
  color: #ffffff;
  padding: 7px 13px;
}
.pagination-blue > li.active a,
.pagination-blue > li.active a:hover,
.pagination-blue > li.active a:focus,
.pagination-blue > li.active span,
.pagination-blue > li.active span:hover,
.pagination-blue > li.active span:focus {
  background-color: #447df7 !important;
}
.pagination-azure li.active a,
.pagination-azure li.active a:hover,
.pagination-azure li.active a:focus,
.pagination-azure li.active span,
.pagination-azure li.active span:hover,
.pagination-azure li.active span:focus {
  background-color: #23ccef !important;
}
.pagination .page-number a {
  padding: 7px 12px;
}
.pagination {
  margin: 0;
}

.pagination a {
  padding: 6px 12px;
  line-height: 1.428571429;
}

.pagination-info {
  line-height: 34px;
  margin-right: 5px;
}

.pagination .btn-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.pagination .page-list {
  display: inline-block;
}

.disabled {
  pointer-events: none;
}
</style>

