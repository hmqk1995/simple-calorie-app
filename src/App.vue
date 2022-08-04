<template>
  <div id="app">
    <LoginPanel />
    <AddFoodEntry />
    <FoodEntryList />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import AddFoodEntry from './components/AddFoodEntry.vue';
import FoodEntryList from './components/FoodEntryList.vue';

export default {
  name: 'App',
  components: {
    LoginPanel,
    AddFoodEntry,
    FoodEntryList,
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