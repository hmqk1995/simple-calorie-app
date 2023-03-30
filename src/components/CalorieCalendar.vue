<template>
  <div>
    <h3>Your daily calorie threshold limit: <b>{{ dailyThreshold }}</b> calories</h3>
    <h3 v-if="exceedLimit">{{ exceedLimitMsg }}</h3>
    <el-calendar v-model="currDateCorrected">
      <template #dateCell="{ data, date }">
        <div>{{ correctDate(date).getDate() }}</div>
        <div
          class="met-goal"
          v-if="daysMeetGoal.indexOf(data.day) > -1"
        >
          Exceed calorie limit!
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
      currDate: new Date(),
      exceedLimit: false,
      exceedLimitMsg: '',
    }
  },
  computed: {
    ...mapState([
      'dailyThreshold',
      'daysAndCaloriesMeetGoal',
      'monthsExceedingSpendingLimit',
    ]),
    currDateCorrected: {
      get() {
        return this.currDate;
      },
      set(val) {
        this.currDate = new Date(val.getTime() + val.getTimezoneOffset() * 60000);
      },
    },
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
    },
    refreshMonthlySpendingLimitInfo() {
      const dateStr = `${this.currDate.getFullYear()}-${String(this.currDate.getMonth() + 1).padStart(2, '0')}`;
      const limitInfo = this.monthsExceedingSpendingLimit.find(({date}) => date === dateStr);
      if (limitInfo) {
        this.exceedLimit = true;
        this.exceedLimitMsg = `You have exceeded your monthly spending limit this month. Spent: $${limitInfo.totalPrice}`;
      } else {
        this.exceedLimit = false;
        this.exceedLimitMsg = '';
      }
    }
  },
  async created() {
    await this.getDatesMeetThreshold();
    await this.getMonthsMeetSpendingLimit();
  },
  watch: {
    currDate() {
      this.refreshMonthlySpendingLimitInfo();
    },
    monthsExceedingSpendingLimit: {
      immediate: true,
      handler() {
        this.refreshMonthlySpendingLimitInfo();
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.met-goal {
  color: #ff9800;
}
</style>