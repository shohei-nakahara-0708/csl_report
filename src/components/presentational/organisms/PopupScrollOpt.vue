<template>
  <div ref="root" class="popup">
    <div class="popup__box">
      <Heading2 v-if="title" class="popup__title">
        <span>{{ title }}</span>
      </Heading2>
      <div class="popup__close" @tap.prevent="tapClose">
        <p class="popup__close-text">閉じる</p>
      </div>
      <div class="popup__header">
        <ul>
          <li>施設名</li>
          <li>顧客名</li>
          <li>メールアドレス</li>
          <li>オプトイン状況</li>
        </ul>
      </div>
      <div class="popup__inner-box">
        <div class="iscroll-wrapper">
          <div class="iscroll__scroller">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUpdated } from 'vue'
import IScroll from 'iscroll'
import { Heading2 } from '@/components/presentational/atoms'

interface State {
  iScrollObj: null | IScroll
}

export default defineComponent({
  components: {
    Heading2,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    tapClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const root = ref(null)
    const state = reactive<State>({
      iScrollObj: null,
    })

    onMounted(() => {
      state.iScrollObj = new IScroll(root.value.querySelector('.iscroll-wrapper'), {
        scrollX: false,
        scrollY: true,
        disableTouch: false,
        disablePointer: false,
        useTransition: false,
        scrollbars: "custom",
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 3,
        bounce: false,
      })
    })

    onUpdated(() => {
      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh()
        }
      }, 300)
    })

    return { root, state }
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/css/colors';

.popup {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100000;

  &__ {
    &box {
      padding: 22px 30px;
      position: relative;
      width: 80%;
      height: 80%;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.4);
    }

    &inner-box {
      width: 100%;
      height: calc(100% - 20px);
      overflow: hidden;
      word-break: break-all;
    }

    &header {
  
      background-color: rgb(30, 0, 124);

      ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;
          
           
            font-size: 16px;
            font-weight: bold;
            
            li {
              text-align: center;
                height: 30px;
                 line-height: 30px;
              &:nth-child(1) {
                width: 30%;
                border-right: 1px solid #ccc;
              }

               &:nth-child(2) {
                width: 23%;
                 border-right: 1px solid #ccc;
              }

              &:nth-child(3) {
                width: 27%;
                 border-right: 1px solid #ccc;
              }

              &:nth-child(4) {
                width: 20%;
              }

            }
      }
    }

    &title {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 100%;
        background: $main;
      }
    }

    &close {
      position: absolute;
      top: 18px;
      right: 24px;
      width: 50px;
      height: 24px;
    }

    &close-text {
      text-align: center;
      font-weight: bold;
      line-height: 24px;
      color: $main;
    }
  }
}

.iscroll-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.iscroll__scroller {
  height: auto;
}
</style>
