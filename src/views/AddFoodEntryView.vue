<template>
  <div>
    <FoodEntryForm
      @submit="handleFoodEntrySubmit"
    />
  </div>
</template>

<script>
import FoodEntryForm from '@/components/FoodEntryForm.vue';
import { TabMenuItem } from '@/const/index';
import { mapMutations, mapActions } from 'vuex';
export default {
  components: {
    FoodEntryForm,
  },
  methods: {
    ...mapMutations(['setCurrTab']),
    ...mapActions(['addFoodEntry', 'getFoodEntries']),
    async handleFoodEntrySubmit(form) {
      await this.addFoodEntry(form);
      await this.getFoodEntries();
      this.setCurrTab(TabMenuItem.FoodEntries);
      this.$notify({
        title: 'Success',
        message: 'Food entry has been added!',
        type: 'success'
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>