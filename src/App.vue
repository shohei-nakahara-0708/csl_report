<template>
  <div ref="root" id="app" class="app-wrapper" @tap="tapWrapper">
   <MainPage></MainPage>
    <transition name="fade">
      <PopupScroll v-if="errorDetail.length" :tap-close="onTapErrorClose" :title="'エラーが発生しました。'">
        <p v-for="(val, index) in errorDetail" :key="index" v-html="val"></p>
      </PopupScroll>
    </transition>
    <div class="encode_strings" style="display: none"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import IScroll from 'iscroll'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import MainPage from '@/views/MainPage.vue'
import { PopupScroll } from '@/components/presentational/organisms'
import { useApplicationStore } from '@/store/modules/applicationModule'
import emailDataOld from "@/assets/data/emailOld.json";
import emailDataDetailOld from "@/assets/data/emailDetailOld.json";
import emailDataNew from "@/assets/data/email.json";
import emailDataDetailNew from "@/assets/data/emailDetail.json";

import { useAccountStore } from '@/store/modules/accountModule'


dayjs.locale('ja')

interface State {
  iScrollObj: null | IScroll
}

export default defineComponent({
  name: 'App',
  components: {
    MainPage,
    PopupScroll,
  },
  setup() {
    const ApplicationStore = useApplicationStore()

    const Account = useAccountStore()


    const root = ref(null)
    const state = reactive<State>({
      iScrollObj: null,
    })

    const errorDetail = computed(() => ApplicationStore.ErrorDetail)

    /** 初回データ読み込み */
    const loadData = async () => {
      try {
        ApplicationStore.isLoadComplete = false
        
        const BASE_PATH = document.location.href
        // alert(BASE_PATH)
        // alert(process.env.BASE_URL)
        /** 現在時刻を設定する */
        const nowDate = dayjs()
        const expDate = nowDate.format('YYYY-MM-DD')
        // await Account.ACCOUNT__GET_ACCOUNT()
        // await Account.ACCOUNT__USER_MASTER(masterDataUser, masterData)
        // await Account.JSON__CALL_DATA();

      const emialList = JSON.stringify(emailDataOld);
      const emialLists = JSON.parse(emialList);

        Account.JSON__EMAIL_DATA(emialLists);

         const emialList2 = JSON.stringify(emailDataDetailOld);
      const emialLists2 = JSON.parse(emialList2);

        Account.JSON__EMAIL_DATA2(emialLists2);

      const emialListNew = JSON.stringify(emailDataNew);
      const emialListsNew = JSON.parse(emialListNew);

        Account.JSON__EMAIL_DATA_NEW(emialListsNew);

         const emialListNew2 = JSON.stringify(emailDataDetailNew);
      const emialListsNew2 = JSON.parse(emialListNew2);

        Account.JSON__EMAIL_DATA_NEW2(emialListsNew2);

      // const mediaList = JSON.stringify(CallKeyMessageData);
      //   const mediaLists = JSON.parse(mediaList);

      //    Account.JSON__MEDIA_DATA(mediaLists);

        // await Account.JSON__EMAIL_DATA();
        // 
        // await Account.ACCOUNT__GET_WORK_HISTORY()

        
      } finally {
        console.log('終わり');
        
        ApplicationStore.isLoadComplete = true
      }
    }
    loadData()

    onMounted(() => {
      /** 全体のスクロールを定義 */
      state.iScrollObj = new IScroll(root.value, {
        click: false,
        tap: true,
        disableTouch: true,
        disablePointer: false,
        useTransition: false,
      })
    })

    const onTapErrorClose = () => {
      ApplicationStore.UPD_ERROR_DETAIL()
    }

    /** 画面全体のタップ処理 */
    const tapWrapper = (e) => {
      /** Google Analytics用の処理を実施する */
      // if (e?.target?.dataset?.ec) {
      //   ApplicationStore.SET_GOOGLE_ANALYTICS({
      //     ec: e?.target?.dataset?.ec,
      //     ea: e?.target?.dataset?.ea,
      //     el: e?.target?.dataset?.el,
      //   })
      // }
    }

    return { state, root, errorDetail, onTapErrorClose, tapWrapper }
  },
})
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/css/default.scss';
@import './assets/css/helper.scss';
@import './assets/css/transition.scss';
@import './assets/css/charts.css';

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
}
</style>
