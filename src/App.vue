<template>
  <div id="app">
    <LoginPanel />
    <AddFoodEntry />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import AddFoodEntry from './components/AddFoodEntry.vue';

export default {
  name: 'App',
  components: {
    LoginPanel,
    AddFoodEntry,
  }
}
</script>

<style lang="scss">
html, body, #app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>