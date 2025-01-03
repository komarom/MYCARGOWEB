<template>
  <div class="list-container">
    <div class="search-area">
      <el-form :inline="true">
        <el-form-item label="Search">
          <el-input v-model="searchKeyword" placeholder="Enter search keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">Search</el-button>
          <el-button type="success" @click="handleCreate">Create</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column 
        v-for="column in columns" 
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      />
      <el-table-column label="Actions" width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-area">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchKeyword: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
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
  }}
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
