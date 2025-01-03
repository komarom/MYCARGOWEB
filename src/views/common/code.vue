<template>
  <base-list
    :columns="columns"
    @search="onSearch"
    @create="onCreate"
    @edit="onEdit"
    @delete="onDelete"
    @size-change="onSizeChange"
    @page-change="onPageChange"
  />
</template>

<script>
import BaseList from './BaseList.vue'

export default {
  name: 'CodeList',
  components: {
    BaseList
  },
  data() {
    return {
      columns: [
        { prop: 'codeId', label: 'Code ID', width: '150' },
        { prop: 'codeName', label: 'Code Name', width: '200' },
        { prop: 'codeDesc', label: 'Description', width: '250' },
        { prop: 'useYn', label: 'Use Y/N', width: '100' },
        { prop: 'sortNo', label: 'Sort No', width: '100' }
      ]
    }
  },
  methods: {
    onSearch() {
      // Search implementation
    },
    onCreate() {
      // Create implementation
    },
    onEdit() {
      // Edit implementation
    },
    onDelete() {
      // Delete implementation
    },
    onSizeChange() {
      // Size change implementation
    },
    onPageChange() {
      // Page change implementation
    }
  }
}
</script>

<style scoped>
.list-container {
  padding: 20px;
}
.search-area {
  margin-bottom: 20px;
}
.pagination-area {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
