<template>
  <div class="login">
    <div class="login-container">
      <h3>
        <i class="el-icon-milk-tea"></i>
        Simple Calorie App
      </h3>
      <el-input placeholder="Please input username" v-model="username"></el-input>
      <el-input placeholder="Please input access secret key" v-model="key"></el-input>
      <el-button @click="handleLoginButtonClick" type="primary">Login</el-button>
    </div>
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
    async handleLoginButtonClick() {
      try {
        await this.login({
          username: this.username,
          access_secret: this.key,
        });
      } catch (error) {
        this.$notify({
          title: 'Error',
          message: error.message,
          type: 'error'
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  gap: 8px;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(45deg, #ffe28b, #ff5722);
}
.login-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>