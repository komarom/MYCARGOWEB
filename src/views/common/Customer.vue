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
  name: 'CustomerList',
  components: {
    BaseList
  },
  data() {
    return {
      columns: [
        { prop: 'customerCode', label: 'Customer Code', width: '150' },
        { prop: 'customerName', label: 'Customer Name', width: '200' },
        { prop: 'customerType', label: 'Customer Type', width: '150' },
        { prop: 'address', label: 'Address', width: '300' },
        { prop: 'contact', label: 'Contact', width: '150' },
        { prop: 'useYn', label: 'Use Y/N', width: '100' }
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
