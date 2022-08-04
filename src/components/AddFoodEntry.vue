<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Food name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Calories">
        <el-input
          v-model="form.calories"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="Price">
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
export default {
  data() {
    return {
      form: {
        name: '',
        date: '',
        calories: '',
        price: '',
      },
    }
  },
  methods: {
    onSubmit() {
      
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