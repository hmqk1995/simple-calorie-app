<template>
  <el-table
    :data="foodEntries"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="Date"
    >
    <template slot-scope="scope">
      {{ new Date(scope.row.date).toLocaleString() }}
    </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      sortable
      prop="calories"
      label="Calories">
    </el-table-column>
    <el-table-column
      sortable
      prop="price"
      label="Price">
      <template slot="header">
        <i class="el-icon-money"></i> Price
      </template>
      <template slot-scope="scope">
        ${{scope.row.price}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['foodEntries']),
  }
}
</script>