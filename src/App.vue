<template>
  <div id="app">
    <DashboardView v-if="username" />
    <LoginPanel v-else />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import DashboardView from './views/DashboardView.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    LoginPanel,
    DashboardView,
  },
  created() {
    sessionStorage.clear();
  },
  computed: {
    ...mapState(['username']),
  }
}
</script>

<style lang="scss">
html, body, #app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>