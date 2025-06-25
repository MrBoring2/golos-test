<template>
  <div class="content">
    <div class="range-input-title">
      <p>{{this.title}}</p>
    </div>
    <div class="input-content">
      <input
        type="text"
        pattern="[0-9 ]*"
        :value="displayValue[0]"
        @input="handleInput($event, 0)"
        @blur="applyValue(0)"
        @keyup.enter="applyValue(0)"
        @keydown="filterNumericInput"
        :min="min"
        inputmode="numeric"
        :max="currentValue[1]"
        class="number-input-left"
      />
      <input
        type="text"
        pattern="[0-9 ]*"
        :value="displayValue[1]"
        @input="handleInput($event, 1)"
        @keydown="filterNumericInput"  
        @keyup.enter="applyValue(1)"
        @blur="applyValue(1)"
        :min="currentValue[0]"
        :max="max"
        inputmode="numeric"
        class="number-input-right"
      />
    </div>
    <VueSlider @drag-end="dragEnd"
      v-model="currentValue" :clickable=false
      :min="min" :enable-cross="true"
      :max="max" :tooltip="'none'"
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
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentValue: [...this.value],
      displayValue: this.value.map(num => this.formatNumber(num)),
      tempValue: [...this.value]
    }
  },
  watch: {
    value(newVal) {
      if (newVal[0] !== this.currentValue[0] || newVal[1] !== this.currentValue[1]) {
        this.currentValue = [...newVal];
        this.displayValue = [...newVal];
      }
    },
    currentValue(newVal) {
      //this.$emit('input', [...newVal]);
      this.displayValue = newVal.map(num => this.formatNumber(num));
    }
  },
  methods: {
    formatNumber(num) {
      return num != undefined ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
    },
    filterNumericInput(event) {
      const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
      ];

      if (event.ctrlKey && ['a', 'c', 'x', 'v'].includes(event.key.toLowerCase())) {
        return true;
      }
      
      if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
        return false;
      }
    },
    dragEnd(index) {
      if(index == 0)
        this.$emit('drag-end', 'min')
      else this.$emit('drag-end', 'max')
    },
    handleInput(event, index) {
      const cursorPosition = event.target.selectionStart;
      const originalLength = event.target.value.length;

      const rawValue = event.target.value.replace(/[^\d]/g, '');
      this.tempValue[index] = rawValue ? parseInt(rawValue) : 0;
      this.displayValue[index] = this.formatNumber(this.tempValue[index]);
       this.$nextTick(() => {
        const newLength = event.target.value.length;
        let newCursorPosition = cursorPosition;
        const cursorPos = event.target.selectionStart;
        
        if (newLength > originalLength) {
          newCursorPosition += 1;
        } else if (newLength < originalLength) {
          newCursorPosition -= 1;
        }
    
        newCursorPosition = Math.max(0, Math.min(newCursorPosition, event.target.value.length));
    
        event.target.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    },
    applyValue(index) {
      let newValue = this.tempValue[index];
      
      if (index === 0) {
        newValue = Math.max(this.min, Math.min(newValue, this.currentValue[1]));
      } else {
        newValue = Math.min(this.max, Math.max(newValue, this.currentValue[0]));
      }
      
      const newValues = [...this.currentValue];
      newValues[index] = newValue;
      this.currentValue = newValues;
    
      this.$emit('input', [...this.currentValue]); // Отправляем актуальные данные
      this.$emit('update-input')
    },
    handleSliderChange(newValues) {
      this.displayValue = newValues.map(num => this.formatNumber(num));
      this.currentValue = [...newValues];
      this.$emit('input', [...newValues]);
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.range-input-title {
  color: var(--vt-c-gray);
  font-size: var(--font-size-mini);
  padding-bottom: 0.5rem;
}

.input-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  width: 5rem;
  outline: none;
  font-size: var(--font-size-normal-mini);
}

.number-input-right {
    text-align: end;
}

</style>