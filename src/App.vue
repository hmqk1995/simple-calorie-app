<template>
  <div id="app">
    <LoginPanel />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';

export default {
  name: 'App',
  components: {
    LoginPanel,
  }
}
</script>