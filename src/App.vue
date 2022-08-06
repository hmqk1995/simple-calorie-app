<template>
  <div id="app">
    <DashboardView v-if="username" />
    <LoginPanel v-else />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import DashboardView from './views/DashboardView.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    LoginPanel,
    DashboardView,
  },
  async created() {
    const isValid = await this.validateToken({
      username: sessionStorage.getItem('username'),
      access_token: sessionStorage.getItem('access_token'),
    });
    if (isValid) {
      this.getFoodEntries();
    }
  },
  computed: {
    ...mapState([
      'username',
      'access_token',
    ]),
  },
  methods: {
    ...mapActions([
      'validateToken',
      'getFoodEntries',
    ]),
  },
}
</script>

<style lang="scss">
html, body, #app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>