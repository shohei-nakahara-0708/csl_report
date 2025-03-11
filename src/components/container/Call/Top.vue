<template>
  <Loading v-if="!isLoadComplete" />

<KeepAlive>
  <div ref="root" class="wrap">

    <div class="header">
      <span class="dli-arrow-left"></span>
      <ul>
        <li><router-link to="/">TOP</router-link></li>
        <li>/</li>
        <li>事業別Call実績レポート</li>
      </ul>
    </div>
    <div class="title-wrap">

    
    <div class="title-area">
      <div class="icon"></div>
      <div class="title">事業別Call実績レポート</div>
    </div>
    </div>
    <div class="wrap2">
       <div class="iscroll-wrapper">
            <div class="iscroll__scroller">
  <ul class="list">
    <li>
      <router-link :to="{
          name: 'CallTopDetail',
          query: {
            id: '01_CAB',
             date: state.date,
          },
      }"><div class="img-wrap cab" :class="state.date"></div>
        <span class="text">CAB_Call実績サマリレポート</span>
        </router-link>
        </li>
        


       <li>
      <router-link :to="{
          name: 'CallTopDetail',
          query: {
            id: '03_HEM',
              date: state.date,
          },
        }"><div class="img-wrap hem" :class="state.date"></div><span class="text">HEM_Call実績サマリレポート</span></router-link></li>



       <li>
    <router-link :to="{
          name: 'CallTopDetail',
          query: {
            id: '02_IG',
              date: state.date,
          },
        }"><div class="img-wrap ig" :class="state.date"></div> <span class="text">IG_Call実績サマリレポート</span></router-link></li>



       <li>
    <router-link :to="{
          name: 'CallTopDetail',
          query: {
            id: '04_HAE',
              date: state.date,
          },
        }"><div class="img-wrap hae" :class="state.date"></div> <span class="text">HAE_Call実績サマリレポート</span></router-link></li>

      

  </ul>
  </div>
  </div>
  </div>

  </div>

  </KeepAlive>


</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  onMounted,
  onUpdated,
} from "vue";
import { Loading } from '@/components/presentational/organisms/'
import { useApplicationStore } from '@/store/modules/applicationModule'
import { useAccountStore } from "@/store/modules/accountModule";



import IScroll from "iscroll";



interface State {
  iScrollObj: null | IScroll;
   date: any;
}

export default defineComponent({
  components: {
    // Top,
    Loading,
  },
   props: {
    date: {
      type: String,
      required: true,
    }
  },
  setup(props) {

        const state = reactive<State>({
          iScrollObj: null,
      date: null,
        });
     const Account = useAccountStore();
    const ApplicationStore = useApplicationStore()
 const root = ref(null);
    const isLoadComplete = computed(() => ApplicationStore.isLoadComplete)
    const shouldShowTopPanel = computed(() => ApplicationStore.getShouldShowTopPanel)
    const shouldShowHelpPopup = computed(() => ApplicationStore.getShouldShowHelpPopup)
 const propsList = reactive({ ...props })  
    state.date = propsList.date

    onMounted(async () => {

                

      //     let mrList = Account.getCurrentAccountId;

      //     console.log(mrList);
          

          
          

      // if (Object.keys(mrList).length === 0) {
            
      //   await Account.ACCOUNT__USER_MASTER(masterDataUser,masterData)
      // }


        //    let callList2 = Account.getsentCallList;
           
        //   if (Object.keys(callList2).length === 0) {
        //     console.log('bbb');
        
        // await Account.JSON__CALL_DATA(callData);
        //   }


    
           
      state.iScrollObj = new IScroll(
        root.value.querySelector(".iscroll-wrapper"),
        {
          scrollX: false,
          scrollY: true,
          disableTouch: true,
          disablePointer: false,
          useTransition: false,
          scrollbars: "custom",
          fadeScrollbars: true,
          mouseWheel: true,
        }
      );

        });

            onUpdated(() => {
      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh();
        }
      }, 500);
    });
    

    return {
      root,
      state,
      isLoadComplete,
      shouldShowTopPanel,
      shouldShowHelpPopup,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/css/colors';

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

ul.list {
  display: flex;
  width: 100%;
    padding: 18px 150px;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1500px;
    margin:  0 auto;
    height: 100%;
    min-height: calc(100vh - 141px);
    align-items: center;

    & :first-child {
      margin-bottom: 10px;
    }

& :nth-child(2) {
 margin-bottom: 10px;
    }


  & li {
    width: 50%;
    max-width: 450px;
cursor: pointer;

   
    
    

          &:hover{
         filter: brightness(0.7);
          }
    
    

    .img-wrap {
                background-repeat: no-repeat;
    border: 1px solid #d8d8d8;
    border-radius: 1px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, .15);
    display: block;
    height: 250px;
    position: relative;
    z-index: 3;
    margin: 0 18px 10px;



  
    
     &.cab {
       background: url('~@/assets/images/callTop/cab.png') no-repeat top center;
        background-size: cover;

        &.newData {
       background: url('~@/assets/images/callTop/cabnew.png') no-repeat top center;
        background-size: cover;
     }
     
     }

      
      &.hem {
       background: url('~@/assets/images/callTop/hem.png') no-repeat top center;
        background-size: cover;

           &.newData {
       background: url('~@/assets/images/callTop/hemnew.png') no-repeat top center;
        background-size: cover;
     }

     }
      &.ig {
       background: url('~@/assets/images/callTop/ig.png') no-repeat top center;
        background-size: cover;


           &.newData {
       background: url('~@/assets/images/callTop/ignew.png') no-repeat top center;
        background-size: cover;
     }
     }
      &.hae {
       background: url('~@/assets/images/callTop/hae.png') no-repeat top center;
        background-size: cover;


           &.newData {
       background: url('~@/assets/images/callTop/haenew.png') no-repeat top center;
        background-size: cover;
     }

     }
    }
    
    

    img {
      width: 100%;




    }

    .text {
      margin: 10px 30px 0;
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
      


        :nth-child(even){
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
  padding:20px 150px 25px;
  border-bottom: 1px solid #d6d6d6;

  .icon {
    width: 60px;
    height: 60px;
     background: url('~@/assets/images/icon/data.svg') no-repeat center/ cover;
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

@media screen and (max-width: 900px) {
ul.list {



  & li {
    width: 100%;

    margin-bottom: 20px;

  }
}
}

</style>
