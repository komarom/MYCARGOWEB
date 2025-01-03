<template>
  <div class="create-container">
    <div class="header">
      <h2>{{ isEdit ? 'Edit Ocean Export H-B/L' : 'Create Ocean Export H-B/L' }}</h2>
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="H-B/L No.">
        <el-input v-model="form.hblNo" />
      </el-form-item>
      
      <el-form-item label="Vessel Name">
        <el-input v-model="form.vesselName" />
      </el-form-item>

      <el-form-item label="Voyage No.">
        <el-input v-model="form.voyageNo" />
      </el-form-item>

      <el-form-item label="Shipper">
        <el-input v-model="form.shipper" />
      </el-form-item>

      <el-form-item label="Consignee">
        <el-input v-model="form.consignee" />
      </el-form-item>

      <el-form-item label="Departure">
        <el-input v-model="form.departure" />
      </el-form-item>

      <el-form-item label="Arrival">
        <el-input v-model="form.arrival" />
      </el-form-item>

      <el-form-item label="ETD">
        <el-date-picker
          v-model="form.etd"
          type="date"
          placeholder="Select ETD"
        />
      </el-form-item>

      <el-form-item label="ETA">
        <el-date-picker
          v-model="form.eta"
          type="date"
          placeholder="Select ETA"
        />
      </el-form-item>

      <el-form-item label="Status">
        <el-select v-model="form.status">
          <el-option label="In Progress" value="In Progress" />
          <el-option label="Completed" value="Completed" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Save</el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      form: {
        hblNo: '',
        vesselName: '',
        voyageNo: '',
        shipper: '',
        consignee: '',
        departure: '',
        arrival: '',
        etd: null,
        eta: null,
        status: 'In Progress'
      }
    }
  },
  methods: {
    handleSubmit() {
      // Submit implementation
    },
    handleCancel() {
      // Cancel implementation
    }
  }
}
</script>

<style scoped>
.create-container {
  padding: 20px;
}
.header {
  margin-bottom: 20px;
}
</style>
