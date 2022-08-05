<template>
  <el-container style="height: 100vh;">
    <el-aside width="auto">
      <el-menu
        :default-active="currTab"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleTabMenuSelect"
      >
        <h3 class="header-title">
          <i class="el-icon-milk-tea"></i>
          Simple Calorie App
        </h3>
        <el-menu-item :index="TabMenuItem.FoodEntries">
          <i class="el-icon-burger"></i>
          <span slot="title">Food Entries</span>
        </el-menu-item>
        <el-menu-item :index="TabMenuItem.Calendar">
          <i class="el-icon-date"></i>
          <span slot="title">Calendar</span>
        </el-menu-item>
        <el-menu-item :index="TabMenuItem.AddFoodEntry">
          <i class="el-icon-edit"></i>
          <span slot="title">Add Entry</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <FoodEntryList v-if="currTab === TabMenuItem.FoodEntries"/>
        <CalorieCalendar v-if="currTab === TabMenuItem.Calendar" />
        <AddFoodEntry
          v-if="currTab === TabMenuItem.AddFoodEntry"
          @submit="handleFoodEntrySubmit"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AddFoodEntry from '../components/AddFoodEntry.vue';
import FoodEntryList from '../components/FoodEntryList.vue';
import CalorieCalendar from '../components/CalorieCalendar.vue';
import { TabMenuItem } from '@/const/index';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    AddFoodEntry,
    FoodEntryList,
    CalorieCalendar,
  },
  data() {
    return {
      TabMenuItem,
    }
  },
  computed: {
    ...mapState(['currTab']),
  },
  methods: {
    ...mapMutations(['setCurrTab']),
    ...mapActions(['addFoodEntry', 'getFoodEntries']),
    handleTabMenuSelect(index) {
      this.setCurrTab(index);
    },
    async handleFoodEntrySubmit(form) {
      await this.addFoodEntry(form);
      await this.getFoodEntries();
      this.setCurrTab(TabMenuItem.FoodEntries);
      this.$notify({
        title: 'Success',
        message: 'Food entry has been added!',
        type: 'success'
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.header-title {
  color: white;
  padding: 0 20px;
}
.fold {
  color: white;
  padding: 0 20px;
  cursor: pointer;
  i {
    width: 22px;
    font-size: 22px;
  }
}
/deep/ {
  .el-menu {
    border-right: solid 1px #545c64;
  }
  .el-aside {
    background-color: #545c64;
  }
}
</style>