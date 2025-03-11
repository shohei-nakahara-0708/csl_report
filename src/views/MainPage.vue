<template>
  <Loading v-if="!isLoadComplete" />

  <keep-alive>
    <div  ref="root" class="wrap">



    <div class="header">
    </div>
      <div class="title-wrap">
        <div class="title-area">
          <div class="icon"></div>
          <div class="title">TOP</div>
        </div>
      </div>

      <div class="wrap2">
        <div class="iscroll-wrapper">
          <div class="iscroll__scroller">
            <div class="date-title">2025年1月〜</div>
             <ul class="list">
              <li>
                <router-link  :to="{
          name: 'CallTop',
          query: {
            date: 'newData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">事業別Call実績レポート</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{
          name: 'SentEmailTop',
          query: {
            date: 'newData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">事業別メール送付実績レポート</span></router-link
                >
              </li>
              <li>
                <router-link :to="{
          name: 'CallKeyMessageTop',
          query: {
            date: 'newData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">コンテンツ使用実績レポート</span></router-link
                >
              </li>
            </ul>
            <div class="date-title mt20">2024年7月〜12月</div>
            <ul class="list">
              <li>
                <router-link :to="{
          name: 'CallTop',
          query: {
          date: 'oldData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">事業別Call実績レポート</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{
          name: 'SentEmailTop',
          query: {
            date: 'oldData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">事業別メール送付実績レポート</span></router-link
                >
              </li>
              <li>
                <router-link :to="{
          name: 'CallKeyMessageTop',
          query: {
            date: 'oldData',
          },
        }"
                  ><div class="tab"><div class="tab2"></div></div>
                  <div class="img-wrap"></div>
                  <span class="text">コンテンツ使用実績レポート</span></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>

  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, onUpdated } from "vue";
import { Loading } from "@/components/presentational/organisms/";
import { useApplicationStore } from "@/store/modules/applicationModule";

import IScroll from "iscroll";
interface State {
  iScrollObj: null | IScroll;
  isShow: boolean;
}

export default defineComponent({
  components: {
    // Top,
    Loading,
  },
  setup() {
    const state = reactive<State>({
      iScrollObj: null,
      isShow: true,
    });

    const ApplicationStore = useApplicationStore();
    const root = ref(null);
    const isLoadComplete = computed(() => ApplicationStore.isLoadComplete);
    const shouldShowTopPanel = computed(() => ApplicationStore.getShouldShowTopPanel);
    const shouldShowHelpPopup = computed(() => ApplicationStore.getShouldShowHelpPopup);

    onMounted(async () => {
      state.iScrollObj = new IScroll(root.value.querySelector(".iscroll-wrapper"), {
        scrollX: false,
        scrollY: true,
        disableTouch: true,
        disablePointer: false,
        useTransition: false,
        scrollbars: "custom",
        fadeScrollbars: true,
        mouseWheel: true,
      });
    });

    onUpdated(() => {
      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh();
        }
      }, 500);
    });

    const onTapLink = async (evt) => {
      state.isShow = false;

      setTimeout(() => {
        const items = document.querySelectorAll(".tap-none");

        for (const item of items) {
          item.classList.remove("tap-none");
        }
      }, 500);
    };

    return {
      root,
      state,
      isLoadComplete,
      shouldShowTopPanel,
      shouldShowHelpPopup,
      onTapLink,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/colors";

.iscroll-wrapper {
  flex: 1;
  width: 100%;
  height: calc(100vh - 141px);
  position: relative;
  overflow: hidden;
}

.wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100%);
  background: #fff;
}

.white-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100%);
  background: #fff;
  z-index: 1;
}

ul.list {
  display: flex;
  width: 100%;
  padding: 18px 40px;
  justify-content: space-around;
  margin: 0 auto;
  height: 100%;
  align-items: center;

  & li {
    width: 450px;
    margin: 0 18px 0px;

    &.none {
      pointer-events: none;
    }

    &:hover {
      filter: brightness(0.7);
    }

    .img-wrap {
      background-repeat: no-repeat;
      border: 1px solid #d8d8d8;
      border-radius: 1px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
      display: block;
      max-width: 450px;
      height: 150px;
      position: relative;
      z-index: 3;
      background-image: url("~@/assets/images/icon/folder2.svg");
      background-position: center;
      background-color: #fcfcfc;
    }

    img {
      width: 100%;
    }

    .text {
      margin: 10px;
      display: block;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.8);
    }

    & a {
      color: #000;
    }
  }
}

.header {
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 125px;

  & ul {
    display: flex;
    margin-left: 10px;

    :nth-child(even) {
      margin: 0 7px;
    }

    & li {
      color: #333;
      font-size: 12px;
      margin: 0 7px;

      a {
        color: #1a699e;
        font-weight: bold;
        font-size: 12px;
      }
    }
  }
}

.dli-arrow-left {
  width: 15px;
}

.dli-arrow-left::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
}

.title-area {
  display: flex;
  align-items: center;
  padding: 20px 150px 25px;
  border-bottom: 1px solid #d6d6d6;

  .icon {
    width: 60px;
    height: 60px;
    background: url("~@/assets/images/icon/folder.svg") no-repeat center/ cover;
    margin-right: 20px;
  }

  .title {
    font-size: 26px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.8);
  }
}

.border-area {
  height: 42px;
  border-bottom: 1px solid #d6d6d6;
}

.tab {
  max-width: 215px;
  width: 50%;
  height: 18px;
  background-color: #d6d6d6;
  clip-path: polygon(0 0, 91% 0, 100% 100%, 0% 100%);
  position: relative;
  top: 1px;
  z-index: 5;
}

.tab2 {
  max-width: 214px;
  width: 99%;
  height: 18px;
  background-color: #fcfcfc;
  clip-path: polygon(0 0, 91% 0, 100% 100%, 0% 100%);
  position: absolute;
  top: 1px;
  left: 1px;
}

@media screen and (max-width: 900px) {
  ul.list {
    flex-wrap: wrap;
    align-items: center;

    & li {
      width: 450px;
      margin-bottom: 20px;
    }
  }
}

.tap-none {
  pointer-events: none;
}

.date-title {
    width: 100%;
    padding: 8px 55px 0;
    margin: 0 auto;
    height: 100%;
    font-size: 24px;
}
</style>
