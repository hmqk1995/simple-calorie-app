<template>
  <div>
    <h1 style="color: #606266;">Report</h1>
    <div style="width: 50%;">
      <Bar :chart-data="chartData" />
    </div>
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
      chartData: {},
    }
  },
  methods: {
    ...mapActions([
      'getWeekEntryReport',
    ])
  },
  async created() {
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
          backgroundColor: 'rgba(255, 208, 75, 0.5)',
          data: [
            this.aWeekAgoCount,
            this.twoWeeksAgoCount,
          ]
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>