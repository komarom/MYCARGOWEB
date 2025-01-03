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
import BaseList from '@/views/common/BaseList.vue'

export default {
  components: {
    BaseList
  },
  data() {
    return {
      columns: [
        { prop: 'mblNo', label: 'M-B/L No.', width: '150' },
        { prop: 'flightNo', label: 'Flight No.', width: '120' },
        { prop: 'carrier', label: 'Carrier', width: '150' },
        { prop: 'departure', label: 'Departure', width: '120' },
        { prop: 'arrival', label: 'Arrival', width: '120' },
        { prop: 'etd', label: 'ETD', width: '120' },
        { prop: 'eta', label: 'ETA', width: '120' },
        { prop: 'status', label: 'Status', width: '100' }
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
