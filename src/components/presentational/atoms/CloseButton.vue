<template>
  <button @tap.prevent="tap" class="button" type="submit">
    <span class="cross"></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tap: {
      type: Function,
      required: true,
    },
  },
})
</script>
<style scoped lang="scss">
@import '~@/assets/css/colors';

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid $gray2;
  border-radius: 50%;
  background-color: transparent;
  color: $gray2;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 7px;
    left: 3px;
    width: 10px; // 長さ
    height: 2px; // 太さ
    background: $gray2;
  }
  &::before {
    transform: rotate(-45deg);
  }
  &::after {
    transform: rotate(45deg);
  }
}
</style>
