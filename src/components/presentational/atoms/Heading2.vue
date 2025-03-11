<template>
  <h2 class="heading">
    <slot />
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
@import '~@/assets/css/colors';

.heading {
  flex: 1;
  padding-left: 10px;
  position: relative;
  color: $gray1;
  font-size: 1.8rem;
  line-height: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: $main;
  }
}
</style>
