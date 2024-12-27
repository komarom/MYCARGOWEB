<template>
  <div class="fms-hbl-container">
    <!-- 검색 조건 영역 -->
    <div class="search-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="조회기간">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="~"
            start-placeholder="시작일"
            end-placeholder="종료일"
          />
        </el-form-item>
        <el-form-item label="H B/L No.">
          <el-input v-model="searchForm.hblNo" placeholder="H B/L 번호" />
        </el-form-item>
        <el-form-item label="화주">
          <el-input v-model="searchForm.shipper" placeholder="화주명" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">조회</el-button>
          <el-button @click="resetForm">초기화</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 그리드 영역 -->
    <div class="grid-container">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column prop="hblNo" label="H B/L No." width="150" />
        <el-table-column prop="date" label="등록일자" width="120" />
        <el-table-column prop="shipper" label="화주" width="200" />
        <el-table-column prop="consignee" label="수하인" width="200" />
        <el-table-column prop="origin" label="출발지" width="120" />
        <el-table-column prop="destination" label="도착지" width="120" />
        <el-table-column prop="status" label="진행상태" width="100" />
        <el-table-column prop="etd" label="ETD" width="120" />
        <el-table-column prop="eta" label="ETA" width="120" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 검색 폼 데이터
const searchForm = reactive({
  dateRange: [],
  hblNo: '',
  shipper: ''
})

// 테이블 데이터
const tableData = ref([
  {
    hblNo: 'HBL2024001',
    date: '2024-01-15',
    shipper: '삼성전자',
    consignee: 'SAMSUNG AMERICA',
    origin: 'BUSAN',
    destination: 'LA',
    status: '진행중',
    etd: '2024-01-20',
    eta: '2024-02-05'
  }
  // 더미 데이터 추가 가능
])

// 검색 기능
const handleSearch = () => {
  console.log('검색 조건:', searchForm)
  // API 호출 로직 추가
}

// 폼 초기화
const resetForm = () => {
  searchForm.dateRange = []
  searchForm.hblNo = ''
  searchForm.shipper = ''
}
</script>

<style scoped>
.fms-hbl-container {
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.grid-container {
  background-color: #fff;
  border-radius: 4px;
}
</style>
