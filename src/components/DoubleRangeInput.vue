<template>
  <div class="content">
    <div class="input-content">
      <input
        type="number"
        :value="currentValue[0]"
        @input="handleInputChange($event, 0)"
        :min="min"
        :max="currentValue[1]"
        class="number-input-left"
      />
      <input
        type="number"
        :value="currentValue[1]"
        @input="handleInputChange($event, 1)"
        :min="currentValue[0]"
        :max="max"
        class="number-input-right"
      />
    </div>
    <VueSlider
      v-model="currentValue"
      :min="min"
      :max="max" :tooltip="'none'"
      :enable-cross="false"
      @change="handleSliderChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    value: {
      type: Array,
      required: true,
      validator: value => value.length === 2
    }
  },
  data() {
    return {
      currentValue: [...this.value]
    }
  },
  watch: {
    value(newVal) {
      if (newVal[0] !== this.currentValue[0] || newVal[1] !== this.currentValue[1]) {
        this.currentValue = [...newVal];
      }
    },
    currentValue(newVal) {
      this.$emit('input', [...newVal]);
    }
  },
  methods: {
    handleInputChange(event, index) {
      let newValue = Number(event.target.value);
      
      if (isNaN(newValue)) return;
      
      if (index === 0) {
        newValue = Math.max(this.min, Math.min(newValue, this.currentValue[1]));
      } else {
        newValue = Math.min(this.max, Math.max(newValue, this.currentValue[0]));
      }
      
      const newValues = [...this.currentValue];
      newValues[index] = newValue;
      this.currentValue = newValues;
    },
    handleSliderChange(newValues) {
      this.currentValue = [...newValues];
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.dot-style {
    background-color: red;
}

.input-content {
  display: flex;
  justify-content: space-between;
  background-color: var(--vt-c-light-gray);
  height: 2.5rem;
  align-items: center;
  border-radius: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"] {
  appearance: textfield;
}

.number-input-right, .number-input-left {
  border: 0;
  background: transparent;
  outline: none;
}

.number-input-right {
    text-align: end;
}

.slider {
  display: block;
  position: relative;
  height: 36px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.slider .slider-touch-left,
.slider .slider-touch-right {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  position: absolute;
  z-index: 2;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 4px;
  z-index: 2;
  top: 50%; 
}

.slider .slider-touch-left span,
.slider .slider-touch-right span {
  display: block;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border: 1px solid #a4a4a4;
  border-radius: 50%;
}
.slider .slider-line {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 36px);
  left: 18px;
  top: 16px;
  height: 4px;
  border-radius: 4px;
  background: #f0f0f0;
  z-index: 0;
  overflow: hidden;
}
.slider .slider-line span {
  display: block;
  height: 100%;
  width: 0%;
  background: orange;
}
</style>