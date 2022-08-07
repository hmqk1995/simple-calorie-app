<template>
  <div>
    <el-table
      ref="singleTable"
      :data="adminFoodEntries"
      height="80vh"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column
        sortable
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
      <el-table-column
        sortable
        :sort-method="handleUserSort"
        prop="user"
        label="User">
        <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button class="modify-button" circle @click="handleModifyClick" :disabled="currentRow === null">
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
      :title="`${entryModifyMode ? 'Modify' : 'Create' } food entry`"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <FoodEntryForm
        :form="currForm || {}"
        :fullAccess="true"
        :modifyMode="entryModifyMode"
        :entryId="currentRow?._id || ''"
        @submit="handleFoodEntryFormSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FoodEntryForm from '@/components/FoodEntryForm.vue';

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
    ...mapState([
      'adminFoodEntries',
    ]),
    currForm() {
      if (this.currentRow === null) return null;
      const {name, date, calories, price, user} = this.currentRow;
      return {
        name,
        date,
        calories,
        price,
        username: user.username,
      }
    },
  },
  async created() {
    await this.getFoodEntriesForAll();
  },
  methods: {
    ...mapActions([
      'getFoodEntriesForAll',
      'addFoodEntry',
      'updateFoodEntry',
      'deleteFoodEntry',
    ]),
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
      this.$confirm('Are you sure to delete this entry?')
      .then(async () => {
        await this.deleteFoodEntry({
          _id: this.currentRow._id,
        });
        await this.getFoodEntriesForAll();
        this.$notify({
          title: 'Success',
          message: 'Food entry has been deleted!',
          type: 'success'
        });
      })
      .catch(() => {});
    },
    handleAddClick() {
      this.clearSelection();
      this.entryModifyMode = false;
      this.dialogVisible = true;
    },
    async handleFoodEntryFormSubmit(form) {
      const { name, date, calories, price, username } = form;
      let successMsg = '';
      if (this.entryModifyMode) {
        // modify
        await this.updateFoodEntry(
          {
            _id: this.currentRow._id,
            form: {
              name,
              date,
              calories,
              price,
            },
          }
        );
        successMsg = 'Food entry has been modified!';
      } else {
        // create
        try {
          await this.addFoodEntry({
            name,
            date,
            calories,
            price,
            username,
          });
        } catch(error) {
          this.$notify({
            title: 'Error',
            message: 'Cannot find the user!',
            type: 'error'
          });
          return;
        }
        successMsg = 'Food entry has been added!';
      }
      this.dialogVisible = false;
      await this.getFoodEntriesForAll();
      this.$notify({
        title: 'Success',
        message: successMsg,
        type: 'success'
      });
    },
    handleUserSort(a, b) {
      return a?.user?.username.localeCompare(b?.user?.username);
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
    background-color: #3e9fff;
    color: white;
  }
  .modify-button:not(.is-disabled) {
    background-color: #555c64;
    color: white;

    &:hover {
      background-color: #85919f;
      color: white;
    }
  }
}
</style>