<template>
  <el-container style="height: 100vh;">
    <el-aside width="auto">
      <el-menu
        :default-active="MenuItem.FoodEntries"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <h3 class="header-title">
          <i class="el-icon-milk-tea"></i>
          Simple Calorie App
        </h3>
        <el-menu-item :index="MenuItem.FoodEntries">
          <i class="el-icon-burger"></i>
          <span slot="title">Food Entries</span>
        </el-menu-item>
        <el-menu-item :index="MenuItem.Calendar">
          <i class="el-icon-date"></i>
          <span slot="title">Calendar</span>
        </el-menu-item>
        <el-menu-item :index="MenuItem.AddFoodEntry">
          <i class="el-icon-edit"></i>
          <span slot="title">Add Entry</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <FoodEntryList v-if="currMenu === MenuItem.FoodEntries" />
        <CalorieCalendar v-if="currMenu === MenuItem.Calendar" />
        <AddFoodEntry v-if="currMenu === MenuItem.AddFoodEntry" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AddFoodEntry from '../components/AddFoodEntry.vue';
import FoodEntryList from '../components/FoodEntryList.vue';
import CalorieCalendar from '../components/CalorieCalendar.vue';

const MenuItem = {
  FoodEntries: '1',
  Calendar: '2',
  AddFoodEntry: '3',
}

export default {
  components: {
    AddFoodEntry,
    FoodEntryList,
    CalorieCalendar,
  },
  data() {
    return {
      MenuItem,
      currMenu: MenuItem.FoodEntries,
    }
  },
  methods: {
    handleSelect(index) {
      this.currMenu = index.toString();
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