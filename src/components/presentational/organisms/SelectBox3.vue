<template>
  <div ref="root" :style="style" @tap="changeSelectBoxDisplay" v-click-outside="onTapOutside">
    <div :class="['fwb', 'category-name', { 'category-name--consent-product': category === '許諾製品' }]">
      {{ getcategoryName(selectObj[category].name) }}
    </div>

    <div class="select">
    <div class="select__value">{{ isValue(selectedValue)  }}</div>
    <div :class="['select__arrow', { 'select__arrow--on': state.isShowSelectBox }]"></div>
    <transition name="fade">
      <div id="search2"  class="select__items" v-show="state.isShowSelectBox" :style="state.style3">

                         <div class="input-wrap" v-if="Object.keys(selectObj[category].list).length > 1">
                <input id="search" type="text" @input="change" v-model="state.keyword"  v-click-outside="onTapOutside2" />
              </div>
              
        <div class="iscroll-wrapper" :style="state.style2" >
          <div class="iscroll__scroller">

    
           <div v-show="hasOptions || hasExplicitSelection" style="padding-top: 10px;">
              <template v-for="(value, key) in state.activityObj" :key="key">


                  <div  :class="['select__item', { 'select__item--on': isSelected(value) }]" :data-key="value" @tap.prevent="onTapItem">
                 <span class="select__item-text" :data-key="value">{{ getShareName(value) }}</span>
                  
                </div>
                
              </template>

    </div>

              <div v-show="!hasOptions">
                  <span class="select__item-text-none">アイテムはありません。</span>
                </div>


               <span v-if="hasOptions && state.activityObj.length === 0" class="select__item-text-none">一致がありません。</span>

          </div>
        </div>
      </div>
    </transition>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, onUpdated, computed,watch, nextTick } from 'vue'
import IScroll from 'iscroll'
import vClickOutside from 'click-outside-vue3'
import { sleep } from '@/utils/sleep'
import dayjs from 'dayjs'
import { normalizeFilterSelection, toggleFilterSelection } from '@/utils/emailFilters'


interface State {
  iScrollObj: null | IScroll
  isShowSelectBox: boolean
  selectedValueArry: any
  keyword: string
  activityObj: any
  style2: any
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
      type: Array,
      required: false,
      default: null,
    },
     selectedListOrg: {
      type: Array,
      required: false,
      default: null,
    },
    selectedValue2: {
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
      iScrollObj: null,
      isShowSelectBox: false,
      selectedValueArry: null,
      keyword: '',
      activityObj: [],
      style2: null,
       style3:null
    })

    const hasOptions = computed(() => Object.keys(props.selectObj[props.category].list).some((value) => value !== 'すべて'))
    const hasExplicitSelection = computed(() => !normalizeFilterSelection(props.selectedValue).includes('すべて'))

    onUnmounted(() => {
      state.iScrollObj?.destroy()
      state.iScrollObj = null
    })

    onMounted(async () => {

        state.iScrollObj = new IScroll(root.value.querySelector('.iscroll-wrapper'), {
          scrollX: false,
          scrollY: true,
          disableTouch: true,
          disablePointer: false,
          useTransition: false,
          scrollbars: 'custom',
          fadeScrollbars: true,
          mouseWheel: true,
        })


   
    

    // props.selectObj[props.category].list.filter((x) => {
    //       let arr = state.keyword.split(/[\x20\u3000]/)
    //       let target = x.toUpperCase()
    //       const isAllIncludes = (arr, target) => arr.every((el) => target.includes(el.toUpperCase()))
    //       return isAllIncludes(arr, target) != false
    //     })

    })


          state.activityObj = computed(() => { 

        const priority = ['すべて', "Invalid Date","NULL"]
      

          return Object.keys(props.selectObj[props.category].list).filter((x) => {
          if (!hasOptions.value) return x === 'すべて'
          let arr = state.keyword.split(/[\x20\u3000]/)
            let target = x.toUpperCase()

            if (dayjs(x, 'YYYY/M').isValid()) {
              if (props.selectObj[props.category].name == "年月") {
                target = dayjs(x).format('YYYY年M月')
              } else {
                target = dayjs(x).format('M月')
              }
              
            }
          
          const isAllIncludes = (arr, target) => arr.every((el) => target.includes(el.toUpperCase()))
          return isAllIncludes(arr, target) != false
          }).sort((a, b) => {
            if (props.category === 'メール送付月') {
              if (a === b) return 0
              if (a === 'すべて') return -1
              if (b === 'すべて') return 1
              return dayjs(a).valueOf() - dayjs(b).valueOf()
            }

              const abool = priority.includes(a)
            const bbool = priority.includes(b)

      
               
            if ((abool && bbool) || (!abool && !bbool)) {

                  if (a === "すべて") {
                    return -1
                    }

                    if (a === "Invalid Date" || b  === "Invalid Date") {
                    return 0
                    }

                    //    if (a === "Target" || b  === "Target") {
                    // return 0
                    //   }

             if (a === "NULL" || b  === "NULL") {
                    return 0
            }
                  
                  
                      if (!dayjs(a).isValid()) {
                        return a.localeCompare(b, 'ja');
                      }
            

                  }
                  if (abool) {
                    return -1
                  }

                  
                  
                });
        

          })
          



    

    const onTapItem = (e): void => {
      const value = e.currentTarget.getAttribute('data-key')
      if (!value) return
      e.stopPropagation()
      emit('tapItem', {
        category: props.category,
        selectedValue: toggleFilterSelection(
          props.selectedValue as string[],
          value,
          Object.keys(props.selectObj[props.category].list)
        ),
      })
    }

    const isValue = (value) => {
      const selected = normalizeFilterSelection(value)
      if (selected.includes('すべて')) {
        const options = Object.keys(props.selectObj[props.category].list).filter((item) => item !== 'すべて')
        if (options.length === 0) return 'なし'
        return options.length === 1 ? getShareName(options[0]) : 'すべて'
      }
      if (selected.length === 0) return 'なし'
      return selected.length === 1 ? getShareName(selected[0]) : '複数の値'
    }

    const changeSelectBoxDisplay = async () => {

  

      if (state.isShowSelectBox) return
      state.isShowSelectBox = true
      await nextTick()
         
       const items = root.value.querySelector("#search2");

      const rootRect = root.value.getBoundingClientRect()
      const width = rootRect.left + items.clientWidth

      const m = window.innerWidth - width - 12
      


        await changeStyle(m)
      
    


      
   
      
      
   

             setTimeout(() => {
         const item = root.value?.querySelector('input') as HTMLInputElement
      if (item) {
        item.focus()
      }
      }, 100)

   
    
    }


    const changeStyle = async (h) => {

      if (Math.sign(h) === -1) {

        let w = h
                state.style3 = {
         'left': `${w}px`,
         'max-width': 'calc(100vw - 24px)',
       }
        
         
            } else {
               state.style3 = {
         'left': `0`,
         'max-width': 'calc(100vw - 24px)',
       }

            }
      
      
        setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh()
        }
        }, 300)
       
        
     }



    

    const onTapOutside = async () => {
      console.log('onTapOutside')
      await sleep(100) // onTapFilterButton の同時発火でパネルがチラつかないよう対策
      state.keyword = ''
      state.isShowSelectBox = false
    }

       const onTapOutside2 = async (evt) => {
      await sleep(100) // onTapFilterButton の同時発火でパネルがチラつかないよう対策

      const item = root.value?.querySelector('input') as HTMLInputElement
      if (item) {
        item.blur()
      }

       }

    const change = async (evt) => {


      
      await sleep(100) // onTapFilterButton の同時発火でパネルがチラつかないよう対策

       setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh()
        }
      }, 500)

      // const item = document.getElementById('search') as HTMLInputElement
      // if (item) {
      //   item.blur()
      // }

    }

    const isSelected = (value) => {
      const selected = normalizeFilterSelection(props.selectedValue)
      return selected.includes('すべて') || selected.includes(value)
    }


    const isSelected2 = (_value) => {

      if (!props.selectedListOrg) {
        return false
      } else {
        if (props.selectedListOrg.includes(_value)) {
        return false
      } else {
        return true
      }
      }

     


      // console.log(props.selectedValue ? _value === props.selectedValue : _value === 'すべて');
      
      // return props.selectedValue ? _value === props.selectedValue : _value === 'すべて'
    }


     const getShareName = (_str) => {
       if (!_str) return null;
       if ( props.category == "フラグメント") {
        return _str;
       }
      if (dayjs(_str,'YYYY/M').isValid()) {

         if (props.selectObj[props.category].name == "年月") {
                return dayjs(_str).format('YYYY年M月')
              } else {
                return  dayjs(_str).format('M月')
              }
      }else if (_str === "Invalid Date") {
        return "NULL"
      }
      return _str;
     };

    const getShareName2 = (_str) => {
      if (!_str) return null;
      if (dayjs(_str,'M月').isValid()) {
        return dayjs(_str).format('YYYY/M')
      }
     return _str;
     };
    

    const style = {
      'width': props.width,
    }

    // onMounted(async () => {
    //   console.log('aaa');
    //   console.log(root.value.querySelector('.iscroll-wrapper'));

    //   // state.iScrollObj = new IScroll(root.value.querySelector('.iscroll-wrapper2'), {
    //   //   scrollX: false,
    //   //   scrollY: true,
    //   //   disableTouch: true,
    //   //   disablePointer: false,
    //   //   useTransition: false,
    //   //   scrollbars: 'custom',
    //   //   fadeScrollbars: true,
    //   // })
    // })

    onUpdated(() => {
      

       setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh()
        }
      }, 500)


  
       
    })

            const getcategoryName = (_str) => {
 if (!_str) return null;
if (_str === "Target") {
  return "ターゲット"
}if (_str === "フラグメント") {
  return "バナー"
} else {
  return _str
}
        
    }


    return {
      root,
      state,
      style,
      onTapItem,
      changeSelectBoxDisplay,
      onTapOutside,
      onTapOutside2,
      isSelected,
      isSelected2,
      isValue,
      change,
      getShareName,
      hasOptions,
      hasExplicitSelection,
      getcategoryName
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
      position: absolute;
      left: 0;
      top: 20px;
      min-width: 100%;
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
      padding: 0 10px 0 25px;
      width: 100%;
      line-height: 1.4;
      font-size: 13px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:before {
  background: #fff;
    border: 1px solid #666;
    content: '';
    display: block;
    height: 16px;
    left: 5px;
    margin-top: -8px;
    position: absolute;
    top: 50%;
    width: 16px;
}

 &--none {
  display: none;
 }

      &--on {
       

        &:after {
border-right: 1px solid #666;
    border-bottom: 1px solid #666;
    content: '';
    display: block;
    height: 9px;
    left: 10px;
    margin-top: -6px;
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
    width: 5px;
        }
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

.category-name {
  text-align: center;
  white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
}

.category-name--consent-product {
  box-sizing: border-box;
  text-align: left;
  padding-left: 2px;
  padding-right: 20px;
}
</style>
