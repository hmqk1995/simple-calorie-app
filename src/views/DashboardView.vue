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
        <el-submenu v-if="isAdmin" :index="TabMenuItem.AdminPanel">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">Admin</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="TabMenuItem.EntryManagement">
              <i class="el-icon-s-order"></i>
              <span slot="title">Managing Entries</span>
            </el-menu-item>
            <el-menu-item :index="TabMenuItem.EntryReport">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">Report</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <FoodEntryList v-if="currTab === TabMenuItem.FoodEntries"/>
        <CalorieCalendar v-if="currTab === TabMenuItem.Calendar" />
        <AddFoodEntryView v-if="currTab === TabMenuItem.AddFoodEntry" />
        <EntryManagement v-if="isAdmin && currTab === TabMenuItem.EntryManagement" />
        <EntryReport v-if="currTab === TabMenuItem.EntryReport" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AddFoodEntryView from './AddFoodEntryView.vue';
import FoodEntryList from '../components/FoodEntryList.vue';
import CalorieCalendar from '../components/CalorieCalendar.vue';
import EntryManagement from '@/views/EntryManagement.vue';
import EntryReport from '@/views/EntryReport.vue';
import { TabMenuItem } from '@/const/index';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    AddFoodEntryView,
    FoodEntryList,
    CalorieCalendar,
    EntryManagement,
    EntryReport,
  },
  data() {
    return {
      TabMenuItem,
    }
  },
  computed: {
    ...mapState(['currTab', 'role']),
    isAdmin() {
      return this.role === 'admin';
    },
  },
  methods: {
    ...mapMutations(['setCurrTab']),
    handleTabMenuSelect(index) {
      this.setCurrTab(index);
    },
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
  .el-submenu__title i {
    color:white;
  }
}
</style>