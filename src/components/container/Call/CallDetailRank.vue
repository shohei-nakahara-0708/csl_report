<template>
  <div ref="root" class="top">
    <div class="iscroll-wrapper2">
      <div class="iscroll__scroller2">
        <div>
          <div class="call-header">
            <span @click="$router.go(-1)" class="dli-arrow-left"></span>
            <ul>
              <li><router-link to="/">TOP</router-link></li>
              <li>/</li>
              <li>
                <router-link :to="{
          name: 'CallTop',
          query: {
             date: state.date,
          },
      }">事業別Call実績レポート</router-link>
              </li>
              <li>/</li>
              <li>
                <router-link
                  :to="{
                    name: 'CallTopDetail',
                    query: {
                      id: state.id,
                       date: state.date,
                    },
                  }"
                  >{{ state.name }}_Call実績サマリーレポート
                </router-link>
              </li>
              <li>/</li>
              <li>{{ state.isScreen }}</li>
            </ul>
          </div>

          <div class="tab-area">
            <div class="tab" :class="[{ active: state.isScreen === '半期実績' }]" @tap="toggleScreen">半期実績</div>
            <div class="tab" :class="[{ active: state.isScreen === '月別実績' }]" @tap="toggleScreen">月別実績</div>
          </div>
          <div class="call-content">
            <div class="call-content-main">
              <div class="call-content-main-header">
                <div class="call-content-main-header-title">
                  <template v-if="state.isScreen === '月別実績'">{{ state.isScreen }}</template><template v-else><span class="mr12">半期実績</span>  <template v-if="state.monthArryOrg.length === 1">{{ dayjs(state.monthArryOrg[0]).format("YYYY.M") }}</template><template v-else> {{ dayjs(state.monthArryOrg[0]).format("YYYY.M") }}~{{ dayjs(state.monthArryOrg[state.monthArryOrg.length - 1]).format("YYYY.M") }}</template></template>
                </div>

                <div class="call-content-main-header-content" v-if="(state.data.length > 0 && state.isScreen === '月別実績') || (state.isScreen === '半期実績' && state.girdArry.length > 0)">
                  <ul class="call-content-main-header-list">
                    <li v-if="state.isScreen === '半期実績'" class="call-list0 fwb"></li>
                    <li class="call-list1 fwb">営業部</li>
                    <li class="call-list2 fwb">エリア</li>
                    <li class="call-list3 fwb">テリトリー名</li>
                    <li class="call-list4 fwb">MR</li>
                  </ul>
                  <div class="call-content-main-header-content-right">
                    <div v-show="state.isScreen === '月別実績'">
                      <div>コール実施月</div>
                      <div class="header-list-item" @tap="onTapTarget3($event, state.yearArryStr.join('-'), 'year')" @mouseover="onHoverItem3($event, state.yearArryStr.join('-'), 'year')" @mouseleave="state.isHoverFlag = false">
                        <template v-if="state.yearArryStr.length === 1">{{ state.yearArryStr[0] }}</template>
                        <template v-else>{{ state.yearArryStr[0] }} - {{ state.yearArryStr[1] }}</template>
                      </div>
                      <ul class="call-content-main-header-list fwb">
                        <li class="header-list-item" v-for="(obj, index) in state.monthArryOrg" :key="index" @tap="onTapTarget3($event, obj, 'month')" @mouseover="onHoverItem3($event, obj, 'month')" @mouseleave="state.isHoverFlag = false">
                          {{ dayjs(obj).format("M") + "月" }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="call-content-wrap" :class="[{ 'call-content-wrap2': state.isScreen == '半期実績' }]">
                <div class="iscroll-wrapper">
                  <div class="iscroll__scroller">
                    <div v-show="state.isScreen === '月別実績'">
                      <div id="call-list-data-wrap" class="call-list-wrap">
                        <template v-for="(obj, index) in state.data" :key="index">
                          <div class="call-list-item">
                            <div class="call-list1 call-list-title" @mouseover="onHoverItem2(obj, obj.営業部, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2(obj, obj.営業部, $event)">
                              {{ obj.営業部 }}
                            </div>
                            <div class="call-list2 call-list-title" @mouseover="onHoverItem2(obj, obj.エリア, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2(obj, obj.エリア, $event)">
                              {{ obj.エリア }}
                            </div>
                            <div class="call-list3 call-list-title" @mouseover="onHoverItem2(obj, obj.テリトリー名, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2(obj, obj.テリトリー名, $event)">
                              {{ obj.テリトリー名 }}
                            </div>
                            <div class="call-list4 call-list-title" @mouseover="onHoverItem2(obj, obj.MR, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2(obj, obj.MR, $event)">
                              {{ obj.MR }}
                            </div>
                            <div class="call-list-data">
                              <template v-for="(obj2, index2) in state.monthArryOrg" :key="index2">
                                <div class="call-list-data-item" @mouseover="onHoverItem(obj, index, obj2, $event)" @tap="onTapTarget(obj, index, obj2, $event)" @mouseleave="state.isHoverFlag = false" :data-month="obj2">
                                  <template v-if="obj.dataOrg[obj2]">{{ obj.dataOrg[obj2] }}</template><template v-else></template>
                                </div>
                              </template>
                            </div>
                          </div>
                        </template>
                        <div v-if="state.data">
                          <div class="call-list-item" v-if="state.data.length > 0">
                            <div class="call-list5">総計</div>

                            <div class="call-list-data call-list-data2">
                              <template v-for="(obj2, index2) in state.monthArryOrg" :key="index2">
                                <div class="call-list-data-item call-list-data-item2" :data-month="obj2" @mouseover="onHoverItem(state.sumArry[obj2], 'すべて', obj2, $event)" @tap="onTapTarget(state.sumArry[obj2], 'すべて', obj2, $event)" @mouseleave="state.isHoverFlag = false">
                                  {{ state.sumArry[obj2].toLocaleString() }}                              </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-show="state.isScreen === '半期実績'">
                      <div id="my-chart">
                        <div class="charts-css bar show-labels show-primary-axis show-6-secondary-axes show-data-axes data-spacing-2 data-outside">
                          <template v-for="(obj, index) in state.data2" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding-left: 5px">
                              <div @mouseover="onHoverItem2_2('', index + 1, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', index + 1, $event)" class="call-list0 call-list-title">

                                
                                {{ getNumber(index + 1,state.data2[index - 1],obj) }}
                               
                              </div>

                              <div class="test">
                                <template v-for="(key, value) in obj" :key="value">
                                  <div class="test">
                                    <template v-for="(sales, salesValue) in key['data']" :key="salesValue">
                                      <div @mouseover="onHoverItem2_2('', salesValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', salesValue, $event)" class="call-list1 call-list-title">
                                        {{ salesValue }}
                                      </div>
                                      <div class="test" :class="[{ test2: Object.keys(sales).length > 1 }]">
                                        <template v-for="(area, areaValue) in sales" :key="areaValue">
                                          <div class="test">
                                            <div @mouseover="onHoverItem2_2('', areaValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', areaValue, $event)" class="call-list2 call-list-title">
                                              {{ areaValue }}
                                            </div>

                                            <div class="test" :class="[{ test2: Object.keys(area).length > 1 }]">
                                              <template v-for="(territory, territoryValue) in area" :key="territoryValue">
                                                <div class="test">
                                                  <div @mouseover="onHoverItem2_2('', territoryValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', territoryValue, $event)" class="call-list3 call-list-title">
                                                    {{ territoryValue }}
                                                  </div>

                                                  <div class="test" :class="[{ test2: Object.keys(territory).length > 1 }]">
                                                    <template v-for="(MR, MRValue) in territory" :key="MRValue">
                                                      <div class="test">
                                                        <div @mouseover="onHoverItem2_2('', MRValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', MRValue, $event)" class="call-list4 call-list-title">
                                                          {{ MRValue }}
                                                        </div>

                                                        <div class="call-list-data tr" :style="MR[0].ratio">
                                                          <div @mouseover="onHoverItem2_3(MR[0], index, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(MR[0], index, $event)" class="call-list-data-item td">
                                                            <span class="data">{{ MR[0].Total }}</span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </template>
                                                  </div>
                                                </div>
                                              </template>
                                            </div>
                                          </div>
                                        </template>
                                      </div>
                                    </template>
                                  </div>
                                </template>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <template v-if="state.isScreen == '半期実績'">
                  <div class="content-footer" v-if="state.girdArry.length > 0">
                    <div class="content-footer-left"></div>

                    <div class="content-footer-right">
                      <div id="gridMemory" class="test3" style="display: flex; flex: 1; text-align: right">
                        <template v-for="(obj, index) in state.girdArry" :key="index"><div :style="state.style">
                            <span style="display: inline-flex"
                              ><span style="margin-left: 50%">{{ obj }}</span></span>
                          </div></template>
                      </div>

                      <div class="content-footer-text">Call回数</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="filter-wrapper">
              <div class="filter-contents">
                <div class="filter-area">
                  <SelectBox class="mb20" @tap-item="onTapSelectBoxItemCall" :width="'160px'" :category="'Call実施の月'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.Call実施の月" v-if="state.isScreen === '半期実績'" />

                  <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'エリア'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.エリア" />

                  <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'テリトリー名'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.テリトリー名" />

                  <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'MR'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.MR" />
                  <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'チャネル'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.チャネル" />
                   <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'Target'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.Target" />
                   <SelectBox class="mb20" @tap-item="onTapSelectBoxItem" :width="'160px'" :category="'製品'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.製品" />
                </div>
              </div>
            </div>
          </div>

          <div id="stalker" v-show="Object.keys(state.popupData).length > 0" :class="['pop', { 'pop-no': state.isHoverFlag }]">
            <div class="pop-content">
              <template v-if="Object.keys(state.popupData).includes('タイトル')">
                <div style="width: 100%">
                  <div class="pop-header">
                    <p v-html="state.popupData['タイトル']"></p>
                  </div>
                  <div class="pop-item2">
                    <div class="pop-content-text">
                      {{ state.popupData["テキスト"] }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="pop-item">
                  <template v-for="(obj2, index2) in state.popupData" :key="index2">
                    <div class="pop-content-title">{{ index2 }}:</div>
                  </template>
                </div>
                <div class="pop-item">
                  <template v-for="(obj2, index2) in state.popupData" :key="index2">
                    <div class="pop-content-text fwb">{{ obj2 }}</div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, onUpdated, onUnmounted, watch, nextTick } from "vue";
import IScroll from "iscroll";
import { SelectBox } from "@/components/presentational/organisms";
import dayjs from "dayjs";
import { sleep } from "@/utils/sleep";
import { useApplicationStore } from "@/store/modules/applicationModule";
import { useAccountStore } from "@/store/modules/accountModule";
import callDataOld from "@/assets/data/callOld.json";
import callDataNew from "@/assets/data/call.json";
interface State {
  iScrollObj: null | IScroll;
  iScrollObj2: null | IScroll;
  activityObj: any;
  testObj: any;
  testObj2: any;
  selectedFilterItems: {
    Call実施の月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア?: any;
    Target?: any;
    製品?: any;
  };
  selectedFilterItems2: {
    Call実施の月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア?: any;
    Target?: any;
    製品?: any;
  };
  selectedFilterItemsBK: {
    Call実施の月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア?: any;
    Target?: any;
    製品?: any;
  };
  keyword: any;
  accountList: any;
  accountList2: any;
  data: any;
  dataOrg: any;
  dataOrg2: any;
  dataOrg3: any;
  dataOrgMR: any;
  dataOrgTeritory: any;
  dataOrgArea: any;
  dataOrgFilter: any;
  dataOrgFilter2: any;
  data2: any;
  data3: any;
  options: any;
  loaded: boolean;
  plugins: any;
  h: any;
  emailList: any;
  girdArry: any;
  sentEmailListDetail: any;
  style: any;
  monthArry: any;
  monthArryStr: any;
  monthArryOrg: any;
  yearArryStr: any;
  sumArry: any;
  maxNumber: any;
  minNumber: any;
  maxNumberRank: any;
  selectFiliterCategory: any;
  isHoverFlag: boolean;
  isHoverFlagCount: number;
  popupData: any;
  isScreen: any;
  activeDOM: any;
  id: any;
  name: any;
  date: any;
}

export default defineComponent({
  components: {
    SelectBox,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    screen: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    
  },
  setup(props) {
    const root = ref(null);
    const chart = ref(null);
    const ApplicationStore = useApplicationStore();
    const Account = useAccountStore();
    const state = reactive<State>({
      iScrollObj: null,
      iScrollObj2: null,
      activityObj: null,
      keyword: "",
      testObj: {
        Call実施の月: {
          name: "Call実施の月",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        テリトリー名: {
          name: "テリトリー名",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        MR: {
          name: "MR",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        チャネル: {
          name: "チャネル",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        エリア: {
          name: "エリア",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        Target: {
          name: "Target",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        製品: {
          name: "製品",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
      },
      testObj2: {
        Call実施の月: {
          name: "Call実施の月",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        テリトリー名: {
          name: "テリトリー名",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        MR: {
          name: "MR",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        チャネル: {
          name: "チャネル",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        エリア: {
          name: "エリア",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        Target: {
          name: "Target",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        製品: {
          name: "製品",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
      },
      selectedFilterItems: {
        Call実施の月: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア: ["すべて"],
        Target: ["すべて"],
         製品: ["すべて"],
      },
      selectedFilterItems2: {
        Call実施の月: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア: ["すべて"],
        Target: ["すべて"],
           製品: ["すべて"],
      },
      selectedFilterItemsBK: {
        Call実施の月: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア: ["すべて"],
        Target: ["すべて"],
           製品: ["すべて"],
      },
      accountList: null,
      accountList2: [],
      data: [],
      dataOrg: null,
      dataOrg2: [],
      dataOrg3: [],
      dataOrgMR: [],
      dataOrgTeritory: [],
      dataOrgArea: [],
      dataOrgFilter: [],
      dataOrgFilter2: [],
      data2: [],
      data3: null,
      sentEmailListDetail: null,
      options: null,
      loaded: false,
      plugins: null,
      h: null,
      emailList: {},
      girdArry: [],
      style: null,
      monthArry: [],
      monthArryOrg: [],
      monthArryStr: [],
      yearArryStr: [],
      sumArry: {},
      maxNumber: null,
      minNumber: null,
      maxNumberRank: null,
      selectFiliterCategory: [],
      isHoverFlag: false,
      isHoverFlagCount: 0,
      popupData: {},
      isScreen: null,
      activeDOM: [],
      id: null,
      name: null,
      date: null,
    });

    const isLoadComplete = computed(() => ApplicationStore.isLoadComplete);

    const shouldShowHelpPopup = computed(() => ApplicationStore.getShouldShowHelpPopup);

    const propsList = reactive({ ...props });

    state.isScreen = propsList.screen;
    state.id = propsList.id;
    state.date = propsList.date;

    const getShareName3 = (_str) => {
      if (!_str) return null;
      _str = _str.substr(_str.indexOf("_") + 1);

      return _str;
    };

    state.name = getShareName3(propsList.id);

    // window.addEventListener(
    //   "mouseup",
    //   function (ev) {
    //     const selection = document.getSelection();
    //     const range = selection.getRangeAt(0);
    //   },
    //   false
    // );

    window.addEventListener("mousemove", (evt) => {
      if (state.isHoverFlagCount === 0) {
        state.isHoverFlagCount = 1;
        state.isHoverFlag = true;
      }

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }
      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    });

    window.addEventListener("touchstart", (e) => {
      state.isHoverFlag = false;
    });

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

    
      let callList2

      

       if (propsList.date === "newData") {
         let callListOrg = Account.getsentCallListOrgNew

       
      if (callListOrg.length === 0) {
         let callList3 = JSON.stringify(callDataNew);
          const callList4 = JSON.parse(callList3);  
          await Account.JSON__CALL_DATA_NEW(callList4);   
      }
            callList2 = Account.getsentCallListByKeyNew(props.id);
       } else {
         let callListOrg = Account.getsentCallListOrg

        
        if (callListOrg.length === 0) {
         let callList3 = JSON.stringify(callDataOld);  
          const callList4 = JSON.parse(callList3);
          await Account.JSON__CALL_DATA(callList4);
       
         }

      callList2 = Account.getsentCallListByKey(props.id);

       }
        
        

      state.data = computed(() => {
        const result = [];

        const callList = { ...callList2 };

        for (const key in callList) {
          if (!state.selectedFilterItems.エリア.includes("すべて")) {
            if (!state.selectedFilterItems.エリア.includes(key)) {
              continue
            }
          }
             for (const key2 in callList[key]) {

                if (!state.selectedFilterItems.テリトリー名.includes("すべて")) {
            if (!state.selectedFilterItems.テリトリー名.includes(key2)) {
              continue
            }
        }  
            
            for (const key3 in callList[key][key2]) {
              let obj = {};
              let dataObj = [];
              let dataObj2 = {};
              let Targets = [];
               let products = [];

              if (!state.selectedFilterItems.MR.includes("すべて")) {
            if (!state.selectedFilterItems.MR.includes(key3)) {
              continue
            }
              }

              for (const element in callList[key][key2][key3]) {


                
                

                              
                

                if (!state.selectedFilterItems.チャネル.includes("すべて")) {
                  const fiterSum = [];

                  
                  let products2 = []
                  for (const elemente of state.selectedFilterItems.チャネル) {
                    fiterSum.push(callList[key][key2][key3][element]
                      .filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return x.Target == state.selectedFilterItems.Target[0]
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              
              return state.selectedFilterItems.製品.includes(x["prodcut1"]) || state.selectedFilterItems.製品.includes(x["prodcut2"])|| state.selectedFilterItems.製品.includes(x["prodcut3"])|| state.selectedFilterItems.製品.includes(x["prodcut4"])|| state.selectedFilterItems.製品.includes(x["prodcut5"])|| state.selectedFilterItems.製品.includes(x["prodcut6"])
            }
          }).filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)).length);
          

          
                    // console.log(callList[key][key2][key3][element].filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)));
                    if (state.isScreen === "月別実績") {
                        products2.push(callList[key][key2][key3][element].filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)).map((p) => p["Detailed_Products_vod__c"]).filter((v) => v));
                         Targets.push(callList[key][key2][key3][element].filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)).map((p) => p["Target"]).filter((v) => v));
                    } else {
                        if (!state.selectedFilterItems.Call実施の月.includes("すべて") && !state.selectedFilterItems.Call実施の月.includes(element) ) {
                    continue
                } 
                      Targets.push(callList[key][key2][key3][element].filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)).map((p) => p["Target"]));
                      products2.push(callList[key][key2][key3][element].filter((item) => getShareName(item.CSLB_Channel_Type__c) == getShareName(elemente)).map((p) => p["Detailed_Products_vod__c"]).filter((v) => v));  
                    }
              
                       
                  }

                   
                  products2 = products2.flat(2)       
                  products2 = [...new Set(products2)];
                  
                  
                  for (const p of products2) {
                    if (p.indexOf("  ")) {
                      let sliceP = p.split("  ")
                      for (const s of sliceP) {
                        let s2 = s.trim()
                        products.push(s2)
                       }
                    } else {
                     products.push(p)  
                    }
                   
                  }


                  
                  
                  
                  products = [...new Set(products)];
                  Targets = Targets.flat(2)
                  Targets = [...new Set(Targets)];
                  
                  
              

                  const sum = fiterSum.reduce((sum, num) => sum + num, 0);
                  obj[element] = sum;




                
                } else {
                  let t = callList[key][key2][key3][element] .filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return x.Target == state.selectedFilterItems.Target[0]
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              
              return state.selectedFilterItems.製品.includes(x["prodcut1"]) || state.selectedFilterItems.製品.includes(x["prodcut2"])|| state.selectedFilterItems.製品.includes(x["prodcut3"])|| state.selectedFilterItems.製品.includes(x["prodcut4"])|| state.selectedFilterItems.製品.includes(x["prodcut5"])|| state.selectedFilterItems.製品.includes(x["prodcut6"])
            }
          })
                  obj[element] = t.length;

                  let Targets2 = (t.map((p) => p["Target"]).filter((v) => v));
                  Targets2 = Targets2.flat(2)

                   for (const p of Targets2) {
                  Targets.push(p)  
                   
                  }
                       
                  let products2 = (t.map((p) => p["Detailed_Products_vod__c"]).filter((v) => v));
                  products2 = products2.flat(2)       
                  products2 = [...new Set(products2)];
                  
                  for (const p of products2) {
                            if (!state.selectedFilterItems.Call実施の月.includes("すべて") && !state.selectedFilterItems.Call実施の月.includes(element) ) {
                    continue
                } 
                    if (p.indexOf("  ")) {
                      let sliceP = p.split("  ")
                       for (const s of sliceP) {
                       let s2 = s.trim()
                        products.push(s2)
                       }
                    } else {
                     products.push(p)  
                    }
                   
                  }

                  products = [...new Set(products)];
                  
                  
                  // Targets = Targets.flat(2)       
                Targets = [...new Set(Targets)];
                }

                let channels = callList[key][key2][key3][element].filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return x.Target == state.selectedFilterItems.Target[0]
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              
              return state.selectedFilterItems.製品.includes(x["prodcut1"]) || state.selectedFilterItems.製品.includes(x["prodcut2"])|| state.selectedFilterItems.製品.includes(x["prodcut3"])|| state.selectedFilterItems.製品.includes(x["prodcut4"])|| state.selectedFilterItems.製品.includes(x["prodcut5"])|| state.selectedFilterItems.製品.includes(x["prodcut6"])
            }
          }).map((p) => p["CSLB_Channel_Type__c"]).filter((v) => v);

                channels = [...new Set(channels)];

                dataObj2[element] = channels;

                dataObj.push(channels);
              }

              const dataCategory = [];
              const dataCategory2 = [];

              for (const key in dataObj2) {
                if (!state.selectedFilterItems.Call実施の月.includes("すべて") && !state.selectedFilterItems.Call実施の月.includes(key)) {
                  continue;
                }
                for (const element2 of dataObj2[key]) {
                  let keyVal = getShareName(element2);

                  if (!dataCategory2.includes(keyVal)) {
                    dataCategory2.push(keyVal);
                  }
                }
              }

              for (const element of dataObj) {
                for (const element2 of element) {
                  let keyVal = getShareName(element2);

                  if (!dataCategory.includes(keyVal)) {
                    dataCategory.push(keyVal);
                  }
                }
              }

              const rec = {
                営業部: props.id,
                エリア: key,
                テリトリー名: key2,
                MR: key3,
                data: obj,
                dataOrg: obj,
                チャネル: dataCategory,
                チャネル2: dataCategory2,
                Target: Targets,
                製品:products 
              };
              result.push(rec);
            }
          }
        }
        

        result.filter((x) => {
          if (state.selectedFilterItems.Call実施の月.includes("すべて")) {
            return true;
          } else {
            return (x.data = Object.fromEntries(Object.entries(x.data).filter(([key]) => state.selectedFilterItems.Call実施の月.includes(key))));
          }
        });

        const monthData = result.map((p) => Object.keys(p["dataOrg"]));

        const result2 = [];

        for (const element of monthData) {
          for (const element2 of element) {
            if (!result2.includes(element2)) {
              result2.push(element2);
            }
          }
        }

        const monthArryReserve = result2
          .sort((a, b) => {
            if (dayjs(a) < dayjs(b)) return 1;
            if (dayjs(a) > dayjs(b)) return -1;
          })
          .slice(0, 6);

        const monthArry = monthArryReserve.sort((a, b) => {
          if (dayjs(a) > dayjs(b)) return 1;
          if (dayjs(a) < dayjs(b)) return -1;
        });

        for (const element of result) {
          const total = [];
          const totalOrg = [];
          for (const month of monthArry) {
            if (Object.keys(element["data"]).includes(month)) {
              total.push(element["data"][month]);
            } else {
              total.push(0);
            }
            if (Object.keys(element["dataOrg"]).includes(month)) {
              totalOrg.push(element["dataOrg"][month]);
            } else {
              totalOrg.push(0);
            }
          }

          const sum = total.reduce((sum, num) => sum + num, 0);
          const sum2 = totalOrg.reduce((sum, num) => sum + num, 0);
          element["Total"] = sum;
          element["TotalOrg"] = sum2;
        }


        console.log("result");
        console.log(result);
        
        

      
        

        return result
          .filter((x) => {
            if (x.TotalOrg === 0) {
              return false;
            } else {
              return true;
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.チャネル.includes("すべて")) {
              return true;
            } else {
              return [...state.selectedFilterItems.チャネル, ...x.チャネル].filter((item) => state.selectedFilterItems.チャネル.includes(item) && x.チャネル.includes(item)).length > 0;
            }
          })
          .sort((a, b) => {
            if (a.エリア > b.エリア) return 1;
            if (a.エリア < b.エリア) return -1;
            if (a.テリトリー名 > b.テリトリー名) return 1;
            if (a.テリトリー名 < b.テリトリー名) return -1;
          });
      });

      console.log(state.data);

      state.dataOrg = [...state.data];

      await creatData(state.data);

      await creatDataDataCatgory(state.data, false);

      await creatDataMR(state.data, false);

      await creatDataArea(state.data, false);

      await creatDataTerritory(state.data, false);

      await creatDataTarget(state.data, false);
       
await creatDataProduct(state.data, false);
      await creatDataDataMonth();

      window.addEventListener("resize", onResize);
    });

    onUpdated(() => {
      const itemParent = document.querySelector("#gridMemory");

      if (itemParent) {
        const items3 = document.querySelectorAll(".gridnone");
        for (const item of items3) {
          item.classList.remove("gridnone");
        }

        const items = itemParent.children;
        const item = itemParent.lastElementChild;
        const itemChild = item.lastElementChild;

        const childWidth = item.clientWidth * items.length;
        console.log(itemParent.clientWidth);

        const itemPostion = childWidth + itemChild.clientWidth / 2;
        console.log(itemPostion);

        if (itemParent.clientWidth < itemPostion) {
          itemChild.lastElementChild.classList.add("gridnone");
        } else {
          itemChild.lastElementChild.classList.remove("gridnone");
        }
      }

      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh();
        }
      }, 500);
    });

    const onResize = () => {
      const windowSize = window.innerWidth;

      const totalArray = state.data.map((p) => p["Total"]).filter((v) => v);

      let maxIndex = Math.max(...totalArray);

      const numberDigit = String(maxIndex).length;

      state.data2 = [];

      let maxIndexCe;
      let girdNum;
      let girdNumPulus;

      console.log("maxIndex");

      console.log(maxIndex);

      let maxIndex80;

      if (windowSize > 1500) {
        maxIndex80 = maxIndex / 0.9;

        if (numberDigit >= 4) {
          maxIndexCe = maxIndex80;
          maxIndexCe = maxIndex80;
          if (maxIndex >= 2000) {
            girdNum = maxIndexCe / 500;
            girdNumPulus = 500;
          } else {
            girdNum = maxIndexCe / 100;
            girdNumPulus = 100;
          }

          console.log(maxIndexCe);
        } else if (numberDigit === 3) {
          maxIndexCe = maxIndex80;
          girdNum = maxIndexCe / 100;
          girdNumPulus = 100;
          if (maxIndex <= 600) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
          if (maxIndex <= 300) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 20;
            girdNumPulus = 20;
          }
        } else if (numberDigit <= 2) {
          if (maxIndex <= 100) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 10;
            girdNumPulus = 10;
          }

          if (maxIndex <= 50) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 5;
            girdNumPulus = 5;
          }

          if (maxIndex <= 20) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 2;
            girdNumPulus = 2;
          }

          if (maxIndex <= 10) {
            maxIndex80 = maxIndex + 1;
            maxIndexCe = maxIndex + 1;
            girdNum = maxIndexCe / 1;
            girdNumPulus = 1;
          }
        }
      } else if (windowSize > 1200) {
        maxIndex80 = maxIndex / 0.85;

        if (numberDigit >= 4) {
          maxIndexCe = maxIndex80;
          console.log(maxIndexCe);

          if (maxIndex >= 2000) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 500;
            girdNumPulus = 500;
          } else {
            girdNum = maxIndexCe / 200;
            girdNumPulus = 200;
          }
        } else if (numberDigit === 3) {
          maxIndexCe = maxIndex80;
          girdNum = maxIndexCe / 100;
          girdNumPulus = 100;
          if (maxIndex <= 500) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
          if (maxIndex <= 200) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 20;
            girdNumPulus = 20;
          }
        } else if (numberDigit <= 2) {
          if (maxIndex <= 100) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 10;
            girdNumPulus = 10;
          }

          if (maxIndex <= 50) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 5;
            girdNumPulus = 5;
          }

          if (maxIndex <= 20) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 2;
            girdNumPulus = 2;
          }

          if (maxIndex <= 10) {
            maxIndex80 = maxIndex + 1;
            maxIndexCe = maxIndex + 1;
            girdNum = maxIndexCe / 1;
            girdNumPulus = 1;
          }
        }
      } else if (windowSize > 1050) {
        maxIndex80 = maxIndex / 0.8;

        if (numberDigit >= 4) {
          maxIndexCe = maxIndex80;
          console.log(maxIndexCe);

          girdNum = maxIndexCe / 500;
          girdNumPulus = 500;
        } else if (numberDigit === 3) {
          maxIndexCe = maxIndex80;
          girdNum = maxIndexCe / 200;
          girdNumPulus = 200;
          if (maxIndex <= 400) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 100;
            girdNumPulus = 100;
          }
          if (maxIndex <= 200) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
        } else if (numberDigit <= 2) {
          if (maxIndex <= 100) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
          if (maxIndex <= 60) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 20;
            girdNumPulus = 20;
          }

          if (maxIndex <= 40) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 10;
            girdNumPulus = 10;
          }
          if (maxIndex <= 40) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 10;
            girdNumPulus = 10;
          }

          if (maxIndex <= 20) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 5;
            girdNumPulus = 5;
          }

          if (maxIndex <= 10) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 2;
            girdNumPulus = 2;
          }

          if (maxIndex <= 5) {
            maxIndex80 = maxIndex + 1;
            maxIndexCe = maxIndex + 1;
            girdNum = maxIndexCe / 1;
            girdNumPulus = 1;
          }
        }
      } else {
        maxIndex80 = maxIndex / 0.8;

        if (numberDigit >= 4) {
          maxIndexCe = maxIndex80;
          console.log(maxIndexCe);

          girdNum = maxIndexCe / 500;
          girdNumPulus = 500;
        } else if (numberDigit === 3) {
          maxIndexCe = maxIndex80;
          girdNum = maxIndexCe / 500;
          girdNumPulus = 500;
          if (maxIndex <= 800) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 200;
            girdNumPulus = 200;
          }
          if (maxIndex <= 400) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 100;
            girdNumPulus = 100;
          }
          if (maxIndex <= 200) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
        } else if (numberDigit <= 2) {
          if (maxIndex <= 100) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
          }
          if (maxIndex <= 60) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 20;
            girdNumPulus = 20;
          }

          if (maxIndex <= 80) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 20;
            girdNumPulus = 20;
          }
          if (maxIndex <= 40) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 10;
            girdNumPulus = 10;
          }

          if (maxIndex <= 20) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 5;
            girdNumPulus = 5;
          }

          if (maxIndex <= 10) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 2;
            girdNumPulus = 2;
          }

          if (maxIndex <= 5) {
            maxIndex80 = maxIndex + 1;
            maxIndexCe = maxIndex + 1;
            girdNum = maxIndexCe / 1;
            girdNumPulus = 1;
          }
        }
      }

      console.log(maxIndexCe);
      console.log(maxIndex80);
      console.log(girdNum);
      console.log(girdNumPulus);

      state.girdArry = [];

      for (let index = girdNumPulus; index <= maxIndexCe; index += girdNumPulus) {
        state.girdArry.push(index);
      }

      console.log(state.girdArry);

      state.style = {
        width: `calc(100% / ${girdNum})`,
      };

      const rankdata = [...state.data];

      rankdata.sort((a, b) => {
        if (a.Total > b.Total) return -1;
        if (a.Total < b.Total) return 1;
      });

      const rankObj = {};

      for (const element of rankdata) {
        element["ratio"] = {
          "--size": `calc( ${(element["Total"] / maxIndex80) * 100} / 100 )`,
          "background-size": `calc(100% / ${girdNum}) 100%`,
        };

        if (element.Total === 0) {
          continue;
        }

        if (!rankObj[element.Total]) {
          rankObj[element.Total] = {};
        }

        if (!rankObj[element.Total]["data"]) {
          rankObj[element.Total]["data"] = {};
        }

        if (!rankObj[element.Total]["dataArray"]) {
          rankObj[element.Total]["dataArray"] = [];
        }

        if (!rankObj[element.Total]["data"][element.営業部]) {
          rankObj[element.Total]["data"][element.営業部] = {};
        }

        if (!rankObj[element.Total]["data"][element.営業部][element.エリア]) {
          rankObj[element.Total]["data"][element.営業部][element.エリア] = {};
        }

        if (!rankObj[element.Total]["data"][element.営業部][element.エリア][element.テリトリー名]) {
          rankObj[element.Total]["data"][element.営業部][element.エリア][element.テリトリー名] = {};
        }

        if (!rankObj[element.Total]["data"][element.営業部][element.エリア][element.テリトリー名][element.MR]) {
          rankObj[element.Total]["data"][element.営業部][element.エリア][element.テリトリー名][element.MR] = [];
        }

        rankObj[element.Total]["data"][element.営業部][element.エリア][element.テリトリー名][element.MR].push(element);
        rankObj[element.Total]["dataArray"].push(element);
      }

      state.data2 = Object.entries(rankObj)
        .map(([key, value]) => ({ [key]: value }))
        .reverse();
      console.log(state.data2);
    };

    const test = (selectValue) => {
      console.log(selectValue);
    };

    const onSelectedStartDate = (selectValue) => {
      // state.selectedFilterItems.startDate = dayjs(selectValue)
      //   .startOf("day")
      //   .toISOString();
    };

    const onSelectedEndDate = (selectValue) => {
      // state.selectedFilterItems.endDate = dayjs(selectValue)
      //   .startOf("day")
      //   .toISOString();
    };

    const getShareName = (_str) => {
      if (!_str) return null;
      if (_str.includes("Face-to-Face")) {
        return "訪問";
      } else if (_str.includes("Mail")) {
        return "郵便";
      } else if (_str.includes("Phone")) {
        return "電話";
      } else if (_str.includes("Email")) {
        return "メール";
      } else if (_str.includes("Video")) {
        return "Web面談";
      } else {
        return _str;
      }
    };

    const onTapSelectBoxItemCall = async (_obj) => {
      onTapClearButton();
      state.selectedFilterItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

      for (const element in state.selectedFilterItems) {
        if (element === "Call実施の月") {
          continue;
        }

        if (state.selectFiliterCategory[0] === "チャネル" && element === "チャネル" || state.selectFiliterCategory.includes("Target") && element === "Target"|| state.selectFiliterCategory.includes("製品") && element === "製品") {
          continue;
        }

if (state.selectFiliterCategory[0] === element) {
            continue
          }


        if (state.selectedFilterItems[element].includes("すべて")) {
          state.selectedFilterItems[element] = ["すべて"];
          state.selectedFilterItems2[element] = ["すべて"];
          state.testObj[element].list = {
            すべて: "すべて",
          };
        } else {
          state.testObj[element].list = {
            すべて: "すべて",
          };
          state.selectedFilterItems2[element] = state.selectedFilterItems[element];
          state.selectedFilterItems[element] = ["すべて"];
        }
      }
      await creatData(state.data);

      {
        const test = state.selectFiliterCategory.filter((n) => n !== "チャネル" && n !== "Target" && n !== "製品");

        for (let index = 0; index < test.length; index++) {
          let element = test[index];
          let target;
          let target2;
          if (index === 0) {
            target = "Call実施の月";
            target2 = state.data;
          } else {
            target = "更新";
            target2 = state.dataOrg3;
          }
          if (element === "MR") {
            await creatDataMR(target2, target);
          } else if (element === "テリトリー名") {
            await creatDataTerritory(target2, target);
          } else if (element === "エリア") {
            await creatDataArea(target2, target);
          }
        }

        if (!state.selectFiliterCategory.includes("MR")) {
          await creatDataMR(state.data, false);
        }
        if (!state.selectFiliterCategory.includes("テリトリー名")) {
          await creatDataTerritory(state.data, false);
        }
        if (!state.selectFiliterCategory.includes("エリア")) {
          await creatDataArea(state.data, false);
        }
      }

      await creatDataDataCatgory(state.data, "Call実施の月");
      await creatDataTarget(state.data, "Call実施の月");
      await creatDataProduct(state.data, "Call実施の月");
       


      await creatData(state.data);
    };

    const onTapSelectBoxItem = async (_obj) => {
      onTapClearButton();

      state.selectedFilterItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

      let flg = false;
      let flg2 = false;

      if (!state.selectFiliterCategory.includes(_obj.category)) {
        if (_obj.category === "チャネル") {
          state.selectFiliterCategory.unshift(_obj.category);
        } else {
          state.selectFiliterCategory.push(_obj.category);
        }
      } else {
        const targetList = Object.keys(state.testObj[_obj.category].list).length;

        console.log(targetList);

        console.log(_obj.selectedValue);
        console.log(state.selectFiliterCategory);

        if (state.selectFiliterCategory[0] === _obj.category && _obj.selectedValue.length === targetList) {

          // if (state.selectFiliterCategory.includes('チャネル')) {
          // console.log('チャネル');

          // } else {
          //   state.selectFiliterCategory = [];
          // }
          //  state.selectFiliterCategory = [];
          // state.dataOrgFilter = [];
          //  state.dataOrg3 = []

          state.selectFiliterCategory.shift();

          // console.log(state.testObj[state.selectFiliterCategory[0]].list);
          // console.log(state.selectedFilterItems[state.selectFiliterCategory[0]]);

          for (const element of state.selectFiliterCategory) {
            if (state.selectFiliterCategory[0] === element) {
              if (!state.selectedFilterItems[element].includes("すべて")) {
                const lists = Object.values(state.testObj[element].list).filter((n) => n !== "すべて");
                console.log(lists);

                const selectList = state.selectedFilterItems[element];

                const diff = lists.filter((i) => selectList.indexOf(i) == -1);
                console.log(diff);

                const mrList = state.dataOrg
                  .filter((x) => {
                    return !diff.includes(x[element]);
                  })
                  .map((p) => p[element])
                  .flat()
                  .sort((a, b) => {
                    if (a > b) return 1;
                    if (a < b) return -1;
                  });

                const mrListOrg = state.dataOrg
                  .map((p) => p[element])
                  .flat()
                  .sort((a, b) => {
                    if (a > b) return 1;
                    if (a < b) return -1;
                  });

                state.selectedFilterItems[element] = [];
                state.selectedFilterItems[element] = mrList;
                console.log(mrList);

                state.dataOrgFilter = [...state.data];
                state.dataOrg3 = [...state.data];
                state.testObj[element].list = mrListOrg.reduce((acc, value, index) => {
                  return { ...acc, [value]: value };
                }, {});
                state.testObj[element].list["すべて"] = "すべて";
                flg = true;
              }
            }
          }

          // let mrList = state.data
          //     .map((p) => p[state.selectFiliterCategory[0]])
          //   .sort((a, b) => {
          //     if (a > b) return 1;
          //     if (a < b) return -1;
          //     });
        }
      }

       await nextTick();

      if (state.selectFiliterCategory[0] === _obj.category) {
        if (_obj.category === "チャネル") {
          for (const element of state.selectFiliterCategory) {
            if (element === "チャネル") {
              continue;
            }

            state.selectedFilterItems[element] = ["すべて"];
          }
          await nextTick();
        }

        if (state.selectFiliterCategory[0]  === "Target") {
          state.dataOrgFilter = [...state.data];
        } else {
          state.dataOrgFilter = [...state.data];
        }

        if (state.selectFiliterCategory[0]  === "製品") {
          state.dataOrgFilter = [...state.data];
        } else {
          state.dataOrgFilter = [...state.data];
        }

        
        state.dataOrg3 = [...state.data];
      }

       

      const test = state.selectFiliterCategory.filter((n) => n !== "チャネル"  && n !== "Target" && n !== "製品");

      if (test.includes(_obj.category)) {
        const i = state.selectFiliterCategory.indexOf(_obj.category) + 1;

        const i2 = state.selectFiliterCategory.indexOf(_obj.category);

        for (let index = i; index < state.selectFiliterCategory.length; index++) {
          if (state.selectFiliterCategory[index] === "チャネル" && state.selectFiliterCategory[index] === "Target"&& state.selectFiliterCategory[index] === "製品") {
            continue;
          }
          state.selectedFilterItems[state.selectFiliterCategory[index]] = ["すべて"];
          state.testObj[state.selectFiliterCategory[index]].list = {
            すべて: "すべて",
          };

          state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== state.selectFiliterCategory[index]);
        }

        if (test[0] === _obj.category) {
          state.dataOrgFilter2 = [...state.data];
        }

        console.log("rest");
        console.log(state.selectFiliterCategory);
      }

      await nextTick();
      const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);

      console.log(newArray);

      if (newArray.includes("すべて")) {
        state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);

        flg2 = true;
        // state.selectedFilterItemsBK[_obj.category] = []

        // continue
      } else {
        state.selectedFilterItemsBK[_obj.category] = newArray;
      }

      console.log("rest2");
      console.log(state.selectFiliterCategory);

      for (const element of state.selectFiliterCategory) {
        console.log("あり");
        console.log(element);

        // if (state.selectedFilterItems[_obj.category].length === 0) {
        //       if ( _obj.category !== element) {
        //   state.testObj[element].list = {}
        //   state.testObj[element].list["すべて"] = "すべて";
        // }
        
        //  continue;
        // }

        

        if ((_obj.category === element && flg) || _obj.category === element) {
          continue;
        }


        if (flg2 && element !== "チャネル") {
          state.selectedFilterItems[element] = state.selectedFilterItemsBK[element];
        } else {
          console.log(_obj.category);
          console.log(state.dataOrgFilter);
          let mrList;

          if (_obj.category === "チャネル" || element === "チャネル" ) {
            
            //  state.selectedFilterItemsBK[_obj.category] = state.selectedFilterItems[element]
            state.selectedFilterItems[element] = ["すべて"];
            mrList = state.dataOrgFilter
              .map((p) => p[element])
              .flat()
              .sort((a, b) => {
                if (a > b) return 1;
                if (a < b) return -1;
              });

            mrList = [...new Set(mrList)];

            state.selectedFilterItems[element] = state.selectedFilterItemsBK[element].filter((n) => mrList.includes(n));
            if (element === "チャネル") {
              continue
            }
            state.testObj[element].list = mrList.reduce((acc, value, index) => {
              return { ...acc, [value]: value };
            }, {});
            if (state.selectedFilterItems[element].length === Object.values(state.testObj[element].list).length && state.selectedFilterItems[element].length > 0) {
              state.selectedFilterItems[element].unshift("すべて");
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== element);
            }
            state.testObj[element].list["すべて"] = "すべて";
          } else if (element === "Target" || _obj.category === "Target"|| element === "製品" || _obj.category === "製品") {
            console.log("a");
        
          } else {
            const test = state.selectFiliterCategory.filter((n) => n !== "チャネル" && n !== "Target"&& n !== "製品");
            let data;
            if (state.dataOrgFilter2.length > 0) {
              data = state.dataOrgFilter2;
            } else {
              data = state.dataOrgFilter;
            }

            if (test.length <= 2) {
              mrList = data
                .filter((x) => {
                  return newArray.includes(x[_obj.category]);
                })
                .map((p) => p[element])
                .flat()
                .sort((a, b) => {
                  if (a > b) return 1;
                  if (a < b) return -1;
                });
            } else if (test.length === 3) {
              console.log(test[1]);

              mrList = data
                .filter((x) => {
                  return newArray.includes(x[_obj.category]);
                })
                .filter((x) => {
                  return state.selectedFilterItems[test[1]].includes(x[test[1]]);
                })
                .map((p) => p[element])
                .flat()
                .sort((a, b) => {
                  if (a > b) return 1;
                  if (a < b) return -1;
                });
            }

      
            console.log(state.dataOrgFilter);

            console.log("mrList");
            console.log(mrList);
            state.selectedFilterItems[element] = [];
            state.selectedFilterItems[element] = mrList;

            if (Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length === 0) {
              state.testObj[element].list = state.selectedFilterItems[element].reduce((acc, value, index) => {
                return { ...acc, [value]: value };
              }, {});
              state.testObj[element].list["すべて"] = "すべて";
            }

            if (mrList.length === Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length && mrList.length > 0) {
              state.selectedFilterItems[element].unshift("すべて");
            }
          }
        }
      }


      await nextTick();

      for (const element in state.selectedFilterItems) {
        if (element === "Call実施の月") {
          continue;
        }

       
    

        if (!state.selectFiliterCategory.includes(element)) {
          // if (state.selectFiliterCategory.length === 0) {
          //   continue
          // }

          state.selectedFilterItems[element] = ["すべて"];
          await nextTick();

          console.log(state.data);
          let mrList

             if (element === "チャネル") {
          mrList = state.data
            .filter((x) => {
              if (x.Total === 0 && state.isScreen === "半期実績") {
                return false;
              } else {
                return true;
              }
            })
            .map((p) => p["チャネル2"])
            .flat()
            .sort((a, b) => {
              if (a > b) return 1;
              if (a < b) return -1;
            });
             } else if (element === "製品") {
          mrList = state.data
            .filter((x) => {
              if (x.Total === 0 && state.isScreen === "半期実績") {
                return false;
              } else {
                return true;
              }
            })
            .map((p) => p["製品"])
            .flat()
            .sort((a, b) => {
              if (a > b) return 1;
              if (a < b) return -1;
            });
             } else {
            mrList = state.data
            .filter((x) => {
              if (x.Total === 0 && state.isScreen === "半期実績") {
                return false;
              } else {
                return true;
              }
            })
            .map((p) => p[element])
            .flat()
            .sort((a, b) => {
              if (a > b) return 1;
              if (a < b) return -1;
            });
        }


          

          

          mrList = [...new Set(mrList)];

          console.log(mrList);

          state.selectedFilterItems[element] = [];
          state.selectedFilterItems[element] = mrList;
          state.selectedFilterItems[element].unshift("すべて");

          state.testObj[element].list = state.selectedFilterItems[element].reduce((acc, value, index) => {
            return { ...acc, [value]: value };
          }, {});
        }
      }
      
      
      

      console.log(state.testObj);
      console.log(state.selectedFilterItems);
      console.log(state.selectFiliterCategory);
      
      

      //       for (const element in state.selectedFilterItems) {

      //         if (element === "Call実施の月") {
      //           continue
      //         }

      //         if (element === _obj.category) {
      //           if (state.selectFiliterCategory[0] === _obj.category) {
      //             // state.selectFiliterCategory = [];
      //             // state.dataOrgFilter = [];
      //             // state.selectFiliterCategory.push(_obj.category);

      //            if (state.selectFiliterCategory[0] !== "チャネル") {
      //              state.dataOrgFilter = [...state.data];
      //              state.dataOrg3 = [...state.data]
      //            }

      //           } else {
      //             if (state.selectFiliterCategory.length === 0) {
      //               continue;
      //             }

      //             if (state.selectFiliterCategory[1] === _obj.category && state.selectFiliterCategory[0] === "チャネル") {
      //               state.dataOrgFilter = [...state.data];
      //  state.dataOrg3 = [...state.data]
      //             }

      //             state.dataOrgFilter2 = [...state.dataOrgFilter];

      //             const newArray = state.selectedFilterItems[_obj.category].filter(
      //               (n) => n !== _obj.selectedValue
      //             );

      //             if (newArray.includes("すべて")) {
      //               state.selectFiliterCategory = state.selectFiliterCategory.filter(
      //                 (n) => n !== _obj.category
      //               );

      //               // continue
      //             }

      //             let result;
      //             let territoryList;

      //             if (state.selectFiliterCategory[0] === "チャネル" && state.selectFiliterCategory[1] ) {
      //               territoryList = state.dataOrgFilter
      //                 .filter((x) => {
      //                   return newArray.includes(x[_obj.category]);
      //                 })
      //                 .map((p) => p[state.selectFiliterCategory[1]])
      //                 .sort((a, b) => {
      //                   if (a > b) return 1;
      //                   if (a < b) return -1;
      //                 });
      //             } else {
      //               if (_obj.category === "チャネル") {
      //               territoryList = state.dataOrgFilter
      //                 .filter((x) => {
      //                   return (
      //                     [...newArray, ...x.チャネル].filter(
      //                       (item) =>
      //                         newArray.includes(item) && x.チャネル.includes(item)
      //                     ).length > 0
      //                   );
      //                 })
      //                 .map((p) => p[state.selectFiliterCategory[0]])
      //                 .sort((a, b) => {
      //                   if (a > b) return 1;
      //                   if (a < b) return -1;
      //                 });
      //               } else {

      //               territoryList = state.dataOrgFilter
      //                 .filter((x) => {
      //                   return newArray.includes(x[_obj.category]);
      //                 })
      //                 .map((p) => p[state.selectFiliterCategory[0]])
      //                 .sort((a, b) => {
      //                   if (a > b) return 1;
      //                   if (a < b) return -1;
      //                 });
      //             }

      //             }

      //             const result3 = [];

      //             if (state.selectFiliterCategory[0] === "チャネル") {

      //               if (state.selectFiliterCategory[1]) {
      //                  result = territoryList;

      //               state.selectedFilterItems[state.selectFiliterCategory[1]] =
      //                 result;
      //               } else {
      //                 continue;
      //               }

      //             }  else {

      //               result = territoryList;

      //               state.selectedFilterItems[state.selectFiliterCategory[0]] =
      //                 result;
      //             }
      //           }

      //           continue;
      //         } else {

      //           if (state.selectFiliterCategory.includes(element)) {

      //             if (_obj.category === "チャネル") {
      //                 continue
      //               }

      //             const i = state.selectFiliterCategory.indexOf(_obj.category) + 1;

      //             if (state.selectFiliterCategory.length > i && i !== 0) {

      //               for (
      //                 let index = i;
      //                 index < state.selectFiliterCategory.length;
      //                 index++
      //               ) {

      //                 state.selectedFilterItems[state.selectFiliterCategory[index]] =
      //                   ["すべて"];
      //                 state.testObj[state.selectFiliterCategory[index]].list = {
      //                   すべて: "すべて",
      //                 };
      //               }
      //             }
      //           } else {

      //             state.selectedFilterItems[element] = ["すべて"];
      //             state.testObj[element].list = {
      //               すべて: "すべて",
      //             };
      //           }
      //         }
      //       }

      await creatData(state.data);

      //  await creatDataMR(state.data,_obj.category);
      // await creatDataArea(state.data,_obj.category);
      // await creatDataTerritory(state.data,_obj.category);
      // await creatDataDataCatgory(state.data,_obj.category);
      
      await creatDataDataMonth();
    };

    const creatDataMR = (data, category) => {
      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "半期実績") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["MR"])
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of mrList) {
        if (!state.testObj.MR.list[key]) {
          state.testObj.MR.list[key] = key;
          state.selectedFilterItems.MR.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }

      // if (state.selectedFilterItems2.MR.length > 0) {

      // const filterData = Object.keys(state.testObj2.MR.list).filter(n => !state.selectedFilterItems2.MR.includes(n))

      //    for (const element of state.selectedFilterItems.MR) {
      //   if (element !=="すべて" && !filterData.includes(element) && !state.selectedFilterItems2.MR.includes(element)) {
      //      state.selectedFilterItems2.MR.push(element)
      //   }
      // }
      // }

      if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.MR.includes("すべて")) {
          state.selectedFilterItems.MR = state.selectedFilterItems2.MR;
        }
      }

      if (category === "MR") {
        for (const element of state.selectedFilterItems.MR) {
          if (!mrList.includes(element) && element !== "すべて") {
            state.selectedFilterItems.MR = state.selectedFilterItems.MR.filter((n) => n !== element);
          }
        }
      }

      return mrList;
    };

    const creatDataTarget = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "半期実績") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["Target"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

        console.log(mrList);
        

      for (const key of mrList) {
        if (!state.testObj.Target.list[key]) {
          state.testObj.Target.list[key] = key;
          state.selectedFilterItems.Target.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }
        if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.Target.includes("すべて")) {
          if (state.selectedFilterItems2.Target.length > 0) {
            state.selectedFilterItems.Target = state.selectedFilterItems2.Target;
          }
        }
        }
      

      if (category === "Target") {
        for (const element of state.selectedFilterItems.Target) {
          if (!mrList.includes(element) && element !== "すべて") {
            state.selectedFilterItems.Target = state.selectedFilterItems.Target.filter((n) => n !== element);
          }
        }
      }

      return mrList;
    };

     const creatDataProduct = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "半期実績") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["製品"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

        console.log("mrListmrList");
        

        console.log(mrList);
        

      for (const key of mrList) {
        if (!state.testObj.製品.list[key]) {
          state.testObj.製品.list[key] = key;
          state.selectedFilterItems.製品.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }
        if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.製品.includes("すべて")) {
          if (state.selectedFilterItems2.製品.length > 0) {
            state.selectedFilterItems.製品 = state.selectedFilterItems2.製品;
          }
        }
        }
      

      if (category === "製品") {
        for (const element of state.selectedFilterItems.製品) {
          if (!mrList.includes(element) && element !== "すべて") {
            state.selectedFilterItems.製品 = state.selectedFilterItems.製品.filter((n) => n !== element);
          }
        }
      }

      return mrList;
    };

    const creatDataArea = (data, category) => {
      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "半期実績") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["エリア"])
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of mrList) {
        if (!state.testObj.エリア.list[key]) {
          state.testObj.エリア.list[key] = key;
          state.selectedFilterItems.エリア.push(key);
        }
      }

      //   if (state.selectedFilterItems2.エリア.length > 0) {

      // const filterData = Object.keys(state.testObj2.エリア.list).filter(n => !state.selectedFilterItems2.エリア.includes(n))

      //    for (const element of state.selectedFilterItems.エリア) {
      //   if (element !=="すべて" && !filterData.includes(element) && !state.selectedFilterItems2.エリア.includes(element)) {
      //      state.selectedFilterItems2.エリア.push(element)
      //   }
      // }
      // }

      if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.エリア.includes("すべて")) {
          state.selectedFilterItems.エリア = state.selectedFilterItems2.エリア;
        }
      }

      if (category === "エリア") {
        for (const element of state.selectedFilterItems.エリア) {
          if (!mrList.includes(element) && element !== "すべて") {
            state.selectedFilterItems.エリア = state.selectedFilterItems.エリア.filter((n) => n !== element);
          }
        }
      }

      return mrList;
    };

    const creatDataTerritory = (data, category) => {
      const territoryList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "半期実績") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["テリトリー名"])
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of territoryList) {
        if (!state.testObj.テリトリー名.list[key]) {
          state.testObj.テリトリー名.list[key] = key;
          state.selectedFilterItems.テリトリー名.push(key);
        }
      }

      //   if (state.selectedFilterItems2.テリトリー名.length > 0) {

      // const filterData = Object.keys(state.testObj2.テリトリー名.list).filter(n => !state.selectedFilterItems2.テリトリー名.includes(n))

      //    for (const element of state.selectedFilterItems.テリトリー名) {
      //   if (element !=="すべて" && !filterData.includes(element) && !state.selectedFilterItems2.テリトリー名.includes(element)) {
      //      state.selectedFilterItems2.テリトリー名.push(element)
      //   }
      // }
      //   }

      if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.テリトリー名.includes("すべて")) {
          state.selectedFilterItems.テリトリー名 = state.selectedFilterItems2.テリトリー名;
        }
      }

      if (category === "テリトリー名") {
        for (const element of state.selectedFilterItems.テリトリー名) {
          if (!territoryList.includes(element) && element !== "すべて") {
            state.selectedFilterItems.テリトリー名 = state.selectedFilterItems.テリトリー名.filter((n) => n !== element);
          }
        }
      }

      return territoryList;
    };

    const creatDataDataCatgory = (data, category) => {
      const dataObj = data.map((p) => p["チャネル2"]);

      console.log(dataObj);

      const result3 = [];

      for (const element of dataObj) {
        for (const element2 of element) {
          if (!result3.includes(element2)) {
            result3.push(element2);
          }
        }
      }

      //   const mrListOrg = state.dataOrg3
      //     .map((p) => p["チャネル"]);

      //       const result = [];

      // for (const element of dataObj) {
      //   for (const element2 of element) {
      //     if (!result.includes(element2)) {
      //       result.push(element2);
      //     }
      //   }
      // }

      for (const key of result3) {
        if (!state.testObj.チャネル.list[key]) {
          state.testObj.チャネル.list[key] = key;
          if (state.selectedFilterItems.チャネル.includes("すべて")) {
            state.selectedFilterItems.チャネル.push(key);
          }
        }
      }

      if (category === "Call実施の月") {
        if (!state.selectedFilterItems2.チャネル.includes("すべて")) {
          if (state.selectedFilterItems2.チャネル.length > 0) {
            state.selectedFilterItems.チャネル = state.selectedFilterItems2.チャネル;
          }
        }
      }

      if (category === "チャネル") {
        for (const element of state.selectedFilterItems.チャネル) {
          if (!result3.includes(element) && element !== "すべて") {
            state.selectedFilterItems.チャネル = state.selectedFilterItems.チャネル.filter((n) => n !== element);
          }
        }
      }

      return result3;
    };

    const creatDataDataMonth = () => {
      if (state.monthArryOrg.length === 0) {
        state.monthArryOrg = [...state.monthArry];
      }

      for (const key of state.monthArryOrg) {
        if (!state.testObj.Call実施の月.list[key]) {
          state.testObj.Call実施の月.list[key] = key;
          state.selectedFilterItems.Call実施の月.push(key);
        }
      }
    };

    const creatData = (data) => {
      const monthData = data.map((p) => Object.keys(p["dataOrg"]));

      const result2 = [];

      for (const element of monthData) {
        for (const element2 of element) {
          if (!result2.includes(element2)) {
            result2.push(element2);
          }
        }
      }

      const monthData2 = data.map((p) => Object.values(p["dataOrg"]));

      // let result3 = [];

      // for (const element of monthData2) {
      //   for (const element2 of element) {
      //     if (!result2.includes(element2)) {
      //       result3.push(element2);
      //     }
      //   }
      // }

      // result3 = result3.sort((a, b) => {
      //     if (a < b) return 1;
      //     if (a > b) return -1;
      // })

      // let test = result3.length * (90 / 100)
      // test = result3.length - test

      // console.log(test);

      const monthArryReserve = result2
        .sort((a, b) => {
          if (dayjs(a) < dayjs(b)) return 1;
          if (dayjs(a) > dayjs(b)) return -1;
        })
        .slice(0, 6);

      state.monthArry = monthArryReserve.sort((a, b) => {
        if (dayjs(a) > dayjs(b)) return 1;
        if (dayjs(a) < dayjs(b)) return -1;
      });

      const maxIndexArry = [];
      const minindexArry = [];

      if (state.monthArryOrg.length === 0) {
         for (const element of state.monthArry) {
        const monthSum = state.data.map((p) => p["dataOrg"][element]).filter((v) => v);

        const sum = monthSum.reduce((sum, num) => sum + num, 0);
        const maxIndex = Math.max(...monthSum);
        const minIndex = Math.min(...monthSum);
        maxIndexArry.push(maxIndex);
        minindexArry.push(minIndex);
        state.sumArry[element] = sum;

        const e = dayjs(element).format("M") + "月";
        if (!state.monthArryStr.includes(e)) {
          state.monthArryStr.push(e);
        }

        const e2 = dayjs(element).format("YYYY");
        if (!state.yearArryStr.includes(e2)) {
          state.yearArryStr.push(e2);
        }
      }
      } else {
         for (const element of state.monthArryOrg) {
        const monthSum = state.data.map((p) => p["dataOrg"][element]).filter((v) => v);

        const sum = monthSum.reduce((sum, num) => sum + num, 0);
        const maxIndex = Math.max(...monthSum);
        const minIndex = Math.min(...monthSum);
        maxIndexArry.push(maxIndex);
        minindexArry.push(minIndex);
        state.sumArry[element] = sum;

        const e = dayjs(element).format("M") + "月";
        if (!state.monthArryStr.includes(e)) {
          state.monthArryStr.push(e);
        }

        const e2 = dayjs(element).format("YYYY");
        if (!state.yearArryStr.includes(e2)) {
          state.yearArryStr.push(e2);
        }
      }
      }

     

      state.maxNumber = Math.max(...maxIndexArry);
      state.minNumber = Math.min(...minindexArry);
      console.log("state.maxNumber");

      console.log(state.maxNumber);

      onResize();
    };

    const onTapClearButton = () => {
      const itemParent = document.querySelector("#call-list-data-wrap");
      const isCheckedParent = itemParent.classList.contains("selected");

      const items3 = document.querySelectorAll(".call-list-item.selected");
      for (const item of items3) {
        item.classList.remove("selected");
      }

      const items2 = document.querySelectorAll(".call-list-title.on");
      for (const item of items2) {
        item.classList.remove("on");
      }

      const items = document.querySelectorAll(".call-list-data-item");
      for (const item of items) {
        item.classList.remove("no-active");
        item.classList.remove("on");
      }

      itemParent.classList.remove("selected");

      state.isHoverFlag = false;
    };

    const onTapTarget = (_obj, index, _obj2, evt) => {
      const itemParent = document.querySelector("#call-list-data-wrap");
      const isCheckedParent = itemParent.classList.contains("selected");
      const isChecked = evt.target.classList.contains("no-active");

      if (isCheckedParent) {
        const items5 = document.querySelectorAll(".header-list-item.on");

        const items3 = document.querySelectorAll("#call-list-data-wrap .call-list-item.selected");
        for (const item of items3) {
          item.classList.remove("selected");
        }

        const items4 = document.querySelectorAll("#call-list-data-wrap .call-list-title.on");

        const items2 = document.querySelectorAll("#call-list-data-wrap .call-list-data-item.on");

        for (const item of items2) {
          item.classList.remove("on");
        }

        if (!isChecked) {
          if (items5.length > 0 || items4.length > 0) {
            const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");

            for (const item of items) {
              item.classList.add("no-active");
            }

            evt.target.classList.remove("no-active");
            evt.target.classList.add("on");
            setPouUp1(_obj, index, _obj2, evt);
          } else {
            const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");

            for (const item of items) {
              item.classList.remove("no-active");
            }

            const items2 = document.querySelectorAll("#call-list-data-wrap  .call-list-data-item.on");

            for (const item of items2) {
              item.classList.remove("on");
            }

            itemParent.classList.remove("selected");
          }
        } else {
          const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");

          for (const item of items) {
            item.classList.add("no-active");
          }

          evt.target.classList.remove("no-active");
          evt.target.classList.add("on");
          setPouUp1(_obj, index, _obj2, evt);
        }

        for (const item of items4) {
          item.classList.remove("on");
        }

        for (const item of items5) {
          item.classList.remove("on");
        }
      } else {
        const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");

        // console.log(items);

        for (const item of items) {
          item.classList.add("no-active");
        }

        evt.target.classList.remove("no-active");
        evt.target.classList.add("on");
        itemParent.classList.add("selected");

        setPouUp1(_obj, index, _obj2, evt);
      }

      // isChecked ? evt.target.classList.remove('on') : evt.target.classList.add('on')
    };

    const onTapTarget2 = (_obj, text, evt) => {
      //  const items = document.querySelectorAll(".call-list-item.selected");
      // for (const item of items) {
      //   item.classList.remove("selected");
      // }

      // const items2 = document.querySelectorAll(".call-list-title.on");
      // for (const item of items2) {
      //   item.classList.remove("on");
      // }

      const itemParent = document.querySelector("#call-list-data-wrap");
      const isCheckedParent = itemParent.classList.contains("selected");

      const parentElment = evt.target.parentElement;

      if (evt.target.classList.contains("on")) {
        evt.target.classList.remove("on");
        parentElment.classList.remove("selected");
        itemParent.classList.remove("selected");
        const items = document.querySelectorAll("#call-list-data-wrap  .call-list-data-item");
        for (const item of items) {
          item.classList.remove("no-active");
        }

        state.isHoverFlag = false;
      } else {
        const items5 = document.querySelectorAll(".header-list-item.on");

        for (const item of items5) {
          item.classList.remove("on");
        }

        const items3 = document.querySelectorAll("#call-list-data-wrap .call-list-item.selected");
        for (const item of items3) {
          item.classList.remove("selected");
        }

        const items4 = document.querySelectorAll("#call-list-data-wrap .call-list-title.on");
        for (const item of items4) {
          item.classList.remove("on");
        }

        evt.target.classList.add("on");
        parentElment.classList.add("selected");
        itemParent.classList.add("selected");

        const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");
        for (const item of items) {
          item.classList.add("no-active");
          item.classList.remove("on");
        }

        const items2 = document.querySelectorAll("#call-list-data-wrap .call-list-item.selected .call-list-data-item");
        for (const item of items2) {
          item.classList.remove("no-active");
        }

        setPouUp(_obj, text, evt);
      }
    };

    const onTapTarget3 = (evt, month, flg) => {
      const itemParent = document.querySelector("#call-list-data-wrap");

      const items4 = document.querySelectorAll("#call-list-data-wrap .call-list-title.on");
      for (const item of items4) {
        item.classList.remove("on");
      }

      if (evt.target.classList.contains("on")) {
        evt.target.classList.remove("on");
        itemParent.classList.remove("selected");
        const items = document.querySelectorAll("#call-list-data-wrap  .call-list-data-item.no-active");
        for (const item of items) {
          item.classList.remove("no-active");
        }

        state.isHoverFlag = false;
      } else {
        const items4 = document.querySelectorAll(".header-list-item.on");
        for (const item of items4) {
          item.classList.remove("on");
        }

        itemParent.classList.add("selected");
        evt.target.classList.add("on");

        const items = document.querySelectorAll("#call-list-data-wrap .call-list-data-item");
        for (const item of items) {
          item.classList.remove("on");

          if (month === item.getAttribute("data-month") || flg === "year") {
            item.classList.remove("no-active");
            continue;
          }

          item.classList.add("no-active");
        }

        setPouUp2(evt, month, flg);
      }
    };

    const onHoverItem = (_obj, index, _obj2, evt) => {
      state.isHoverFlag = true;

      const ua = navigator.userAgent;

      if (state.isHoverFlagCount === 0 && ua.indexOf("iPad") <= 0) {
        state.isHoverFlag = false;
      }

      if (index === "すべて") {
        const year = dayjs(_obj2).format("YYYY");
        const month = dayjs(_obj2).format("M") + "月";

        state.popupData = {
          "コール実施月 の月": month,
          "'月別実績'": "月別実績",
          MR: "すべて",
          エリア: "すべて",
          テリトリー名: "すべて",
          営業部: "すべて",
          "コール実施月 の年": year,
          "移行済みデータ のカウント": _obj,
          "表 (下) に沿った 列番号": "すべて",
        };
      } else {
        const month = dayjs(_obj2).format("M") + "月";
        const year = dayjs(_obj2).format("YYYY");

        let count;
        if (Object.keys(_obj.data).includes(_obj2)) {
          count = _obj.data[_obj2];
          if (count === 0) {
            count = " ";
          }
        } else {
          count = " ";
        }

        state.popupData = {
          "コール実施月 の月": month,
          "'月別実績'": "月別実績",
          MR: _obj.MR,
          エリア: _obj.エリア,
          テリトリー名: _obj.テリトリー名,
          営業部: _obj.営業部,
          "コール実施月 の年": year,
          "移行済みデータ のカウント": count,
          "表 (下) に沿った 列番号": index + 1,
        };
      }
    };

    const onHoverItem2 = (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      const test = Object.values(_obj["data"]);

      const sum = test.reduce((sum, num) => Number(sum) + Number(num), 0);

      state.popupData = {
        タイトル: `<span class="fwb">6</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`,
        テキスト: text,
      };
    };

    const onHoverItem3 = (evt, month, flg) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      if (flg === "year") {
        const items4 = document.querySelectorAll(`#call-list-data-wrap .call-list-data-item`);

        const test = Object.values(state.sumArry);
        const sum = test.reduce((sum, num) => Number(sum) + Number(num), 0);
        const title = `<span class="fwb">${items4.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;

        state.popupData = {
          タイトル: title,
          テキスト: month,
        };
      } else {
        const items4 = document.querySelectorAll(`[data-month="${month}"]`);
        const title = `<span class="fwb">${items4.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${state.sumArry[month].toLocaleString()}</span>`;

        state.popupData = {
          タイトル: title,
          テキスト: dayjs(month).format("M") + "月",
        };
      }
    };

    const getSpareClass = (spare1) => {
      if (!spare1) return null;

      const target = state.data
        .map((p) => Object.values(p["dataOrg"]))
        .flat(2)
        .filter((v) => v > 0);

      let targetNumber;

      if (state.maxNumber === 1 || target.length === 1) {
        targetNumber = spare1;
        return "spare1";
      } else {
        targetNumber = spare1 - state.minNumber;
        let test = (state.maxNumber - state.minNumber) / 5;

        if (targetNumber < test) {
          return;
        } else if (targetNumber <= test * 2) {
          return "spare4";
        } else if (targetNumber <= test * 3) {
          return "spare3";
        } else if (targetNumber <= test * 4) {
          return "spare2";
        }
        if (targetNumber <= test * 5) {
          return "spare1";
        }
      }

      // if (targetNumber <= test * 4) {
      //   return "spare1";
      // } else if (targetNumber <= test * 3) {
      //   return "spare2";
      // } else if (targetNumber <= test * 2) {
      //   return "spare3";
      // } else if (targetNumber <= test) {
      //   return "spare4";
      // } else if (targetNumber <= test) {
      //   return "spare4";
      // }
    };
    const onTapOutside = async (evt) => {
      console.log(evt);

      // if (
      //   !evt.target.classList.contains("select__value")
      // ) {
      //   return;
      // }

      // const itemParent = document.querySelector("#call-list-data-wrap");
      // const isCheckedParent = itemParent.classList.contains("selected");

      // if (isCheckedParent) {
      //   const items3 = document.querySelectorAll(".call-list-item.selected");
      //   for (const item of items3) {
      //     item.classList.remove("selected");
      //   }

      //   const items2 = document.querySelectorAll(".call-list-title.on");
      //   for (const item of items2) {
      //     item.classList.remove("on");
      //   }

      //   const items = document.querySelectorAll(".call-list-data-item");
      //   for (const item of items) {
      //     item.classList.remove("no-active");
      //   }
      //   itemParent.classList.remove("selected");
      // }

      // state.isHoverFlag = false;
    };

    const setPouUp1 = async (_obj, index, _obj2, evt) => {
      if (!state.isHoverFlag) {
        state.isHoverFlag = true;
      }

      await onHoverItem(_obj, index, _obj2, evt);

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }

      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    };

    const setPouUp = async (_obj, text, evt) => {
      if (!state.isHoverFlag) {
        state.isHoverFlag = true;
      }

      await onHoverItem2(_obj, text, evt);

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }

      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    };

    const setPouUp2 = async (evt, text, flg) => {
      if (!state.isHoverFlag) {
        state.isHoverFlag = true;
      }

      await onHoverItem3(evt, text, flg);

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }

      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    };

    const toggleScreen = async (evt) => {
      await creatData(state.data);

      if (evt.target.textContent === "半期実績") {
        state.isScreen = "半期実績";
      } else {
        state.isScreen = "月別実績";
      }

      for (const element in state.selectedFilterItems) {
        if (element === "チャネル" || element === "Call実施の月" || element === "Target"|| element === "製品") {
          continue;
        }

        if (state.selectedFilterItems[element].includes("すべて")) {
          state.selectedFilterItems[element] = ["すべて"];
          state.selectedFilterItems2[element] = ["すべて"];
          state.testObj[element].list = {
            すべて: "すべて",
          };
          state.testObj2[element].list = {
            すべて: "すべて",
          };
        } else {
          state.testObj2[element].list = state.testObj[element].list;

          state.testObj[element].list = {
            すべて: "すべて",
          };

          state.selectedFilterItems2[element] = state.selectedFilterItems[element];
          state.selectedFilterItems[element] = ["すべて"];
        }
      }


     


      const test = state.selectFiliterCategory.filter((n) => n !== "チャネル" && n !== "Target"&& n !== "製品");

      for (let index = 0; index < test.length; index++) {
        let element = test[index];
        console.log(element);

        let target;
        let target2;
        if (index === 0) {
          target = "Call実施の月";
          target2 = state.data;
        } else {
          target = "Call実施の月";
          target2 = state.dataOrg3;
        }
        if (element === "MR") {
          await creatDataMR(target2, target);
        } else if (element === "テリトリー名") {
          await creatDataTerritory(target2, target);
        } else if (element === "エリア") {
          await creatDataArea(target2, target);
        }
      }

      if (!state.selectFiliterCategory.includes("MR")) {
        await creatDataMR(state.data, false);
      }
      if (!state.selectFiliterCategory.includes("テリトリー名")) {
        await creatDataTerritory(state.data, false);
      }
      if (!state.selectFiliterCategory.includes("エリア")) {
        await creatDataArea(state.data, false);
      }

      

      await creatDataDataCatgory(state.data, "Call実施の月");
      await creatDataTarget(state.data, "Call実施の月");
       await creatDataProduct(state.data, "Call実施の月");

            for (const element in state.selectedFilterItems) {
        if (!state.selectFiliterCategory.includes(element)) {
          continue
        }

        state.selectedFilterItems[element] = state.selectedFilterItems[element].filter((n) => Object.values(state.testObj[element].list).includes(n))
         if (state.selectedFilterItems[element].length === Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length && state.selectedFilterItems[element].length > 0) {
              state.selectedFilterItems[element].unshift("すべて");
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== element);
            }  
      } 

       

      // await creatDataArea(state.data);
      // await creatDataTerritory(state.data);
      // await creatDataDataCatgory(state.data);
    };

    const onTapTarget2_2 = (_obj, text, evt) => {
      // const itemParent = document.querySelector("#call-list-data-wrap");
      // const isCheckedParent = itemParent.classList.contains("selected");

      const parentElment = evt.target.parentElement;

      console.log(evt);

      if (evt.target.classList.contains("on")) {
        evt.target.classList.remove("on");

        const items = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        const items2 = document.querySelectorAll("#my-chart .call-list-data-item.on");
        for (const item of items) {
          item.classList.remove("no-active");
        }

        for (const item of items2) {
          item.classList.remove("on");
        }

        state.isHoverFlag = false;
      } else {
        const items4 = document.querySelectorAll("#my-chart .call-list-title.on");
        for (const item of items4) {
          item.classList.remove("on");
        }

        evt.target.classList.add("on");

        const items = document.querySelectorAll("#my-chart .call-list-data-item");
        for (const item of items) {
          item.classList.add("no-active");
        }

        const items2 = parentElment.querySelectorAll("#my-chart .call-list-data-item");
        console.log("item2");

        console.log(items2);

        const number = [];

        for (const item of items2) {
          item.classList.remove("no-active");
          item.classList.add("on");
          number.push(item.textContent);
        }

        console.log(number);

        if (items2.length > 1) {
          const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
          _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
          console.log(_obj);
        }
      }

      setPouUp2_2(_obj, text, evt);
      // }
    };

    const onTapTarget2_3 = (_obj, index, evt) => {
      const items4 = document.querySelectorAll("#my-chart .call-list-title.on");
      for (const item of items4) {
        item.classList.remove("on");
      }

      const items2 = document.querySelectorAll("#my-chart .call-list-data-item.on");

      for (const item of items2) {
        item.classList.remove("on");
      }

      if (evt.target.classList.contains("no-active")) {
        const items = document.querySelectorAll("#my-chart .call-list-data-item");
        for (const item of items) {
          item.classList.add("no-active");
        }

        evt.target.classList.remove("no-active");
        evt.target.classList.add("on");
        setPouUp2_3(_obj, index, evt);
      } else {
        const item2 = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        const items = document.querySelectorAll("#my-chart .call-list-data-item");
        const items3 = document.querySelectorAll("#my-chart .call-list-data-item.on");

        if (item2.length === 0) {
          for (const item of items) {
            item.classList.add("no-active");
          }
          evt.target.classList.remove("no-active");
          evt.target.classList.add("on");
          setPouUp2_3(_obj, index, evt);
        } else {
          for (const item of items) {
            item.classList.remove("no-active");
          }

          for (const item of items3) {
            item.classList.remove("on");
          }
        }
      }

      // }
    };

    const onHoverItem2_2 = (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      const items2 = document.querySelectorAll("#my-chart .call-list-data-item.on");

      const number = [];

      for (const item of items2) {
        number.push(item.textContent);
      }

      if (items2.length > 1) {
        const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
        _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
      }

      state.popupData = {
        タイトル: _obj,
        テキスト: text,
      };
    };

    const onHoverItem2_3 = (_obj, index, evt) => {
      state.isHoverFlag = true;

      const ua = navigator.userAgent;

      if (state.isHoverFlagCount === 0 && ua.indexOf("iPad") <= 0) {
        state.isHoverFlag = false;
      }

      state.popupData = {
        "'半期実績'": "半期実績",
        MR: _obj.MR,
        エリア: _obj.エリア,
        テリトリー名: _obj.テリトリー名,
        営業部: _obj.営業部,
        "移行済みデータ のカウント": _obj.Total,
        "表 (下) に沿った 列番号": index + 1,
      };
    };

    const setPouUp2_2 = async (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      state.popupData = {
        タイトル: _obj,
        テキスト: text,
      };

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }

      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    };

    const setPouUp2_3 = async (_obj, index, evt) => {
      if (!state.isHoverFlag) {
        state.isHoverFlag = true;
      }

      await onHoverItem2_3(_obj, index, evt);

      const stalker = document.getElementById("stalker");
      const w = window.innerWidth - 15;
      let x;

      if (w < evt.pageX + stalker.clientWidth) {
        x = window.innerWidth - stalker.clientWidth - 15;
      } else {
        x = evt.pageX;
      }

      const h = window.innerHeight - 10;

      let y;

      if (h < evt.pageY + stalker.clientHeight) {
        y = window.innerHeight - stalker.clientHeight - 10;
      } else {
        y = evt.pageY;
      }

      stalker.style.transform = "translate(" + x + "px, " + y + "px)";
    };


    const getNumber = (n,obj,obj2) => {
      if (!obj) {
        obj2[Object.keys(obj2)[0]]["dataNumber"] = n
        return n
      }
      
      const beforeNumber = obj[Object.keys(obj)[0]]["dataArray"].length

      if (beforeNumber >= 2) {
        obj2[Object.keys(obj2)[0]]["dataNumber"] = obj[Object.keys(obj)[0]]["dataNumber"] + beforeNumber 
        return obj[Object.keys(obj)[0]]["dataNumber"] + beforeNumber 
      } else {
       obj2[Object.keys(obj2)[0]]["dataNumber"] =  obj[Object.keys(obj)[0]]["dataNumber"] + 1
        return obj[Object.keys(obj)[0]]["dataNumber"] + 1
      }

      
      
    };

    return {
      state,
      root,
      chart,
      dayjs,
      shouldShowHelpPopup,
      isLoadComplete,
      onTapSelectBoxItem,
      onTapClearButton,
      onTapTarget,
      onTapTarget2,
      onTapTarget3,
      onSelectedStartDate,
      onSelectedEndDate,
      getShareName,
      onTapOutside,
      getSpareClass,
      onHoverItem,
      onHoverItem2,
      onHoverItem2_2,
      onHoverItem2_3,
      onTapTarget2_2,
      onTapTarget2_3,
      onHoverItem3,
      toggleScreen,
      onTapSelectBoxItemCall,
      getNumber
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/colors";

// 不要なので非表示
:deep(.vuejs3-datepicker__calendar-topbar) {
  display: none;
}

#my-chart .bar {
  --labels-size: 100%;
  --color: #4e79a7;
}

#my-chart .column {
  --color: blue;
}

// // ヘッダー部分の順番を入れ替え
// :deep(.vuejs3-datepicker__calendar-actionエリア header) {
//   display: flex;
//   align-items: center;
//   line-height: 1;
// }

// // ヘッダー部分の順番を入れ替え
// :deep(.vuejs3-datepicker__calendar header .prev) {
//   order: 2;
// }

// // ヘッダー部分の順番を入れ替え
// :deep(.vuejs3-datepicker__calendar header span) {
//   order: 1;
//   text-align: left;
// }

// ヘッダー部分のフォント設定
:deep(.vuejs3-datepicker__calendar header .up:not(.disabled)) {
  font-size: 1.3rem;
  font-weight: bold;
}

// カレンダーの周りの影を打ち消し
:deep(.vuejs3-datepicker__value) {
  min-width: 170px;
  padding: 4px 15px;
  border: none;
  display: flex;
  align-items: center;
}

:deep(.vuejs3-datepicker__icon) {
  order: 2;
  margin-left: auto;
}

:deep(.vuejs3-datepicker__content) {
  margin: 0;
}
// // ヘッダー部分の順番を入れ替え
// :deep(.vuejs3-datepicker__calendar header .next) {
//   order: 3;
// }

// // 矢印の調整
// :deep(.vuejs3-datepicker__calendar header .prev:after) {
//   width: 11px;
//   height: 11px;
//   border-left: 1.5px solid #007aff;
//   border-bottom: 1.5px solid #007aff;
// }

// // 矢印の調整
// :deep(.vuejs3-datepicker__calendar header .next:after) {
//   width: 11px;
//   height: 11px;
//   border-top: 1.5px solid #007aff;
//   border-right: 1.5px solid #007aff;
// }

// 日付の調整
:deep(.vuejs3-datepicker__calendar .cell) {
  width: 33px;
  height: 33px;
  line-height: 33px;
  margin: 4.5px 4px 4.5px 0;
}

:deep(.vuejs3-datepicker__calendar .cell:nth-child(7n)) {
  margin-right: 0;
}

// 曜日のスタイル設定
:deep(.vuejs3-datepicker__calendar .cell.day-header) {
  color: #3c3c434d;
  margin: 2.5px 4px -2.5px 0;
}

:deep(.vuejs3-datepicker__calendar .cell.day-header:nth-child(7)) {
  margin-right: 0;
}

// 当日の日付に色を付与
:deep(.vuejs3-datepicker__calendar .cell.today) {
  color: #007aff;
  background: transparent;
}

// 選択した日付のスタイルを調整
:deep(.vuejs3-datepicker__calendar .cell.selected, .vuejs3-datepicker__calendar .cell.today.selected) {
  background: #007aff1f;
  color: #007aff;
  border-radius: 50%;
  font-size: 1.6rem;
  font-weight: bold;
}

// 日付選択時のボーダーを打ち消し
:deep(.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled):hover) {
  border: none;
}

// カレンダーの周りの影を打ち消し
:deep(.vuejs3-datepicker__calendar) {
  box-shadow: none;
}

// 月の選択画面
:deep(.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).month) {
  font-size: 1.2rem;
  width: 33%;
  margin: 16px 0 0;
  height: auto;
}

// 年の選択画面
:deep(.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).year) {
  font-size: 1.2rem;
  width: 33%;
  margin: 16px 0 0;
  height: auto;
}

.iscroll-wrapper {
  flex: 1;
  width: 100%;
  max-height: 100%;
  position: relative;
  overflow: hidden;
}

.filter-wrapper {
  width: 180px;
  padding-right: 3px;
  padding-left: 15px;
}

.top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100%);
  background: #fff;

  &__ {
    &col {
      display: flex;
      flex-direction: column;
      height: 100%;

      &-- {
        &left {
          width: 676px;
        }

        &right {
          flex: 1;
        }
      }
    }
  }
}

.obj-wrapper {
  padding: 40px 65px 20px;
}

.obj-item {
  display: flex;
  background-color: #f7f6f6;
  min-height: 187px;
  border-radius: 10px;
  padding: 25px 20px 7.5px;
  box-shadow: 3px 3px 9px rgba(144, 144, 144, 0.27);
  font-size: 17.5px;
}

.obj-des {
  width: 100%;
}

.obj-title-wrap {
  display: flex;
  justify-content: space-between;
}

.obj-title {
  font-size: 22.5px;
  margin-bottom: 10px;

  &-sub {
    font-size: 12.5px;
    margin: 0 5px;
  }

  &-sub2 {
    font-size: 17.5px;
  }
}

.obj-text {
  &-mail {
    word-break: break-all;
  }
}

#search {
  width: 238px;
  min-height: 21.5px;
  height: 100%;
  border-radius: 50px;
  font-size: 1.125rem;
  border: none;
  padding: 2px 27px 0;

  &::placeholder {
    line-height: 1.4;
    color: #0e0e0e;
    font-weight: bold;
    font-size: 1.125rem;
    text-align: center;
  }
}

.search__clear {
  width: 17px;
  height: 18px;
  position: relative;
  right: 27px;
}

.input-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

.testgex {
  display: flex;
  width: calc(100% - 200px);
  position: relative;
  left: 200px;

  div {
    display: block;
  }
}

.spare1 {
  background-color: #518eca;
  color: #fff;
}

.spare2 {
  background-color: #72a3d3;
}

.spare3 {
  background-color: #98badc;
}

.spare4 {
  background-color: #c1d4e5;
}

.dli-arrow-left {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  color: #333;
  line-height: 1;
  position: relative;
  width: 15px;
  height: 0.1em;
  background: currentColor;
}

.dli-arrow-left::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border: 0.1em solid currentColor;
  border-right: 0;
  border-bottom: 0;
  transform: rotate(-45deg);
  transform-origin: top left;
  position: absolute;
  top: 50%;
  left: -0.05em;
  box-sizing: border-box;
}

.call {
  &-header {
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

  &-content {
    display: flex;
    padding-top: 5px;

    &-main {
      flex: 1;

      &-header {
        margin-left: 5px;

        color: #fff;

        &-title {
          background-color: rgb(30, 0, 124);
          height: 40px;
          font-size: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          padding: 4px;
          margin-bottom: 2px;
        }

        &-content {
          display: flex;
          align-items: flex-end;
          background-color: rgb(30, 0, 124);

          &-right {
            font-weight: bold;
            flex: 1;
            text-align: center;
            border-left: 1px solid #fff;
            min-height: 21px;

            ul {
              li {
                width: calc(100% / 6);

                &.on {
                  background-color: #98c2d1;
                }
              }
            }
          }
        }

        &-list {
          display: flex;
          align-items: center;
        }
      }
    }

    &-wrap {
      margin-bottom: 10px;
      height: calc(100vh - 180px);

      &2 {
        height: calc(100vh - 190px);
      }
    }
  }

  &-list {
    &-wrap {
      padding-left: 5px;
    }

    &-item {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #666666;
      width: 100%;
    }

    &-title {
      padding-top: 10px;
      padding-bottom: 10px;
      cursor: pointer;
      border-bottom: 1px solid #d6d6d6;
      line-height: 1;

      &:hover {
        background-color: #eee;
      }

      &.on {
        background-color: #98c2d1;
      }
    }
    &0 {
      width: 65px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &1 {
      width: 85px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &2 {
      width: 130px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &3 {
      width: 200px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &4 {
      width: 90px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &5 {
      width: 505px;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
      -webkit-text-stroke: 0.2px black;
      font-weight: bold;
    }

    &-data {
      min-width: 250px;
      display: flex;
      flex: 1;
      background-color: #f1f1f1;
      color: #333;
      border-left: 1px solid #d6d6d6;
      border-right: 1px solid #d6d6d6;

      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% / 6);
        cursor: pointer;
        border-bottom: 1px solid #d6d6d6;
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 1;

        &:hover {
          outline: 1px solid #000;
          outline-offset: -1px;
        }

        &.on {
          outline: 2px solid #000;
          outline-offset: -2px;
        }

        &.no-active {
          opacity: 0.4;
        }

        &2 {
          color: #000;
          -webkit-text-stroke: 0.2px black;
        }
      }
    }
  }
}

.pop {
  pointer-events: none;
  opacity: 0;
  position: fixed;
  top: 5px; //座標調節（カーソル位置と円の中心を合わせる）
  left: 10px; //座標調節（カーソル位置と円の中心を合わせる）
  transform: translate(0, 0);
  z-index: 999;
  width: auto;
  height: auto;
  background-color: #fff;

  box-shadow: 0px 2px 20px #00000029;
  border: 1px solid #d6d6d6;
  min-width: 350px;
  font-size: 12px;

  &-no {
    opacity: 1;
  }

  &-content {
    display: flex;

    &-title {
      color: #666666;
      margin-right: 3px;
    }

    &-text {
      min-height: 18px;
    }
  }

  &-item {
    margin-bottom: 5px;

    &:first-child {
      padding: 10px 0 10px 10px;
    }

    &:last-child {
      padding: 10px 10px 10px 0px;
    }
    &2 {
      padding: 15px 10px 15px 10px;
    }
  }

  &-header {
    color: #666666;
    background-color: #f4f3f3;
    padding: 10px 15px 5px 15px;

    & p {
      color: #666666;
      font-size: 11px;
    }
  }
}

.header-list-item {
  cursor: pointer;
  &.on {
    background-color: #98c2d1;
  }

  &:hover {
    background-color: #fff;
    color: #000;
  }
}

.test {
  display: flex;
  width: 100%;
  flex: 1;
}

.test2 {
  flex-direction: column;

  .call-list-title {
    align-items: flex-start;
  }
}

#my-chart {
  .call-list-data {
    min-width: 250px;
    background-color: #fff;
  }
}

.tab-area {
  inset: -1px auto auto 0px;
  display: flex;
  height: 22px;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid #cbcbcb;
  padding-left: 8px;

  .tab {
    padding: 2px 8px 1px 9px;
    border: 1px solid #cbcbcb;
    border-bottom: none;
    font-size: 13px;
    position: relative;
    top: 1px;
    cursor: pointer;

    &.active {
      background-color: #fff;
    }
  }
}

.data {
  font-size: 11px;
  font-weight: bold;
  word-wrap: break-word;
}

.test3 {
  position: relative;

  &::before {
    content: "0";
    position: absolute;
  }
}

.content-footer {
  display: flex;
  margin-left: 5px;

  &-left {
    width: 570px;
    text-align: right;
  }

  &-right {
    font-size: 11px;
    color: #666666;
    font-weight: bold;
    flex: 1;
    border-left: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
  }

  &-text {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
}

.gridnone {
  margin-left: 0px !important;
}

@media screen and (max-width: 1000px) {
  .call-list-data-item2 {
    font-size: 10px;
  }
}

@media screen and (max-width: 900px) {
  .iscroll-wrapper2 {
    flex: 1;
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
  }

  .iscroll__scroller2 {
    width: fit-content;
  }
}
</style>
