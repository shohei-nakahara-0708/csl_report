<template>
  <div v-if="selectObj[category].list.length > 0" class="select" :style="style" @tap="changeSelectBoxDisplay" v-click-outside="onTapOutside">
    <div class="select__value">{{ selectedValue || '全て' }}</div>
    <div :class="['select__arrow', { 'select__arrow--on': state.isShowSelectBox }]"></div>
    <transition name="fade">
      <div class="select__items" v-if="state.isShowSelectBox" >
        <transition-group tag="div">
          <template v-for="value in selectObj[category].list" :key="value">
            <div :class="['select__item', { 'select__item--on': isSelected(value) }]" @tap.prevent="onTapItem">
              <span class="select__item-text">{{ value }}</span>
            </div>
          </template>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import vClickOutside from 'click-outside-vue3'
import { sleep } from '@/utils/sleep'

interface State {
  isShowSelectBox: boolean
}

export default defineComponent({
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    selectObj: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    selectedValue: {
      type: String,
      required: false,
      default: null,
    },
    width: {
      type: String,
      required: false,
      default: '135px',
    },
  },
  setup(props, { emit }) {
    const state = reactive<State>({
      isShowSelectBox: false,
    })   

    const onTapItem = (e): void => {
      e.stopPropagation()
      emit('tapItem', {
        category: props.category,
        selectedValue: e.target.textContent,
      })
      state.isShowSelectBox = false
    }

    const changeSelectBoxDisplay = () => {
      console.log(props.selectedValue)
      if (state.isShowSelectBox) return
      state.isShowSelectBox = true
    }

    const onTapOutside = async () => {
      console.log('onTapOutside')
      await sleep(100) // onTapFilterButton の同時発火でパネルがチラつかないよう対策
      state.isShowSelectBox = false
    }

    const isSelected = (_value) => {
      return props.selectedValue ? _value === props.selectedValue : _value === '全て'
    }

    const style = {
      '--width': props.width,
    }

    return {
      state,
      style,
      onTapItem,
      changeSelectBoxDisplay,
      onTapOutside,
      isSelected,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/css/colors';

.select {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 10px;
  width: var(--width);
  height: 27px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 3.5px;
  margin-bottom: 3px;
   cursor: pointer;

  &__ {
    &value {
      position: relative;
      width: 100%;
      min-height: 27px;
      line-height: 27px;
      font-size: 1.1rem;
    }

    &arrow {
            width: 0;
  height: 0;
  border-style: solid;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  border-top: 4px solid #555555;
  border-bottom: 0;



    }

    &items {
      padding:0;
      position: absolute;
      left: 0;
      top: 34px;
      width: 100%;
      min-height: 0;
      background: $background;
      overflow: hidden;
      box-shadow: 0px 2px 20px #00000029;
      transform: translate3d(0, 0, 0);
      z-index: 1;
    }
    &item {
      position: relative;
      padding: 0 30px 0 10px;
      width: 100%;
      min-height: 34px;
      line-height: 34px;
      font-size: 13px;
      overflow: hidden;

      &--on {
        background: rgba(0,0,0,.05);
            outline: 1px solid #939393;
    outline-offset: -1px;

      }
    }
    &item-text {
      font-size: 1.1rem;
      font-weight: 300;
      line-height: 16px;
      color: $gray3;
    }
  }
}
</style>
