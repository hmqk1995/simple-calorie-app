<template>
  <div class="login">
    <el-input placeholder="Please input" v-model="username"></el-input>
    <el-button @click="handleLoginButtonClick" type="primary">Login</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLoginButtonClick() {
      this.login(this.username);
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  gap: 8px;
}
</style>