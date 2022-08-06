<template>
  <div>
    <el-table
      ref="singleTable"
      :data="adminFoodEntries"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
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
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="calories"
        label="Calories">
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price">
        <template slot="header">
          <i class="el-icon-money"></i> Price
        </template>
        <template slot-scope="scope">
          ${{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column
        prop="user"
        label="User">
        <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button circle @click="handleModifyClick" :disabled="currentRow === null">
        <i class="el-icon-edit"></i>
      </el-button>
      <el-button circle type="danger" @click="handleDeleteClick">
        <i class="el-icon-delete"></i>
      </el-button>
      <el-button circle type="primary" @click="handleAddClick">
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <el-dialog
      title="Add food entry"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <FoodEntryForm
        :form="currForm || {}"
        :fullAccess="true"
        :modifyMode="entryModifyMode"
        :entryId="currentRow?._id || ''"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FoodEntryForm from './FoodEntryForm.vue';

export default {
  components: {
    FoodEntryForm,
  },
  data() {
    return {
      currentRow: null,
      dialogVisible: false,
      entryModifyMode: false,
    }
  },
  computed: {
    ...mapState(['adminFoodEntries']),
    currForm() {
      if (this.currentRow === null) return null;
      const {name, date, calories, price, user} = this.currentRow
      return {
        name,
        date,
        calories,
        price,
        user: user.username,
      }
    },
  },
  async created() {
    await this.getFoodEntriesForAll();
  },
  methods: {
    ...mapActions(['getFoodEntriesForAll']),
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    clearSelection() {
      this.$refs.singleTable.setCurrentRow(null);
      this.handleCurrentChange(null);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleModifyClick() {
      this.entryModifyMode = true;
      this.dialogVisible = true;
    },
    handleDeleteClick() {

    },
    handleAddClick() {
      this.clearSelection();
      this.entryModifyMode = false;
      this.dialogVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .el-table__body td.el-table__cell {
    cursor: pointer;
  }
  .el-table__body tr.current-row>td.el-table__cell {
    background-color: #a3a3a3;
    color: white;
  }
}
</style>