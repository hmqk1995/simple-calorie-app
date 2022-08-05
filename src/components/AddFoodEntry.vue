<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="Food name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Calories" prop="calories">
        <el-input
          v-model="form.calories"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input
          v-model="form.price"
          type="number"
        >
         <template slot="prepend">$</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        name: '',
        date: '',
        calories: '',
        price: '',
      },
      rules: {
        name: [
          {
            required: true,
          }
        ],
        date: [
          {
            required: true,
          }
        ],
        calories: [
          {
            required: true,
          }
        ],
        price: [
          {
            required: true,
          }
        ],
      }
    }
  },
  methods: {
    ...mapActions(['addFoodEntry', 'getFoodEntries']),
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          await this.addFoodEntry(this.form);
          await this.getFoodEntries();
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
}
</style>