<template>
  <div id="app">
    <LoginPanel />
    <el-row :gutter="20">
      <el-col :span="10">
        <AddFoodEntry />
        <CalorieCalendar />
      </el-col>
      <el-col :span="14">
        <FoodEntryList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import AddFoodEntry from './components/AddFoodEntry.vue';
import FoodEntryList from './components/FoodEntryList.vue';
import CalorieCalendar from './components/CalorieCalendar.vue';

export default {
  name: 'App',
  components: {
    LoginPanel,
    AddFoodEntry,
    FoodEntryList,
    CalorieCalendar,
  },
  created() {
    sessionStorage.clear();
  },
}
</script>

<style lang="scss">
html, body, #app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>