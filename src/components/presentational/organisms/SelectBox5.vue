<template>
  <div ref="root"  :style="style"  @tap="changeSelectBoxDisplay" v-click-outside="onTapOutside">
  <div class="fwb category-name"><div :class="['select__arrow2']"></div>{{ selectObj[category].name }}</div>
  <div class="select">
    
    <div class="select__value">{{ selectedValue || '' }}</div>
    <div :class="['select__arrow', { 'select__arrow--on': state.isShowSelectBox }]"></div>
    <transition name="fade">
      <div id="search2" class="select__items" v-show="state.isShowSelectBox" :style="state.style3">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,nextTick,ref } from 'vue'
import vClickOutside from 'click-outside-vue3'
import { sleep } from '@/utils/sleep'

interface State {
  isShowSelectBox: boolean
  style3:any
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
     const root = ref(null)
    const state = reactive<State>({
      isShowSelectBox: false,
       style3:null
    })   

    const onTapItem = (e): void => {
      e.stopPropagation()
      emit('tapItem', {
        category: props.category,
        selectedValue: e.target.textContent,
      })
      state.isShowSelectBox = false
    }

    const changeSelectBoxDisplay = async(e) => {
      console.log(props.selectedValue)
      if (state.isShowSelectBox) return
      state.isShowSelectBox = true

       await nextTick()
         
      console.log(window.innerWidth);
      
      console.log(e.target.parentElement.offsetLeft);

       const items = root.value.querySelector("#search2");
      console.log(items.clientWidth);

      let width = e.target.parentElement.offsetLeft + items.clientWidth
      console.log(width);

      let m = window.innerWidth - width
      console.log(m);
      


        await changeStyle(m)
      
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
      'width': props.width,
    }


    const changeStyle = async (h) => {

      if (Math.sign(h) === -1) {

        let w = h - 20
                state.style3 = {
         'left': `${w}px`,
       }
        
         
            } else {
               state.style3 = {
         'left': `0`,
       }

            }
        
     }

    return {
      root,
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
.iscroll-wrapper {
  flex: 1;
  width: 100%;
  max-height: 400px;
  position: relative;
  overflow: hidden;
}

.iscroll__scroller {
  height: min-content;
}

.select {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 5px;
  height: 22px;
  background-color: #fff;
  margin-right: 3.5px;
  margin-bottom: 3px;
  border: 1px solid #d6d6d6;
  cursor: pointer;

  &__ {
    &value {
      position: relative;
      width: 100%;
      min-height: 27px;
      line-height: 27px;
      font-size: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      padding-top: 5px;
      position: absolute;
      left: 0;
      top: 20px;
      min-width: 146px;
      width: auto;
      min-height: 0;
      background: $background;
      overflow: hidden;
      box-shadow: 0px 2px 20px #00000029;
      border: 1px solid #d6d6d6;
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
      display: flex;
      flex-direction: column;
      justify-content: center;


 &--none {
  display: none;
 }

       &--on {
        background: rgba(0,0,0,.05);
            outline: 1px solid #939393;
    outline-offset: -1px;

      }
    }
    &item-text {
      font-weight: 300;
      line-height: 24px;
      color: rgb(51, 51, 51);
      white-space: nowrap;
      font-weight: bold;

      &-none {
        font-weight: 300;
      line-height: 24px;
      color: rgb(51, 51, 51);
      white-space: nowrap;
      font-weight: bold;
      padding: 0px 10px 10px 10px;
      }
    }
  }
}

.input-wrap {
  width: 100%;

  input {
    width: 100%;
    height: 20px;
    border: none;
    border-bottom: 1px solid #d6d6d6;
  }
}
</style>
