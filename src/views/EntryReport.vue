<template>
  <div>
    <h1 style="color: #606266;">Report</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>
          <h4>Number of added entries</h4>
          <Bar :chart-data="chartData" />
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <h4>Average Number of Calories Added last 7 days</h4>
          <el-table
            :data="userAvgCalories"
            style="width: 100%">
            <el-table-column
              prop="username"
              label="User"
            >
            </el-table-column>
            <el-table-column
              prop="average_calories"
              label="Average Calories"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Bar } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  components: {
    Bar,
  },
  data() {
    return {
      aWeekAgoCount: 0,
      twoWeeksAgoCount: 0,
      userAvgCalories: [],
      chartData: {},
    }
  },
  methods: {
    ...mapActions([
      'getWeekEntryReport',
      'getUserAvgCaloriesReport',
    ]),
    async initWeekEntryReport() {
      const { data } = await this.getWeekEntryReport();
      const {
        data: [
          aWeekAgoCount,
          twoWeeksAgoCount,
        ]
      } = data;
      this.aWeekAgoCount = aWeekAgoCount;
      this.twoWeeksAgoCount = twoWeeksAgoCount;
      this.chartData = {
        labels: [
          'This Week',
          'The Week Before',
        ],
        datasets: [
          {
            label: 'Entry count',
            backgroundColor: 'rgba(255, 208, 75, 0.4)',
            borderColor: 'rgba(255, 208, 75, 0.8)',
            borderWidth: 2,
            data: [
              this.aWeekAgoCount,
              this.twoWeeksAgoCount,
            ]
          }
        ]
      }
    },
    async initUserAvgCaloriesReport() {
      const { data } = await this.getUserAvgCaloriesReport();
      this.userAvgCalories = data.data;
    },
  },
  async created() {
    await this.initWeekEntryReport();
    await this.initUserAvgCaloriesReport();
  },
}
</script>

<style lang="scss" scoped>

</style>