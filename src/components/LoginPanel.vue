<template>
  <div class="login">
    <el-input placeholder="Please input username" v-model="username"></el-input>
     <el-input placeholder="Please input access secret key" v-model="key"></el-input>
    <el-button @click="handleLoginButtonClick" type="primary">Login</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      key: '',
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