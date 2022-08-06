<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
      <el-form-item label="Food name" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="datetime"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Calories" prop="calories">
        <el-input
          v-model="formData.calories"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input
          v-model="formData.price"
          type="number"
        >
         <template slot="prepend">$</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="fullAccess" label="User" prop="user">
        <el-input
          v-model="formData.user"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          {{modifyMode ? 'Modify' : 'Create' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    fullAccess: {
      type: Boolean,
      default: false,
    },
    modifyMode: {
      type: Boolean,
      default: false,
    },
    entryId: {
      type: String,
      default: '',
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: this.resetFormData(),
      rules: {
        name: [
          {
            required: true,
            trigger: 'submit',
          }
        ],
        date: [
          {
            required: true,
            trigger: 'submit',
          }
        ],
        calories: [
          {
            required: true,
            trigger: 'submit',
          }
        ],
        price: [
          {
            required: true,
            trigger: 'submit',
          }
        ],
      },
      pickerOptions: {
        disabledDate: date => date > Date.now(),
      }
    }
  },
  created() {
    this.applyDefaultFormData();
  },
  methods: {
    resetFormData() {
      return {
        name: '',
        date: '',
        calories: '',
        price: '',
        user: '',
      }
    },
    applyDefaultFormData() {
      this.formData = this.resetFormData();
      for (let key in this.form) {
        if (this.formData) {
          this.formData[key] = this.form[key];
        }
      }
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formData);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    form: {
      handler() {
        this.applyDefaultFormData();
      },
      immediate: true,
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