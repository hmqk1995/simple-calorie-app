<template>
  <div>
    <div>Your daily calorie threshold limit: <b>{{ dailyThreshold }}</b> calories</div>
    <el-calendar>
      <template #dateCell="{ data, date }">
        <div>{{ correctDate(date).getDate() }}</div>
        <div
          v-if="daysMeetGoal.indexOf(data.day) > -1"
        >
          Met Goal
        </div>
    </template>
    </el-calendar>
    <el-button @click="handleClick">Get Days that met Goals</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'dailyThreshold',
      'daysAndCaloriesMeetGoal',
    ]),
    daysMeetGoal() {
      return this.daysAndCaloriesMeetGoal.map(item => item.date);
    },
  },
  methods: {
    ...mapActions(['getDatesMeetThreshold']),
    handleClick() {
      this.getDatesMeetThreshold();
    },
    correctDate(date) {
      return new Date(date.getTime() + 3600 * 1000 * 24);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>