<template>
  <div>
    <h3>Your daily calorie threshold limit: <b>{{ dailyThreshold }}</b> calories</h3>
    <el-calendar>
      <template #dateCell="{ data, date }">
        <div>{{ correctDate(date).getDate() }}</div>
        <div
          class="met-goal"
          v-if="daysMeetGoal.indexOf(data.day) > -1"
        >
          Met Goal!
        </div>
    </template>
    </el-calendar>
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
    correctDate(date) {
      return new Date(date.getTime() + 3600 * 1000 * 24);
    }
  },
  created() {
    this.getDatesMeetThreshold();
  },
}
</script>

<style lang="scss" scoped>
.met-goal {
  color: #ff9800;
}
</style>