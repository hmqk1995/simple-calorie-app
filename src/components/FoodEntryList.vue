<template>
  <div>
    <el-date-picker
      v-model="dataRange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-table
      height="80vh"
      :data="foodEntriesFiltered"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dataRange: [],
      foodEntriesFiltered: [],
    }
  },
  computed: {
    ...mapState(['foodEntries']),
  },
  created() {
    this.foodEntriesFiltered = this.foodEntries.slice();
  },
  watch: {
    dataRange() {
      if (this.dataRange === null) {
        this.dataRange = [];
        this.foodEntriesFiltered = this.foodEntries.slice();
        return;
      }
      if (this.dataRange.length === 0) {
        return;
      }
      const startDate = this.dataRange[0];
      const endDate = new Date(this.dataRange[1].getTime() + 1000 * 60 * 60 * 24);
      this.foodEntriesFiltered = this.foodEntries.slice().reduce((array, entry)=> {
        const isNotInRange =
          (startDate && new Date(entry.date) < new Date(startDate)) ||
          (endDate && new Date(entry.date) > new Date(endDate));
        if (!isNotInRange) {
          array.push(entry);
        }
        return array;
      }, []);
    },
    foodEntries() {
      this.foodEntriesFiltered = this.foodEntries.slice();
    }
  }
}
</script>