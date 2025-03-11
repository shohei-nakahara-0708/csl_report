<template>
  <div ref="root" class="top" >
    <div class="iscroll-wrapper2">
      <div class="iscroll__scroller2">
        <div>
          <div class="call-header">
            <span @click="$router.go(-1)" class="dli-arrow-left"></span>
            <ul>
              <li><router-link to="/">TOP</router-link></li>
              <li>/</li>
              <li>
                <router-link  :to="{
          name: 'CallKeyMessageTop',
          query: {
            date: state.date,
          },
        }">コンテンツ使用実績レポート</router-link>
              </li>
              <li>/</li>
              <li>コンテンツ使用実績レポート</li>
            </ul>
          </div>

          <div class="min-content" style="background-color: #f5f5f5; height: 100vh; padding-top: 20px;">
          <div style="background-color: #fff; max-width:1375px; width: 100%; margin: 0px auto;padding-top: 10px; ">

        

          <div class="title-wrap">
            <div class="title">
               コンテンツ使用実績レポート
              </div>
           
          </div>

          <div class="filter-wrapper">
            <div class="filter-contents">
              <div class="filter-area">
               
                
                  <div class="reset-button mr8" :class="[{ 'none':  state.selectKeyMessage}]" @tap="onTapSelectBoxItemReset">{{state.selectKeyMessage? "":"リセット"}}</div>
                  <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'年月'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.年月" /></div>
                 <div>   <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'営業部'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.営業部" /></div>
                <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'エリア名'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.エリア名" /></div>

               
                 <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'テリトリー名'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.テリトリー名" /></div>
               <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'MR'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.MR" /></div>
               <div><SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'Target'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.Target"/></div>
               <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'医師名'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.医師名"   /></div>

                <div><SelectBox4 @tap-item="onTapSelectBoxItem" :category="'チャネル'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.チャネル"   /></div>
              <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'コンテンツ'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.コンテンツ"   /></div>
               <div> <SelectBox4 class="pr8" @tap-item="onTapSelectBoxItem"  :category="'製品'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.製品"   /></div>

               

              

              </div>
            </div>
          </div>
          <div v-click-outside="onTapOutside" class="call-content" :class="[{ 'call-content2': state.isScreen === '送付先詳細'},{ 'call-content3': state.isScreen === '送付内容'}]">
            <div class="call-content-main">
            

              <div class="call-content-wrap">
                  <div class="title">
               総使用回数<span>※グラフをクリックして詳細を確認</span>
              </div>
              
                <div class="iscroll-wrapperContent">
                  <div class="iscroll__scroller">
                    <div>
                      <div id="my-chart">
                        <div class="charts-css bar show-labels show-primary-axis show-6-secondary-axes show-data-axes data-spacing-2 data-outside">
                          <template v-for="(obj,key, index) in state.dataDetail" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding: 0 10px">
                               <div class="test">
                                 <div  @mouseover="onHoverItem2_4(obj, key, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2_2(obj, key, $event)" class="call-list5 call-list-title" data-kinds="MR" :class="[{ on: state.selectObj.RANK.Category == 'Clm_Presentation_Name_vod__c' && state.selectKeyMessage == obj.Clm_Presentation_Name_vod__c}]">
                                                       {{ obj["Clm_Presentation_Name_vod__c"] }}
                                                    </div>
                               
                                  <div class="call-list-data tr" :style="obj.ratio">
                                                      <div @mouseover="onHoverItem2_3(obj, key, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(obj, key, $event)" class="call-list-data-item td"  data-kinds="DATA" :class="[getSpareClass2(obj.Total),{ on: state.selectObj.RANK.Category == 'DATA' && state.selectKeyMessage == obj.Clm_Presentation_Name_vod__c, 'no-active': state.selectKeyMessage !== obj.Clm_Presentation_Name_vod__c && state.selectKeyMessage}]">
                                                        <span class="data">{{ obj.Total }}</span>
                                                      </div>
                                                    </div>
                               </div>
                            </div>
                         
                            </template>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

                       

              <div class="call-content-wrap2">

                 <div class="call-content-main-header" v-if="Object.values(state.dataContent).length > 0">

                <div class="call-content-main-header-content">
                  <ul class="call-content-main-header-list">
                    <li  @tap="onTapSortVisible('isHoverFlag5')" @mouseover="state.isHoverFlag5 = true" @mouseleave="state.isHoverFlag5 = false" class="call-list1 call-list">
                      営業部
                      <template v-if="state.sortObj.営業部 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag5" data-sort="営業部">
                       <div class="sort-asc2" data-sort="営業部"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="営業部">
                          <template v-if="state.sortObj.営業部 == 'ASC'">
                            <div class="sort-asc" data-sort="営業部"></div>
                          </template>
                          <template v-if="state.sortObj.営業部 == 'DESC'">
                         <div class="sort-desc" data-sort="営業部"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag4')" @mouseover="state.isHoverFlag4 = true" @mouseleave="state.isHoverFlag4 = false" class="call-list1 call-list">
                      エリア名
                    <template v-if="state.sortObj.エリア名 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag4" data-sort="エリア名">
                       <div class="sort-asc2" data-sort="エリア名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="エリア名">
                          <template v-if="state.sortObj.エリア名 == 'ASC'">
                            <div class="sort-asc" data-sort="エリア名"></div>
                          </template>
                          <template v-if="state.sortObj.エリア名 == 'DESC'">
                         <div class="sort-desc" data-sort="エリア名"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag2')" @mouseover="state.isHoverFlag2 = true" @mouseleave="state.isHoverFlag2 = false"  class="call-list2 call-list">
                      テリトリー名 
                      <template v-if="state.sortObj.テリトリー名 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag2" data-sort="テリトリー名">
                       <div class="sort-asc2" data-sort="テリトリー名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="テリトリー名">
                          <template v-if="state.sortObj.テリトリー名 == 'ASC'">
                            <div class="sort-asc" data-sort="テリトリー名"></div>
                          </template>
                          <template v-if="state.sortObj.テリトリー名 == 'DESC'">
                         <div class="sort-desc" data-sort="テリトリー名"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag3')" @mouseover="state.isHoverFlag3 = true" @mouseleave="state.isHoverFlag3 = false" class="call-list3 call-list">
                      MR名
                       <template v-if="state.sortObj.MR == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag3" data-sort="MR">
                       <div class="sort-asc2" data-sort="MR"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="MR">
                          <template v-if="state.sortObj.MR == 'ASC'">
                            <div class="sort-asc" data-sort="MR"></div>
                          </template>
                          <template v-if="state.sortObj.MR == 'DESC'">
                         <div class="sort-desc" data-sort="MR"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                     <li @tap="onTapSortVisible('isHoverFlag6')" @mouseover="state.isHoverFlag6 = true" @mouseleave="state.isHoverFlag6 = false" class="call-list4 call-list">
                      医師名
                       <template v-if="state.sortObj.医師名 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag6" data-sort="医師名">
                       <div class="sort-asc2" data-sort="医師名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="医師名">
                          <template v-if="state.sortObj.医師名 == 'ASC'">
                            <div class="sort-asc" data-sort="医師名"></div>
                          </template>
                          <template v-if="state.sortObj.医師名 == 'DESC'">
                         <div class="sort-desc" data-sort="医師名"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag10')" @mouseover="state.isHoverFlag10 = true" @mouseleave="state.isHoverFlag10 = false" class="call-list12 call-list">
                      分類
                       <template v-if="state.sortObj.分類 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag10" data-sort="分類">
                       <div class="sort-asc2" data-sort="分類"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="分類">
                          <template v-if="state.sortObj.分類 == 'ASC'">
                            <div class="sort-asc" data-sort="分類"></div>
                          </template>
                          <template v-if="state.sortObj.分類 == 'DESC'">
                         <div class="sort-desc" data-sort="分類"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag7')" @mouseover="state.isHoverFlag7 = true" @mouseleave="state.isHoverFlag7 = false" class="call-list6 call-list">
                      チャネル
                       <template v-if="state.sortObj.チャネル == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag7" data-sort="チャネル">
                       <div class="sort-asc2" data-sort="チャネル"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="チャネル">
                          <template v-if="state.sortObj.チャネル == 'ASC'">
                            <div class="sort-asc" data-sort="チャネル"></div>
                          </template>
                          <template v-if="state.sortObj.チャネル == 'DESC'">
                         <div class="sort-desc" data-sort="チャネル"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                     <li @tap="onTapSortVisible('isHoverFlag8')" @mouseover="state.isHoverFlag8 = true" @mouseleave="state.isHoverFlag8 = false" class="call-list7 call-list">
                      プレゼンテーション名
                       <template v-if="state.sortObj.プレゼンテーション名 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag8" data-sort="プレゼンテーション名">
                       <div class="sort-asc2" data-sort="プレゼンテーション名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="プレゼンテーション名">
                          <template v-if="state.sortObj.プレゼンテーション名 == 'ASC'">
                            <div class="sort-asc" data-sort="プレゼンテーション名"></div>
                          </template>
                          <template v-if="state.sortObj.プレゼンテーション名 == 'DESC'">
                         <div class="sort-desc" data-sort="プレゼンテーション名"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                     <li @tap="onTapSortVisible('isHoverFlag9')" @mouseover="state.isHoverFlag9 = true" @mouseleave="state.isHoverFlag9 = false" class="call-list8 call-list">
                      実施日
                       <template v-if="state.sortObj.実施日 == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag9" data-sort="実施日">
                       <div class="sort-asc2" data-sort="実施日"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="実施日">
                          <template v-if="state.sortObj.実施日 == 'ASC'">
                            <div class="sort-asc" data-sort="実施日"></div>
                          </template>
                          <template v-if="state.sortObj.実施日 == 'DESC'">
                         <div class="sort-desc" data-sort="実施日"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                  </ul>

                </div>

              </div>
        
                <div class="iscroll-wrapperContent2">
                  <div class="iscroll__scroller">
                    <div>
                      <div id="my-chart3">
                        <div>
                          <template v-for="(obj, index) in state.dataContent" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding: 0 10px">
                              <div style="width: 100%">
                                <template v-for="(proid, proidValue) in obj['data']" :key="proidValue">
                                  <div class="test">
                                    <div  @mouseover="onHoverItem2_2(proid, proidValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(proid, proidValue, $event)" class="call-list1 call-list-title" data-kinds="proid">
                                      <div class="list-wrap"><span class="fwb2"> {{ proidValue }}</span> </div>
                                    </div>
                                    <div class="test" :class="[{ test2: Object.keys(proid).length > 1 }]">
                                      <template v-for="(area, areaValue) in proid" :key="areaValue">
                                        <div class="test">
                                          <div  @mouseover="onHoverItem2_2(area, areaValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(area, areaValue, $event)" data-kinds="area" class="call-list1 call-list-title">
                                           <div class="list-wrap"><span>{{ areaValue }}</span></div>
                                          </div>

                                          <div class="test" :class="[{ test2: Object.keys(area).length > 1 }]">
                                            <template v-for="(territory, territoryValue) in area" :key="territoryValue">
                                              <div class="test">
                                                <div  @mouseover="onHoverItem2_2(territory, territoryValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(territory, territoryValue, $event)" data-kinds="territory" class="call-list2 call-list-title">
                                                <div class="list-wrap"><span>{{ territoryValue }}</span></div>
                                                </div>
                                                <div class="test" :class="[{ test2: Object.keys(territory).length > 1 }]">
                                                  <template v-for="(mr, mrValue) in territory" :key="mrValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(mr, mrValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(mr, mrValue, $event)" data-kinds="mr" class="call-list3 call-list-title">
                                                       <div class="list-wrap"><span>{{ mrValue  }}</span></div>
                                                      </div>
                                                        <div class="test" :class="[{ test2: Object.keys(mr).length > 1 }]">
                                                  <template v-for="(docter, docterValue) in mr" :key="docterValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(docter, docterValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(docter, docterValue, $event)" data-kinds="docter" class="call-list4 call-list-title">
                                                        <div class="list-wrap"><span>{{ docterValue  }}</span></div>
                                                      </div>

                                                       <div class="test" :class="[{ test2: Object.keys(docter).length > 1 }]">
                                                         <template v-for="(kind, kindValue) in docter" :key="kindValue" >
                                                           <div class="test">

                                                            <div @mouseover="onHoverItem2_2(kind, kindValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(kind, kindValue, $event)" data-kinds="chanel" class="call-list12 call-list-title">
                                                        <div class="list-wrap"><span>{{ kindValue  }}</span></div>
                                                      </div>

                                                        <div class="test" :class="[{ test2: Object.keys(kind).length > 1 }]">

                                                          <template v-for="(chanel, chanelValue) in kind" :key="chanelValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(chanel, chanelValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(chanel, chanelValue, $event)" data-kinds="chanel" class="call-list6 call-list-title">
                                                        <div class="list-wrap"><span>{{ chanelValue  }}</span></div>
                                                      </div>

                                                       <div class="test" :class="[{ test2: Object.keys(chanel).length > 1 }]">
                                                  <template v-for="(preName, preNamelValue) in chanel" :key="preNamelValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(preName, preNamelValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(preName, preNamelValue, $event)" data-kinds="preName" class="call-list7 call-list-title">
                                                        <div class="list-wrap"><span>{{ preNamelValue  }}</span></div>
                                                      </div>

                                                         <div class="test" :class="[{ test2: Object.keys(preName).length > 1 }]">
                                                  <template v-for="(date, dateValue) in preName" :key="dateValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(date, dateValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(date, dateValue, $event)" data-kinds="date" class="call-list8 call-list-title call-list-date">
                                                        <div class="list-wrap"><span>{{ dateValue  }}</span></div>
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


                                                           </div>
                                                         </template>


                                                  
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
                                        </div>
                                      </template>
                                    </div>
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

              </div>

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
                </div></template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, onUpdated, onUnmounted, watch, nextTick } from "vue";
// import IScroll from "iscroll";
import IScroll from "iscroll/build/iscroll-probe.js";
import { SelectBox, SelectBox4, Loading } from "@/components/presentational/organisms";
import { SelectBox2 } from "@/components/presentational/organisms";
import dayjs from "dayjs";
import { sleep } from "@/utils/sleep";
import { useApplicationStore } from "@/store/modules/applicationModule";
import { useAccountStore } from "@/store/modules/accountModule";


interface State {
  iScrollObj: null | IScroll;
  iScrollObj2: null | IScroll;
  activityObj: any;
  screenObj: any;
  testObj: any;
  testObjBK: any;
  selectedObj: any;
  selectedFilterItems: {
    年月?: any;
    営業部?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア名?: any;
    Target?: any;
    医師名?: any;
    コンテンツ?: any;
       製品?: any;
  };
    selectedFilterItemsBK: {
    年月?: any;
    営業部?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア名?: any;
      Target?: any;
      医師名?: any;
      コンテンツ?: any;
       製品?: any;
    };
 selectedFilterItemsBK2: {
    年月?: any;
    営業部?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア名?: any;
      Target?: any;
      医師名?: any;
   コンテンツ?: any;
       製品?: any;
  };  
  selectedFilterItems3: {
    医師名?: any;
    施設名?: any;
    施設名2?: any;
    施設名BK?: any;
  };
  selectedFilterScreenItems: {
    画面?: any;
  };
  keyword: any;
  accountList: any;
  accountList2: any;
  data: any;
  dataCont: any;
  dataOrg: any;
  dataOrg2: any;
  dataOrg3: any;
  dataOrgMR: any;
  dataOrgTeritory: any;
  dataOrgArea: any;
  dataOrgFilter: any;
  dataOrgFilter2: any;
  data2: any;
  dataDetail: any;
  dataDetailOrg: any;
  dataContent: any;
  dataContentOrg: any;
  dataContentOrg2: any;
  data3: any;
  options: any;
  loaded: boolean;
  plugins: any;
  h: any;
  emailList: any;
  girdArry: any;
  girdArry2: any;
  sentEmailListDetail: any;
  style: any;
  style2: any;
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
  isHoverFlag2: boolean;
  isHoverFlag3: boolean;
  isHoverFlag4: boolean;
  isHoverFlag5: boolean;
  isHoverFlag6: boolean;
  isHoverFlag7: boolean;
  isHoverFlag8: boolean;
  isHoverFlag9: boolean;
  isHoverFlag10: boolean;
  isHoverFlag11: boolean;
  isHoverFlag12: boolean;
  isHoverFlag13: boolean;
  isHoverFlag14: boolean;
  isHoverFlag15: boolean;
  isHoverFlag16: boolean;
  isHoverFlag17: boolean;
  isHoverFlag18: boolean;
  isHoverFlag19: boolean;
  isHoverFlag20: boolean;
  popupData: any;
  isScreen: any;
  activeDOM: any;
  id: any;
  name: any;
  sortObj: any;
  sortObj2: any;
  sortObj3: any;
  selectObj: any;
  selectKeyMessage: any;
  selectObj2: any;
  isLoadComplete: boolean;
  dataNumber: any;
  date:any
}

export default defineComponent({
  components: {
    SelectBox4,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
     date: {
      type: String,
      required: false,
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
      selectKeyMessage: null,
      keyword: "",
      selectObj: {
        集計画面: {
          Category: "",
          Value: "",
        },
        送付先詳細: {
          Category: "",
          Value: "",
          MR:"",
        },
        送付内容: {
          docter: "",
          sentDate: "",
          templateName: "",
          flagmentName: "",
           Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,
        },
        RANK: {
         Category: "",
        },
      },
      selectObj2: {
        送付内容: {
          docter: "",
          sentDate: "",
          templateName: "",
          flagmentName: "",
        },
      },
      sortObj: {
        営業部: "default",
        エリア名: "default",
        テリトリー名: "default",
        MR: "ASC",
        医師名: "default",
        分類: "default",
        チャネル: "default",
        プレゼンテーション名: "default",
        実施日: "default",
        セカンド: {
        },
      },
      sortObj2: {
        MR: "default",
         施設名: "ASC",
        セカンド: {
        },
      },
      sortObj3: {
        医師名: "default",
        メール送付日: "default",
        メールテンプレート: "default",
        フラグメント: "default",
        セカンド: {},
      },
      screenObj: {
        画面: {
          name: "画面",
          list: ["集計画面", "送付先詳細", "送付内容"],
          listOrg: ["すべて"],
        },
      },
      selectedObj: {
        医師名: {
          name: "医師名",
          list: {
            すべて: "すべて",
          },
        },
        施設名: {
          name: "施設名",
          list: {
            すべて: "すべて",
          },
        },
      },

      testObj: {
        年月: {
          name: "年月",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        営業部: {
          name: "営業部",
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
        エリア名: {
          name: "エリア名",
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
        医師名: {
          name: "医師名",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
         コンテンツ: {
          name: "コンテンツ",
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
       testObjBK: {
        年月: {
          name: "年月",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
        },
        営業部: {
          name: "営業部",
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
        エリア名: {
          name: "エリア名",
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
        医師名: {
          name: "医師名",
          list: {
            すべて: "すべて",
          },
          listOrg: ["すべて"],
         },
       コンテンツ: {
          name: "コンテンツ",
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
        年月: ["すべて"],
        営業部: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア名: ["すべて"],
        Target: ["すべて"],
        医師名: ["すべて"],
        コンテンツ: ["すべて"],
        製品: ["すべて"],
      },
      selectedFilterItemsBK: {
        年月: [],
        営業部: [],
        テリトリー名: [],
        MR: [],
        チャネル: [],
        エリア名: [],
        Target: [],
        医師名: [],
        コンテンツ: [],
          製品: [],
      },
       selectedFilterItemsBK2: {
        年月: [],
        営業部: [],
        テリトリー名: [],
        MR: [],
        チャネル: [],
        エリア名: [],
        Target: [],
         医師名: [],
         コンテンツ: [],
            製品: [],
      },
      selectedFilterScreenItems: {
        画面: "集計画面",
      },
      selectedFilterItems3: {
        施設名: ["すべて"],
        施設名2: [],
        施設名BK: [],
        医師名: ["すべて"],
      },
      accountList: null,
      accountList2: [],
      data: [],
      dataCont: [],
      dataOrg: null,
      dataOrg2: [],
      dataOrg3: [],
      dataOrgMR: [],
      dataOrgTeritory: [],
      dataOrgArea: [],
      dataOrgFilter: [],
      dataOrgFilter2: null,
      data2: [],
      data3: null,
      dataDetail: [],
      dataDetailOrg: [],
      dataContent: [],
      dataContentOrg: [],
      dataContentOrg2: [],
      sentEmailListDetail: null,
      options: null,
      loaded: false,
      plugins: null,
      h: null,
      emailList: {},
      girdArry: [],
      girdArry2: [],
      style: null,
      style2: null,
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
      isHoverFlag2: false,
      isHoverFlag3: false,
      isHoverFlag4: false,
      isHoverFlag5: false,
      isHoverFlag6: false,
      isHoverFlag7: false,
      isHoverFlag8: false,
      isHoverFlag9: false,
      isHoverFlag10: false,
      isHoverFlag11: false,
      isHoverFlag12: false,
      isHoverFlag13: false,
      isHoverFlag14: false,
      isHoverFlag15: false,
      isHoverFlag16: false,
      isHoverFlag17: false,
      isHoverFlag18: false,
      isHoverFlag19: false,
      isHoverFlag20: false,
      popupData: {},
      isScreen: "集計画面",
      activeDOM: [],
      id: null,
      name: null,
      isLoadComplete: true,
      dataNumber: 0,
      date: null,
    });

    const isLoadComplete = computed(() => ApplicationStore.isLoadComplete);

    // ApplicationStore.isLoadComplete = false


    const propsList = { ...props };

    state.id = propsList.id;
    state.date = propsList.date;

    const getShareName3 = (_str) => {
      if (!_str) return null;
      _str = _str.substr(_str.indexOf("_") + 1);

      return _str;
    };

    state.name = getShareName3(propsList.id);


    const getShareName = (_str) => {
      if (!_str) return null;
      if (_str.includes("Face-to-Face")) {
        return "対面";
      } else if (_str.includes("Mail")) {
        return "郵便";
      } else if (_str.includes("Phone")) {
        return "電話";
      } else if (_str.includes("Email")) {
        return "メール";
      } else if (_str.includes("Video")) {
        return "Web面談";
      }else if (_str.includes("Concierge")) {
        return "コンシェルジュ";
      } else {
        return _str;
      }
    };

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

    window.addEventListener(
      "touchstart",
      (e) => {
        state.isHoverFlag = false;
      }
    );

    let mediaList

    if (state.date === "newData") {
       mediaList = Account.getCallKeyMessageListNew;
    } else {
      mediaList = Account.getCallKeyMessageList;
    }

    
    

    // for (const element of accountList) {
    //   if (!state.selectedObj.医師名.list[element]) {
    //     state.selectedObj.医師名.list[element] = element;
    //     state.selectedFilterItems3.医師名.push(element);
    //   }
    // }

    state.data = computed(() => {
      

      let result = []
      const result3 = [...mediaList]

      for (const x of result3) {

        if (state.selectFiliterCategory.includes('年月')) {
          if (!state.selectedFilterItemsBK2.年月.includes(dayjs(x.Call_Date_vod__c).format("YYYY/M"))) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.年月.includes("すべて")) {
            if (!state.selectedFilterItems.年月.includes(dayjs(x.Call_Date_vod__c).format("YYYY/M"))) {
              continue
            }
          }
        }  

        if (state.selectFiliterCategory.includes('営業部')) {
          if (!state.selectedFilterItemsBK2.営業部.includes(x.営業部)) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.営業部.includes("すべて")) {
            if (!state.selectedFilterItems.営業部.includes(x.営業部)) {
              continue
            }
          }
        } 

        
       if (state.selectFiliterCategory.includes('エリア名')) {
          if (!state.selectedFilterItemsBK2.エリア名.includes(x.エリア名)) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.エリア名.includes("すべて")) {
            if (!state.selectedFilterItems.エリア名.includes(x.エリア名)) {
              continue
            }
          }
        } 

         if (state.selectFiliterCategory.includes('テリトリー名')) {
          if (!state.selectedFilterItemsBK2.テリトリー名.includes(x.テリトリー名)) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.テリトリー名.includes("すべて")) {
            if (!state.selectedFilterItems.テリトリー名.includes(x.テリトリー名)) {
              continue
            }
          }
        } 

         if (state.selectFiliterCategory.includes('MR')) {
          if (!state.selectedFilterItemsBK2.MR.includes(x["Call2_vod__r.Owner.Name"])) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.MR.includes("すべて")) {
            if (!state.selectedFilterItems.MR.includes(x["Call2_vod__r.Owner.Name"])) {
              continue
            }
          }
        } 

          if (state.selectFiliterCategory.includes('医師名')) {
          if (!state.selectedFilterItemsBK2.医師名.includes(x["Account_vod__r.Name"])) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.医師名.includes("すべて")) {
            if (!state.selectedFilterItems.医師名.includes(x["Account_vod__r.Name"])) {
              continue
            }
          }
        } 


         if (state.selectFiliterCategory.includes('Target')) {
          if (!state.selectedFilterItemsBK2.Target.includes(x.Target)) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.Target.includes("すべて")) {
            if (!state.selectedFilterItems.Target.includes(x.Target)) {
              continue
            }
          }
        } 

        if (state.selectFiliterCategory.includes('コンテンツ')) {
          if (!state.selectedFilterItemsBK2.コンテンツ.includes(x["Clm_Presentation_Name_vod__c"])) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.コンテンツ.includes("すべて")) {
            if (!state.selectedFilterItems.コンテンツ.includes(x["Clm_Presentation_Name_vod__c"])) {
              continue
            }
          }
        } 

        if (state.selectFiliterCategory.includes('製品')) {
          if (!state.selectedFilterItemsBK2.製品.includes(x["Product_vod__r.Name"])) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.製品.includes("すべて")) {
            if (!state.selectedFilterItems.製品.includes(x["Product_vod__r.Name"])) {
              continue
            }
          }
        } 

                  if (state.selectFiliterCategory.includes('チャネル')) {
          if (!state.selectedFilterItemsBK2.チャネル.includes(x["Call2_vod__r.CSLB_Channel_Type__c"])) {
            continue
          }
        } else {
          if (!state.selectedFilterItems.チャネル.includes("すべて")) {
            if (!state.selectedFilterItems.チャネル.includes(x["Call2_vod__r.CSLB_Channel_Type__c"])) {
              continue
            }
          }
        } 
        

        result.push(x)
      }

      return result
  
      
    })






    // console.log(state.dataCont);
     watch(
      () => state.data,
      async() => {
        ApplicationStore.isLoadComplete = false;
        await nextTick();
         ApplicationStore.isLoadComplete = true;
      }
    )


    state.dataOrg = [...state.data];

    onMounted(async () => {

      
      state.iScrollObj = new IScroll(root.value.querySelector(".iscroll-wrapperContent"), {
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
      });

      state.iScrollObj2 = new IScroll(root.value.querySelector(".iscroll-wrapperContent2"), {
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
      });

state.iScrollObj2.on(
        "scroll",

        updatePosition
      );


    });

        const updatePosition = async () => {
      state.isHoverFlag = false;

       if (state.dataContentOrg.length !== state.dataContentOrg2.length) {
          if (state.iScrollObj2.maxScrollY + 200 >= state.iScrollObj2.y) {
            state.iScrollObj2.disable();
            ApplicationStore.isLoadComplete = false;

            setTimeout(async () => {
              creatData(state.data,true);
            }, 1);

            // ApplicationStore.isLoadComplete = false
          }
        }
    };



    onUpdated(async () => {

      // await nextTick();
      //  ApplicationStore.isLoadComplete = true;


      // state.isLoadComplete = false


       await nextTick();
       ApplicationStore.isLoadComplete = true;
      
      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.refresh();
           state.iScrollObj2.enable();
          state.iScrollObj2.refresh();
        }
       
      }, 500);
    });

    const onResize = async () => {

      const windowSize = window.innerWidth;

      let totalArray = [];

      totalArray = state.dataDetail.map((p) => p["Total"]).filter((v) => v);
       
state.maxNumber = Math.max(...totalArray);
      // for (const element of Object.keys(state.dataDetail)) {
      //   totalArray.push(Number(element))
      // }


      // for (const key in state.dataDetail) {
      //   totalArray.push(state.dataDetail[key]["data"].length)
      //    state.dataDetail[key]["Total"] = state.dataDetail[key]["data"].length
      //   }
      

      

      let maxIndex80;

      let girdNum;

      let maxIndex = Math.max(...totalArray);


        const numberDigit = String(maxIndex).length;

        // state.data2 = [];

        let maxIndexCe;

        let girdNumPulus;

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

            
          } else if (numberDigit === 3) {
            maxIndexCe = maxIndex80;
            girdNum = maxIndexCe / 50;
            girdNumPulus = 50;
            if (maxIndex <= 600) {
              maxIndexCe = maxIndex80;
              girdNum = maxIndexCe / 50;
              girdNumPulus = 50;
            }
            if (maxIndex <= 300) {
              maxIndexCe = maxIndex80;
              girdNum = maxIndexCe / 10;
              girdNumPulus = 10;
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
              maxIndex80 = maxIndex + 1;
              maxIndexCe = maxIndex + 1;
              girdNum = maxIndexCe / 1;
              girdNumPulus = 1;
            }
          }
        } else if (windowSize > 1100) {
          maxIndex80 = maxIndex / 0.85;

          if (numberDigit >= 4) {
            maxIndexCe = maxIndex80;
            

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
              maxIndex80 = maxIndex + 1;
              maxIndexCe = maxIndex + 1;
              girdNum = maxIndexCe / 1;
              girdNumPulus = 1;
            }
          }
        } else  {
          maxIndex80 = maxIndex / 0.85;

          if (numberDigit >= 4) {
            maxIndexCe = maxIndex80;
            

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

             if (maxIndex <= 160) {
              maxIndexCe = maxIndex80;
              girdNum = maxIndexCe / 20;
              girdNumPulus = 20;
             }
            
          } else if (numberDigit <= 2) {
            if (maxIndex <= 100) {
              maxIndexCe = maxIndex80;
              girdNum = maxIndexCe / 20;
              girdNumPulus = 20;
            }

            if (maxIndex <= 80) {
              maxIndexCe = maxIndex80;
              girdNum = maxIndexCe / 10;
              girdNumPulus = 10;
            }
            if (maxIndex <= 40) {
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
      } 
        

      if (state.isScreen === "集計画面" || state.isScreen === "送付先詳細") {
        

        if (state.isScreen === "集計画面") {
          state.girdArry = [];

          for (let index = girdNumPulus; index <= maxIndexCe; index += girdNumPulus) {
            state.girdArry.push(index);
          }

          state.style = {
            width: `calc(100% / ${girdNum})`,
          };

          state.dataDetail = state.dataDetail.sort((a, b) => {
              if (a["Total"] > b["Total"]) return -1;
            if (a["Total"] < b["Total"]) return 1;
              const firstKeySortResult = b["Clm_Presentation_Name_vod__c"].localeCompare(a["Clm_Presentation_Name_vod__c"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }


            

              return 0;
            });

          // const targetList = [...state.dataDetail];

          const rankObj = {};
          for (const key in state.dataDetail) {
            state.dataDetail[key]["ratio"] = {
              "--size": `calc( ${(state.dataDetail[key]["Total"] / maxIndex80) * 100} / 100 )`,
              "background-size": `calc(100% / ${girdNum}) 100%`,
            };

          }

         
        }

        console.log("state.dataDetail");
        
      }
    };







    const onTapSelectBoxItem = async (_obj) => {
      
      onTapClearButton();
      ApplicationStore.isLoadComplete = false;


      state.selectedFilterItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

      // let target2 = [...state.data]

      // let flg = false;
      // let flg2 = false;

      let flg = false
      let selectFiliterCategoryBK = []


        if (!state.selectFiliterCategory.includes(_obj.category)) {
        state.selectFiliterCategory.push(_obj.category);
        }

      const selectFiliterCategoryNumber = state.selectFiliterCategory.indexOf(_obj.category)
      const agoNum = selectFiliterCategoryNumber - 1

      const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);
      let orgList
      if (selectFiliterCategoryNumber === 0) {
        orgList = state.selectedFilterItemsBK[_obj.category]
      } else {
        orgList = Object.values(state.testObj[_obj.category].list)
      }

      
      
      
      if (newArray.includes('すべて') && orgList.length === newArray.length) { 
          state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
          flg = true       
      } else {
        state.selectedFilterItemsBK2[_obj.category] = newArray
        state.testObjBK[_obj.category].list = state.testObj[_obj.category].list
      }

      if (state.selectFiliterCategory.length === 0) {
        onTapSelectBoxItemReset()
        return
      }



    

      for (const key in state.selectedFilterItems) { 
    
        if (!flg) {

           console.log("flg");
          console.log(flg);
          
          if (_obj.category === key) {
          continue
          }

          if (state.selectFiliterCategory.includes(key)) {


            
            
         
            let targetNum = state.selectFiliterCategory.indexOf(key)

             console.log(key);
            
            console.log(targetNum);
            console.log(selectFiliterCategoryNumber);



            if (targetNum > selectFiliterCategoryNumber ||targetNum == 0) {
             if (selectFiliterCategoryBK.length === 0) {
              selectFiliterCategoryBK = [...state.selectFiliterCategory]
             }
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== key);
              state.testObj[key].list = { "すべて": "すべて" }
            state.selectedFilterItems[key] = ["すべて"];
            } else if (targetNum < selectFiliterCategoryNumber && targetNum !== 0) {
           
            state.selectedFilterItems[key] = ["すべて"];
            state.testObj[key].list = { "すべて": "すべて" }  
              
            } 
          
           

          if (Object.values(state.testObj[key].list).filter((n) => n !== "すべて").length === state.selectedFilterItems[key].length) {
            state.selectedFilterItems[key].unshift('すべて')
          }
                  
          } else {
            state.selectedFilterItems[key] = ["すべて"];
            state.testObj[key].list = { "すべて": "すべて" }  
          }
          
        
        } else {
          console.log("flg");
          console.log(flg);
          if (state.selectFiliterCategory.includes(key)) {
         
            let targetNum = state.selectFiliterCategory.indexOf(key) 
            console.log(targetNum);
            if (targetNum >= selectFiliterCategoryNumber) {
              targetNum += 1
            }
            console.log(key);
            
            console.log(targetNum);
            console.log(selectFiliterCategoryNumber);
            console.log(agoNum);
            
            
            if (targetNum === agoNum) {
              if (targetNum === 0) {
                state.selectedFilterItems[key] = state.selectedFilterItemsBK2[key].filter((n) => n !== "すべて")

                state.testObj[key].list = state.selectedFilterItemsBK[key].reduce((acc, value, index) => {
                  return { ...acc, [value]: value };
                }, {});              } else {
                 state.testObj[key].list = state.testObjBK[key].list 
                state.selectedFilterItems[key] = state.selectedFilterItemsBK2[key]
              }
              
            } else if (targetNum > selectFiliterCategoryNumber) {
              if (selectFiliterCategoryBK.length === 0) {
              selectFiliterCategoryBK = [...state.selectFiliterCategory]
             }
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== key);
             state.selectedFilterItems[key] = ["すべて"];
            state.testObj[key].list = { "すべて": "すべて" }  
            } else if (targetNum < selectFiliterCategoryNumber) {
               console.log("2b");
              console.log(key);      
            } else {
               console.log("3b");
              console.log(key);
               state.testObj[key].list = { "すべて": "すべて" }
              // state.testObj[key].list = state.testObjBK[key].list 
             
            }
          
           

          if (Object.values(state.testObj[key].list).filter((n) => n !== "すべて").length === state.selectedFilterItems[key].length) {
            state.selectedFilterItems[key].unshift('すべて')
          }
                  
          } else {
      
          
          state.selectedFilterItems[key] = ["すべて"];
          state.testObj[key].list = { "すべて": "すべて" }
        }
        
        }
        
    
     
      }

      console.log(state.selectFiliterCategory);
      



      let target = [...state.data]

          creatData(target, false);
         await nextTick()     
   creatDataDocter(target)
      creatDataChanel(target)
 creatDataMR(target, false);
creatDataArea(target, false);
creatDataTerritory(target, false);
      creatDataTarget(target, false);
      creatDataContents(target, false);
      creatDataProduct(target, false);    
 
     creatDataSales(target) 
      creatDataDataMonth(); 
 
  console.log(state.data);


            if (selectFiliterCategoryBK.length !== 0) {
              state.selectFiliterCategory = selectFiliterCategoryBK

    console.log(state.selectFiliterCategory);    

        for (const element of state.selectFiliterCategory) {
          let targetNum = state.selectFiliterCategory.indexOf(element)

          if (targetNum >= selectFiliterCategoryNumber && flg === true) {
              targetNum += 1
            }

          if (targetNum > selectFiliterCategoryNumber || targetNum === 0) { 
             state.selectedFilterItems[element] = state.selectedFilterItemsBK2[element] .filter((x) => {
             return Object.values(state.testObj[element].list).includes(x)
           
             })

  
          if (Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length === state.selectedFilterItems[element].length) {
            state.selectedFilterItems[element].unshift('すべて')
          }
             
          }
        }

              creatData(target, false);

              await nextTick()
              
              for (const key in state.selectedFilterItems) {
                if (!state.selectFiliterCategory.includes(key)) {
                  state.selectedFilterItems[key] = ["すべて"];
          state.testObj[key].list = { "すべて": "すべて" }

                 }
   
}

            
              

                target = [...state.data]

        if (!state.selectFiliterCategory.includes('医師名')) {
   creatDataDocter(target)
  } 

  if (!state.selectFiliterCategory.includes('MR')) {
  creatDataMR(target, false);

  }  
  
  
     if (!state.selectFiliterCategory.includes('エリア名')) {
   creatDataArea(target, false);

     }  
         if (!state.selectFiliterCategory.includes('テリトリー名')) {
   creatDataTerritory(target, false);

         }  
            if (!state.selectFiliterCategory.includes('Target')) {
   creatDataTarget(target, false);

              } 

                          if (!state.selectFiliterCategory.includes('コンテンツ')) {
   creatDataContents(target, false);

              } 

                                     if (!state.selectFiliterCategory.includes('製品')) {
   creatDataProduct(target, false);

              } 

               
  
              if (!state.selectFiliterCategory.includes('営業部')) {
  creatDataSales(target) 
  }  
  
  
  if (!state.selectFiliterCategory.includes('チャネル')) {
    creatDataChanel(target)
  } 
   
  
    if (!state.selectFiliterCategory.includes('年月')) {
    creatDataDataMonth();      
  }     
            }
 
  
       
 
         

  

      

    
      console.log(state.testObj);
      console.log(state.selectedFilterItems);
      


    
   
    
     

  
     
     
       



    
        

      
    };

    const onTapSelectBoxItemReset = async () => {

      state.selectFiliterCategory = []

      for (const key in state.selectedFilterItems) {
        state.selectedFilterItems[key] = state.selectedFilterItemsBK[key];
         state.testObj[key].list = state.selectedFilterItems[key].reduce((acc, value, index) => {
                  return { ...acc, [value]: value };
                }, {});
      }
      
      
    creatData(target, false);

    };

    const creatDataMR = (data, category) => {
      const mrList = data
        .map((p) => p["Call2_vod__r.Owner.Name"])
        

      for (const key of mrList) {
        if (!state.testObj.MR.list[key]) {
          state.testObj.MR.list[key] = key;
          state.selectedFilterItems.MR.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }


 if (state.selectedFilterItemsBK.MR.length === 0) {
         state.selectedFilterItemsBK.MR = state.selectedFilterItems.MR

      }
     
      return mrList;
    };

    const creatDataArea = (data, category) => {
      const mrList = data
        .map((p) => p["エリア名"])

      for (const key of mrList) {
        if (!state.testObj.エリア名.list[key]) {
          state.testObj.エリア名.list[key] = key;
          state.selectedFilterItems.エリア名.push(key);
        }
      }

      if (state.selectedFilterItemsBK.エリア名.length === 0) {
         state.selectedFilterItemsBK.エリア名 = state.selectedFilterItems.エリア名

      }

    

      return mrList;
    };

    const creatDataTerritory = (data, category) => {
      const territoryList = data
        .map((p) => p["テリトリー名"])

      for (const key of territoryList) {
        if (!state.testObj.テリトリー名.list[key]) {
          state.testObj.テリトリー名.list[key] = key;
          state.selectedFilterItems.テリトリー名.push(key);
        }
      }

            if (state.selectedFilterItemsBK.テリトリー名.length === 0) {
         state.selectedFilterItemsBK.テリトリー名 = state.selectedFilterItems.テリトリー名

      }


     

      return territoryList;
    };

    const creatDataChanel = (data) => {
      let totalArray2 = data
        .map((p) => p["Call2_vod__r.CSLB_Channel_Type__c"])
        .filter((v) => v);

      for (const key of totalArray2) {
        if (!state.testObj.チャネル?.list[key]) {
          state.testObj.チャネル.list[key] = key;
          state.selectedFilterItems.チャネル.push(key);
        }
      }

                if (state.selectedFilterItemsBK.チャネル.length === 0) {
         state.selectedFilterItemsBK.チャネル = state.selectedFilterItems.チャネル

      }

    };

    const creatDataSales = (data) => {
      let totalArray2 = data
        .map((p) => p["営業部"])
        .filter((v) => v);

      for (const key of totalArray2) {
        if (!state.testObj.営業部?.list[key]) {
          state.testObj.営業部.list[key] = key;
          state.selectedFilterItems.営業部.push(key);
        }
      }

if (state.selectedFilterItemsBK.営業部.length === 0) {
         state.selectedFilterItemsBK.営業部 = state.selectedFilterItems.営業部

      }


    };

        const creatDataDocter = (data) => {
      let totalArray2 = data
        .map((p) => p["Account_vod__r.Name"])
        .filter((v) => v);

      for (const key of totalArray2) {
        if (!state.testObj.医師名?.list[key]) {
          state.testObj.医師名.list[key] = key;
          state.selectedFilterItems.医師名.push(key);
        }
      }

      if (state.selectedFilterItemsBK.医師名.length === 0) {
        state.selectedFilterItemsBK.医師名 = state.selectedFilterItems.医師名
      }

      


    };

        const creatDataTarget = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

      const mrList = data
        .map((p) => p["Target"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of mrList) {
        if (!state.testObj.Target.list[key]) {
          state.testObj.Target.list[key] = key;
          state.selectedFilterItems.Target.push(key);
        }
      }

      if (state.selectedFilterItemsBK.Target.length === 0) {
         state.selectedFilterItemsBK.Target = state.selectedFilterItems.Target

      }
    

          
          

      return mrList;
        };

   const creatDataContents = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

      const mrList = data
        .map((p) => p["Clm_Presentation_Name_vod__c"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of mrList) {
        if (!state.testObj.コンテンツ.list[key]) {
          state.testObj.コンテンツ.list[key] = key;
          state.selectedFilterItems.コンテンツ.push(key);
        }
      }

      if (state.selectedFilterItemsBK.コンテンツ.length === 0) {
         state.selectedFilterItemsBK.コンテンツ = state.selectedFilterItems.コンテンツ

      }
    

          
          

      return mrList;
    }; 

    

  const creatDataProduct = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

      const mrList = data
        .map((p) => p["Product_vod__r.Name"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

      for (const key of mrList) {
        if (!state.testObj.製品.list[key]) {
          state.testObj.製品.list[key] = key;
          state.selectedFilterItems.製品.push(key);
        }
      }

      if (state.selectedFilterItemsBK.製品.length === 0) {
         state.selectedFilterItemsBK.製品 = state.selectedFilterItems.製品

      }
    

          
          

      return mrList;
    };   const creatDataDataMonth = () => {


      let mrList = state.data
        .map((p) => dayjs(p.Call_Date_vod__c).format("YYYY/M"))
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

        mrList = [...new Set(mrList)];


      for (const key of mrList) {
        if (!state.testObj.年月.list[key]) {
          state.testObj.年月.list[key] = key;
          state.selectedFilterItems.年月.push(key);
        }
      }

          if (state.selectedFilterItemsBK.年月.length === 0) {
         state.selectedFilterItemsBK.年月 = state.selectedFilterItems.年月

      }
    

    };

    const creatData = (data,flg) => {
      // if (state.monthArry.length === 0) {
      //   let monthData = data
      //     .map((p) => dayjs(p.Call_Date_vod__c).format("YYYY/M"))

      //   monthData = [...new Set(monthData)];


      //   console.log(monthData);
        

      //   const monthArryReserve = monthData
      //     .sort((a, b) => {
      //       if (dayjs(a) < dayjs(b)) return 1;
      //       if (dayjs(a) > dayjs(b)) return -1;
      //     })

      //   state.monthArry = monthArryReserve.sort((a, b) => {
      //     if (dayjs(a) > dayjs(b)) return 1;
      //     if (dayjs(a) < dayjs(b)) return -1;
      //   });
      // }

      // console.log(state.monthArry);
      

       let dataObj = {};

       let dataObj2 = {};

      state.dataDetail = []

      



      let totalArray2 = [...state.data]
      totalArray2 = totalArray2.filter((x) => {
            if (!state.selectKeyMessage) {
                return true
              } else {
               return state.selectKeyMessage === x["Clm_Presentation_Name_vod__c"].trim()
             }
          })       .sort((a, b) => {
             var str = ['NULL'];
        if (state.sortObj["営業部"] == "default") {
          // if (a.営業部 === "NULL") return -1;
          //   if (b.営業部 === "NULL") return 1;
         

          if (str.includes(a.営業部) && str.includes(b.営業部)) {
            if (str.indexOf(a.営業部) > str.indexOf(b.営業部)) return 1;
          if (str.indexOf(a.営業部) < str.indexOf(b.営業部)) return -1;
          } else {
           if (str.includes(a.営業部)) {
            return -1
           }
            if (str.includes(b.営業部)) {
            return 1
            }

             if (a.営業部 > b.営業部) return 1;
            if (a.営業部 < b.営業部) return -1;
              
          }

     

     
           

            } else if (state.sortObj["営業部"] == "ASC") {
              if (a.営業部 > b.営業部) return 1;
              if (a.営業部 < b.営業部) return -1;
            } else if (state.sortObj["営業部"] == "DESC") {
              if (a.営業部 > b.営業部) return -1;
              if (a.営業部 < b.営業部) return 1;
        }

         if (state.sortObj["エリア名"] == "default") {
             if (str.includes(a.エリア名) && str.includes(b.エリア名)) {
            if (str.indexOf(a.エリア名) > str.indexOf(b.エリア名)) return 1;
          if (str.indexOf(a.エリア名) < str.indexOf(b.エリア名)) return -1;
          } else {
           if (str.includes(a.エリア名)) {
            return -1
           }
            if (str.includes(b.エリア名)) {
            return 1
            }

             if (a.エリア名 > b.エリア名) return 1;
            if (a.エリア名 < b.エリア名) return -1;
              
          }
            } else if (state.sortObj["エリア名"] == "ASC") {
              if (a.エリア名 > b.エリア名) return 1;
              if (a.エリア名 < b.エリア名) return -1;
            } else if (state.sortObj["エリア名"] == "DESC") {
              if (a.エリア名 > b.エリア名) return -1;
              if (a.エリア名 < b.エリア名) return 1;
         }

         
         if (state.sortObj["テリトリー名"] == "default") {
            // if (a.テリトリー名 === "NULL") return -1;
            // if (b.テリトリー名 === "NULL") return 1;
              if (a.テリトリー名 > b.テリトリー名) return 1;
              if (a.テリトリー名 < b.テリトリー名) return -1;
            } else if (state.sortObj["テリトリー名"] == "ASC") {
              if (a.テリトリー名 > b.テリトリー名) return 1;
              if (a.テリトリー名 < b.テリトリー名) return -1;
            } else if (state.sortObj["テリトリー名"] == "DESC") {
              if (a.テリトリー名 > b.テリトリー名) return -1;
              if (a.テリトリー名 < b.エリア名) return 1;
         }

        if (state.sortObj["MR"] == "default") {
            

            const firstKeySortResult = a["Call2_vod__r.Owner.Name"].localeCompare(b["Call2_vod__r.Owner.Name"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
                
             
            } else if (state.sortObj["MR"] == "ASC") {
              if (a["Call2_vod__r.Owner.Name"] > b["Call2_vod__r.Owner.Name"]) return 1;
              if (a["Call2_vod__r.Owner.Name"] < b["Call2_vod__r.Owner.Name"]) return -1;
            } else if (state.sortObj["MR"] == "DESC") {
              if (a["Call2_vod__r.Owner.Name"] > b["Call2_vod__r.Owner.Name"]) return -1;
              if (a["Call2_vod__r.Owner.Name"] < b["Call2_vod__r.Owner.Name"]) return 1;
        }

        if (state.sortObj["医師名"] == "default") {
            

            const firstKeySortResult = a["Account_vod__r.Name"].localeCompare(b["Account_vod__r.Name"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
                
             
            } else if (state.sortObj["医師名"] == "ASC") {
              if (a["Account_vod__r.Name"] > b["Account_vod__r.Name"]) return 1;
              if (a["Account_vod__r.Name"] < b["Account_vod__r.Name"]) return -1;
            } else if (state.sortObj["医師名"] == "DESC") {
              if (a["Account_vod__r.Name"] > b["Account_vod__r.Name"]) return -1;
              if (a["Account_vod__r.Name"] < b["Account_vod__r.Name"]) return 1;
        }


        if (state.sortObj["分類"] == "default") {
            // if (a.テリトリー名 === "NULL") return -1;
            // if (b.テリトリー名 === "NULL") return 1;
              if (a.分類 > b.分類) return 1;
              if (a.分類 < b.分類) return -1;
            } else if (state.sortObj["分類"] == "ASC") {
              if (a.分類 > b.分類) return 1;
              if (a.分類 < b.分類) return -1;
            } else if (state.sortObj["分類"] == "DESC") {
              if (a.分類 > b.分類) return -1;
              if (a.分類 < b.分類) return 1;
         }

        let chanela = getShareName(a["Call2_vod__r.CSLB_Channel_Type__c"])
         let chanelb = getShareName(b["Call2_vod__r.CSLB_Channel_Type__c"])

         if (state.sortObj["チャネル"] == "default") {
            

               if (str.includes(chanela) && str.includes(chanelb)) {
            if (str.indexOf(chanela) > str.indexOf(chanelb)) return 1;
          if (str.indexOf(chanela) < str.indexOf(chanelb)) return -1;
          } else {
           if (str.includes(chanela)) {
            return -1
           }
            if (str.includes(chanelb)) {
            return 1
            }

             if (chanela > chanelb) return 1;
            if (chanela <chanelb) return -1;
              
          }
                
             
            } else if (state.sortObj["チャネル"] == "ASC") {
              if (chanela > chanelb) return 1;
              if (chanela < chanelb) return -1;
            } else if (state.sortObj["チャネル"] == "DESC") {
              if (chanela > chanelb) return -1;
              if (chanela < chanelb) return 1;
         }

        if (state.sortObj["プレゼンテーション名"] == "default") {
            

            const firstKeySortResult = a["Clm_Presentation_Name_vod__c"].localeCompare(b["Clm_Presentation_Name_vod__c"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
                
             
            } else if (state.sortObj["プレゼンテーション名"] == "ASC") {
              if (a["Clm_Presentation_Name_vod__c"] > b["Clm_Presentation_Name_vod__c"]) return 1;
              if (a["Clm_Presentation_Name_vod__c"] < b["Clm_Presentation_Name_vod__c"]) return -1;
            } else if (state.sortObj["プレゼンテーション名"] == "DESC") {
              if (a["Clm_Presentation_Name_vod__c"] > b["Clm_Presentation_Name_vod__c"]) return -1;
              if (a["Clm_Presentation_Name_vod__c"] < b["Clm_Presentation_Name_vod__c"]) return 1;
        } 

        let datea = dayjs(a.Call_Date_vod__c)
        let dateb = dayjs(b.Call_Date_vod__c)

           if (state.sortObj["実施日"] == "default") {
              
            if (datea > dateb) return 1;
              if (datea < dateb) return -1;
             
            } else if (state.sortObj["実施日"] == "ASC") {
              if (datea > dateb) return 1;
              if (datea < dateb) return -1;
            } else if (state.sortObj["実施日"] == "DESC") {
              if (datea > dateb) return -1;
              if (datea < dateb) return 1;
        } 

        return 0;
        
        });
               

      state.dataContentOrg2 = totalArray2;

      let targetArray = [];

        if (totalArray2.length > 100) {
          if (state.dataContentOrg.length > 0 && flg === true) {
            targetArray = totalArray2.slice(0, state.dataContentOrg2.length);
          } else {
            if (state.dataContentOrg.length > 100) {
               targetArray = totalArray2.slice(0, state.dataContentOrg2.length);
            } else {
              targetArray = totalArray2.slice(0, 100);
            }
            
          }
        } else {
          targetArray = totalArray2;
        }

        // targetArray = totalArray2;
        

      state.dataContentOrg = targetArray;
        



      for (const element of targetArray) {

        let chanel = getShareName(element["Call2_vod__r.CSLB_Channel_Type__c"])
        let date = dayjs(element.Call_Date_vod__c).format("YYYY年M月D日")



        if (state.selectKeyMessage) {
          if (element["Clm_Presentation_Name_vod__c"].trim() !== state.selectKeyMessage) {
            continue
          }
        }

        if (!dataObj["data"]) {
              dataObj["data"]= {}
         }
        
         if (!dataObj["data"][element["営業部"].trim()]) {
              dataObj["data"][element["営業部"].trim()] = {}
         }
          
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()] = {}
            }
         if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()] = {}
         }
          
   if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()] = {}
        }   

            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()] = {}
            }
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()] = {}
            }

              if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]] = {}
              }
            
         if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel] = {}
         }
           
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()] = {}
            }

                if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date] = []
            }

            dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date].push(element)

          
          
      }

      

      for (const element of state.data) {

                  if (!dataObj2[element["Clm_Presentation_Name_vod__c"].trim()]) {
              dataObj2[element["Clm_Presentation_Name_vod__c"].trim()] = {}
          }
            if (!dataObj2[element["Clm_Presentation_Name_vod__c"].trim()]["data"]) {
              dataObj2[element["Clm_Presentation_Name_vod__c"].trim()]["data"] = []
            }


        dataObj2[element["Clm_Presentation_Name_vod__c"].trim()]["data"].push(element)
       }


    

      for (const key in dataObj2) {
        const Total = dataObj2[key]["data"].length
        state.dataDetail.push({
          "Total": Total,
          "Clm_Presentation_Name_vod__c": key,
          "data":dataObj2[key]["data"]
        })
      }

  if (Object.keys(dataObj).length === 0) {
    state.selectKeyMessage = null

    for (const element of state.data) {

        let chanel = getShareName(element["Call2_vod__r.CSLB_Channel_Type__c"])
        let date = dayjs(element.Call_Date_vod__c).format("YYYY年MM月DD日")


        if (state.selectKeyMessage) {
          if (element["Clm_Presentation_Name_vod__c"].trim() !== state.selectKeyMessage) {
            continue
          }
        }

        if (!dataObj["data"]) {
              dataObj["data"]= {}
         }
        
         if (!dataObj["data"][element["営業部"].trim()]) {
              dataObj["data"][element["営業部"].trim()] = {}
         }
          
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()] = {}
            }
         if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()] = {}
         }
          
   if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()] = {}
        }   

            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()] = {}
            }
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()] = {}
            }
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]] = {}
            }

         if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel] = {}
         }
           
            if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()] = {}
            }

                if (!dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date]) {
             dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date] = []
            }

            dataObj["data"][element["営業部"].trim()][element["エリア名"].trim()][element["テリトリー名"].trim()][element["Call2_vod__r.Owner.Name"].trim()][element["Account_vod__r.Name"].trim()][element["分類"]][chanel][element["Clm_Presentation_Name_vod__c"].trim()][date].push(element)

          
          
    }
      }

         state.dataContent = Object.entries(dataObj)
          .map(([key, value]) => ({ [key]: value }))
           .reverse();

           console.log(state.dataContent);
           

           if (state.dataContentOrg.length === 0) {
            state.dataContentOrg = state.dataContent
           }

    


      

      // const maxIndexArry = [];
      // const minindexArry = [];

      // state.maxNumber = Math.max(...maxIndexArry);
      // state.minNumber = Math.min(...minindexArry);

      onResize();
    };

    const onTapClearButton = () => {


      state.isHoverFlag = false;
    };

    const getSpareClass = (spare1) => {
      if (!spare1) return null;

      console.log(spare1);
      
    };

    const getSpareClass2 = (spare1) => {
      if (!spare1) return null;

      const target = state.data

      let targetNumber;

      if (state.maxNumber === 1 || target.length === 1) {
        targetNumber = spare1;
        return "spare1";
      } else {
        targetNumber = spare1 - state.minNumber;
        let test = (state.maxNumber - state.minNumber) / 5;

        if (targetNumber < test) {
          return "spare5";
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
    }

    const onTapOutside = async (evt) => {



      if (
        evt.target.classList.contains("call-list-data-item") ||
        evt.target.classList.contains("call-list-title") ||
        evt.target.classList.contains("header-list-item") ||
        evt.target.classList.contains("select__value") ||
        evt.target.classList.contains("select__item") ||
        evt.target.classList.contains('select__item-text') ||
        evt.target.classList.contains('title-wrap') ||
        evt.target.classList.contains('sort-button') ||
        evt.target.classList.contains('reset-button') ||
        evt.target.classList.contains('filter-area') ||
        evt.target.tagName === "a" ||
          evt.target.tagName === "INPUT"
      ) {
        return;
      }


      

         const items4 = document.querySelectorAll("#my-chart .call-list-title.on");
          for (const item of items4) {
            item.classList.remove("on");
          }

        const item2 = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        const items3 = document.querySelectorAll("#my-chart .call-list-data-item.on");

        for (const item of item2) {
            item.classList.remove("no-active");
          }

          for (const item of items3) {
            item.classList.remove("on");
          }


          const itemParent = document.querySelector(".title-wrap.on");
        if (itemParent) {
          itemParent.classList.remove('on')
        }

           const items5 = document.querySelector("#my-chart3 .call-list-data-item.on");
        if (items5) {
          items5.classList.remove('on')
        }

         const items6 = document.querySelector("#my-chart3 .call-list-title.on");
          if (items6) {
          items6.classList.remove('on')
        }
          
          
      state.isHoverFlag = false;
          state.selectKeyMessage = null

      creatData(state.data,false)

  

    };

    const onTapTarget2_2 = async (_obj, text, evt) => {

      if (state.dataContentOrg.length !== state.dataContentOrg2.length) {
         ApplicationStore.isLoadComplete = false;


 setTimeout(async () => {
   creatData(state.data, true);
   await nextTick() 

   const parentElment = evt.target.parentElement;
      if (evt.target.classList.contains("on")) {
          evt.target.classList.remove("on");

          state.isHoverFlag = false;
        } else {
          const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
          for (const item of items4) {
            item.classList.remove("on");
          }

          evt.target.classList.add("on");



        const items2 = parentElment.querySelectorAll("#my-chart3 .call-list-date");
          


           

    

          if (items2.length > 1) {
            _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${items2.length}</span>`;
          }


     
           (state.isHoverFlag = false);
      
         }

   setPouUp2_2(_obj, text, evt);
      
            }, 1);
            

           
      } else {
      const parentElment = evt.target.parentElement;
      if (evt.target.classList.contains("on")) {
          evt.target.classList.remove("on");

          state.isHoverFlag = false;
        } else {
          const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
          for (const item of items4) {
            item.classList.remove("on");
          }

          evt.target.classList.add("on");



        const items2 = parentElment.querySelectorAll("#my-chart3 .call-list-date");
          

    

          if (items2.length > 1) {
            _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${items2.length}</span>`;
          }


     
           (state.isHoverFlag = false);
      
         }

      setPouUp2_2(_obj, text, evt);  
      }
        
     
    



      // }
    };

    const onTapTarget2_2_2 = async (_obj, text, evt) => {

      if (state.dataContentOrg.length !== state.dataContentOrg2.length) {
         ApplicationStore.isLoadComplete = false;

            setTimeout(async () => {
              creatData(state.data,true);
            }, 1);
        }

      const parentElment = evt.target.parentElement;
    
              if (evt.target.classList.contains("on")) {
          evt.target.classList.remove("on");

          const items = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
          
          for (const item of items) {
            item.classList.remove("no-active");
          }

       
        const items2 = document.querySelector("#my-chart .call-list-data-item.on");

              if (items2) {
        items2.classList.remove("on");
              }
                state.isHoverFlag = false;
                state.selectKeyMessage = null
                 state.selectObj["RANK"].Category = ""
          
              } else {
            const items4 = document.querySelector("#my-chart .call-list-title.on");
      if (items4) {
        items4.classList.remove("on");
      }

      evt.target.classList.add("on");

          const items = document.querySelectorAll("#my-chart .call-list-data-item");
          for (const item of items) {
            item.classList.add("no-active");
             item.classList.remove("on");
          }

            const items2 = parentElment.querySelectorAll("#my-chart .call-list-data-item");

             for (const item of items2) {
            item.classList.remove("no-active");
             }
          
            state.selectKeyMessage = _obj.Clm_Presentation_Name_vod__c
                state.selectObj["RANK"].Category = "Clm_Presentation_Name_vod__c"
            setPouUp2_4(_obj, text, evt);
        }

creatData(state.data,false)

      // }
    };

    const onTapTarget2_3 = async (_obj, index, evt) => {

           if (state.dataContentOrg.length !== state.dataContentOrg2.length) {
         ApplicationStore.isLoadComplete = false;

            setTimeout(async () => {
              creatData(state.data,true);
            }, 1);
        }

            const items4 = document.querySelector("#my-chart .call-list-title.on");
      if (items4) {
        items4.classList.remove("on");
      }

   
      
      if (evt.target.classList.contains("on")) { 
        evt.target.classList.remove("on")

        const items = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        for (const item of items) {
          item.classList.remove("no-active");
        }

        state.selectKeyMessage = null
         state.selectObj["RANK"].Category = ""
      } else {

   

        const items2 = document.querySelector("#my-chart .call-list-data-item.on");

              if (items2) {
        items2.classList.remove("on");
              }

              if (evt.target.classList.contains("no-active")) {
        const items = document.querySelectorAll("#my-chart .call-list-data-item");
        for (const item of items) {
          item.classList.add("no-active");
        }

        evt.target.classList.remove("no-active");
        evt.target.classList.add("on");


      } else {

        const items = document.querySelectorAll("#my-chart .call-list-data-item");


        for (const item of items) {
          item.classList.add("no-active");
        }
        evt.target.classList.remove("no-active");
        evt.target.classList.add("on");

       


        // creatData(state.data,false);
        // if (state.iScrollObj) {
        //   state.iScrollObj.refresh();
        // }


           
        // }

        //  }

        // }
              }
        state.selectKeyMessage = _obj.Clm_Presentation_Name_vod__c
       state.selectObj["RANK"].Category = "DATA"
       setPouUp2_3(_obj, index, evt);
      }



      // if (state.isScreen === "集計画面") {

      //       const items4 = document.querySelectorAll("#my-chart .call-list-title.on");
      // for (const item of items4) {
      //   item.classList.remove("on");
      // }

      // const items2 = document.querySelectorAll("#my-chart .call-list-data-item.on");

      // for (const item of items2) {
      //   item.classList.remove("on");
      // }

      


      
      creatData(state.data,false);


    };

    const onHoverItem2_2 = async (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      await nextTick()

      let items2

      items2 = document.querySelector("#my-chart3 .call-list-title.on ");
     
     

      if (items2) {

         console.log(items2);

      const parentElment = items2.parentElement;

      console.log(parentElment);
      

      items2 = parentElment.querySelectorAll("#my-chart3 .call-list-date");

 
      if (items2.length > 1) {
       
        _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${items2.length}</span>`;
      } else {
           _obj = ``;
        }
      }



      state.popupData = {
        タイトル: _obj,
        テキスト: text,
      };
    };

     const onHoverItem2_2_2 = (target, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      if (!target) {
        target =  state.dataContentOrg2
      }

        
      
                 

      let sum
       if (text.trim() === "クリック回数") {
       state.isHoverFlag19 = true;  
          const click = target.map((p) => p["Click_Count_vod__c"]).filter((v) => v)
        console.log(target);
         sum = click.reduce((sum, num) => Number(sum) + Number(num), 0);
        
       } else {
        state.isHoverFlag20 = true;   
        const open = target.map((p) => p["Open_Count_vod__c"]).filter((v) => v)
        sum = open.reduce((sum, num) => Number(sum) + Number(num), 0);
      }     
           

        
         
    console.log(target.length);
    

        const _obj = `<span class="fwb">${target.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}.00</span>`;

    

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
        "Clm_Presentation_Name_vod__c":_obj.Clm_Presentation_Name_vod__c,
        "移行済みデータ のカウント": _obj.Total,
      };

     
    };

     const onHoverItem2_4 = (_obj, index, evt) => {
       if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      const ua = navigator.userAgent;

      if (state.isHoverFlagCount === 0 && ua.indexOf("iPad") <= 0) {
        state.isHoverFlag = false;
      }

       state.popupData = {
         タイトル: '',
        テキスト:_obj.Clm_Presentation_Name_vod__c,
      };

     
    };

    const setPouUp2_2 = async (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      await onHoverItem2_2(_obj, text, evt);

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

    const setPouUp2_2_2 = async (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      await onHoverItem2_2_2(_obj, text, evt);

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


    const setPouUp2_4 = async (_obj, index, evt) => {
   if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      await onHoverItem2_4(_obj, index, evt);

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

    const onTapSortVisible = async (text) => {
      

      const ua = navigator.userAgent;

      if (ua.indexOf("iPad") >= 0) {
        switch (text) {
          case "isHoverFlag2":
             state.isHoverFlag2 = true;
            
            break;
        case "isHoverFlag3":
             state.isHoverFlag3 = true;
            
            break;
         case "isHoverFlag4":
             state.isHoverFlag4 = true;
            
            break;
        case "isHoverFlag5":
             state.isHoverFlag5 = true;
            
            break;

         case "isHoverFlag6":
             state.isHoverFlag6 = true;
            
            break;

         case "isHoverFlag7":
             state.isHoverFlag7 = true;
            
            break;

          case "isHoverFlag8":
             state.isHoverFlag8 = true;
            
            break;

            case "isHoverFlag9":
             state.isHoverFlag9 = true;
            
            break;

            case "isHoverFlag10":
             state.isHoverFlag10 = true;
            
            break;

            case "isHoverFlag11":
             state.isHoverFlag11 = true;
            
            break;

              case "isHoverFlag12":
             state.isHoverFlag12 = true;
            
            break;
        

              case "isHoverFlag13":
             state.isHoverFlag13 = true;
            
            break;
        

              case "isHoverFlag14":
             state.isHoverFlag14 = true;
            
            break;
        

              case "isHoverFlag15":
             state.isHoverFlag15 = true;
            
            break;

              case "isHoverFlag16":
             state.isHoverFlag16 = true;
            
            break;

              case "isHoverFlag17":
             state.isHoverFlag17 = true;
            
            break;

              case "isHoverFlag18":
             state.isHoverFlag18 = true;
            
            break;
        
            
         default:
            break;
        }
       
      }
      // }
    };

    const onTapSort = async (evt) => {
       
      let target = evt.target.getAttribute('data-sort')
      if (!target) {
        target = "DATA";
      }



       if (state.sortObj[target] === "default") {
          state.sortObj[target] = "ASC";
        } else if (state.sortObj[target] === "ASC") {
          state.sortObj[target] = "DESC";
        } else {
          state.sortObj[target] = "default";
        }

      

      creatData(state.data,false);

      state.isHoverFlag2 = false;
      state.isHoverFlag3 = false;
      state.isHoverFlag4 = false;
      state.isHoverFlag5 = false;
      state.isHoverFlag6 = false;
      state.isHoverFlag7 = false;
       state.isHoverFlag8 = false;
        state.isHoverFlag9 = false;

      // }
    };




    const onTapDataHeader = async (text,evt) => {
      const ua = navigator.userAgent;

      if (ua.indexOf("iPad") >= 0) {
        switch (text) {
          case "isHoverFlag19":
            state.isHoverFlag19 = true;

            break;
          case "isHoverFlag20":
            state.isHoverFlag20 = true;

            break;

          default:
            break;
        }

      }

      if (!evt.target.classList.contains('title-wrap')) {
        return
      }
           (state.selectObj[state.isScreen] = {
        docter:"",
        sentDate: "",
             templateName: "",
             flagmentName: "",
             Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,  
       
           })

        const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
         
          
           for (const item of items4) {
            
            item.classList.remove("on");
          
          }

      if (evt.target.classList.contains('on')) {
        evt.target.classList.remove('on')

        for (const element of state.dataContentOrg2) {
          element.isClickActive = false
          element.isOpenActive = false 
         element.isActive = false  
        }
 
      } else {

         const itemParent = document.querySelector(".title-wrap.on");
        if (itemParent) {
          itemParent.classList.remove('on')
        }

        evt.target.classList.add('on')


        if (evt.target.textContent.trim() === "クリック回数") {
          
 for (const element of state.dataContentOrg2) {
   element.isClickActive = true
   element.isOpenActive = false
   element.isActive = false  
 }
        } else  if (evt.target.textContent.trim() === "開封回数") {
           for (const element of state.dataContentOrg2) {
             element.isOpenActive = true
             element.isClickActive = false
             element.isActive = false  
   
 }
        }
         


        let target


        
      //  console.log(totalArray2_copy.length);


//  if (Object.values(state.selectObj["送付先詳細"]["Value2"]).length > 0) {
//   target = state.dataContentOrg2.filter((x) => {
//           return x.HP_name == state.selectObj["送付先詳細"]["Value2"]
//           })
//  } else {
//   target =  state.dataContentOrg2
//  }


   target =  state.dataContentOrg2


     


      setPouUp2_2_2(target, evt.target.textContent.trim(), evt);
      }

    


        



    };

   

    let target = [...state.data];

   
     
    creatDataMR(target, false);

    creatDataArea(target, false);

    creatDataTerritory(target, false);

    creatDataTarget(target, false);
    creatDataContents(target, false);
     
  creatDataProduct(target, false);   
    creatData(target, false);
    creatDataSales(target) 
    creatDataDocter(target)
  creatDataChanel(target)
     
    creatDataDataMonth();

    
    if (state.isScreen !== "送付内容") {
      window.addEventListener("resize", onResize);
    }

    return {
      state,
      root,
      chart,
      dayjs,
      isLoadComplete,
      onTapSelectBoxItem,
      onTapSelectBoxItemReset,
      onTapClearButton,
      getShareName,
      onTapOutside,
      getSpareClass,
      onHoverItem2_2,
      onHoverItem2_2_2,
      onHoverItem2_3,
      onHoverItem2_4,
      onTapTarget2_2,
      onTapTarget2_2_2,
      onTapTarget2_3,
      onTapSort,
      onTapDataHeader,
      onTapSortVisible,
      getSpareClass2
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

  .spare1 {
   --color: #204d77;
}

.spare2 {
   --color: #396b9a;
}

.spare3 {
   --color: #578db9;
}

.spare4 {
    --color: #7bb2d7;
}

.spare5 {
    --color: #add9ef;
}

}

#my-chart .column {
  --color: blue;
}

#my-chart2 .bar {
  --labels-size: 100%;
  --color: #4e79a7;
}

#my-chart2 .column {
  --color: blue;
}

.title {
  &-wrap{
max-width: 1375px;
margin:  0 auto;
  }
  
      font-size: 21px;
    line-height: 29px;
    color: #fff;
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
    background-color: #1b1061;
    margin: 15px 10px 10px;
    padding: 2px 5px;
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

.iscroll-wrapperContent {
  flex: 1;
  width: 100%;
  max-height: 100%;
  position: relative;
  overflow: hidden;
   height: calc( 100% - 34px);
}

.iscroll-wrapperContent2 {
  flex: 1;
  width: 100%;
  max-height: 100%;
  position: relative;
  overflow: hidden;
   height: calc( 100% - 27px);
}

.filter-wrapper {
  max-width: 1375px;
  margin: 0 auto;
}

.filter-area {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;

  > div {
    width: calc(100% / 9);
  }

  &-text {
    width: 40%;
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    margin-bottom: 23px;
    line-height: 23px;
    color: rgb(225, 87, 89);
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
  }
}

.filter-screen {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;

  &-text{
    margin-left: 10px;
    color: rgb(89, 161, 79);
    font-size: 15px;
        font-weight: bold;
  }
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
    max-width: 1375px;
    margin:  0 auto;
    max-height: 630px;

    .title {
      background-color: #22538e;
      margin: 0 10px;

      span {
        margin-left: 3px;
        font-size: 80%;
        color: #f6d673;
      }
    }

    &2{
      max-width: 1300px;
    }

    &3{
      max-width: 1190px;
    }

    &-main {
      flex: 1;
        height: calc(100vh - 171px);
        max-height: 630px;

      &-header {
        margin: 0 10px;

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
          background-color: #22538e;
          min-height: 27px;

          &-right {
            font-weight: bold;
            flex: 1;
            text-align: center;
            min-height: 27px;
           display: flex;
           justify-content: center;
           align-items: center;
            cursor: pointer;

            ul {
              flex: 1;
              li {
                width: calc(100% / 2);
                font-size: 12px;
                    min-height: 27px;
    /* height: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

                &.on {
                  background-color: #98c2d1;
                  color: #000;
                }
              }
            }
          }
        }

        &-list {
          display: flex;
          
          align-items: center;
          font-size: 18px;
          cursor: pointer;
          min-height: 27px;
          width: 100%;
          
          

          .call-list {

            position: relative;
            font-size: 13px;

            &6{
             font-size: 13px;
             font-feature-settings: "palt";
            }

          
        }

        }
      }
    }

    &-wrap {
      margin-bottom: 10px;
     height: calc(40% - 10px);
      &2 {
         margin-bottom: 10px;
        height: calc(60% - 10px);
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
        background-color: #98c2d1 !important;
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
     width: 75px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
      padding: 0 3px;

       & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }
    &2 {
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
      padding: 0 3px;

           & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }
    &3 {
     width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
      padding: 0 3px;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }

    &4 {
       width: 95px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
      padding: 0 3px;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }

     &5 {
      width: 450px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 13px;
    }

     &6 {
       width: 60px;
     overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
      padding: 0 3px;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }

    &12 {
       width: 40px;
     overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 12px;
    
      padding: 0 3px;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;
         justify-content: center;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }
    }


     &7 {
      width: 340px;
     overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    
     padding: 0 3px;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }

    }

    &8 {
      
     overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
    font-feature-settings: "palt";
      padding: 0 3px;
      flex: 1;

            & div.list-wrap {
        height: 23px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //行数を指定
    line-height: 1.5;
      }

      }

    }

     &9 {
      width: 150px;
      min-height: 116px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0 3px;

      & div.list-wrap {
        height: 116px;
        display: flex;
        align-items: center;
         pointer-events: none;
         width: 100%;

        & span {
        max-height: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; //行数を指定
    line-height: 1.5;
      }

      }
      
      
    }

     &10 {
      width: 170px;
      min-height: 116px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0 3px;

      & div.list-wrap {
        height: 116px;
        display: flex;
        align-items: center;
         pointer-events: none;
          width: 100%;

        & span {
        max-height:  90px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; //行数を指定
    line-height: 1.5;
      }

      }
      
      
    }

    &11 {
      width: 150px;
      min-height: 116px;
      display: flex;
      align-items: flex-start;;
      justify-content: center;
      padding: 0 3px;

      & div.list-wrap {
        height: 116px;
        display: flex;
        align-items: center;
         pointer-events: none;

        & span {
        max-height: 82px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 12px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; //行数を指定
    line-height: 1.5;
      }

      }
      
      
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

#my-chart2 {
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
  cursor: pointer;
   padding-right: 5px;

  &-left {
    width: 600px;
    text-align: right;
  }

  &2 {
    .content-footer-left{
      width: 530px;
    }
  }

  &-right {
     border-left:1px solid #cbcbcb;
         border-right:1px solid #cbcbcb;
    color: #666666;
    font-weight: bold;
    flex: 1;
  }

  &-text {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
    text-align: center;
    
    &2{
      display: inline-block;
      position: relative;
    }
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

@media screen and (max-width: 1020px) {
  .iscroll-wrapper2 {
    flex: 1;
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
  }


  .min-content {
    width: fit-content;
  }

}

.sort-button {
      position: absolute;
    width: 15px;
    height: 15px;
    right: 0;
    top: 3px;
  &:hover{
    background-color: #fff;
  }

  &2{
    right: 40px;
  }

  &3 {
    position: absolute;
    width: 15px;
    height: 15px;
    right: 3px;
    top: 7px;
  &:hover{
    background-color: #fff;
  }
  }

  &-data {
     width: 15px;
    height: 15px;

     &:hover{
    background-color: #fff;

   
  }

   &2 {
     position: absolute;
       width: 15px;
    height: 15px;
    top: 5px;
    left: 100px;

       &:hover{
    background-color: #d9d9d9;

   
  }
    
    }

  }
}


@media screen and (max-width: 1130px) {
  .filter-area-text {
    font-size: 14px;
  }
}

.sort-asc {
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortAZSecond.svg'); /* 表示する画像 */
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: left top;

  &2{
    background: url('~@/assets/images/icon/sortAZ.svg'); /* 表示する画像 */
    width: 100%;
  height: 100%;
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: left top;

   &:hover{
     background: url('~@/assets/images/icon/sortAZ.svg'); /* 表示する画像 */
  }

  }
 
  &:hover{
     background: url('~@/assets/images/icon/sortAZ.svg'); /* 表示する画像 */
  }

  &-data {

    width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortZAdata.svg'); /* 表示する画像 */
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: left top;

  &2{

     width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortZAdataThrid.svg'); /* 表示する画像 */
  background-size: 10px 10px; 
  background-repeat: no-repeat;
  background-position: center;
 
  &:hover{
     background: url('~@/assets/images/icon/sortZAdataSecond.svg'); /* 表示する画像 */
     background-size: 12px 12px; 
     background-repeat: no-repeat;
     background-position: center;
  }

  }

    &3{

     width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortZAdataFour.svg'); /* 表示する画像 */
  background-size: 10px 10px; 
  background-repeat: no-repeat;
  background-position: center;
 
  &:hover{
     background: url('~@/assets/images/icon/sortZAdata.svg'); /* 表示する画像 */
     background-size: 12px 12px; 
     background-repeat: no-repeat;
     background-position: center;
  }

  }

  }

}

.sort-desc {
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortZASecond.svg'); /* 表示する画像 */
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: left top;
 
  &:hover{
     background: url('~@/assets/images/icon/sortZA.svg'); /* 表示する画像 */
  }

   &-data {

    width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortAZdata.svg'); /* 表示する画像 */
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: left top;

    &2{

     width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortAZdataThrid.svg'); /* 表示する画像 */
  background-size: 10px 10px; 
  background-repeat: no-repeat;
  background-position: center;
 
  &:hover{
     background: url('~@/assets/images/icon/sortAZdataSecond.svg'); /* 表示する画像 */
     background-size: 12px 12px; 
     background-repeat: no-repeat;
     background-position: center;
  }

  }

    &3{

     width: 100%;
  height: 100%;
  background: url('~@/assets/images/icon/sortAZdataFour.svg'); /* 表示する画像 */
  background-size: 10px 10px; 
  background-repeat: no-repeat;
  background-position: center;
 
  &:hover{
     background: url('~@/assets/images/icon/sortAZdata.svg'); /* 表示する画像 */
     background-size: 12px 12px; 
     background-repeat: no-repeat;
     background-position: center;
  }

  }
  

  }

}

.test6 {

   :not(:last-child)  {
    .call-list6 {

     border-bottom: none;
    
  }
    
    }

  
}

#my-chart3{

 

  .call-list-title {
    padding-top: 0;
    padding-bottom: 0;
  }

  


  .call-list-data {
    min-width: 200px;
    background-color: #fff;
    &-item {
      width: 50%;
    } 
  }

 

    .test4{
   .call-list-back {
     background-color: #f1f1f1;
   }
  }

   .call-list-data-item.on {
    outline: none;
    background-color: #afe1f0;
  }
}

@media screen and (min-width: 1050px) {
  .call-list10  {
    width: 205px;
  }
}

@media screen and (min-width: 1100px) {

  .call-list1   {
    width: 80px;
  }

   .call-list2   {
    width: 125px;
  }

     .call-list3   {
    width: 90px;
  }

       .call-list4   {
    width: 100px;
  }
         .call-list6   {
    width: 65px;
  }
  .call-list7   {
    width: 375px;
  }
}

@media screen and (min-width: 1200px) {
  .call-list1   {
    width: 90px;
  }

   .call-list2   {
    width: 130px;
  }

     .call-list3   {
    width: 95px;
  }

       .call-list4   {
    width: 115px;
  }
         .call-list6   {
    width: 65px;
  }
  .call-list7   {
    width: 410px;
  }
}

@media screen and (min-width: 1300px) {
    .call-list1   {
    width: 100px;
  }

   .call-list2   {
    width: 150px;
  }

     .call-list3   {
    width: 110px;
  }

       .call-list4   {
    width: 125px;
  }
         .call-list6   {
    width: 75px;
  }
  .call-list7   {
    width: 450px;
  }
}

.fwb2 {
   -webkit-text-stroke: 0.5px rgb(102, 102, 102);
}

.reset-button {
  width: 105px;
  height: 43px;
  background-color: #898989;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;

  &.none {
    pointer-events: none;
  }
}


#my-chart {
  .call-list-title {
    border-bottom: none;
  }
}

.charts-css.bar.show-data-axes .tbody .tr{
  border-block-end:none;
}
</style>
