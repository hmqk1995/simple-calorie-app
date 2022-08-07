<template>
  <div>
    <h3>Your daily calorie threshold limit: <b>{{ dailyThreshold }}</b> calories</h3>
    <h3>You have exceeded your monthly spending limit this month. Spent: $1200</h3>
    <el-calendar v-model="currDateCorrected">
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
  data() {
    return {
      currDate: '',
    }
  },
  computed: {
    currDateCorrected: {
      get() {
        return this.currDate;
      },
      set(val) {
        this.currDate = new Date(val.getTime() + val.getTimezoneOffset() * 60000);
      },
    },
    ...mapState([
      'dailyThreshold',
      'daysAndCaloriesMeetGoal',
      'monthsExceedingSpendingLimit',
    ]),
    daysMeetGoal() {
      return this.daysAndCaloriesMeetGoal.map(item => item.date);
    },
  },
  methods: {
    ...mapActions([
      'getDatesMeetThreshold',
      'getMonthsMeetSpendingLimit',
    ]),
    correctDate(date) {
      return new Date(date.getTime() + 3600 * 1000 * 24);
    }
  },
  async created() {
    await this.getDatesMeetThreshold();
    await this.getMonthsMeetSpendingLimit();
  },
}
</script>

<style lang="scss" scoped>
.met-goal {
  color: #ff9800;
}
</style>