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
                <router-link :to="{
          name: 'SentEmailTop',
          query: {
            date: state.date,
          },
        }">事業部別メール送付実績</router-link>
              </li>
              <li>/</li>
              <li>{{ state.name }}_メール送付実績</li>
            </ul>
          </div>

          <div class="title">
            メール送付実績
          </div>

          <div class="filter-wrapper">
            <div class="filter-contents">
              <div class="filter-area">
                <div class="filter-screen">
                   <SelectBox2 :width="'160px'" :category="'画面'" :select-obj="state.screenObj" :selected-value="state.selectedFilterScreenItems.画面" @tap-item="onTapSelectBoxItemScreen" />
                  <div class="filter-screen-text">←前画面に戻る際に選択</div>
                </div>
               
                <div class="pr20" :style="state.isScreen ==='集計画面' ? 'justify-content: space-between;' : '' " style="display: flex;">
                  <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'100px'" :category="'メール送付月'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.メール送付月" />

                <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'100px'" :category="'エリア'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.エリア" v-if="state.isScreen === '集計画面'" />

                <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'150px'" :category="'テリトリー名'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.テリトリー名" v-if="state.isScreen === '集計画面'" />

                <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'100px'" :category="'MR'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.MR" v-if="state.isScreen === '集計画面'" />

                   <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem2" :width="'150px'" :category="'施設名'" :select-obj="state.selectedObj" :selected-value="state.selectedFilterItems3.施設名" v-if="state.isScreen === '送付先詳細'" />
               <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem2" :width="'100px'" :category="'医師名'" :select-obj="state.selectedObj" :selected-value="state.selectedFilterItems3.医師名"  v-if="state.isScreen === '送付先詳細'" />
                
               <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'100px'" :category="'Target'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.Target" v-if="state.isScreen === '送付先詳細' || state.isScreen === '集計画面'"/>

                 <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'200px'" :category="'フラグメント'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.フラグメント" />

                  <SelectBox3 class="mb20 mr20" @tap-item="onTapSelectBoxItem" :width="'100px'" :category="'製品'" :select-obj="state.testObj" :selected-value="state.selectedFilterItems.製品" />
                </div>

                

             

               <div class="filter-area-text">
                <template v-if="state.isScreen === '集計画面'">▼MR名 or 棒グラフをクリック後、対象のMRの実績に絞込</template>
                <template v-if="state.isScreen === '送付先詳細'">▼グラフをクリック後、メールの詳細を表示</template>
                
               </div>
              </div>
            </div>
          </div>

          <div v-click-outside="onTapOutside" class="call-content" :class="[{ 'call-content2': state.isScreen === '送付先詳細'},{ 'call-content3': state.isScreen === '送付内容'}]">
            <div class="call-content-main">
              <div class="call-content-main-header">

                <div class="call-content-main-header-content" v-if="Object.values(state.data2).length > 0  && state.isScreen === '集計画面'">
                  <ul class="call-content-main-header-list">
                    <li  @tap="onTapSortVisible('isHoverFlag5')" @mouseover="state.isHoverFlag5 = true" @mouseleave="state.isHoverFlag5 = false" class="call-list1 call-list fwb">
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
                    <li @tap="onTapSortVisible('isHoverFlag4')" @mouseover="state.isHoverFlag4 = true" @mouseleave="state.isHoverFlag4 = false" class="call-list2 call-list fwb">
                      エリア
                    <template v-if="state.sortObj.エリア == 'default'">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag4" data-sort="エリア">
                        <div class="sort-asc2" data-sort="エリア"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="エリア">
                          <template v-if="state.sortObj.エリア == 'ASC'">
                             <div class="sort-asc" data-sort="エリア"></div>
                          </template>
                          <template v-if="state.sortObj.エリア == 'DESC'">
                            <div class="sort-desc" data-sort="エリア"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag2')" @mouseover="state.isHoverFlag2 = true" @mouseleave="state.isHoverFlag2 = false"  class="call-list3 call-list fwb">
                      テリトリー名 
                      <template v-if="!Object.keys(state.sortObj.セカンド).includes('テリトリー名')">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag2" data-sort="テリトリー名">
                          <div class="sort-asc2" data-sort="テリトリー名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="テリトリー名">
                          <template v-if="state.sortObj.セカンド.テリトリー名 == 'ASC'">
                           <div class="sort-asc" data-sort="テリトリー名"></div>
                          </template>
                          <template v-if="state.sortObj.セカンド.テリトリー名 == 'DESC'">
                            <div class="sort-desc" data-sort="テリトリー名"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag3')" @mouseover="state.isHoverFlag3 = true" @mouseleave="state.isHoverFlag3 = false" class="call-list4 call-list fwb">
                      MR
                      <template v-if="!Object.keys(state.sortObj.セカンド).includes('MR')">
                      <div class="sort-button" @tap="onTapSort" v-if="state.isHoverFlag3" data-sort="MR">
                       <div class="sort-asc2" data-sort="MR"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort" data-sort="MR">
                          <template v-if="state.sortObj.セカンド.MR == 'ASC'">
                            <div class="sort-asc" data-sort="MR"></div>
                          </template>
                          <template v-if="state.sortObj.セカンド.MR == 'DESC'">
                            <div class="sort-desc" data-sort="MR"></div>
                          </template>
                        </div>
                      </template>

                    </li>
                  </ul>
                    <div @tap="onTapSortVisible('isHoverFlag6')" @mouseover="state.isHoverFlag6 = true" @mouseleave="state.isHoverFlag6 = false" class="call-content-main-header-content-right">

                      <template v-if="!Object.keys(state.sortObj.セカンド).includes('DATA')">
                      <div class="sort-button-data" @tap="onTapSort" v-if="state.isHoverFlag6" data-sort="DATA">
                        <div class="sort-asc-data" data-sort="DATA"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button-data" @tap="onTapSort" data-sort="DATA">
                          <template v-if="state.sortObj.セカンド.DATA == 'ASC'">
                            <div v-if="state.isHoverFlag6" class="sort-asc-data" data-sort="DATA"></div>
                          </template>
                          <template v-if="state.sortObj.セカンド.DATA == 'DESC'">
                            <div v-if="state.isHoverFlag6" class="sort-desc-data" data-sort="DATA"></div>
                          </template>
                        </div>
                     </template>

                        
        

                  </div>
                </div>
                <div class="call-content-main-header-content" v-if="Object.values(state.dataDetail).length > 0 && state.isScreen === '送付先詳細'">
                  <ul class="call-content-main-header-list">
                    <li @tap="onTapSortVisible('isHoverFlag8')" @mouseover="state.isHoverFlag8 = true" @mouseleave="state.isHoverFlag8 = false" class="call-list2 call-list fwb">
                      MR
                       <template v-if="state.sortObj2.MR == 'default'">
                      <div class="sort-button" @tap="onTapSort2" v-if="state.isHoverFlag8" data-sort="MR">
                       <div class="sort-asc2" data-sort="MR"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort2" data-sort="MR">
                          <template v-if="state.sortObj2.MR == 'ASC'">
                             <div class="sort-asc" data-sort="MR"></div>
                          </template>
                          <template v-if="state.sortObj2.MR == 'DESC'">
                            <div class="sort-desc" data-sort="MR"></div>
                          </template>
                        </div>
                      </template>
                    
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag9')" @mouseover="state.isHoverFlag9 = true" @mouseleave="state.isHoverFlag9 = false" class="call-list3  call-list fwb">
                      施設名

                      <template v-if="state.sortObj2.施設名 == 'default'">
                      <div class="sort-button" @tap="onTapSort2" v-if="state.isHoverFlag9" data-sort="施設名">
                       <div class="sort-asc2" data-sort="施設名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort2" data-sort="施設名">
                          <template v-if="state.sortObj2.施設名 == 'ASC'">
                             <div class="sort-asc" data-sort="施設名"></div>
                          </template>
                          <template v-if="state.sortObj2.施設名 == 'DESC'">
                            <div class="sort-desc" data-sort="施設名"></div>
                          </template>
                        </div>
                      </template>
                    
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag10')" @mouseover="state.isHoverFlag10 = true" @mouseleave="state.isHoverFlag10 = false" class="call-list6 call-list fwb">
                      医師名
                      <template v-if="!Object.keys(state.sortObj2.セカンド).includes('医師名')">
                      <div class="sort-button" @tap="onTapSort2" v-if="state.isHoverFlag10" data-sort="医師名">
                        <div class="sort-asc" data-sort="医師名"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button" @tap="onTapSort2" data-sort="医師名">
                          <template v-if="state.sortObj2.セカンド.医師名 == 'ASC'">
                            <div class="sort-asc" data-sort="医師名"></div>
                          </template>
                          <template v-if="state.sortObj2.セカンド.医師名 == 'DESC'">
                            <div class="sort-desc" data-sort="医師名"></div>
                          </template>
                        </div>
                     </template>
                    </li>

                     <li @tap="onTapSortVisible('isHoverFlag22')" @mouseover="state.isHoverFlag22 = true" @mouseleave="state.isHoverFlag22 = false" class="call-list2-2 call-list fwb">
                      分類
                      <template v-if="!Object.keys(state.sortObj2.セカンド).includes('分類')">
                      <div class="sort-button" @tap="onTapSort2" v-if="state.isHoverFlag22" data-sort="分類">
                        <div class="sort-asc" data-sort="分類"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button" @tap="onTapSort2" data-sort="分類">
                          <template v-if="state.sortObj2.セカンド.分類 == 'ASC'">
                            <div class="sort-asc" data-sort="分類"></div>
                          </template>
                          <template v-if="state.sortObj2.セカンド.分類 == 'DESC'">
                            <div class="sort-desc" data-sort="分類"></div>
                          </template>
                        </div>
                     </template>
                    </li>

                  </ul>
                  <div  @tap="onTapSortVisible('isHoverFlag11')" @mouseover="state.isHoverFlag11 = true" @mouseleave="state.isHoverFlag11 = false" class="call-content-main-header-content-right">


                      <template v-if="!Object.keys(state.sortObj2.セカンド).includes('DATA')">
                      <div class="sort-button-data" @tap="onTapSort2" v-if="state.isHoverFlag11" data-sort="DATA">
                        <div class="sort-asc-data" data-sort="DATA"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button-data" @tap="onTapSort2" data-sort="DATA">
                          <template v-if="state.sortObj2.セカンド.DATA == 'ASC'">
                            <div v-if="state.isHoverFlag11" class="sort-asc-data" data-sort="DATA"></div>
                          </template>
                          <template v-if="state.sortObj2.セカンド.DATA == 'DESC'">
                            <div v-if="state.isHoverFlag11" class="sort-desc-data" data-sort="DATA"></div>
                          </template>
                        </div>
                     </template>

                  </div>
                </div>
                <div class="call-content-main-header-content" v-show="Object.values(state.dataContent).length > 0 && state.isScreen === '送付内容'">
                  <ul class="call-content-main-header-list">
                    <li @tap="onTapSortVisible('isHoverFlag13')" @mouseover="state.isHoverFlag13 = true" @mouseleave="state.isHoverFlag13 = false" class="call-list7 call-list">
                      医師名
                    <template v-if="state.sortObj3.医師名 == 'default'">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag13" data-sort="医師名">
                        <div class="sort-asc2" data-sort="医師名"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort3" data-sort="医師名">
                          <template v-if="state.sortObj3.医師名 == 'ASC'">
                             <div class="sort-asc" data-sort="医師名"></div>
                          </template>
                          <template v-if="state.sortObj3.医師名 == 'DESC'">
                            <div class="sort-desc" data-sort="医師名"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li  @tap="onTapSortVisible('isHoverFlag21')" @mouseover="state.isHoverFlag21 = true" @mouseleave="state.isHoverFlag21 = false" class="call-list12 call-list">
                      分類
                     <template v-if="state.sortObj3.分類 == 'default'">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag21" data-sort="分類">
                         <div class="sort-asc2" data-sort="分類"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort3" data-sort="分類">
                          <template v-if="state.sortObj3.分類 == 'ASC'">
                             <div class="sort-asc" data-sort="分類"></div>
                          </template>
                          <template v-if="state.sortObj3.分類 == 'DESC'">
                            <div class="sort-desc" data-sort="分類"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li  @tap="onTapSortVisible('isHoverFlag14')" @mouseover="state.isHoverFlag14 = true" @mouseleave="state.isHoverFlag14 = false" class="call-list8 call-list">
                      メール送付日
                     <template v-if="state.sortObj3.メール送付日 == 'default'">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag14" data-sort="メール送付日">
                         <div class="sort-asc2" data-sort="メール送付日"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort3" data-sort="メール送付日">
                          <template v-if="state.sortObj3.メール送付日 == 'ASC'">
                             <div class="sort-asc" data-sort="メール送付日"></div>
                          </template>
                          <template v-if="state.sortObj3.メール送付日 == 'DESC'">
                            <div class="sort-desc" data-sort="メール送付日"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li  @tap="onTapSortVisible('isHoverFlag15')" @mouseover="state.isHoverFlag15 = true" @mouseleave="state.isHoverFlag15 = false" class="call-list9 call-list">
                      メールテンプレート
                     <template v-if="state.sortObj3.メールテンプレート == 'default'">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag15" data-sort="メールテンプレート">
                       <div class="sort-asc2" data-sort="メールテンプレート"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort3" data-sort="メールテンプレート">
                          <template v-if="state.sortObj3.メールテンプレート == 'ASC'">
                             <div class="sort-asc" data-sort="メールテンプレート"></div>
                          </template>
                          <template v-if="state.sortObj3.メールテンプレート == 'DESC'">
                            <div class="sort-desc" data-sort="メールテンプレート"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li  @tap="onTapSortVisible('isHoverFlag16')" @mouseover="state.isHoverFlag16 = true" @mouseleave="state.isHoverFlag16 = false" class="call-list10 call-list">
                      フラグメント
                      <template v-if="state.sortObj3.フラグメント == 'default'">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag16" data-sort="フラグメント">
                         <div class="sort-asc2" data-sort="フラグメント"></div>
                      </div>
                    </template>
                      <template v-else>
                        <div class="sort-button" @tap="onTapSort3" data-sort="フラグメント">
                          <template v-if="state.sortObj3.フラグメント == 'ASC'">
                             <div class="sort-asc" data-sort="フラグメント"></div>
                          </template>
                          <template v-if="state.sortObj3.フラグメント == 'DESC'">
                            <div class="sort-desc" data-sort="フラグメント"></div>
                          </template>
                        </div>
                      </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag17')" @mouseover="state.isHoverFlag17 = true" @mouseleave="state.isHoverFlag17 = false" class="call-list11 call-list">
                      最終開封日時
                      <template v-if="!Object.keys(state.sortObj3.セカンド).includes('最終開封日時')">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag17" data-sort="最終開封日時">
                        <div class="sort-asc2" data-sort="最終開封日時"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button" @tap="onTapSort3" data-sort="最終開封日時">
                          <template v-if="state.sortObj3.セカンド.最終開封日時 == 'ASC'">
                            <div class="sort-asc" data-sort="最終開封日時"></div>
                          </template>
                          <template v-if="state.sortObj3.セカンド.最終開封日時 == 'DESC'">
                            <div class="sort-desc" data-sort="最終開封日時"></div>
                          </template>
                        </div>
                     </template>
                    </li>
                    <li @tap="onTapSortVisible('isHoverFlag18')"  @mouseover="state.isHoverFlag18 = true" @mouseleave="state.isHoverFlag18 = false" class="call-list11 call-list">
                      最終クリック日時
                     <template v-if="!Object.keys(state.sortObj3.セカンド).includes('最終クリック日時')">
                      <div class="sort-button" @tap="onTapSort3" v-if="state.isHoverFlag18" data-sort="最終クリック日時">
                        <div class="sort-asc" data-sort="最終クリック日時"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button" @tap="onTapSort3" data-sort="最終クリック日時">
                          <template v-if="state.sortObj3.セカンド.最終クリック日時 == 'ASC'">
                            <div class="sort-asc" data-sort="最終クリック日時"></div>
                          </template>
                          <template v-if="state.sortObj3.セカンド.最終クリック日時 == 'DESC'">
                            <div class="sort-desc" data-sort="最終クリック日時"></div>
                          </template>
                        </div>
                     </template>
                    </li>
                  </ul>
                  <div class="call-content-main-header-content-right">
                      <ul class="call-content-main-header-list">
                    <li @tap="onTapDataHeader('isHoverFlag19',$event)" @mouseover="onHoverItem2_2_2('', 'クリック回数', $event)" @mouseleave="[state.isHoverFlag19 = false,state.isHoverFlag = false]" class="fwb title-wrap">
                      クリック回数
                       <template v-if="!Object.keys(state.sortObj3.セカンド).includes('クリック回数')">
                      <div class="sort-button3" @tap="onTapSort3" v-if="state.isHoverFlag19" data-sort="クリック回数">
                        <div class="sort-asc-data3" data-sort="クリック回数"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button3" @tap="onTapSort3" data-sort="クリック回数">
                          <template v-if="state.sortObj3.セカンド.クリック回数 == 'ASC'">
                            <div class="sort-asc-data3" data-sort="クリック回数"></div>
                          </template>
                          <template v-if="state.sortObj3.セカンド.クリック回数 == 'DESC'">
                            <div class="sort-desc-data3" data-sort="クリック回数"></div>
                          </template>
                        </div>
                     </template>
                    </li>
                    <li  @tap="onTapDataHeader('isHoverFlag20',$event)"  @mouseover="onHoverItem2_2_2('', '開封回数', $event)" @mouseleave="[state.isHoverFlag20 = false,state.isHoverFlag = false]" class="fwb title-wrap">
                      開封回数
                      <template v-if="!Object.keys(state.sortObj3.セカンド).includes('開封回数')">
                      <div class="sort-button3" @tap="onTapSort3" v-if="state.isHoverFlag20" data-sort="開封回数">
                        <div class="sort-asc-data3" data-sort="開封回数"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button3" @tap="onTapSort3" data-sort="開封回数">
                          <template v-if="state.sortObj3.セカンド.開封回数 == 'ASC'">
                            <div class="sort-asc-data3" data-sort="開封回数"></div>
                          </template>
                          <template v-if="state.sortObj3.セカンド.開封回数 == 'DESC'">
                            <div class="sort-desc-data3" data-sort="開封回数"></div>
                          </template>
                        </div>
                     </template>
                    </li>
                  </ul>
                  </div>
                </div>
              </div>

              <div class="call-content-wrap">
                <div class="iscroll-wrapperContent">
                  <div class="iscroll__scroller">
                    <div v-show="state.isScreen === '集計画面'">
                      <div id="my-chart">
                        <div class="charts-css bar show-labels show-primary-axis show-6-secondary-axes show-data-axes data-spacing-2 data-outside">
                          <template v-for="(obj, index) in state.data2" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding: 0 5px">
                              <div class="test">
                                <template v-for="(sales, salesValue) in obj['data']" :key="salesValue">
                                  <div  @mouseover="onHoverItem2_2('', salesValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', salesValue, $event)" class="call-list1 call-list-title" data-kinds="営業部">
                                    {{ salesValue }}
                                  </div>
                                  <div class="test" :class="[{ test2: Object.keys(sales).length > 1 }]">
                                    <template v-for="(area, areaValue) in sales" :key="areaValue">
                                      <div class="test">
                                        <div  @mouseover="onHoverItem2_2('', areaValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', areaValue, $event)" class="call-list2 call-list-title" data-kinds="エリア">
                                          {{ areaValue }}
                                        </div>

                                        <div class="test" :class="[{ test2: Object.keys(area).length > 1 }]">
                                          <template v-for="(territory, territoryValue) in area" :key="territoryValue">
                                            <div class="test">
                                              <div  @mouseover="onHoverItem2_2('', territoryValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', territoryValue, $event)" class="call-list3 call-list-title" data-kinds="テリトリー名">
                                                {{ territoryValue }}
                                              </div>

                                              <div class="test" :class="[{ test2: Object.keys(territory).length > 1 }]">
                                                <template v-for="(MR, MRValue) in territory" :key="MRValue">
                                                  <div class="test">
                                                    <div  @mouseover="onHoverItem2_2('', MRValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2('', MRValue, $event)" class="call-list4 call-list-title" data-kinds="MR">
                                                      {{ MRValue }}
                                                    </div>

                                                    <div class="call-list-data tr" :style="MR.ratio">
                                                      <div @mouseover="onHoverItem2_3(MR, MRValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(MR, MRValue, $event)" class="call-list-data-item td" data-kinds="MR">
                                                        <span class="data">{{ MR.Total }}</span>
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
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>

                    <div v-show="state.isScreen === '送付先詳細'">
                      <div id="my-chart2">
                        <div class="charts-css bar show-labels show-primary-axis show-6-secondary-axes show-data-axes data-spacing-2 data-outside">
                          <template v-for="(obj, index) in state.dataDetail" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding: 0 5px">
                              <div style="width: 100%">
                                <template v-for="(MR, MRValue) in obj['data']" :key="MRValue">
                                  <div class="test">
                                    <div   @mouseover="onHoverItem2_2(MR, MRValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(MR, MRValue, $event)" class="call-list2 call-list-title" data-kinds="MR">
                                      {{ MRValue }}
                                    </div>
                                    <div class="test" :class="[{ test2: Object.keys(MR).length > 1 }]">
                                      <template v-for="(area, areaValue) in MR" :key="areaValue">
                                        <div class="test">
                                          <div   @mouseover="onHoverItem2_2(area, areaValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(area, areaValue, $event)" data-kinds="HP_name" class="call-list3 call-list3_2 call-list-title">
                                            {{ areaValue }}
                                          </div>

                                          <div class="test" :class="[{ test2: Object.keys(area).length > 1 },{ test6: Object.keys(area).length > 1 }]">
                                            <template v-for="(docter, docterValue) in area" :key="docterValue">
                                              <div class="test">
                                                <div   @mouseover="onHoverItem2_2(docter, docterValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(docter, docterValue, $event)" data-kinds="Dr_name" class="call-list6 call-list-title">
                                                  {{ docterValue }}
                                                </div>
                                                <div class="test">
                                                         <div   @mouseover="onHoverItem2_2(docter, docterValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(docter, docterValue, $event)" data-kinds="Dr_name" class="call-list2-2 call-list-title">
                                                  {{ docter.分類 }}
                                                </div>

                                                 <div   class="call-list-data tr" :style="docter.ratio">
                                                  <div @mouseover="onHoverItem2_3(docter, docterValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(docter, docterValue, $event)"  data-kinds="Dr_name" class="call-list-data-item td">
                                                    <span class="data">{{ docter.Total }}</span>
                                                  </div>
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
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>

                    <div v-show="state.isScreen === '送付内容'">
                      <div id="my-chart3">
                        <div>
                          <template v-for="(obj, index) in state.dataContent" :key="index">
                            <div class="tbody call-list-item" style="flex-direction: row; padding: 0 5px">
                              <div style="width: 100%">
                                <template v-for="(docter, docterValue) in obj['data']" :key="docterValue">
                                  <div class="test">
                                    <div  @mouseover="onHoverItem2_2(docter, docterValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(docter, docterValue, $event)" class="call-list7 call-list-title" data-kinds="docter" :class="[{ on: !state.selectObj['送付内容']['sentDate'] && state.selectObj['送付内容']['docter'] === docterValue && !state.selectObj['送付内容']['分類']}]">
                                      <span> {{ docterValue }}</span>
                                    </div>
                                    <div class="test" :class="[{ test2: Object.keys(docter).length > 1 }]">
                                      <template v-for="(kind, kindValue) in docter" :key="kindValue">
                                         <div class="test">
                                           <div  @mouseover="onHoverItem2_2(kind, kindValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(kind, kindValue, $event)" data-kinds="kind" class="call-list12 call-list-title"  :class="[{ on:  !state.selectObj['送付内容']['templateName'] && state.selectObj['送付内容']['docter'] === docterValue && state.selectObj['送付内容']['分類'] === kindValue }]">
                                           <span>{{ kindValue }}</span>
                                          </div>

                                           <div class="test" :class="[{ test2: Object.keys(kind).length > 1 }]">
                                      <template v-for="(sentDate, sentDateValue) in kind" :key="sentDateValue">
                                        <div class="test">
                                          <div  @mouseover="onHoverItem2_2(sentDate, sentDateValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(sentDate, sentDateValue, $event)" data-kinds="sentDate" class="call-list8 call-list-title"  :class="[{ on:  !state.selectObj['送付内容']['templateName'] && state.selectObj['送付内容']['docter'] === docterValue && state.selectObj['送付内容']['sentDate'] === sentDateValue }]">
                                           <span>{{ sentDateValue }}</span>
                                          </div>

                                          <div class="test" :class="[{ test2: Object.keys(sentDate).length > 1 }]">
                                            <template v-for="(templateName, templateNameValue) in sentDate" :key="templateNameValue">
                                              <div class="test">
                                                <div  @mouseover="onHoverItem2_2(templateName, templateNameValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(templateName, templateNameValue, $event)" data-kinds="templateName" class="call-list9 call-list-title" :class="[{ on:  !state.selectObj['送付内容']['flagmentName'] && state.selectObj['送付内容']['docter'] === docterValue && state.selectObj['送付内容']['sentDate'] === sentDateValue && state.selectObj['送付内容']['templateName']  === templateNameValue }]">
                                                  <div class="list-wrap"><span>{{ templateNameValue }}</span></div>
                                                </div>
                                                <div class="test" :class="[{ test2: Object.keys(templateName).length > 1 }]">
                                                  <template v-for="(flagment, flagmentValue) in templateName" :key="flagmentValue" >
                                                    <div class="test">
                                                      <div @mouseover="onHoverItem2_2(flagment, flagmentValue, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(flagment, flagmentValue, $event)" data-kinds="flagmentName" class="call-list10 call-list-title" :class="[{ on: !state.selectObj['送付内容']['Last_Open_Date_vod__c']  && !state.selectObj['送付内容']['Last_Click_Date_vod__c'] && state.selectObj['送付内容']['docter'] === docterValue && state.selectObj['送付内容']['sentDate'] === sentDateValue && state.selectObj['送付内容']['templateName']  === templateNameValue && state.selectObj['送付内容']['flagmentName']  === flagmentValue  }]">
                                                        <div class="list-wrap"><span>{{ flagment[0]["Email_Fragments_vod__r.Name"] ? flagmentValue: "NULL"  }}</span></div>
                                                      </div>

                                                      <div class="test test2">
                                                        <template v-for="(key, val) in flagment" :key="val">
                                                          <div class="test" :class="getSpareClass(key.dataNumber)">
                                                          
                                                            <div  @mouseover="onHoverItem2_2(key, val, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(key, val, $event)" data-kinds="Last_Open_Date_vod__c" class="call-list11 call-list-title" :class="[{ on: key.isActive === true && state.selectObj['送付内容']['Last_Open_Date_vod__c'] === true }]">
                                                              <div class="list-wrap"><span class="data">{{ key["Last_Open_Date_vod__c"] ? dayjs(key["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL" }}</span></div>
                                                            </div>

                                                            <div @mouseover="onHoverItem2_2(key, val, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_2(key, val, $event)" data-kinds="Last_Click_Date_vod__c" class="call-list11 call-list-title call-list-back" :class="[{ on: key.isActive === true && state.selectObj['送付内容']['Last_Click_Date_vod__c'] === true }]">
                                                              <div  class="list-wrap"><span class="data">{{ key["Last_Click_Date_vod__c"] ? dayjs(key["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL" }}</span></div>
                                                            </div>

                                                            <div class="call-list-data">
                                                              <div  @mouseover="onHoverItem2_3(key, val, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(key, val, $event)" class="call-list-data-item call-list-back" data-kinds="クリック回数" :class="[{ on: key.isActive === true && Object.values(state.selectObj['送付内容']['docter']).length > 0 }, { 'no-active': !key.isActive && Object.values(state.selectObj['送付内容']['docter']).length > 0 },{ on: key.isClickActive === true},{ 'no-active': key.isOpenActive === true}]">
                                                                <span class="data">{{ key["Click_Count_vod__c"] }}</span>
                                                              </div>

                                                              <div  @mouseover="onHoverItem2_3(key, val, $event)" @mouseleave="state.isHoverFlag = false" @tap="onTapTarget2_3(key, val, $event)" class="call-list-data-item call-list-back" data-kinds="開封回数"  :class="[{ on: key.isActive === true && Object.values(state.selectObj['送付内容']['docter']).length > 0},{'no-active': !key.isActive && Object.values(state.selectObj['送付内容']['docter']).length > 0},{ 'no-active': key.isClickActive === true},{ on: key.isOpenActive === true}]">
                                                                <span class="data">{{ key["Open_Count_vod__c"] }}</span>
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
                <template v-if="state.isScreen === '集計画面'">
                  <div @tap="onTapSortVisible('isHoverFlag7')" @mouseover="state.isHoverFlag7 = true" @mouseleave="state.isHoverFlag7 = false" class="content-footer" v-if="state.girdArry.length > 0">
                    <div class="content-footer-left"></div>

                    <div class="content-footer-right">
                      <div id="gridMemory" class="test3" style="display: flex; flex: 1; text-align: right">
                        <template v-for="(obj, index) in state.girdArry" :key="index"
                          ><div :style="state.style">
                            <span style="display: inline-flex"
                              ><span style="margin-left: 50%">{{ obj }}</span></span
                            >
                          </div></template>
                      </div>

                      <div class="content-footer-text">
                        <div class="content-footer-text2">
                          メール送付数
                             <template v-if="!Object.keys(state.sortObj.セカンド).includes('DATA')">
                      <div class="sort-button-data2" @tap="onTapSort" v-if="state.isHoverFlag7" data-sort="DATA">
                        <div class="sort-asc-data2" data-sort="DATA"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button-data2" @tap="onTapSort" data-sort="DATA">
                          <template v-if="state.sortObj.セカンド.DATA == 'ASC'">
                            <div class="sort-asc-data2" data-sort="DATA"></div>
                          </template>
                          <template v-if="state.sortObj.セカンド.DATA == 'DESC'">
                            <div class="sort-desc-data2" data-sort="DATA"></div>
                          </template>
                        </div>
                     </template>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="state.isScreen === '送付先詳細'">
                  <div  @tap="onTapSortVisible('isHoverFlag12')" @mouseover="state.isHoverFlag12 = true" @mouseleave="state.isHoverFlag12 = false" class="content-footer content-footer2" v-if="state.girdArry2.length > 0">
                    <div class="content-footer-left"></div>

                    <div class="content-footer-right">
                      <div id="gridMemory" class="test3" style="display: flex; flex: 1; text-align: right">
                        <template v-for="(obj, index) in state.girdArry2" :key="index"
                          ><div :style="state.style2">
                            <span style="display: inline-flex"
                              ><span style="margin-left: 50%">{{ obj }}</span></span
                            >
                          </div></template>
                      </div>

                      <div class="content-footer-text"><div class="content-footer-text2">
                          メール送付数
                             <template v-if="!Object.keys(state.sortObj2.セカンド).includes('DATA')">
                      <div class="sort-button-data2" @tap="onTapSort2" v-if="state.isHoverFlag12" data-sort="DATA">
                        <div class="sort-asc-data2" data-sort="DATA"></div>
                      </div>
                    </template>
                     <template v-else>
                      <div class="sort-button-data2" @tap="onTapSort2" data-sort="DATA">
                          <template v-if="state.sortObj2.セカンド.DATA == 'ASC'">
                            <div class="sort-asc-data2" data-sort="DATA"></div>
                          </template>
                          <template v-if="state.sortObj2.セカンド.DATA == 'DESC'">
                            <div class="sort-desc-data2" data-sort="DATA"></div>
                          </template>
                        </div>
                     </template>
                        </div></div>
                    </div>
                  </div>
                </template>
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
import { SelectBox, SelectBox3, Loading } from "@/components/presentational/organisms";
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
  testObj2: any;
  selectedObj: any;
  selectedFilterItems: {
    メール送付月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア?: any;
    Target?: any;
    フラグメント?: any;
     製品?: any;
  };
    selectedFilterItemsBK: {
    メール送付月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
      エリア?: any;
   Target?: any;
      フラグメント?: any;
 製品?: any;   
    };
    selectedFilterItemsBK2: {
    メール送付月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
      エリア?: any;
   Target?: any;
   フラグメント?: any;
    製品?: any;
  };  
  selectedFilterItems2: {
    メール送付月?: any;
    テリトリー名?: any;
    MR?: any;
    チャネル?: any;
    エリア?: any;
    Target?: any;
    フラグメント?: any;
     製品?: any;
  };
  selectedFilterItems3: {
    医師名?: any;
    施設名?: any;
    施設名2?: any;
    分類?: any;
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
   dataContentOrg3: any;
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
  selectFiliterCategory2: any;
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
  isHoverFlag21: boolean;
  isHoverFlag22: boolean;
  popupData: any;
  isScreen: any;
  activeDOM: any;
  id: any;
  name: any;
  sortObj: any;
  sortObj2: any;
  sortObj3: any;
  selectObj: any;
  selectObj2: any;
  isLoadComplete: boolean;
  dataNumber: any;
  date: any;
}

export default defineComponent({
  components: {
    SelectBox3,
    SelectBox2,
  },
  props: {
    id: {
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
          分類: "",
          sentDate: "",
          templateName: "",
          flagmentName: "",
           Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,
        },
      },
      selectObj2: {
        送付内容: {
          docter: "",
          分類: "",
          sentDate: "",
          templateName: "",
          flagmentName: "",
        },
      },
      sortObj: {
        営業部: "default",
        エリア: "default",
        セカンド: {
          DATA: "ASC",
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
        分類: "default",
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
        分類: {
          name: "分類",
          list: {
            すべて: "すべて",
          },
        },
      },

      testObj: {
        メール送付月: {
          name: "メール送付月",
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
         フラグメント: {
          name: "フラグメント",
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
        メール送付月: {
          name: "メール送付月",
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
        フラグメント: {
          name: "フラグメント",
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
        メール送付月: {
          name: "メール送付月",
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
         フラグメント: {
          name: "フラグメント",
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
        メール送付月: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア: ["すべて"],
        Target: ["すべて"],
        フラグメント: ["すべて"],
         製品: ["すべて"],
      },
      selectedFilterItemsBK: {
        メール送付月: [],
        テリトリー名: [],
        MR: [],
        チャネル: [],
        エリア: [],
        Target: [],
        フラグメント: [],
          製品: [],
      },
       selectedFilterItemsBK2: {
        メール送付月: [],
        テリトリー名: [],
        MR: [],
        チャネル: [],
        エリア: [],
         Target: [],
         フラグメント: [],
            製品: [],
      },
      selectedFilterItems2: {
        メール送付月: ["すべて"],
        テリトリー名: ["すべて"],
        MR: ["すべて"],
        チャネル: ["すべて"],
        エリア: ["すべて"],
        Target: ["すべて"],
          フラグメント: ["すべて"],
          製品: ["すべて"],
      },
      selectedFilterScreenItems: {
        画面: "集計画面",
      },
      selectedFilterItems3: {
        施設名: ["すべて"],
        施設名2: [],
        施設名BK: [],
        分類: ["すべて"],
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
      dataContentOrg3: [],
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
      selectFiliterCategory2: [],
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
      isHoverFlag22: false,
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
      isHoverFlag21: false,
      popupData: {},
      isScreen: "集計画面",
      activeDOM: [],
      id: null,
      name: null,
      isLoadComplete: true,
      dataNumber: 0,
      date:null,
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

    let emailList2
    let emailList3

    if (state.date === "newData") {
      emailList2 = Account.getsentEmailListByKeyNew(props.id);
    emailList3 = Account.getsentEmailList2ByKeyNew(props.id);
    } else {
      emailList2 = Account.getsentEmailListByKey(props.id);
    emailList3 = Account.getsentEmailList2ByKey(props.id);
    }

    

    const accountList = Account.getsentEmailAccountList;

    state.selectedObj.医師名.list = Object.fromEntries(accountList.map(c => [c, c]));
    state.selectedFilterItems3.医師名 = accountList
    state.selectedObj.医師名.list["すべて"] = "すべて"
    state.selectedFilterItems3.医師名.unshift( "すべて")

    // for (const element of accountList) {
    //   if (!state.selectedObj.医師名.list[element]) {
    //     state.selectedObj.医師名.list[element] = element;
    //     state.selectedFilterItems3.医師名.push(element);
    //   }
    // }

    state.data = computed(() => {
      const result = [];
      const result3 = [];

      

      const emailList = { ...emailList2 };
      console.log('emailList');
      
      console.log(emailList);
      

      for (const key in emailList2) {

            if (state.selectFiliterCategory.includes('エリア')) {
               if (!state.selectedFilterItemsBK2.エリア.includes(key)) {
              continue
            }
        } else {
            
            if (!state.selectedFilterItems.エリア.includes("すべて")) {
            if (!state.selectedFilterItems.エリア.includes(key)) {
              continue
            }
        } 
            }
 
          
        for (const key2 in emailList[key]) {

                  if (state.selectFiliterCategory.includes('テリトリー名')) {
               if (!state.selectedFilterItemsBK2.テリトリー名.includes(key2)) {
              continue
            }
        } else {
            
                if (!state.selectedFilterItems.テリトリー名.includes("すべて")) {
            if (!state.selectedFilterItems.テリトリー名.includes(key2)) {
              continue
            }
        }  
            }


   

        

          for (const key3 in emailList[key][key2]) {
            
            let obj = {};
            let dataObj = [];
            let dataObj2 = {};
            let dataObj3 = [];
            let Targets = []
            let flagments = []
             let produts = []


         if (state.selectFiliterCategory.includes('MR')) {
               if (!state.selectedFilterItemsBK2.MR.includes(key3)) {
              continue
            }
        } else {
            
          if (!state.selectedFilterItems.MR.includes("すべて")) {
            if (!state.selectedFilterItems.MR.includes(key3)) {
              continue
            }
              }
            }
             

     

          

         
        

            for (const element in emailList[key][key2][key3]) {

                        

              if (!emailList[key][key2][key3][element].Dr_name) {
                emailList[key][key2][key3][element].Dr_name = "NULL"
              }

               
                

              if (state.selectedFilterItems.メール送付月.includes("すべて")) {
                
                if (state.selectedFilterItems.Target.includes("すべて")) {
                 

                  if (state.selectedFilterItems.フラグメント.includes("すべて")) { 

                    if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }

                   
                  } else {

                    if (state.selectedFilterItems.フラグメント.includes(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])) { 
                      if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                    }
                    
                  }
                  
                 
                } else {
                  if (state.selectedFilterItems.Target.includes(emailList[key][key2][key3][element]["Target"])) {
                   
                    if (state.selectedFilterItems.フラグメント.includes("すべて")) { 
                    if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                       }


                    }
                  } else {

                      if (state.selectedFilterItems.フラグメント.includes(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])) { 
                if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                    }
                    
                  }
                  }
                }

                 
                   
              } else {
                if (state.selectedFilterItems.メール送付月.includes(dayjs(emailList[key][key2][key3][element].Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/M"))) {
                 
                  if (state.selectedFilterItems.Target.includes("すべて")) {
                   

                  
                    if (state.selectedFilterItems.フラグメント.includes("すべて")) { 
   if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {
 if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                       }


                    }
                  } else {

                      if (state.selectedFilterItems.フラグメント.includes(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])) { 
                     if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    } 
                    }
                    
                    }
                  } else {
                    if (state.selectedFilterItems.Target.includes(emailList[key][key2][key3][element]["Target"])) {
                
                    

                     
                      if (state.selectedFilterItems.フラグメント.includes("すべて")) { 
                 if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                  } else {

                        if (state.selectedFilterItems.フラグメント.includes(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])) { 
                   if (state.selectedFilterItems.製品.includes("すべて")) { 

                        Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                      flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                     
                    } else {
                      if (state.selectedFilterItems.製品.includes(emailList[key][key2][key3][element]["prodcut1"])) {

                      Targets.push(emailList[key][key2][key3][element]["Target"])
                    dataObj.push(emailList[key][key2][key3][element]);
                     flagments.push(emailList[key][key2][key3][element]["Email_Fragments_vod__r.Name"])
                      produts.push(emailList[key][key2][key3][element]["prodcut1"])
                       }


                    }
                    }
                    
                      }
                    }
                }  
                }
              }

              //       if (state.selectedFilterItems.メール送付月.includes("すべて")) {
              //   if (emailList[key][key2][key3][element]["Dr_DCF"] || emailList[key][key2][key3][element]["Dr_Target_Status"]) {
              //     dataObj.push(emailList[key][key2][key3][element]);
              //   }
              // } else {
              //   if (state.selectedFilterItems.メール送付月.includes(dayjs(emailList[key][key2][key3][element].Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/M"))) {
              //     if (emailList[key][key2][key3][element]["Dr_DCF"] || emailList[key][key2][key3][element]["Dr_Target_Status"]) {
              //       dataObj.push(emailList[key][key2][key3][element]);
              //     }
              //   }
              // }

            }

            Targets = [...new Set(Targets)];
            flagments = [...new Set(flagments)];
             produts = [...new Set(produts)];
             
            

            

            const rec = {
              営業部: props.id,
              エリア: key,
              テリトリー名: key2,
              MR: key3,
              data: dataObj,
              dataOrg: dataObj,
              dataDetail: dataObj3,
              dataDetail2: dataObj3,
              Total: dataObj.length,
              Target: Targets,
              "Email_Fragments_vod__r.Name": flagments, 
              "prodcut1": produts,               
            };
            if (Targets.length > 0) {
               result3.push(rec);
            }
           
          }
        }
      }
      

      console.log(result3);

      return result3
       
        
        .sort((a, b) => {
          if (state.isScreen === "集計画面") {
            if (state.sortObj["エリア"] == "default") {
              if (a.エリア > b.エリア) return 1;
              if (a.エリア < b.エリア) return -1;
            } else if (state.sortObj["エリア"] == "ASC") {
              if (a.エリア > b.エリア) return 1;
              if (a.エリア < b.エリア) return -1;
            } else if (state.sortObj["エリア"] == "DESC") {
              if (a.エリア > b.エリア) return -1;
              if (a.エリア < b.エリア) return 1;
            }

            if (Object.values(state.sortObj["セカンド"]).length > 0) {
              if (state.sortObj["セカンド"]["DATA"] == "ASC") {
                if (a.Total > b.Total) return -1;
                if (a.Total < b.Total) return 1;
              } else if (state.sortObj["セカンド"]["DATA"] == "DESC") {
                if (a.Total > b.Total) return 1;
                if (a.Total < b.Total) return -1;
              }

              if (state.sortObj["セカンド"]["テリトリー名"] == "ASC") {
                if (a.テリトリー名 > b.テリトリー名) return 1;
                if (a.テリトリー名 < b.テリトリー名) return -1;
              } else if (state.sortObj["セカンド"]["テリトリー名"] == "DESC") {
                if (a.テリトリー名 > b.テリトリー名) return -1;
                if (a.テリトリー名 < b.テリトリー名) return 1;
              }

              if (state.sortObj["セカンド"]["MR"] == "ASC") {
                if (a.MR > b.MR) return 1;
                if (a.MR < b.MR) return -1;
              } else if (state.sortObj["セカンド"]["MR"] == "DESC") {
                if (a.MR > b.MR) return -1;
                if (a.MR < b.MR) return 1;
              }
            } else {
              if (a.テリトリー名 > b.テリトリー名) return 1;
              if (a.テリトリー名 < b.テリトリー名) return -1;
            }
          }

          // if (state.sortObj['MR'] == 'ASC') {
          //    if (a.MR > b.MR) return 1
          //     if (a.MR < b.MR) return -1
          //   } else if (state.sortObj['MR'] == 'DESC') {
          //      if (a.MR > b.MR) return -1
          //     if (a.MR < b.MR) return 1
          //    }
        });
    })

    let dataCont2

     if (state.date === "newData") {
      dataCont2 = computed(() => Account.getsentEmailListContentByKeyNew(props.id))
    } else {
    dataCont2 = computed(() => Account.getsentEmailListContentByKey(props.id))
    }


    state.dataCont = computed(() => {
      const result3 = [];

      let dataObj2 = {};

      if (state.isScreen === "送付内容") {

        type GenericObject = { [key: string]: any };

        const getDiff = (
  before: GenericObject,
  after: GenericObject,
): GenericObject => {
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  return Array.from(allKeys).reduce<GenericObject>((diff, key) => {
    if (before[key] !== after[key]) {
      diff[key] =  key in after ? after[key] : before[key];
    }
    return diff;
  }, {});
};
        

      for (const element of emailList3) {

                  
        if (!element.Dr_name) {
               element.Dr_name = "NULL"
              }
           
        if (Object.values(state.selectObj["送付先詳細"]["Value"]).length > 0) {
          if (element.MR !== state.selectObj["送付先詳細"]["MR"]) {
            continue
          }
                    if (element[state.selectObj["送付先詳細"]["Category"]] !== state.selectObj["送付先詳細"]["Value"]) {
                      continue;
                    }
                  }

                   let sentDate = dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD")

                    if (sentDate === "Invalid Date") {
                      sentDate = "NULL"
                    }


                    
          
                  if (!dataObj2[element["Dr_name"]]) {
                    dataObj2[element["Dr_name"]] = {}
                  }


                  if (!dataObj2[element["Dr_name"]][sentDate]) {
                    dataObj2[element["Dr_name"]][sentDate] = {}
                  }

                  let templateName = element["Approved_Email_Template_vod__r.Name"]
                  
                  
                   if (!dataObj2[element["Dr_name"]][sentDate][templateName]) {
                    dataObj2[element["Dr_name"]][sentDate][templateName] = {}
                   }

                    let FragmentsName = element["Email_Fragments_vod__r.Name"]

                      if (!dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName]) {
                    dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName] = {}
                   }



                  let Last_Open_Date_vod__c = dayjs(element["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")
                  if (Last_Open_Date_vod__c === "Invalid Date") {
                      Last_Open_Date_vod__c = "NULL"
                    }

                  if (!dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c]) {
                    dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c] = {}
                  }

                  let Last_Click_Date_vod__c = dayjs(element["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")
                   if (Last_Click_Date_vod__c === "Invalid Date") {
                      Last_Click_Date_vod__c = "NULL"
                    }
                   

                    if (!dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c]) {
                    dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c] = [];
                   }                  

                  if (dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c].length === 0) {
                     dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c].push(element)
                    if (state.selectedFilterItems.メール送付月.includes("すべて")) {
                      
                       result3.push(element);
                    }
                   else {
                if (state.selectedFilterItems.メール送付月.includes(dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/M"))) {
                    result3.push(element);
                }
              }
                   
                  } else {
                     const diff = getDiff(dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c][0], element)
                      // console.log(Object.keys(diff));
                     for (const element2 of Object.keys(diff)) {
                      if (element2 === "dataNumber" || element2 === "Id" || element2 === "Account_vod__c" || element2 === "CSLB_National_ID_1__c"|| element2 === "Email_Sent_Date_vod__c"|| element2 === "isClickActive"|| element2 === "isOpenActive"|| element2 === "CreatedDate"|| element2 === "isActive") {
                        continue
                      }
                      
                      // console.log( dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c][0][element2]);
                      
                      dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c][0][element2] = "*"
                     } 
                    
                    
                   
                    // element.MR = "✳️"
                    // dataObj2[element["Dr_name"]][sentDate][templateName][FragmentsName][Last_Open_Date_vod__c][Last_Click_Date_vod__c]
                  }





      }
          

      }
      

      
      console.log(result3);

      return result3
       .filter((x) => {
            if (state.selectedFilterItems3.医師名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.医師名.includes(x.Dr_name);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems3.施設名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.施設名.includes(x.HP_name);
            }
          })
           .filter((x) => {
            if (state.selectedFilterItems3.分類.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.分類.includes(x.分類);
            }
          })
           .filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.Target.includes(
                x.Target
              );
            }
           })
          .sort((a, b) => {
          if (state.sortObj3["医師名"] == "default") {
            if (accountList.indexOf(a.Dr_name) > accountList.indexOf(b.Dr_name)) return 1;
            if (accountList.indexOf(a.Dr_name) < accountList.indexOf(b.Dr_name)) return -1;
          } else if (state.sortObj3["医師名"] == "ASC") {
            if (a["Dr_name"] > b["Dr_name"]) return 1;
            if (a["Dr_name"] < b["Dr_name"]) return -1;
          } else if (state.sortObj3["医師名"] == "DESC") {
            if (a["Dr_name"] > b["Dr_name"]) return -1;
            if (a["Dr_name"] < b["Dr_name"]) return 1;
          }

          if (state.sortObj3["分類"] == "default") {
            if (accountList.indexOf(a.分類) > accountList.indexOf(b.分類)) return 1;
            if (accountList.indexOf(a.分類) < accountList.indexOf(b.分類)) return -1;
          } else if (state.sortObj3["分類"] == "ASC") {
            if (a["分類"] > b["分類"]) return 1;
            if (a["分類"] < b["分類"]) return -1;
          } else if (state.sortObj3["分類"] == "DESC") {
            if (a["分類"] > b["分類"]) return -1;
            if (a["分類"] < b["分類"]) return 1;
          }

          if (state.sortObj3["メール送付日"] == "default") {
            if (!a.Email_Sent_Date_vod__c) return 1;
            if (!b.Email_Sent_Date_vod__c) return -1;

            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") > dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return -1;
            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") < dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return 1;
          } else if (state.sortObj3["メール送付日"] == "ASC") {
            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") > dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return 1;
            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") < dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return -1;
          } else if (state.sortObj3["メール送付日"] == "DESC") {
            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") > dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return -1;
            if (dayjs(a.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD") < dayjs(b.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD")) return 1;
          }

          if (state.sortObj3["メールテンプレート"] == "default") {
            if (a["Approved_Email_Template_vod__r.Name"] > b["Approved_Email_Template_vod__r.Name"]) return 1;
            if (a["Approved_Email_Template_vod__r.Name"] < b["Approved_Email_Template_vod__r.Name"]) return -1;
          } else if (state.sortObj3["メールテンプレート"] == "ASC") {
           const firstKeySortResult = a["Approved_Email_Template_vod__r.Name"].localeCompare(b["Approved_Email_Template_vod__r.Name"], "ja");

              if (firstKeySortResult !== 0) {
                return firstKeySortResult;
              } 

          } else if (state.sortObj3["メールテンプレート"] == "DESC") {
             const firstKeySortResult = b["Approved_Email_Template_vod__r.Name"].localeCompare(a["Approved_Email_Template_vod__r.Name"], "ja");

              if (firstKeySortResult !== 0) {
                return firstKeySortResult;
              } 
          }

           if (state.sortObj3["フラグメント"] == "default") {
           
            if (a["Email_Fragments_vod__r.Name"] && b["Email_Fragments_vod__r.Name"]) {
              const firstKeySortResult = a["Email_Fragments_vod__r.Name"].localeCompare(b["Email_Fragments_vod__r.Name"], "ja");

              if (firstKeySortResult !== 0 && a["Email_Fragments_vod__r.Name"] !== "NULL") {
                return firstKeySortResult;
              } 

            // if (a["Email_Fragments_vod__r.Name"] == "NULL") return -1;
            // if (b["Email_Fragments_vod__r.Name"] == "NULL") return 1;
            }

            

            

          } else if (state.sortObj3["フラグメント"] == "ASC") {
            const firstKeySortResult = a["Email_Fragments_vod__r.Name"].localeCompare(b["Email_Fragments_vod__r.Name"], "ja");

              if (firstKeySortResult !== 0 && a["Email_Fragments_vod__r.Name"]) {
                return firstKeySortResult;
              } 

          } else if (state.sortObj3["フラグメント"] == "DESC") {
            const firstKeySortResult = b["Email_Fragments_vod__r.Name"].localeCompare(a["Email_Fragments_vod__r.Name"], "ja");

              if (firstKeySortResult !== 0 && a["Email_Fragments_vod__r.Name"]) {
                return firstKeySortResult;
              } 
          }

          if (Object.values(state.sortObj3["セカンド"]).length > 0) {
            if (state.sortObj3["セカンド"]["最終開封日時"] == "ASC") {
              
            if (!a.Last_Open_Date_vod__c) return 1;
            if (!b.Last_Open_Date_vod__c) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;

            } else if (state.sortObj3["セカンド"]["最終開封日時"] == "DESC") { 
               if (!a.Last_Open_Date_vod__c) return -1;
            if (!b.Last_Open_Date_vod__c) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            }

             if (state.sortObj3["セカンド"]["最終クリック日時"] == "ASC") {
              
            
            
            if (dayjs(a.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;   
            
            
            } else if (state.sortObj3["セカンド"]["最終クリック日時"] == "DESC") { 
              
         
            if (dayjs(a.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            if (dayjs(a.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Click_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;   
           
             
               
          
            }

              if (state.sortObj3["セカンド"]["クリック回数"] == "ASC") {
              
            
            
            if (a.Click_Count_vod__c > b.Click_Count_vod__c ) return -1;
            if (a.Click_Count_vod__c < b.Click_Count_vod__c) return 1;
             if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;   
            
            
            } else if (state.sortObj3["セカンド"]["クリック回数"] == "DESC") { 
              
         
            if (a.Click_Count_vod__c > b.Click_Count_vod__c ) return 1;
            if (a.Click_Count_vod__c < b.Click_Count_vod__c) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;     
           
             
               
          
            }

             if (state.sortObj3["セカンド"]["開封回数"] == "ASC") {
              
            
            
            if (a.Open_Count_vod__c > b.Open_Count_vod__c ) return -1;
            if (a.Open_Count_vod__c < b.Open_Count_vod__c) return 1;
             if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;   
            
            
            } else if (state.sortObj3["セカンド"]["開封回数"] == "DESC") { 
              
         
            if (a.Open_Count_vod__c > b.Open_Count_vod__c ) return 1;
            if (a.Open_Count_vod__c < b.Open_Count_vod__c) return -1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;     
           
             
               
          
            }


           
          } else {
                                     
            if (!a.Last_Open_Date_vod__c) return -1;
            if (!b.Last_Open_Date_vod__c) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") > dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return 1;
            if (dayjs(a.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") < dayjs(b.Last_Open_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss")) return -1;
          }

          return 0;
        });
          
    })



    console.log(state.data);
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

      state.iScrollObj.on(
        "scroll",

        updatePosition
      );


      if (state.isScreen !== "送付内容") {
        const itemParent = document.querySelector("#gridMemory");

        const items3 = document.querySelectorAll(".gridnone");
        for (const item of items3) {
          item.classList.remove("gridnone");
        }
      if (itemParent) {
         const items = itemParent.children;
      const item = itemParent.lastElementChild;
        const itemChild = item.lastElementChild;
    
      

      const childWidth = item.clientWidth * items.length
        console.log(itemParent.clientWidth);
    console.log(childWidth);
      
      
      const itemPostion = childWidth + (itemChild.clientWidth / 2) 
      console.log(itemPostion);

      if (itemParent.clientWidth < itemPostion ) {
         itemChild.lastElementChild.classList.add('gridnone')
      } else {
         itemChild.lastElementChild.classList.remove('gridnone')
      }

      }
      }



    });

    const updatePosition = async () => {
      state.isHoverFlag = false;

      if (state.isScreen === "送付内容") {
        if (state.dataContentOrg.length !== state.dataContentOrg2.length) {
          if (state.iScrollObj.maxScrollY + 200 >= state.iScrollObj.y) {
            state.iScrollObj.disable();
            ApplicationStore.isLoadComplete = false;

            setTimeout(async () => {
              creatData(state.data,true);
            }, 1);

            // ApplicationStore.isLoadComplete = false
          }
        }
      }
    };

    onUpdated(async () => {

      if (state.isScreen !== "送付内容") {
        const itemParent = document.querySelector("#gridMemory");

        const items3 = document.querySelectorAll(".gridnone");
        for (const item of items3) {
          item.classList.remove("gridnone");
        }
      if (itemParent) {
         const items = itemParent.children;
      const item = itemParent.lastElementChild;
        const itemChild = item.lastElementChild;
    
      

      const childWidth = item.clientWidth * items.length
        console.log(itemParent.clientWidth);
    console.log(childWidth);
      
      
      const itemPostion = childWidth + (itemChild.clientWidth / 2) 
      console.log(itemPostion);

      if (itemParent.clientWidth < itemPostion ) {
         itemChild.lastElementChild.classList.add('gridnone')
      } else {
         itemChild.lastElementChild.classList.remove('gridnone')
      }

      }
      }
      
      console.log("onUpdated");

      await nextTick();
       ApplicationStore.isLoadComplete = true;
      

      // state.isLoadComplete = false
      setTimeout(() => {
        if (state.iScrollObj) {
          state.iScrollObj.enable();
          state.iScrollObj.refresh();
        }
       
      }, 500);
    });

    const onResize = async () => {
      if (state.isScreen === "送付内容") {
        return;
      }

      const windowSize = window.innerWidth;

      let totalArray = [];
      

      if (state.isScreen === "集計画面") 
      {
        totalArray = state.data.map((p) => p["Total"]).filter((v) => v);
      } else if (state.isScreen === "送付先詳細") {

        let emailList2 = dataCont2.value
        console.log(emailList2);
        
        const totalArray2 = emailList2
          .flat(2)
          .filter((x) => {
           if (Object.values(state.selectObj["集計画面"]["Value"]).length > 0) {
              if (x[state.selectObj["集計画面"]["Category"]] === state.selectObj["集計画面"]["Value"]) {
                return true
              }
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.メール送付月.includes("すべて")) {
                return true
              } else {
               return state.selectedFilterItems.メール送付月.includes(dayjs(x.Email_Sent_Date_vod__c2).format("YYYY/M"))
             }
          })
           .filter((x) => {
            if (state.selectedFilterItems.MR.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.MR.includes(x.MR);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.エリア.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.エリア.includes(x.エリア);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.テリトリー名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.テリトリー名.includes(
                x.テリトリー名
              );
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.Target.includes(
                x.Target
              );
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems3.医師名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.医師名.includes(x.Dr_name);
            }
          })
           .filter((x) => {
            if (state.selectedFilterItems3.分類.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.分類.includes(x.分類);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems3.施設名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.施設名.includes(x.HP_name);
            }
          })
        let dataObj2 = {};
        for (const element of totalArray2) {

          if (!dataObj2[element["MR"].trim()]) {
              dataObj2[element["MR"].trim()] = {}
            }

          if (!dataObj2[element["MR"].trim()][element["HP_name"].trim()]) {
              dataObj2[element["MR"].trim()][element["HP_name"].trim()] = {}
          }
            
            if (!dataObj2[element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()]) {
              dataObj2[element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()] = []
            }

            dataObj2[element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()].push(element);  


           

          // if (dataObj2[element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()]) {
         
          
          
          
           
          // }

          

         
            
        }

         const totalArray3 = [];

        for (const key in dataObj2) {
         for (const key2 in dataObj2[key]) {
           for (const key3 in dataObj2[key][key2]) {

            console.log(dataObj2[key][key2][key3]);
            

             const totals = dataObj2[key][key2][key3].map((p) => p["Id"])
      
             
             const sum = totals.reduce((sum, num) => Number(sum) + Number(num), 0);
             for (const element of dataObj2[key][key2][key3]) {

      // if (element.Dr_name === "NULL") {
      //       continue;
      // }
              
         element.Total = sum

        
      totalArray3.push(element.Total);  }   
          
         }
         }
        }

        



        console.log([state.selectObj["集計画面"]["Category"]] );
        

        totalArray = totalArray3;
      }

      let maxIndex80;

      let girdNum;

      if (state.isScreen === "集計画面" || state.isScreen === "送付先詳細") {
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

        if (state.isScreen === "集計画面") {
          state.girdArry = [];

          for (let index = girdNumPulus; index <= maxIndexCe; index += girdNumPulus) {
            state.girdArry.push(index);
          }

          state.style = {
            width: `calc(100% / ${girdNum})`,
          };

          const targetList = [...state.data];
          

          const rankObj = {};
          for (const element of targetList) {
            element["ratio"] = {
              "--size": `calc( ${(element["Total"] / maxIndex80) * 100} / 100 )`,
              "background-size": `calc(100% / ${girdNum}) 100%`,
            };

            if (element.Total === 0) {
              continue;
            }

            if (!rankObj["data"]) {
              rankObj["data"] = {};
            }

            if (!rankObj["dataArray"]) {
              rankObj["dataArray"] = [];
            }

            if (!rankObj["data"][element.営業部]) {
              rankObj["data"][element.営業部] = {};
            }

            if (!rankObj["data"][element.営業部][element.エリア]) {
              rankObj["data"][element.営業部][element.エリア] = {};
            }

            if (!rankObj["data"][element.営業部][element.エリア][element.テリトリー名]) {
              rankObj["data"][element.営業部][element.エリア][element.テリトリー名] = {};
            }

            if (!rankObj["data"][element.営業部][element.エリア][element.テリトリー名][element.MR]) {
              rankObj["data"][element.営業部][element.エリア][element.テリトリー名][element.MR];
            }

            rankObj["dataArray"].push(element);

            rankObj["data"][element.営業部][element.エリア][element.テリトリー名][element.MR] = element;
          }

          state.data2 = Object.entries(rankObj)
            .map(([key, value]) => ({ [key]: value }))
            .reverse();
        }

        if (Object.values(state.selectObj["集計画面"]["Value"]).length > 0 && state.isScreen === "送付先詳細") {
          state.girdArry2 = [];

          for (let index = girdNumPulus; index <= maxIndexCe; index += girdNumPulus) {
            state.girdArry2.push(index);
          }

          state.style2 = {
            width: `calc(100% / ${girdNum})`,
          };

          const rankObj2 = {};
          const rankObj3 = {};

        let emailList2 = dataCont2.value
        console.log(emailList2);
        

          let totalArray2 = emailList2
          
            .flat(2)
            .filter((x) => {
           if (Object.values(state.selectObj["集計画面"]["Value"]).length > 0) {
              if (x[state.selectObj["集計画面"]["Category"]] === state.selectObj["集計画面"]["Value"]) {
                return true
              }
            }
            })
         .filter((x) => {
            if (state.selectedFilterItems.メール送付月.includes("すべて")) {
                return true
              } else {
               return state.selectedFilterItems.メール送付月.includes(dayjs(x.Email_Sent_Date_vod__c2).format("YYYY/M"))
             }
          })
           .filter((x) => {
            if (state.selectedFilterItems.MR.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.MR.includes(x.MR);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.エリア.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.エリア.includes(x.エリア);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.テリトリー名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.テリトリー名.includes(
                x.テリトリー名
              );
            }
          })
            .filter((x) => {
            if (state.selectedFilterItems.Target.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.Target.includes(
                x.Target
              );
            }
            })
         .filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                x["Email_Fragments_vod__r.Name"]
              );
            }
          }) .filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                x["prodcut1"]
              );
            }
          })  
            .filter((x) => {
              if (state.selectedFilterItems3.医師名.includes("すべて")) {
                return true;
              } else {
                return state.selectedFilterItems3.医師名.includes(x.Dr_name);
              }
            })
             .filter((x) => {
            if (state.selectedFilterItems3.分類.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.分類.includes(x.分類);
            }
          })
            .filter((x) => {
              if (state.selectedFilterItems3.施設名.includes("すべて")) {
                return true;
              } else {
                return state.selectedFilterItems3.施設名.includes(x.HP_name);
              }
            })
            .sort((a, b) => {
              if (state.sortObj2["MR"] == "default") {
                const firstKeySortResult = a["MR"].localeCompare(b["MR"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
              } else if (state.sortObj2["MR"] == "ASC") {
                if (a["MR"] > b["MR"]) return 1;
                if (a["MR"] < b["MR"]) return -1;
              } else if (state.sortObj2["MR"] == "DESC") {
                if (a["MR"] > b["MR"]) return -1;
                if (a["MR"] < b["MR"]) return 1;
              }

              if (state.sortObj2["施設名"] == "default") {
                const firstKeySortResult = a["HP_name"].localeCompare(b["HP_name"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
              } else if (state.sortObj2["施設名"] == "ASC") {
               if (a["HP_name"] > b["HP_name"]) return 1;
                if (a["HP_name"] < b["HP_name"]) return -1;
              } else if (state.sortObj2["施設名"] == "DESC") {
                if (a["HP_name"] > b["HP_name"]) return -1;
                if (a["HP_name"] < b["HP_name"]) return 1;  
              }

           

              // if (state.sortObj["セカンド"]["DATA"] == "ASC") {
              //   if (a.Total > b.Total) return -1;
              //   if (a.Total < b.Total) return 1;
              // } else if (state.sortObj["セカンド"]["DATA"] == "DESC") {
              //   if (a.Total > b.Total) return 1;
              //   if (a.Total < b.Total) return -1;
              // }

              if (Object.values(state.sortObj2["セカンド"]).length > 0) {



                if (state.sortObj2["セカンド"]["医師名"] == "ASC") {
                  if (a["Dr_name"] > b["Dr_name"]) return 1;
                  if (a["Dr_name"] < b["Dr_name"]) return -1;
                } else if (state.sortObj2["セカンド"]["医師名"] == "DESC") {
                  if (a["Dr_name"] > b["Dr_name"]) return -1;
                  if (a["Dr_name"] < b["Dr_name"]) return 1;
                }

                if (state.sortObj2["セカンド"]["分類"] == "ASC") {
                  if (a["分類"] > b["分類"]) return 1;
                  if (a["分類"] < b["分類"]) return -1;
                } else if (state.sortObj2["セカンド"]["分類"] == "DESC") {
                  if (a["分類"] > b["分類"]) return -1;
                  if (a["分類"] < b["分類"]) return 1;
                }

                if (state.sortObj2["セカンド"]["DATA"] == "ASC") {
                  if (a["Total"] > b["Total"]) return -1;
                  if (a["Total"] < b["Total"]) return 1;
                } else if (state.sortObj2["セカンド"]["DATA"] == "DESC") {
                  if (a["Total"] > b["Total"]) return 1;
                  if (a["Total"] < b["Total"]) return -1;
                }
              } else {

                const firstKeySortResult = a["Dr_name"].localeCompare(b["Dr_name"], "ja");

                if (firstKeySortResult !== 0) {
                  return firstKeySortResult;
                }
                


              }

             
              return 0;
            });
            console.log("totalArray2");
            
            console.log(totalArray2);
            

          for (const element2 of totalArray2) {
            // if (element2.Dr_name === "NULL") {
            //   continue;
            // }

            if (!rankObj2["data"]) {
              rankObj2["data"] = {};
            }

            if (!rankObj2["data"][element2.MR]) {
              rankObj2["data"][element2.MR] = {};
            }

            if (!rankObj2["data"][element2.MR][element2.HP_name]) {
              rankObj2["data"][element2.MR][element2.HP_name] = {};
            }

            if (!rankObj2["data"][element2.MR][element2.HP_name][element2.Dr_name]) {
              rankObj2["data"][element2.MR][element2.HP_name][element2.Dr_name];
            }

            rankObj2["data"][element2.MR][element2.HP_name][element2.Dr_name] = {
              MR: element2.MR,
              HP_name: element2.HP_name,
              Dr_name: element2.Dr_name,
              分類:element2.分類,
              Total: element2.Total,
              Target: element2.Target,
              "Email_Fragments_vod__r.Name": element2["Email_Fragments_vod__r.Name"],
              ratio: {
                "--size": `calc( ${(element2.Total / maxIndex80) * 100} / 100 )`,
                "background-size": `calc(100% / ${girdNum}) 100%`,
              },
            };
          }


           let totalArray3 = emailList2
          
            .flat(2)
            .filter((x) => {
           if (Object.values(state.selectObj["集計画面"]["Value"]).length > 0) {
              if (x[state.selectObj["集計画面"]["Category"]] === state.selectObj["集計画面"]["Value"]) {
                return true
              }
            }
            })
         .filter((x) => {
            if (state.selectedFilterItems.メール送付月.includes("すべて")) {
                return true
              } else {
               return state.selectedFilterItems.メール送付月.includes(dayjs(x.Email_Sent_Date_vod__c2).format("YYYY/M"))
             }
          })
           .filter((x) => {
            if (state.selectedFilterItems.MR.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.MR.includes(x.MR);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.エリア.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.エリア.includes(x.エリア);
            }
          })
          .filter((x) => {
            if (state.selectedFilterItems.テリトリー名.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.テリトリー名.includes(
                x.テリトリー名
              );
            }
          })
            .filter((x) => {
              if (state.selectedFilterItems3.医師名.includes("すべて")) {
                return true;
              } else {
                return state.selectedFilterItems3.医師名.includes(x.Dr_name);
              }
            })
             .filter((x) => {
            if (state.selectedFilterItems3.分類.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems3.分類.includes(x.分類);
            }
          })
            .filter((x) => {
              if (state.selectedFilterItems3.施設名.includes("すべて")) {
                return true;
              } else {
                return state.selectedFilterItems3.施設名.includes(x.HP_name);
              }
            })

          state.dataDetailOrg = [...totalArray3]

          state.dataDetail = Object.entries(rankObj2)
            .map(([key, value]) => ({ [key]: value }))
            .reverse();

       

          creatDataFacility(totalArray2);
          creatDataKinds(totalArray2);

         
          console.log('state.dataDetail');
          
          console.log(state.dataDetail);
          console.log(state.dataDetailOrg);
          
          
        }
      }
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

    const onTapSelectBoxItemScreen = async (_obj) => {
      state.iScrollObj.scrollTo(0, 0, 0);

      let targetData

      state.selectedFilterScreenItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

      state.isScreen = _obj.selectedValue;

      let data = []

      if (_obj.selectedValue === "送付先詳細") {
        if (Object.values(state.selectObj["集計画面"]["Value"]).length > 0) {
          creatData(state.data,false);
        }
        await nextTick()
        const item2 = document.querySelectorAll("#my-chart2 .call-list-data-item.no-active");
        const items3 = document.querySelector("#my-chart2 .call-list-data-item.on");
        const items = document.querySelector("#my-chart .call-list-title.on");
        
        if (!items3 && item2.length > 0) {
         for (const item of item2) {
            item.classList.remove("no-active");
          }
        }

        if (items) {
        
          
          const item = items.parentElement.querySelectorAll(".call-list-data-item");
         
          
          for (const e of item) {
            if (!e.classList.contains('on')) {
              e.classList.add("on");
            }
            
          }

       
  
        }

   data = state.dataDetailOrg

 

        
      } else if (_obj.selectedValue === "送付内容") {
        if (state.dataContent.length === 0 && Object.values(state.selectObj["送付先詳細"]["Value"]).length === 0) {
          creatData(state.data,false);
        }
      } else if (_obj.selectedValue === "集計画面") {
        targetData = state.selectedFilterItems
        creatData(state.data, false);
        await nextTick()
        const item2 = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        const items3 = document.querySelector("#my-chart .call-list-data-item.on");
        const items = document.querySelector("#my-chart .call-list-title.on");

        if (!items3 && item2.length > 0) {
         for (const item of item2) {
            item.classList.remove("no-active");
          }

 
        }
        


        if (items) {
        
          
          const item = items.parentElement.querySelectorAll(".call-list-data-item");
         
          
          for (const e of item) {
            if (!e.classList.contains('on')) {
              e.classList.add("on");
            }
            
          }

                   const item4 = document.querySelectorAll("#my-chart .call-list-data-item");
          console.log("item4");
          
          console.log(item4);
          
             for (const e of item4) {
               if (!e.classList.contains('on') && !e.classList.contains('no-active')) {
           console.log(e);
              
              e.classList.add("no-active");
            }
            
          }

  

  
        }

        data = state.dataOrg
        
      }

      console.log( state.selectedFilterItems["フラグメント"]);

      let data2

       if (_obj.selectedValue === "集計画面") {
      data2 = data
     } else {
     data2 = data.filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
      }) 
     }
          
         state.testObj["フラグメント"].list = {
              すべて: "すべて",
          };


          if (state.selectFiliterCategory.includes("フラグメント")) {
            state.selectedFilterItems2["フラグメント"] = state.selectedFilterItems["フラグメント"];
             creatDataFlagment(data2, "goScreen");
          } else {
             state.selectedFilterItems["フラグメント"] = ["すべて"]
            creatDataFlagment(data2, false);
          }

               if (_obj.selectedValue === "集計画面") {
      data2 = data
     } else {
       data2 = data.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          })
     }

          


          

           state.testObj["製品"].list = {
              すべて: "すべて",
          };


          if (state.selectFiliterCategory.includes("製品")) {
            state.selectedFilterItems2["製品"] = state.selectedFilterItems["製品"];
             creatDataProduct(data2, "goScreen");
          } else {
             state.selectedFilterItems["製品"] = ["すべて"]
            creatDataProduct(data2, false);
          }


                   if (_obj.selectedValue === "集計画面") {
      data2 = data
     } else {
       data2 = data.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
      }) 
     }

          


          

           state.testObj["Target"].list = {
              すべて: "すべて",
          };


          if (state.selectFiliterCategory.includes("Target")) {
            state.selectedFilterItems2["Target"] = state.selectedFilterItems["Target"];
             creatDataTarget(data2, "goScreen");
          } else {
             state.selectedFilterItems["Target"] = ["すべて"]
            creatDataTarget(data2, false);
          }

          
        
     
      console.log(state.selectedFilterItems);
      console.log(state.selectedFilterItems2);
        
          

  //     for (const element in state.selectedFilterItems) {
  //         if (element === "チャネル" || element === "メール送付月" ) {
  //           continue;
  //         }

  //         // if (state.selectedFilterItems[element].length === 0) {
  //         //   continue
  //         // }

  //         if (state.selectedFilterItems[element].includes("すべて")) {
  //           state.selectedFilterItems[element] = ["すべて"];
  //           state.selectedFilterItems2[element] = ["すべて"];
  //           state.testObj[element].list = {
  //             すべて: "すべて",
  //           };
  //         } else {
  //           state.testObj[element].list = {
  //             すべて: "すべて",
  //           };
  //           state.selectedFilterItems2[element] = state.selectedFilterItems[element];
  //           state.selectedFilterItems[element] = ["すべて"];
  //         }

          
  // }

  // creatDataMR(state.data, "メール送付月");
  //       creatDataTerritory(state.data, "メール送付月");
  //       creatDataArea(state.data, "メール送付月");

  //              if (data.length > 0) {
  //          creatDataTarget(data,  "メール送付月");
  //       }
            

      // creatDataMR(state.data, false);
      // creatDataTerritory(state.data, false);
      //   creatDataArea(state.data, false);
    
        

    };

    const onTapSelectBoxItemCall = async (_obj) => {
      onTapClearButton();
      state.selectedFilterItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;
      // state.selectedFilterItems['MR'] = ["すべて"];
     


          for (const element in state.selectedFilterItems) {
          if (element === "チャネル" || element === "メール送付月") {
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
      



      state.selectedObj.施設名.list = {
          すべて: "すべて",
      };

      if (!state.selectedFilterItems3.施設名.includes('すべて')) {
         state.selectedFilterItems3.施設名2 = state.selectedFilterItems3.施設名
      }
        
        state.selectedFilterItems3.施設名 = ["すべて"];

      creatData(state.data, false);
      await nextTick()
   
      
      if (
        state.selectFiliterCategory[0] === "チャネル") {
        for (const element in state.selectedFilterItems) {
          if (element === "チャネル" || element === "メール送付月") {
            continue;
          }

          console.log(element);
          console.log(state.selectedFilterItems[element]);
          
          

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

        creatDataMR(state.data, "メール送付月");
        creatDataTerritory(state.data, "メール送付月");
        creatDataArea(state.data, "メール送付月");
      } else {
        const test = state.selectFiliterCategory.filter((n) => n !== "チャネル" && n !== "Target");

        for (let index = 0; index < test.length; index++) {
          let element = test[index];
          let target;
          let target2;
          if (index === 0) {
            target = "メール送付月";
            target2 = state.dataOrg3;
          } else {
            target = "メール送付月";
            target2 = state.dataOrg3;
          }

          // state.selectedFilterItems[element] = state.selectedFilterItems2[element];
           
          if (element === "MR") {
            creatDataMR(target2, target);
          } else if (element === "テリトリー名") {
            creatDataTerritory(target2, target);
          } else if (element === "エリア") {
            creatDataArea(target2, target);
          }
        }

         creatData(state.data, false);

        if (!state.selectFiliterCategory.includes("MR")) {
          creatDataMR(state.data, false);
        }
        if (!state.selectFiliterCategory.includes("テリトリー名")) {
          creatDataTerritory(state.data, false);
        }
        if (!state.selectFiliterCategory.includes("エリア")) {
          creatDataArea(state.data, false);
        }

        if (state.isScreen === '集計画面') {
           creatDataTarget(state.data, "メール送付月");
        } else {
           creatDataTarget(state.dataDetailOrg, "メール送付月");
        }

        if (state.isScreen === '集計画面') {
           creatDataFlagment(state.data, "メール送付月");
        } else {
           creatDataFlagment(state.dataDetailOrg, "メール送付月");
        }

        if (state.isScreen === '集計画面') {
           creatDataProduct(state.data, "メール送付月");
        } else {
           creatDataProduct(state.dataDetailOrg, "メール送付月");
        }
        

       
      }
    };

    const onTapSelectBoxItem2 = async (_obj) => {
      onTapClearButton();
      state.selectedFilterItems3[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

      if (_obj.category === "医師名" && state.selectedFilterItems3.施設名.includes("すべて")) {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];
      }




      

      await onResize();


      if (_obj.category === "施設名") {
        state.selectedFilterItems3.施設名BK =  state.selectedFilterItems3.施設名 
      }

    
       if (state.selectedFilterItems["Target"].includes("すべて")) {
            state.selectedFilterItems["Target"] = ["すべて"];
            state.selectedFilterItems2["Target"] = ["すべて"];
            
            state.testObj["Target"].list = {
              すべて: "すべて",
            };
          } else {
            state.testObj["Target"].list = {
              すべて: "すべて",
            };
            state.selectedFilterItems2["Target"] = state.selectedFilterItems["Target"];
            state.selectedFilterItems["Target"] = ["すべて"];
       }

       if (state.selectedFilterItems["フラグメント"].includes("すべて")) {
            state.selectedFilterItems["フラグメント"] = ["すべて"];
            state.selectedFilterItems2["フラグメント"] = ["すべて"];
            
            state.testObj["フラグメント"].list = {
              すべて: "すべて",
            };
          } else {
            state.testObj["フラグメント"].list = {
              すべて: "すべて",
            };
            state.selectedFilterItems2["フラグメント"] = state.selectedFilterItems["フラグメント"];
            state.selectedFilterItems["フラグメント"] = ["すべて"];
       }

         if (state.selectedFilterItems["製品"].includes("すべて")) {
            state.selectedFilterItems["製品"] = ["すべて"];
            state.selectedFilterItems2["製品"] = ["すべて"];
            
            state.testObj["製品"].list = {
              すべて: "すべて",
            };
          } else {
            state.testObj["製品"].list = {
              すべて: "すべて",
            };
            state.selectedFilterItems2["製品"] = state.selectedFilterItems["製品"];
            state.selectedFilterItems["製品"] = ["すべて"];
       }


       console.log("tate.selectedFilterItems2");
       
       console.log(state.selectedFilterItems2);
       

      creatDataTarget(state.dataDetailOrg, "メール送付月");
        creatDataFlagment(state.dataDetailOrg, "メール送付月");
         creatDataProduct(state.dataDetailOrg, "メール送付月");
        
     
      
    };

    const onTapSelectBoxItem = async (_obj) => {
      onTapClearButton();

      state.selectedFilterItems[_obj.category] = _obj.selectedValue !== "すべて" ? _obj.selectedValue : null;

        let flg = false
      let selectFiliterCategoryBK = []

      if (state.isScreen === "送付内容") {


          if (!state.selectFiliterCategory.includes(_obj.category)) {
        state.selectFiliterCategory.push(_obj.category);
          }

           const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);
            console.log(newArray);

            if (newArray.includes("すべて")) {
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
            } else {
              state.selectedFilterItemsBK[_obj.category] = newArray;
            }

         let target = [...state.data]

        creatData(target, false);

        if (_obj.category !== "フラグメント" && !state.selectFiliterCategory.includes("フラグメント")) {
           state.testObj.フラグメント.list = {
          すべて: "すべて",
        };
        state.selectedFilterItems.フラグメント = ["すべて"]

        let data = state.dataContentOrg3.filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
        })  
          
        creatDataFlagment(data, false);
        }

        console.log(_obj.category);
        console.log(state.selectFiliterCategory);
        
        
        
        

        if (_obj.category !== "製品" && !state.selectFiliterCategory.includes("製品")) {
           state.testObj.製品.list = {
          すべて: "すべて",
        };
          state.selectedFilterItems.製品 = ["すべて"]
      let data = state.dataContentOrg3.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          })  
        creatDataProduct(data, false);
        }
        

        
        console.log(state.selectedFilterItems);
      console.log(state.testObj);
        return         
      }

         if (state.isScreen === "送付先詳細") {
        if (_obj.category === "Target" || _obj.category === "メール送付月"  || _obj.category === "フラグメント"  || _obj.category === "フラグメント" || _obj.category === "製品") {

          if (!state.selectFiliterCategory.includes(_obj.category)) {
        state.selectFiliterCategory.push(_obj.category);
          }

            const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);
            console.log("newArray");
            console.log(newArray);
            

            if (newArray.includes("すべて")) {
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
            } 
      

          if (state.selectedFilterItems3.施設名.includes("すべて")) {
            state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

      state.selectedFilterItems3.施設名 = ["すべて"];
        
       await onResize();
          } else {
            
            // state.selectedFilterItems3.施設名2 = state.selectedFilterItems3.施設名;
      // state.selectedObj.施設名.list = {
      //     すべて: "すべて",
      // };

            //       state.selectedFilterItems3.施設名 = ["すべて"];


          
        
            await onResize();
      console.log("state.dataDetailOrg");
      
            console.log(state.dataDetailOrg);

              const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);
            console.log("newArray");
            console.log(newArray);
            

            if (newArray.includes("すべて")) {
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
              state.selectedFilterItems3.施設名 = state.selectedFilterItems3.施設名BK   

               await onResize();
            } else {
              state.selectedFilterItems3.施設名 = state.selectedFilterItems3.施設名BK   

               await onResize();      
              state.selectedFilterItemsBK[_obj.category] = newArray;

              
            
              let mrList = state.dataDetailOrg
                .filter((x) => {

                  let target

                   if (_obj.category === "メール送付月") {
                target =  dayjs(x.Email_Sent_Date_vod__c2).format("YYYY/M")
                   } else if (_obj.category === "フラグメント") {
                     target = x["Email_Fragments_vod__r.Name"]
                    }else if (_obj.category === "製品") {
                     target = x["prodcut1"]
                    }
                   else {
                 target = x[_obj.category]
              }


                  return newArray.includes(target);
                })
                .map((p) => p["HP_name"])
                .flat()
                .sort((a, b) => {
                  if (a > b) return 1;
                  if (a < b) return -1;
                });

              //   let targetArry = ["Target","フラグメント","製品"]

              //   for (const element of targetArry) {
              //     if (state.selectFiliterCategory(element)) {
              //       continue
              //     }

              //      let mrList = state.dataDetailOrg
              //   .filter((x) => {

              //     let target

              //      if (_obj.category === "メール送付月") {
              //   target =  dayjs(x.Email_Sent_Date_vod__c2).format("YYYY/M")
              //      } else if (_obj.category === "フラグメント") {
              //        target = x["Email_Fragments_vod__r.Name"]
              //       }else if (_obj.category === "製品") {
              //        target = x["prodcut1"]
              //       }
              //      else {
              //    target = x[_obj.category]
              // }


              //     return newArray.includes(target);
              //   })
              //   .map((p) => p[_obj.category])
              //   .flat()
              //   .sort((a, b) => {
              //     if (a > b) return 1;
              //     if (a < b) return -1;
              //   });

              //   mrList = [...new Set(mrList)];
              // state.selectedFilterItems3[element] = mrList

              //   }

            mrList = [...new Set(mrList)];
              state.selectedFilterItems3.施設名 = mrList
            console.log("mrList"); 
            console.log(mrList);
             console.log(state.dataDetailOrg);            
      }
            

           

     
                 
          } 

          
          console.log(state.selectedFilterItems);


          if (_obj.category !== "フラグメント" && !state.selectFiliterCategory.includes("フラグメント")) {
           state.testObj.フラグメント.list = {
          すべて: "すべて",
        };
        state.selectedFilterItems.フラグメント = ["すべて"]

        let data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
        })  
          
        creatDataFlagment(data, false);
        }

        console.log(_obj.category);
        console.log(state.selectFiliterCategory);
        
        
        
        

        if (_obj.category !== "製品" && !state.selectFiliterCategory.includes("製品")) {
           state.testObj.製品.list = {
          すべて: "すべて",
        };
          state.selectedFilterItems.製品 = ["すべて"]
      let data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          })  
        creatDataProduct(data, false);
        }

         if (_obj.category !== "Target" && !state.selectFiliterCategory.includes("Target")) {
           state.testObj.Target.list = {
          すべて: "すべて",
        };
          state.selectedFilterItems.Target = ["すべて"]
      let data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
      }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
        })  
          
        creatDataTarget(data, false);
        }
        
        }
return

      }

      console.log('console.log(state.selectedFilterItemsBK);');
      

      console.log(state.selectedFilterItemsBK);


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
      console.log("orgList");
      console.log(orgList);
      console.log(newArray);
      
      
      
      if (newArray.includes('すべて') && orgList.length === newArray.length) { 
          state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
          flg = true       
      } else {
        state.selectedFilterItemsBK2[_obj.category] = newArray
        state.testObjBK[_obj.category].list = state.testObj[_obj.category].list
      }

      for (const key in state.selectedFilterItems) { 

 if (key === "メール送付月") {
          continue
 }



          

          
        if (!flg) {
          console.log("flg");
          console.log(flg);
          
          if (_obj.category === key) {
          continue
          }

          

          

          if (state.selectFiliterCategory.includes(key)) {

               if (key === "Target") {
            continue
               }

    if (key === "フラグメント") {
          continue
 }   
 
 
    if (key === "製品") {
          continue
 }   
         
            let targetNum = state.selectFiliterCategory.indexOf(key)
            console.log(key);
            
            console.log(targetNum);
            console.log(selectFiliterCategoryNumber);
            if (targetNum > selectFiliterCategoryNumber) {
             if (selectFiliterCategoryBK.length === 0) {
              selectFiliterCategoryBK = [...state.selectFiliterCategory]
             }
              state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== key);
              state.testObj[key].list = { "すべて": "すべて" }
            state.selectedFilterItems[key] = ["すべて"];
            } else if (targetNum < selectFiliterCategoryNumber) {
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


          if (key === "Target") {
            continue
        }


    if (key === "フラグメント") {
          continue
 }   
 
 
    if (key === "製品") {
          continue
 }   
         
            let targetNum = state.selectFiliterCategory.indexOf(key)
            console.log(key);
            
            console.log(targetNum);
            console.log(selectFiliterCategoryNumber);
            
            if (targetNum === agoNum) {
              if (targetNum === 0) {
                console.log(state.selectedFilterItemsBK2);
                
                state.selectedFilterItems[key] = state.selectedFilterItemsBK2[key].filter((n) => n !== "すべて")

                state.testObj[key].list = state.selectedFilterItemsBK[key].reduce((acc, value, index) => {
                  return { ...acc, [value]: value };
                }, {});              } else {
                 state.testObj[key].list = state.testObjBK[key].list 
                state.selectedFilterItems[key] = state.selectedFilterItemsBK2[key]
              }
              
            }else if (targetNum > selectFiliterCategoryNumber) {
              console.log("1");
              console.log(key);
              
            } else if (targetNum < selectFiliterCategoryNumber) {
              console.log("2");
              console.log(key);
              
            } else {
              state.testObj[key].list = { "すべて": "すべて" }
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



      console.log(state.selectedFilterItems);
      console.log(state.testObj);
      console.log(state.data);
      
      let target = [...state.data]
      

          creatData(target, false);
         await nextTick()     
      



 
     
    creatDataMR(target, false);

    creatDataArea(target, false);

    creatDataTerritory(target, false);

      creatDataTarget(target, false);
    

    
   creatDataFlagment(target, false);

     creatDataProduct(target, false);
     
  //   creatDataSales(target) 
  //   creatDataDocter(target)
  // creatDataChanel(target)
     
      // creatDataDataMonth();


            if (selectFiliterCategoryBK.length !== 0) {
        state.selectFiliterCategory = selectFiliterCategoryBK

        for (const element of state.selectFiliterCategory) {
          let targetNum = state.selectFiliterCategory.indexOf(element)

          if (targetNum > selectFiliterCategoryNumber) { 
             state.selectedFilterItems[element] = state.selectedFilterItemsBK2[element] .filter((x) => {
             return Object.values(state.testObj[element].list).includes(x)
           
          })
          }
        }

          creatData(target, false);
      }
       


    //   let flg = false;
    //   let flg2 = false;

    //   if (state.isScreen === "送付先詳細") {
    //     if (_obj.category === "Target") {

    //       if (!state.selectFiliterCategory.includes(_obj.category)) {
    //     if (_obj.category === "チャネル") {
    //       state.selectFiliterCategory.unshift(_obj.category);
    //     } else {
    //       state.selectFiliterCategory.push(_obj.category);
    //     }
    //       }
      

    //       if (state.selectedFilterItems3.施設名.includes("すべて")) {
    //         state.selectedObj.施設名.list = {
    //       すべて: "すべて",
    //     };

    //   state.selectedFilterItems3.施設名 = ["すべて"];
        
    //    await onResize();
    //       } else {
            
    //         // state.selectedFilterItems3.施設名2 = state.selectedFilterItems3.施設名;
    //   // state.selectedObj.施設名.list = {
    //   //     すべて: "すべて",
    //   // };

    //         //       state.selectedFilterItems3.施設名 = ["すべて"];


          
        
    //         await onResize();
    //   console.log("state.dataDetailOrg");
      
    //         console.log(state.dataDetailOrg);

    //           const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);
    //         console.log(newArray);

    //         if (newArray.includes("すべて")) {
    //           state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);
    //           state.selectedFilterItems3.施設名 = state.selectedFilterItems3.施設名BK   

    //            await onResize();
    //         } else {
    //           state.selectedFilterItems3.施設名 = state.selectedFilterItems3.施設名BK   

    //            await onResize();      
    //           state.selectedFilterItemsBK[_obj.category] = newArray;
    //           let mrList = state.dataDetailOrg
    //             .filter((x) => {
    //               return newArray.includes(x[_obj.category]);
    //             })
    //             .map((p) => p["HP_name"])
    //             .flat()
    //             .sort((a, b) => {
    //               if (a > b) return 1;
    //               if (a < b) return -1;
    //             });

    //         mrList = [...new Set(mrList)];
    //         state.selectedFilterItems3.施設名 = mrList

    //         console.log(mrList);      
    //   }
            

           

     
                 
    //       } 

          
    //       console.log(state.selectedFilterItems);
        
    //     }

    // return 

    //   }
        

    


      
    // if (!state.selectFiliterCategory.includes(_obj.category)) {
    //     if (_obj.category === "チャネル") {
    //       state.selectFiliterCategory.unshift(_obj.category);
    //     } else {
    //       state.selectFiliterCategory.push(_obj.category);
    //     }
    //   } else {
    //     const targetList = Object.keys(state.testObj[_obj.category].list).length;

    //     console.log(targetList);

    //     console.log(_obj.selectedValue);
    //     console.log(state.selectFiliterCategory);

     


    //     if (state.selectFiliterCategory[0] === _obj.category && _obj.selectedValue.length === targetList) {

    //       // if (state.selectFiliterCategory.includes('チャネル')) {
    //       // console.log('チャネル');

    //       // } else {
    //       //   state.selectFiliterCategory = [];
    //       // }
    //       //  state.selectFiliterCategory = [];
    //       // state.dataOrgFilter = [];
    //       //  state.dataOrg3 = []

    //       state.selectFiliterCategory.shift();

    //       // console.log(state.testObj[state.selectFiliterCategory[0]].list);
    //       // console.log(state.selectedFilterItems[state.selectFiliterCategory[0]]);

    //       for (const element of state.selectFiliterCategory) {
    //         if (state.selectFiliterCategory[0] === element) {
    //           if (!state.selectedFilterItems[element].includes("すべて")) {
    //             const lists = Object.values(state.testObj[element].list).filter((n) => n !== "すべて");
    //             console.log(lists);

    //             const selectList = state.selectedFilterItems[element];

    //             const diff = lists.filter((i) => selectList.indexOf(i) == -1);
    //             console.log(diff);

    //             const mrList = state.dataOrg
    //               .filter((x) => {
    //                 return !diff.includes(x[element]);
    //               })
    //               .map((p) => p[element])
    //               .flat()
    //               .sort((a, b) => {
    //                 if (a > b) return 1;
    //                 if (a < b) return -1;
    //               });

    //             const mrListOrg = state.dataOrg
    //               .map((p) => p[element])
    //               .flat()
    //               .sort((a, b) => {
    //                 if (a > b) return 1;
    //                 if (a < b) return -1;
    //               });

    //             state.selectedFilterItems[element] = [];
    //             state.selectedFilterItems[element] = mrList;
    //             console.log(mrList);

    //             state.dataOrgFilter = [...state.data];
    //             state.dataOrg3 = [...state.data];
    //             state.testObj[element].list = mrListOrg.reduce((acc, value, index) => {
    //               return { ...acc, [value]: value };
    //             }, {});
    //             state.testObj[element].list["すべて"] = "すべて";
    //             flg = true;
    //           }
    //         }
    //       }

    //       // let mrList = state.data
    //       //     .map((p) => p[state.selectFiliterCategory[0]])
    //       //   .sort((a, b) => {
    //       //     if (a > b) return 1;
    //       //     if (a < b) return -1;
    //       //     });
    //     }
    //   }

    //    await nextTick();

    //   if (state.selectFiliterCategory[0] === _obj.category) {
    //     if (_obj.category === "チャネル") {
    //       for (const element of state.selectFiliterCategory) {
    //         if (element === "チャネル") {
    //           continue;
    //         }

    //         state.selectedFilterItems[element] = ["すべて"];
    //       }
    //       await nextTick();
    //     }

    //     if (state.selectFiliterCategory[0]  === "Target") {
    //       state.dataOrgFilter = [...state.data];
    //     } else {
    //       state.dataOrgFilter = [...state.data];
    //     }

        
    //     state.dataOrg3 = [...state.data];
    //   }

       

    //   const test = state.selectFiliterCategory.filter((n) => n !== "チャネル"  && n !== "Target");

    //   if (test.includes(_obj.category)) {
    //     const i = state.selectFiliterCategory.indexOf(_obj.category) + 1;

    //     const i2 = state.selectFiliterCategory.indexOf(_obj.category);

    //     for (let index = i; index < state.selectFiliterCategory.length; index++) {
    //       if (state.selectFiliterCategory[index] === "チャネル" || state.selectFiliterCategory[index] === "Target") {
    //         continue;
    //       }
    //       state.selectedFilterItems[state.selectFiliterCategory[index]] = ["すべて"];
    //       state.testObj[state.selectFiliterCategory[index]].list = {
    //         すべて: "すべて",
    //       };

    //       state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== state.selectFiliterCategory[index]);
    //     }

    //     if (test[0] === _obj.category) {
    //       state.dataOrgFilter2 = [...state.data];
    //     }
    //   }

    //   await nextTick();
    //   const newArray = state.selectedFilterItems[_obj.category].filter((n) => n !== _obj.selectedValue);

    //   console.log(newArray);

    //   if (newArray.includes("すべて")) {
    //     state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== _obj.category);

    //     flg2 = true;
    //     // state.selectedFilterItemsBK[_obj.category] = []

    //     // continue
    //   } else {
    //     state.selectedFilterItemsBK[_obj.category] = newArray;
    //   }


    //   for (const element of state.selectFiliterCategory) {
    //     console.log("あり");
    //     console.log(element);

       
    //     // if (state.selectedFilterItems[_obj.category].length === 0) {
    //     //       if ( _obj.category !== element) {
    //     //   state.testObj[element].list = {}
    //     //   state.testObj[element].list["すべて"] = "すべて";
    //     // }
        
    //     //  continue;
    //     // }

        

    //     if ((_obj.category === element && flg) || _obj.category === element) {
    //       continue;
    //     }

    //     console.log("実行");
    //     console.log(flg2);

    //     if (flg2 && element !== "チャネル") {
    //       state.selectedFilterItems[element] = state.selectedFilterItemsBK[element];
    //     } else {
    //       console.log(_obj.category);
    //       console.log(state.dataOrgFilter);
    //       let mrList;

    //       if (_obj.category === "チャネル" || element === "チャネル" ) {
    //         //  state.selectedFilterItemsBK[_obj.category] = state.selectedFilterItems[element]
    //         state.selectedFilterItems[element] = ["すべて"];
    //         mrList = state.dataOrgFilter
    //           .map((p) => p[element])
    //           .flat()
    //           .sort((a, b) => {
    //             if (a > b) return 1;
    //             if (a < b) return -1;
    //           });

    //         mrList = [...new Set(mrList)];

    //         state.selectedFilterItems[element] = state.selectedFilterItemsBK[element].filter((n) => mrList.includes(n));
    //         if (element === "チャネル") {
    //           continue
    //         }
    //         state.testObj[element].list = mrList.reduce((acc, value, index) => {
    //           return { ...acc, [value]: value };
    //         }, {});
    //         if (state.selectedFilterItems[element].length === Object.values(state.testObj[element].list).length && state.selectedFilterItems[element].length > 0) {
    //           state.selectedFilterItems[element].unshift("すべて");
    //           state.selectFiliterCategory = state.selectFiliterCategory.filter((n) => n !== element);
    //         }
    //         state.testObj[element].list["すべて"] = "すべて";
    //       } else if (element === "Target" || _obj.category === "Target") {
    //         console.log("a");
            
        
    //       } else {
    //         const test = state.selectFiliterCategory.filter((n) => n !== "チャネル" && n !== "Target");
    //         let data;
    //         if (state.dataOrgFilter2.length > 0) {
    //           data = state.dataOrgFilter2;
    //         } else {
    //           data = state.dataOrgFilter;
    //         }

    //         if (test.length <= 2) {
    //           mrList = data
    //             .filter((x) => {
    //               return newArray.includes(x[_obj.category]);
    //             })
    //             .map((p) => p[element])
    //             .flat()
    //             .sort((a, b) => {
    //               if (a > b) return 1;
    //               if (a < b) return -1;
    //             });
    //         } else if (test.length === 3) {
    //           console.log(test[1]);

    //           mrList = data
    //             .filter((x) => {
    //               return newArray.includes(x[_obj.category]);
    //             })
    //             .filter((x) => {
    //               return state.selectedFilterItems[test[1]].includes(x[test[1]]);
    //             })
    //             .map((p) => p[element])
    //             .flat()
    //             .sort((a, b) => {
    //               if (a > b) return 1;
    //               if (a < b) return -1;
    //             });
    //         }

      
    //         console.log(state.dataOrgFilter);

    //         console.log("mrList");
    //         console.log(mrList);
    //         state.selectedFilterItems[element] = [];
    //         state.selectedFilterItems[element] = mrList;

    //         if (Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length === 0) {
    //           state.testObj[element].list = state.selectedFilterItems[element].reduce((acc, value, index) => {
    //             return { ...acc, [value]: value };
    //           }, {});
    //           state.testObj[element].list["すべて"] = "すべて";
    //         }

    //         if (mrList.length === Object.values(state.testObj[element].list).filter((n) => n !== "すべて").length && mrList.length > 0) {
    //           state.selectedFilterItems[element].unshift("すべて");
    //         }
    //       }
    //     }
    //   }


    //   await nextTick();

    //   for (const element in state.selectedFilterItems) {
    //     if (element === "メール送付月") {
    //       continue;
    //     }
    

    //     if (!state.selectFiliterCategory.includes(element)) {
    //       // if (state.selectFiliterCategory.length === 0) {
    //       //   continue
    //       // }

    //       state.selectedFilterItems[element] = ["すべて"];
    //       await nextTick();

    //       console.log(state.data);
    //       let mrList

    //          if (element === "チャネル") {
    //       mrList = state.data
    //         .filter((x) => {
    //           if (x.Total === 0 && state.isScreen === "半期実績") {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         })
    //         .map((p) => p["チャネル2"])
    //         .flat()
    //         .sort((a, b) => {
    //           if (a > b) return 1;
    //           if (a < b) return -1;
    //         });
    //          } else {
    //         mrList = state.data
    //         .filter((x) => {
    //           if (x.Total === 0 && state.isScreen === "半期実績") {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         })
    //         .map((p) => p[element])
    //         .flat()
    //         .sort((a, b) => {
    //           if (a > b) return 1;
    //           if (a < b) return -1;
    //         });
    //     }


          

          

    //       mrList = [...new Set(mrList)];

    //       console.log(mrList);

    //       state.selectedFilterItems[element] = [];
    //       state.selectedFilterItems[element] = mrList;
    //       state.selectedFilterItems[element].unshift("すべて");

    //       state.testObj[element].list = state.selectedFilterItems[element].reduce((acc, value, index) => {
    //         return { ...acc, [value]: value };
    //       }, {});
    //     }
    //   }
    
    //   let target = [...state.data]

    //   creatData(target, false);
      
        

      //  creatDataMR(target, _obj.category);
      // creatDataArea(target, _obj.category);
      // creatDataTerritory(target, _obj.category);
      
    };

    const creatDataMR = (data, category) => {
      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "集計画面") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["MR"])
        

      for (const key of mrList) {
        if (!state.testObj.MR.list[key]) {
          state.testObj.MR.list[key] = key;
          state.selectedFilterItems.MR.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }

      // if (category === "メール送付月") {
      //   if (!state.selectedFilterItems2.MR.includes("すべて")) {
      //     state.selectedFilterItems.MR = state.selectedFilterItems2.MR;
      //   }
      // }

      // if (category === "MR") {
      //            for (const element of state.selectedFilterItems.MR) {
      //   if (!mrList.includes(element) && element !== "すべて") {
      //   state.selectedFilterItems.MR  = state.selectedFilterItems.MR.filter(n => n !== element);
      // }
      // }
      // }
           if (state.selectedFilterItemsBK.MR.length === 0) {
         state.selectedFilterItemsBK.MR = state.selectedFilterItems.MR

      }


      return mrList;
    };

    const creatDataArea = (data, category) => {
      const mrList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "集計画面") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["エリア"])

      for (const key of mrList) {
        if (!state.testObj.エリア.list[key]) {
          state.testObj.エリア.list[key] = key;
          state.selectedFilterItems.エリア.push(key);
        }
      }

      // if (category === "メール送付月") {
      //   if (!state.selectedFilterItems2.エリア.includes("すべて")) {
      //     state.selectedFilterItems.エリア = state.selectedFilterItems2.エリア;
      //   }
      // }

            // }
           if (state.selectedFilterItemsBK.エリア.length === 0) {
         state.selectedFilterItemsBK.エリア = state.selectedFilterItems.エリア

      }

      return mrList;
    };

    const creatDataTerritory = (data, category) => {
      const territoryList = data
        .filter((x) => {
          if (x.Total === 0 && state.isScreen === "集計画面") {
            return false;
          } else {
            return true;
          }
        })
        .map((p) => p["テリトリー名"])

      for (const key of territoryList) {
        if (!state.testObj.テリトリー名.list[key]) {
          state.testObj.テリトリー名.list[key] = key;
          state.selectedFilterItems.テリトリー名.push(key);
        }
      }

      // if (category === "メール送付月") {
      //   if (!state.selectedFilterItems2.テリトリー名.includes("すべて")) {
      //     state.selectedFilterItems.テリトリー名 = state.selectedFilterItems2.テリトリー名;
      //   }
      // }

                 if (state.selectedFilterItemsBK.テリトリー名.length === 0) {
         state.selectedFilterItemsBK.テリトリー名 = state.selectedFilterItems.テリトリー名

      }

      return territoryList;
    };

    const creatDataFacility = (data) => {
      let totalArray2 = data
        .map((p) => p["HP_name"])
        .filter((v) => v);

      for (const key of totalArray2) {
        if (!state.selectedObj.施設名?.list[key]) {
          state.selectedObj.施設名.list[key] = key;
          state.selectedFilterItems3.施設名.push(key);
        }
      }

      if ( state.selectedFilterItems3.施設名2.length > 0) {
        state.selectedFilterItems3.施設名 = state.selectedFilterItems3.施設名2
        state.selectedFilterItems3.施設名2 = []
      }
    };

    const creatDataKinds = (data) => {
      let totalArray2 = data
        .map((p) => p["分類"])
        .filter((v) => v);

      for (const key of totalArray2) {
        if (!state.selectedObj.分類?.list[key]) {
          state.selectedObj.分類.list[key] = key;
          state.selectedFilterItems3.分類.push(key);
        }
      }

    };

        const creatDataTarget = (data, category) => {
          // state.testObj.Target.list["すべて"] = "すべて"
          // state.selectedFilterItems.Target = ["すべて"]

          console.log('data');
          
console.log(data);
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

          if (category !== "goScreen") {

               for (const key of mrList) {
        if (!state.testObj.Target.list[key]) {
          state.testObj.Target.list[key] = key;
          state.selectedFilterItems.Target.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }
           }   else {
                for (const key of mrList) {
        if (!state.testObj.Target.list[key]) {
          state.testObj.Target.list[key] = key;
        }
        // state.selectedFilterItems.MR.push(key);
                }

          if (!state.selectedFilterItems2.Target.includes("すべて")) {
                  console.log(state.selectedFilterItems2.Target);
                  
          if (state.selectedFilterItems2.Target.length > 0) {
            state.selectedFilterItems.Target = state.selectedFilterItems2.Target;
          }

        
        }
      
        }
        

   


        if (state.selectedFilterItemsBK.Target.length === 0) {
         state.selectedFilterItemsBK.Target = state.selectedFilterItems.Target

      }


        if (category === "メール送付月") {
        if (!state.selectedFilterItems2.Target.includes("すべて")) {
          if (state.selectedFilterItems2.Target.length > 0) {
            state.selectedFilterItems.Target = state.selectedFilterItems2.Target;
          }

        
        }
        }
      

      // if (category === "Target") {
      //   for (const element of state.selectedFilterItems.Target) {
      //     if (!mrList.includes(element) && element !== "すべて") {
      //       state.selectedFilterItems.Target = state.selectedFilterItems.Target.filter((n) => n !== element);
      //     }
      //   }
      // }

      //       console.log(state.testObj.Target);
      //     console.log(state.selectedFilterItems.Target);
          

      //     let target = Object.values(state.testObj.Target.list).filter((n) => n !== "すべて")
      //  const diff = target.filter((i) => state.selectedFilterItems.Target.indexOf(i) == -1);
      //     console.log(diff);
                  
      //     if (target.length ===  state.selectedFilterItems.Target.length && diff.length === 0) {
      //       state.selectedFilterItems.Target.push('すべて')
      //     }

    
          
          

      return mrList;
    };


        const creatDataFlagment = (data, category) => {
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
        .map((p) => p["Email_Fragments_vod__r.Name"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

        console.log('mrList');
        

        console.log(mrList);

        if (category !== "goScreen") {
             for (const key of mrList) {
        if (!state.testObj.フラグメント.list[key]) {
          state.testObj.フラグメント.list[key] = key;
          state.selectedFilterItems.フラグメント.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }
        } else {
                for (const key of mrList) {
        if (!state.testObj.フラグメント.list[key]) {
          state.testObj.フラグメント.list[key] = key;
        }
        // state.selectedFilterItems.MR.push(key);
                }

          if (!state.selectedFilterItems2.フラグメント.includes("すべて")) {
                  console.log(state.selectedFilterItems2.フラグメント);
                  
          if (state.selectedFilterItems2.フラグメント.length > 0) {
            state.selectedFilterItems.フラグメント = state.selectedFilterItems2.フラグメント;
          }

        
        }
      
        }
        

   

      console.log(state.selectedFilterItems.フラグメント);
      


        if (state.selectedFilterItemsBK.フラグメント.length === 0) {
         state.selectedFilterItemsBK.フラグメント = state.selectedFilterItems.フラグメント
      }


        if (category === "メール送付月") {
        if (!state.selectedFilterItems2.フラグメント.includes("すべて")) {
          if (state.selectedFilterItems2.フラグメント.length > 0) {
            state.selectedFilterItems.フラグメント = state.selectedFilterItems2.フラグメント;
          }

        
        }
        }
      

      // if (category === "Target") {
      //   for (const element of state.selectedFilterItems.Target) {
      //     if (!mrList.includes(element) && element !== "すべて") {
      //       state.selectedFilterItems.Target = state.selectedFilterItems.Target.filter((n) => n !== element);
      //     }
      //   }
      // }

      //       console.log(state.testObj.Target);
      //     console.log(state.selectedFilterItems.Target);
          

      //     let target = Object.values(state.testObj.Target.list).filter((n) => n !== "すべて")
      //  const diff = target.filter((i) => state.selectedFilterItems.Target.indexOf(i) == -1);
      //     console.log(diff);
                  
      //     if (target.length ===  state.selectedFilterItems.Target.length && diff.length === 0) {
      //       state.selectedFilterItems.Target.push('すべて')
      //     }

    
          
          

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
        .map((p) => p["prodcut1"])
        .flat(2)
        .sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
        });

        console.log('mrList');
        

        console.log(mrList);

        if (category !== "goScreen") {
             for (const key of mrList) {
        if (!state.testObj.製品.list[key]) {
          state.testObj.製品.list[key] = key;
          state.selectedFilterItems.製品.push(key);
        }
        // state.selectedFilterItems.MR.push(key);
      }
        } else {
                for (const key of mrList) {
        if (!state.testObj.製品.list[key]) {
          state.testObj.製品.list[key] = key;
        }
        // state.selectedFilterItems.MR.push(key);
                }

          if (!state.selectedFilterItems2.製品.includes("すべて")) {
                  console.log(state.selectedFilterItems2.製品);
                  
          if (state.selectedFilterItems2.製品.length > 0) {
            state.selectedFilterItems.製品 = state.selectedFilterItems2.製品;
          }

        
        }
      
        }
        

   

      console.log(state.selectedFilterItems.製品);
      


        if (state.selectedFilterItemsBK.製品.length === 0) {
         state.selectedFilterItemsBK.製品 = state.selectedFilterItems.製品
      }


        if (category === "メール送付月") {
        if (!state.selectedFilterItems2.製品.includes("すべて")) {
          if (state.selectedFilterItems2.製品.length > 0) {
            state.selectedFilterItems.製品 = state.selectedFilterItems2.製品;
          }

        
        }
        }
      

      // if (category === "Target") {
      //   for (const element of state.selectedFilterItems.Target) {
      //     if (!mrList.includes(element) && element !== "すべて") {
      //       state.selectedFilterItems.Target = state.selectedFilterItems.Target.filter((n) => n !== element);
      //     }
      //   }
      // }

      //       console.log(state.testObj.Target);
      //     console.log(state.selectedFilterItems.Target);
          

      //     let target = Object.values(state.testObj.Target.list).filter((n) => n !== "すべて")
      //  const diff = target.filter((i) => state.selectedFilterItems.Target.indexOf(i) == -1);
      //     console.log(diff);
                  
      //     if (target.length ===  state.selectedFilterItems.Target.length && diff.length === 0) {
      //       state.selectedFilterItems.Target.push('すべて')
      //     }

    
          
          

      return mrList;
    };

    const creatDataDataMonth = () => {
      if (state.monthArryOrg.length === 0) {
        state.monthArryOrg = [...state.monthArry];
      }

      for (const key of state.monthArryOrg) {
        if (!state.testObj.メール送付月.list[key]) {
          state.testObj.メール送付月.list[key] = key;
          state.selectedFilterItems.メール送付月.push(key);
        }
      }
    };

    const creatData = (data,flg) => {
      if (state.monthArry.length === 0) {
        let monthData = data
        .map((p) => Object.values(p["dataOrg"]))
          .filter((v) => v.length > 0)
          .flat(2)
          .map((p) => dayjs(p.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/M"))

        monthData = [...new Set(monthData)];


        console.log(monthData);
        

        const monthArryReserve = monthData
          .sort((a, b) => {
            if (dayjs(a) < dayjs(b)) return 1;
            if (dayjs(a) > dayjs(b)) return -1;
          })

        state.monthArry = monthArryReserve.sort((a, b) => {
          if (dayjs(a) > dayjs(b)) return 1;
          if (dayjs(a) < dayjs(b)) return -1;
        });
      }
      

      const maxIndexArry = [];
      const minindexArry = [];

      state.maxNumber = Math.max(...maxIndexArry);
      state.minNumber = Math.min(...minindexArry);

      if (state.isScreen === "送付内容") {
        const itemParent = document.querySelector(".title-wrap.on");
        if (flg !== "false2" && itemParent && flg !== true) {
          itemParent.classList.remove('on')
        }

        if (flg !== true && flg !== "false2") {

            const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
         
          
           for (const item of items4) {
            
            item.classList.remove("on");
          
          }
          
            (state.selectObj[state.isScreen] = {
        docter:"",
        sentDate: "",
       templateName: "",
              flagmentName: "",
          Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,        
            })
           
        }

        const rankObj3 = {};

         state.dataContentOrg3 = [...state.dataCont];

        let totalArray2 = [...state.dataCont.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
          }) ]
        console.log("totalArray2");
        
          console.log(totalArray2);
          
        

        state.dataContentOrg2 = totalArray2;

        
        

        let targetArray = [];

        if (totalArray2.length > 1000) {
          if (state.dataContentOrg.length > 0 && flg === true) {
            targetArray = totalArray2.slice(0, state.dataContentOrg.length + 300);
          } else {
            if (state.dataContentOrg.length > 300) {
               targetArray = totalArray2.slice(0, state.dataContentOrg.length);
            } else {
              targetArray = totalArray2.slice(0, 300);
            }
            
          }
        } else {
          targetArray = totalArray2;
        }

        // targetArray = totalArray2;
        

        state.dataContentOrg = targetArray;
        console.log("targetArray");
        
        console.log(targetArray);
        

        let i = 0;
        for (const element2 of targetArray) {

          

           let sentDate = dayjs(element2.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD")
          if (sentDate === "Invalid Date") {
            sentDate = "NULL"
          }
          
          if (!rankObj3["data"]) {
            rankObj3["data"] = {};
          }

          if (!rankObj3["data"][element2.Dr_name]) {
            rankObj3["data"][element2.Dr_name] = {};
          }

          if (!rankObj3["data"][element2.Dr_name][element2.分類]) {
            rankObj3["data"][element2.Dr_name][element2.分類] = {};
          }
          

         


          if (!rankObj3["data"][element2.Dr_name][element2.分類][sentDate]) {
            rankObj3["data"][element2.Dr_name][element2.分類][sentDate] = {};
          }

          if (!rankObj3["data"][element2.Dr_name][element2.分類][sentDate][element2["Approved_Email_Template_vod__r.Name"]]) {
            rankObj3["data"][element2.Dr_name][element2.分類][sentDate][element2["Approved_Email_Template_vod__r.Name"]] = {};
          }

          if (!rankObj3["data"][element2.Dr_name][element2.分類][sentDate][element2["Approved_Email_Template_vod__r.Name"]][element2["Email_Fragments_vod__r.Name"]]) {
            rankObj3["data"][element2.Dr_name][element2.分類][sentDate][element2["Approved_Email_Template_vod__r.Name"]][element2["Email_Fragments_vod__r.Name"]] = [];
          }



         element2["dataNumber"] = i;
          i++;

         
          if (flg !== "false2" && flg !== true) {
            element2.isActive = false 
            element2.isClickActive = false
               element2.isOpenActive = false
          }
        
         
             rankObj3["data"][element2.Dr_name][element2.分類][sentDate][element2["Approved_Email_Template_vod__r.Name"]][element2["Email_Fragments_vod__r.Name"]].push(element2);

           if (element2.Id === "a1tP6000004g9r0IAA") {
           console.log(element2);
            
          }
        }

        state.dataContent = Object.entries(rankObj3)
          .map(([key, value]) => ({ [key]: value }))
          .reverse();

        console.log("state.dataContent");
        
        console.log(state.dataContent);
        
      } else {
        
        onResize();
      }
    };

    const onTapClearButton = () => {
      //   const itemParent = document.querySelector("#call-list-data-wrap");
      // const isCheckedParent = itemParent.classList.contains("selected");

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
      //      item.classList.remove("on");
      //   }

      //   itemParent.classList.remove("selected");

      state.isHoverFlag = false;
    };

    const getSpareClass = (spare1) => {
      if (!spare1) return null;

      if (spare1 % 2 == 1) {
        return "test4";
      } else {
        return;
      }
    };

    const onTapOutside = async (evt) => {



      if (
        evt.target.classList.contains("call-list-data-item") ||
        evt.target.classList.contains("call-list-title") ||
        evt.target.classList.contains("header-list-item") ||
        evt.target.classList.contains("select__value") ||
        evt.target.classList.contains("select__item") ||
        evt.target.classList.contains('title-wrap') ||
        evt.target.classList.contains('sort-button')
      ) {
        return;
      }
      

      if (state.isScreen === "集計画面") { 

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
          
          state.isHoverFlag = false;


      }else  if (state.isScreen === "送付先詳細") { 

       const items4 = document.querySelectorAll("#my-chart2 .call-list-title.on");
          for (const item of items4) {
            item.classList.remove("on");
          }

        const item2 = document.querySelectorAll("#my-chart2 .call-list-data-item.no-active");
        const items3 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");

        for (const item of item2) {
            item.classList.remove("no-active");
          }

          for (const item of items3) {
            item.classList.remove("on");
          }
          
          state.isHoverFlag = false;


      }else  if (state.isScreen === "送付内容") { 
        
        

          (state.selectObj[state.isScreen] = {
        docter:"",
        sentDate: "",
        templateName: "",
            flagmentName: "",
         Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,    
           })

           

          const itemParent = document.querySelector(".title-wrap.on");
        if (itemParent) {
          itemParent.classList.remove('on')
        }

           const items3 = document.querySelector("#my-chart3 .call-list-data-item.on");
        if (items3) {
          items3.classList.remove('on')
        }

         const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
         
          
           for (const item of items4) {
            
            item.classList.remove("on");
          
          }

           for (const element of state.dataContentOrg2) {
           element.isClickActive = false
            element.isOpenActive = false 
           element.isActive = false   
           }

   
          state.isHoverFlag = false;


      }


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

    const onTapTarget2_2 = async(_obj, text, evt) => {
      // const itemParent = document.querySelector("#call-list-data-wrap");
      // const isCheckedParent = itemParent.classList.contains("selected");

      const parentElment = evt.target.parentElement;

      if (state.isScreen === "集計画面") {
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
             item.classList.remove("on");
          }

          const items2 = parentElment.querySelectorAll("#my-chart .call-list-data-item");

          const number = [];

          for (const item of items2) {
            item.classList.remove("no-active");
            item.classList.add("on");
            number.push(item.textContent);
          }

          if (items2.length > 1) {
            const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
            _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
          }


      (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: evt.target.textContent,
      }),
        (state.isHoverFlag = false);

         await nextTick()

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

          
        

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }

          creatData(state.dataContent, false);



        // if (state.selectedFilterItems["フラグメント"].includes("すべて")) {
        //     state.selectedFilterItems["フラグメント"] = ["すべて"];
        //     state.selectedFilterItems2["フラグメント"] = ["すべて"];
        //     state.testObj["フラグメント"].list = {
        //       すべて: "すべて",
        //     };
        //   } else {
        //     state.testObj["フラグメント"].list = {
        //       すべて: "すべて",
        //     };
        //     state.selectedFilterItems2["フラグメント"] = state.selectedFilterItems["フラグメント"];
        //     state.selectedFilterItems["フラグメント"] = ["すべて"];
        // }

        // creatDataFlagment(state.dataContent,"メール送付月")



        // if (state.selectedFilterItems["Target"].includes("すべて")) {
        //     state.selectedFilterItems["Target"] = ["すべて"];
        //     state.selectedFilterItems2["Target"] = ["すべて"];
        //     state.testObj["Target"].list = {
        //       すべて: "すべて",
        //     };
        //   } else {
        //     state.testObj["Target"].list = {
        //       すべて: "すべて",
        //     };
        //     state.selectedFilterItems2["Target"] = state.selectedFilterItems["Target"];
        //     state.selectedFilterItems["Target"] = ["すべて"];
        // }

          // creatDataTarget(state.dataDetailOrg,"メール送付月")


     
          let data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          }).filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
          })


           if (!state.selectedFilterItems.Target.includes("すべて")) {
            state.selectedFilterItems2["Target"] = state.selectedFilterItems["Target"];
             creatDataTarget(data, "goScreen");
           } else {
              
      state.testObj["Target"].list = {
              すべて: "すべて",
          };
           state.selectedFilterItems["Target"] = ["すべて"]  
            creatDataTarget(data, false);
          }
          


           
          

          state.testObj["フラグメント"].list = {
              すべて: "すべて",
          };

           data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.製品.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.製品.includes(
                 x["prodcut1"]
              );
            }
          })



            if (!state.selectedFilterItems.フラグメント.includes("すべて")) {
            state.selectedFilterItems2["フラグメント"] = state.selectedFilterItems["フラグメント"];
             creatDataFlagment(data, "goScreen");
            } else {
           state.selectedFilterItems["フラグメント"] = ["すべて"]  
            creatDataFlagment(data, false);
          }
          

       

          data = state.dataDetailOrg.filter((x) => {
            if (state.selectedFilterItems.フラグメント.includes("すべて")) {
              return true;
            } else {
              return state.selectedFilterItems.フラグメント.includes(
                 x["Email_Fragments_vod__r.Name"]
              );
            }
          })



            if (!state.selectFiliterCategory.includes("すべて")) {
            state.selectedFilterItems2["製品"] = state.selectedFilterItems["製品"];
             creatDataProduct(data, "goScreen");
            } else {
                 state.testObj["製品"].list = {
              すべて: "すべて",
          };
           state.selectedFilterItems["製品"] = ["すべて"]  
            creatDataProduct(data, false);
          }
          
        

         
  state.iScrollObj.scrollTo(0, 0, 0);    
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }

          await nextTick()


    

          const item2 = document.querySelectorAll("#my-chart2 .call-list-data-item.no-active");
          const item3 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");   
         
          
        if (item2.length > 0 && item3.length > 0) {
             console.log(item2);
            const item = document.querySelectorAll("#my-chart2 .call-list-data-item");
            console.log(item);
            
          for (const element of item) {
            if (element.classList.contains('on')) {
              continue
            }             
              element.classList.add("no-active");
            }
          }else if (item2.length > 0 && item3.length === 0){
          const item = document.querySelectorAll("#my-chart2 .call-list-data-item");
           for (const element of item) {        
              element.classList.remove("no-active");
            }        }
      
        }
        
      }else if(state.isScreen === "送付先詳細")
      {

         if (evt.target.classList.contains("on")) {
          evt.target.classList.remove("on");

          const items = document.querySelectorAll("#my-chart2 .call-list-data-item.no-active");
          const items2 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");
          for (const item of items) {
            item.classList.remove("no-active");
          }

          for (const item of items2) {
            item.classList.remove("on");
          }

          state.isHoverFlag = false;
        } else {
          const items4 = document.querySelectorAll("#my-chart2 .call-list-title.on");
          for (const item of items4) {
            item.classList.remove("on");
          }

          evt.target.classList.add("on");

          const items = document.querySelectorAll("#my-chart2 .call-list-data-item");
           for (const item of items) {
           item.classList.remove("on"); 
            item.classList.add("no-active");
          }

          const items2 = parentElment.querySelectorAll("#my-chart2 .call-list-data-item");

          const number = [];

          for (const item of items2) {
            item.classList.remove("no-active");
            item.classList.add("on");
            number.push(item.textContent);
          }

           console.log(evt.target.dataset.kinds)
           console.log(_obj);
            
           let mr
         let Value  = evt.target.textContent

           if (evt.target.dataset.kinds === "MR") {
            mr = evt.target.textContent
            
           } else if (evt.target.dataset.kinds === "HP_name") {
             const keys = Object.keys(_obj)
                mr =  _obj[keys[0]].MR 
           }else if (evt.target.dataset.kinds === "Dr_name") {
             mr = _obj.MR 
             Value = _obj.Dr_name
           }

           console.log(mr);
           
            

              (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: Value,
        MR: mr,
      })  

          if (items2.length > 1) {
            const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
            _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
          }


     
           (state.isHoverFlag = false);

        await nextTick()

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }
      state.iScrollObj.scrollTo(0, 0, 0);

      creatData(state.data,false);
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }
      
         }

         console.log(state.dataDetail);

         
         

         
     state.testObj["フラグメント"].list = {
              すべて: "すべて",
          };
          

           if (!state.selectedFilterItems.フラグメント.includes("すべて")) {
            state.selectedFilterItems2["フラグメント"] = state.selectedFilterItems["フラグメント"];
             creatDataFlagment(state.dataContentOrg3, "goScreen");
           } else {
           

             state.selectedFilterItems["フラグメント"] = ["すべて"]
            creatDataFlagment(state.dataContentOrg3, false);
          }

         

   
          

           if (!state.selectedFilterItems.製品.includes("すべて")) {
            state.selectedFilterItems2["製品"] = state.selectedFilterItems["製品"];
             creatDataProduct(state.dataContentOrg3, "goScreen");
           } else {
              state.testObj["製品"].list = {
              すべて: "すべて",
          };
             state.selectedFilterItems["製品"] = ["すべて"]
            creatDataProduct(state.dataContentOrg3, false);
          }
        
          

  console.log( state.selectedFilterItems);
        
  
}else if(state.isScreen === "送付内容")
      {

         if (evt.target.classList.contains("on")) {
           evt.target.classList.remove("on");

          

        const a = state.dataContentOrg2.filter((x) => {
           return x.Dr_name === state.selectObj['送付内容']['docter']
        })

           for (const element of a) {
             element.isActive = false
           }       
         

            (state.selectObj[state.isScreen] = {
              docter: "",
              分類: "",       
        sentDate: "",
        templateName: "",
              flagmentName: "",
  Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,      
           })
           // const items = document.querySelectorAll("#my-chart3 .call-list-data-item.no-active");
          // const items2 = document.querySelectorAll("#my-chart3 .call-list-data-item.on");
          // for (const item of items) {
          //   item.classList.remove("no-active");
          // }

          // for (const item of items2) {
          //   item.classList.remove("on");
          // }

          state.isHoverFlag = false;
         } else {

           const itemParent = document.querySelector(".title-wrap.on");
        if (itemParent) {
          itemParent.classList.remove('on')
        }

            for (const element of state.dataContentOrg2) {
          element.isClickActive = false
        element.isOpenActive = false 
        }


          
       if ( Object.values(state.selectObj['送付内容']['docter']).length > 0) {
          const b = state.dataContentOrg2.filter((x) => {
           return x.Dr_name ===state.selectObj['送付内容']['docter']
          })
             

         for (const element of b) {
           element.isActive = false
         }
       }   
          
           const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
         
          
           for (const item of items4) {
            
            item.classList.remove("on");
          
          }

          

           evt.target.classList.add("on");



           console.log(_obj);

         
      

           if (evt.target.dataset.kinds === "docter") {

            
      
            (state.selectObj[state.isScreen] = {
             docter: text,
             })
   

           } else if (evt.target.dataset.kinds === "kind") {
        for (const key in _obj) {
          for (const key2 in _obj[key]) {
            for (const key3 in _obj[key][key2]) {
               for (const element of _obj[key][key2][key3]) {
            
            (state.selectObj[state.isScreen] = {
              docter: element.Dr_name,
              分類: text,
             })
          }
             } 
          
         }
        }  
       }else if (evt.target.dataset.kinds === "sentDate") {
        if (text ==="NULL") {
          text = null
        }  
        for (const key in _obj) {
         for (const key2 in _obj[key]) {
          for (const element of _obj[key][key2]) {
            (state.selectObj[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: text,
             })
          }
         }
        }  
           }
            else if (evt.target.dataset.kinds === "templateName")  {
        for (const key in _obj) {
         for (const element of _obj[key]) {
          (state.selectObj[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: text,
             })
         }
        }  
           }else if (evt.target.dataset.kinds === "flagmentName")  {
         for (const element of _obj) {
          (state.selectObj[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
               templateName: element["Approved_Email_Template_vod__r.Name"],
              flagmentName: text,
             })
         } }else if (evt.target.dataset.kinds === "Last_Open_Date_vod__c") {
              (state.selectObj[state.isScreen] = {
              docter: _obj.Dr_name,
              sentDate: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: _obj["Approved_Email_Template_vod__r.Name"],
                flagmentName: _obj["Email_Fragments_vod__r.Name"],
            Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: true,  
              })

            //  _obj.isActive = true
             text =  _obj.Last_Open_Date_vod__c ? dayjs(_obj["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL"
           }
           else if (evt.target.dataset.kinds === "Last_Click_Date_vod__c") {
              (state.selectObj[state.isScreen] = {
              docter: _obj.Dr_name,
              sentDate: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: _obj["Approved_Email_Template_vod__r.Name"],
                flagmentName: _obj["Email_Fragments_vod__r.Name"],
            Last_Click_Date_vod__c: true,
            Last_Open_Date_vod__c: false,  
              })

            //  _obj.isActive = true
             text =  _obj.Last_Click_Date_vod__c ? dayjs(_obj["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL"
           }

           
           

        
          const a = state.dataContentOrg2.filter((x) => {
           return x.Dr_name === state.selectObj[state.isScreen]["docter"]
          }).filter((x) => {
            if ( state.selectObj[state.isScreen]["sentDate"]) {
               return dayjs(x.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD") === state.selectObj[state.isScreen]["sentDate"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if ( state.selectObj[state.isScreen]["templateName"]) {
               return x["Approved_Email_Template_vod__r.Name"]  === state.selectObj[state.isScreen]["templateName"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if ( state.selectObj[state.isScreen]["flagmentName"]) {
               return x["Email_Fragments_vod__r.Name"]  === state.selectObj[state.isScreen]["flagmentName"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if (evt.target.dataset.kinds === "Last_Open_Date_vod__c" || evt.target.dataset.kinds === "Last_Click_Date_vod__c") {
            return x["Last_Open_Date_vod__c"] ===  _obj.Last_Open_Date_vod__c && x["Last_Click_Date_vod__c"] ===  _obj.Last_Click_Date_vod__c
            } else {
            return true  
            }
          
          })

          console.log(a);


        
 for (const element of a) {
   element.isActive = true
 }

  //          const open = a.map((p) => p["Open_Count_vod__c"]).filter((v) => v)
  //          const click = a.map((p) => p["Click_Count_vod__c"]).filter((v) => v)

  //          console.log(open);
  //          console.log(click);
           
           

  //          const sum = open.reduce((sum, num) => Number(sum) + Number(num), 0);
  //          const sum2 = click.reduce((sum, num) => Number(sum) + Number(num), 0);
  //          const sum3 = sum + sum2
            

  //  _obj = `<span class="fwb">${a.length * 2}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum3.toLocaleString()}</span>`;


          // const items = document.querySelectorAll("#my-chart3 .call-list-data-item");
          //  for (const item of items) {
          //  item.classList.remove("on");
          //   item.classList.add("no-active");
          //  }



          //  const items2 = parentElment.querySelectorAll("#my-chart3 .call-list-data-item");
          //  console.log(items2);
          //  console.log(_obj);


           //  const number = [];

     

           

          



  


           console.log(a);
           


          

          // for (const item of items2) {
          //   item.classList.remove("no-active");
          //   item.classList.add("on");
           
          // }

          // if (items2.length > 1) {
          //   const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
          //   _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
          // }


      
         }
        
  
}
      setPouUp2_2(_obj, text, evt);


      // }
    };

    const onTapTarget2_3 = async(_obj, index, evt) => {

      if (state.isScreen === "集計画面") {

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

         (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: index,
      }),
        (state.isHoverFlag = false);

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }

      creatData(state.data,false);
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }
      
        setPouUp2_3(_obj, index, evt);
      } else {
        const item2 = document.querySelectorAll("#my-chart .call-list-data-item.no-active");
        const items = document.querySelectorAll("#my-chart .call-list-data-item");
        const items3 = document.querySelectorAll("#my-chart .call-list-data-item.on");

        for (const item of items) {
            item.classList.add("no-active");
          }
          evt.target.classList.remove("no-active");
          evt.target.classList.add("on");

           (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: index,
      }),
        (state.isHoverFlag = false);

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }

      creatData(state.data,false);
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }

          
          setPouUp2_3(_obj, index, evt);
      }

       }else if (state.isScreen === "送付先詳細") {

            const items4 = document.querySelectorAll("#my-chart2 .call-list-title.on");
      for (const item of items4) {
        item.classList.remove("on");
      }

      const items2 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");

      for (const item of items2) {
        item.classList.remove("on");
      }

      if (evt.target.classList.contains("no-active")) {
        const items = document.querySelectorAll("#my-chart2 .call-list-data-item");
        for (const item of items) {
          item.classList.add("no-active");
        }

        evt.target.classList.remove("no-active");
        evt.target.classList.add("on");
        console.log("_obj");
        
        console.log(_obj);
        

         (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: index,
         MR:_obj.MR
      }),
        (state.isHoverFlag = false);

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }

      creatData(state.data,false);
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }
      
        setPouUp2_3(_obj, index, evt);
      } else {
        const item2 = document.querySelectorAll("#my-chart2 .call-list-data-item.no-active");
        const items = document.querySelectorAll("#my-chart2 .call-list-data-item");
        const items3 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");

       for (const item of items) {
            item.classList.add("no-active");
          }
          evt.target.classList.remove("no-active");
          evt.target.classList.add("on");

          console.log("_obj");
        
        console.log(_obj);

           (state.selectObj[state.isScreen] = {
        Category: evt.target.dataset.kinds,
        Value: index,
        MR:_obj.MR
      }),
        (state.isHoverFlag = false);

      if (state.isScreen == "集計画面") {
        state.selectedObj.施設名.list = {
          すべて: "すべて",
        };

        state.selectedFilterItems3.施設名 = ["すべて"];

        state.isScreen = "送付先詳細";
        state.selectedFilterScreenItems["画面"] = "送付先詳細";
      } else {
        state.isScreen = "送付内容";
        state.selectedFilterScreenItems["画面"] = "送付内容";
      }

      creatData(state.data,false);
      if (state.iScrollObj) {
        state.iScrollObj.refresh();
      }

          
          setPouUp2_3(_obj, index, evt);
      }

      } else if (state.isScreen === "送付内容") {

        console.log(_obj);
        console.log(index);

          (state.selectObj[state.isScreen] = {
            docter: "",
            分類: "",     
        sentDate: "",
        templateName: "",
            flagmentName: "",
    Last_Click_Date_vod__c: false,
            Last_Open_Date_vod__c: false,    
           })
        
        

          const itemParent = document.querySelector(".title-wrap.on");
        if (itemParent) {
          itemParent.classList.remove('on')
        }

         const items4 = document.querySelectorAll("#my-chart3 .call-list-title.on");
         
          
           for (const item of items4) {
            
            item.classList.remove("on");
          
          }

           for (const element of state.dataContentOrg2) {
           element.isClickActive = false
             element.isOpenActive = false 
           element.isActive = false   
           }

           await nextTick()
        
        if (evt.target.classList.contains("on")) {
           evt.target.classList.remove("on");
   
          
          
           // const items = document.querySelectorAll("#my-chart3 .call-list-data-item.no-active");
          // const items2 = document.querySelectorAll("#my-chart3 .call-list-data-item.on");
          // for (const item of items) {
          //   item.classList.remove("no-active");
          // }

          // for (const item of items2) {
          //   item.classList.remove("on");
          // }

          // state.isHoverFlag = false;
         } else {



          const items3 = document.querySelector("#my-chart3 .call-list-data-item.on");
        if (items3) {
          items3.classList.remove('on')
        }
        
         setPouUp2_3(_obj, index, evt);
        

         evt.target.classList.add("on")

        



      
          }
         
 

       }
  

      // }
    };

    const onHoverItem2_2 = (_obj, text, evt) => {
      if (evt.target.classList.contains("on")) {
        state.isHoverFlag = true;
      }

      let items2

      if (state.isScreen === "集計画面") {
        items2 = document.querySelectorAll("#my-chart .call-list-data-item.on");

              const number = [];

      if (items2) {
        for (const item of items2) {
        number.push(item.textContent);
        }

        console.log('number');
        
        console.log(number);
        console.log(items2);
        
        

      
 
      if (items2.length > 1) {
        const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
        _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
        }
      }

      } else if (state.isScreen === "送付先詳細") {
        items2 = document.querySelectorAll("#my-chart2 .call-list-data-item.on");

              const number = [];

      if (items2) {
        for (const item of items2) {
        number.push(item.textContent);
        }

        console.log('number');
        
        console.log(number);
        console.log(items2);
        
        

      
 
      if (items2.length > 1) {
        const sum = number.reduce((sum, num) => Number(sum) + Number(num), 0);
        _obj = `<span class="fwb">${items2.length}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum.toLocaleString()}</span>`;
        }else {
        _obj = ""
      }
      } 


      } else if (state.isScreen === "送付内容") {

       console.log('a') 


       if (evt.target.dataset.kinds === "docter") {

            
      
            (state.selectObj2[state.isScreen] = {
             docter: text,
             })
   

           } else if (evt.target.dataset.kinds === "kind") {
        
        for (const key in _obj) {
          for (const key2 in _obj[key]) {
            for (const key3 in _obj[key][key2]) {
               for (const element of _obj[key][key2][key3]) {
            
            (state.selectObj2[state.isScreen] = {
              docter: element.Dr_name,
              分類: text,
             })
          }
             } 
          
         }
        }  
       }
       else if (evt.target.dataset.kinds === "sentDate") {
        if (text ==="NULL") {
          text = null
        }  
        for (const key in _obj) {
         for (const key2 in _obj[key]) {
          for (const element of _obj[key][key2]) {
            (state.selectObj2[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: text,
             })
          }
         }
        }  
           }
            else if (evt.target.dataset.kinds === "templateName")  {
        for (const key in _obj) {
         for (const element of _obj[key]) {
          (state.selectObj2[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: text,
             })
         }
        }  
           }else if (evt.target.dataset.kinds === "flagmentName")  {
         for (const element of _obj) {
          (state.selectObj2[state.isScreen] = {
              docter: element.Dr_name,
              sentDate: dayjs(element.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
               templateName: element["Approved_Email_Template_vod__r.Name"],
              flagmentName: text,
             })
         } }else if (evt.target.dataset.kinds === "Last_Open_Date_vod__c") {
              (state.selectObj2[state.isScreen] = {
              docter: _obj.Dr_name,
              sentDate: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: _obj["Approved_Email_Template_vod__r.Name"],
              flagmentName: _obj["Email_Fragments_vod__r.Name"],
              })

            //  _obj.isActive = true
             text =  _obj.Last_Open_Date_vod__c ? dayjs(_obj["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL"
           }
           else if (evt.target.dataset.kinds === "Last_Click_Date_vod__c") {
              (state.selectObj2[state.isScreen] = {
              docter: _obj.Dr_name,
              sentDate: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD"),
              templateName: _obj["Approved_Email_Template_vod__r.Name"],
              flagmentName: _obj["Email_Fragments_vod__r.Name"],
              })

            //  _obj.isActive = true
             text =  _obj.Last_Click_Date_vod__c ? dayjs(_obj["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "NULL"
       }
           



           
           

        
          const a = state.dataContentOrg2.filter((x) => {
           return x.Dr_name === state.selectObj2[state.isScreen]["docter"]
          }).filter((x) => {
            if ( state.selectObj2[state.isScreen]["sentDate"]) {
               return dayjs(x.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY-MM-DD") === state.selectObj2[state.isScreen]["sentDate"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if ( state.selectObj2[state.isScreen]["templateName"]) {
               return x["Approved_Email_Template_vod__r.Name"]  === state.selectObj2[state.isScreen]["templateName"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if ( state.selectObj2[state.isScreen]["flagmentName"]) {
               return x["Email_Fragments_vod__r.Name"]  === state.selectObj2[state.isScreen]["flagmentName"]
            } else {
            return true  
            }
          
          })
          .filter((x) => {
            if (evt.target.dataset.kinds === "Last_Open_Date_vod__c" || evt.target.dataset.kinds === "Last_Click_Date_vod__c") {
            return x["Last_Open_Date_vod__c"] ===  _obj.Last_Open_Date_vod__c && x["Last_Click_Date_vod__c"] ===  _obj.Last_Click_Date_vod__c
            } else {
            return true  
            }
          
          })


           const open = a.map((p) => p["Open_Count_vod__c"]).filter((v) => v)
           const click = a.map((p) => p["Click_Count_vod__c"]).filter((v) => v)

           console.log(open);
           console.log(click);
           
           

           const sum = open.reduce((sum, num) => Number(sum) + Number(num), 0);
           const sum2 = click.reduce((sum, num) => Number(sum) + Number(num), 0);
           const sum3 = sum + sum2
            

      _obj = `<span class="fwb">${a.length * 2}</span>個の項目を選択済み・カウント(移行済みデータ)の合計:<span class="fwb">${sum3.toLocaleString()}.00</span>`;  
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

      if (state.isScreen === "集計画面") {
         state.popupData = {
        MR: _obj.MR,
        エリア: _obj.エリア,
        テリトリー名: _obj.テリトリー名,
        営業部: _obj.営業部,
        "移行済みデータ のカウント": _obj.Total,
      };
      } else if (state.isScreen === "送付先詳細") {
        state.popupData = {
            Dr_name: _obj.Dr_name,
        HP_name: _obj.HP_name,
          MR: _obj.MR,  
        "移行済みデータ のカウント": _obj.Total,
      };
      }else if (state.isScreen === "送付内容") {
      
     if (evt.target.dataset.kinds == "クリック回数") {
       state.popupData = {
          メールテンプレート: _obj["Approved_Email_Template_vod__r.Name"],
          メール送付日: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD"),
          最終クリック日時: _obj.Last_Click_Date_vod__c ? dayjs(_obj["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "",
          最終開封日時:  _obj.Last_Open_Date_vod__c ? dayjs(_obj["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "",
          医師名: _obj.Dr_name == "NULL" ? "" : _obj.Dr_name,
          フラグメント: _obj["Email_Fragments_vod__r.Name"] == "NULL" ? "" : _obj["Email_Fragments_vod__r.Name"],
          Dr_DCF: _obj.Dr_DCF,
          HP_DCF: _obj.HP_DCF,
          施設名: _obj.HP_name,
          MR: _obj.MR,  
          MR_ID:_obj.MR_ID, 
          "クリック回数": _obj.Click_Count_vod__c,
      };
     } else {
     state.popupData = {
          メールテンプレート: _obj["Approved_Email_Template_vod__r.Name"],
          メール送付日: dayjs(_obj.Email_Sent_Date_vod__c).subtract(9, "h").format("YYYY/MM/DD"),
          最終クリック日時: _obj.Last_Click_Date_vod__c ? dayjs(_obj["Last_Click_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "",
          最終開封日時:  _obj.Last_Open_Date_vod__c ? dayjs(_obj["Last_Open_Date_vod__c"]).subtract(9, "h").format("YYYY-MM-DD HH:mm:ss") : "",
          医師名: _obj.Dr_name == "NULL" ? "" : _obj.Dr_name,
          フラグメント: _obj["Email_Fragments_vod__r.Name"] == "NULL" ? "" : _obj["Email_Fragments_vod__r.Name"],
          Dr_DCF: _obj.Dr_DCF,
          HP_DCF: _obj.HP_DCF,
          施設名: _obj.HP_name,
          MR: _obj.MR,  
          MR_ID:_obj.MR_ID, 
          "開封回数": _obj.Open_Count_vod__c,
      };  
     }
       
      }

     
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

             case "isHoverFlag21":
             state.isHoverFlag21 = true;
            
            break;

             case "isHoverFlag22":
             state.isHoverFlag22 = true;
            
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



      if (target === "エリア" || target === "営業部") {
        if (state.sortObj[target] === "default") {
          state.sortObj[target] = "ASC";
        } else if (state.sortObj[target] === "ASC") {
          state.sortObj[target] = "DESC";
        } else {
          state.sortObj[target] = "default";
        }
      } else {
        if (!state.sortObj["セカンド"][target]) {
          state.sortObj["セカンド"] = {};
          state.sortObj["セカンド"][target] = "ASC";
        } else {
          if (state.sortObj["セカンド"][target] === "ASC") {
            state.sortObj["セカンド"][target] = "DESC";
          } else if (state.sortObj["セカンド"][target] === "DESC") {
            state.sortObj["セカンド"] = {};
          }
        }
      }

      

      creatData(state.data,false);

      state.isHoverFlag2 = false;
      state.isHoverFlag3 = false;
      state.isHoverFlag4 = false;
      state.isHoverFlag5 = false;
      state.isHoverFlag6 = false;
      state.isHoverFlag7 = false;

      // }
    };

    const onTapSort2 = async (evt) => {
      let target = evt.target.getAttribute('data-sort')
      if (!target) {
        target = "DATA";
      }

      if (target === "MR" || target === "施設名") {
        if (state.sortObj2[target] === "default") {
          state.sortObj2[target] = "ASC";
        } else if (state.sortObj2[target] === "ASC") {
          state.sortObj2[target] = "DESC";
        } else {
          state.sortObj2[target] = "default";
        }
      } else {
        if (!state.sortObj2["セカンド"][target]) {
          state.sortObj2["セカンド"] = {};
          state.sortObj2["セカンド"][target] = "ASC";
        } else {
          if (state.sortObj2["セカンド"][target] === "ASC") {
            state.sortObj2["セカンド"][target] = "DESC";
          } else if (state.sortObj2["セカンド"][target] === "DESC") {
            state.sortObj2["セカンド"] = {};
          }
        }
      }

      console.log(state.sortObj2);

      setTimeout(async () => {
        creatData(state.data,false);
      }, 1);

      // }
    };

    const onTapSort3 = async (evt) => {

     
      let target = evt.target.getAttribute('data-sort')
      if (!target) {
        target = "DATA";
      }

      if (target === "医師名" || target === "メール送付日" || target === "メールテンプレート"|| target === "フラグメント"|| target === "分類") {
        if (state.sortObj3[target] === "default") {
          state.sortObj3[target] = "ASC";
        } else if (state.sortObj3[target] === "ASC") {
          state.sortObj3[target] = "DESC";
        } else {
          state.sortObj3[target] = "default";
        }
      } else {
        if (!state.sortObj3["セカンド"][target]) {
          state.sortObj3["セカンド"] = {};
          state.sortObj3["セカンド"][target] = "ASC";
        } else {
          if (state.sortObj3["セカンド"][target] === "ASC") {
            state.sortObj3["セカンド"][target] = "DESC";
          } else if (state.sortObj3["セカンド"][target] === "DESC") {
            state.sortObj3["セカンド"] = {};
          }
        }
      }

      console.log(state.sortObj3);


       state.isHoverFlag17 = false;
      state.isHoverFlag18 = false;
        state.isHoverFlag19 = false;
       creatData(state.data,"false2");
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
             docter: "",
             分類: "",      
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
 
console.log(state.selectObj);

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

    creatDataFlagment(target, false);

    creatDataProduct(target, false);
   
    creatData(target,false);
     
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
      onTapSelectBoxItem2,
      onTapClearButton,
      getShareName,
      onTapOutside,
      getSpareClass,
      onHoverItem2_2,
      onHoverItem2_2_2,
      onHoverItem2_3,
      onTapTarget2_2,
      onTapTarget2_3,
      onTapSelectBoxItemCall,
      onTapSelectBoxItemScreen,
      onTapSort,
      onTapSort2,
      onTapSort3,
      onTapDataHeader,
      onTapSortVisible
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

#my-chart2 .bar {
  --labels-size: 100%;
  --color: #4e79a7;
}

#my-chart2 .column {
  --color: blue;
}

.title {
  text-align: center;
      font-size: 21px;
    line-height: 29px;
    color: rgb(102, 102, 102);
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
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
}

.filter-wrapper {
  padding-right: 15px;
  padding-left: 15px;
}

.filter-area {
  display: flex;
  flex-wrap: wrap;

  &-text {
    width: 40%;
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    margin-bottom: 13px;
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

    &2{
      max-width: 1300px;
    }

    &3{
      max-width: 1190px;
    }

    &-main {
      flex: 1;

      &-header {
        margin: 0 5px;

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
          
          

          .call-list {

            position: relative;

            &3{
              font-size: 18px;
              text-align: center;
            }

            &7{
              font-size: 10pt;
              text-align: center;
              align-items: center;
              min-height: 27px;
            }

            &8{
              font-size: 10pt;
              text-align: center;
               align-items: center;
              min-height: 27px;
            }

            &9{
              font-size: 10pt;
              text-align: center;
               align-items: center;
              min-height: auto;
              min-height: 27px;
            }

             &10{
              font-size: 10pt;
              text-align: center;
               align-items: center;
              min-height: auto;
              min-height: 27px;
            }

            &11{
              font-size: 10pt;
              text-align: center;
               align-items: center;
              min-height: auto;
              min-height: 27px;
            }

          
        }

        }
      }
    }

    &-wrap {
      margin-bottom: 10px;
      height: calc(100vh - 325px);

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
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    &2 {
      width: 130px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    &2-2 {
      width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    &3 {
      width: 230px;
      padding-left: 5px;
      padding-right: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &_2{
        text-align: center;
      }
    }

    &4 {
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

     &6 {
      width: 170px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }


     &7 {
      width: 85px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 12px;
       display: flex;
      justify-content: center;
      padding: 0 3px;

      & span {
        height: 116px;
        display: flex;
        align-items: center;
        pointer-events: none;
      }

    }

    &12 {
      width: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 12px;
       display: flex;
      justify-content: center;
      padding: 0 3px;

      & span {
        height: 116px;
        display: flex;
        align-items: center;
        pointer-events: none;
      }

    }

    &8 {
      width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 12px;
       display: flex;
      justify-content: center;
      padding: 0 3px;

      & span {
        height: 116px;
        display: flex;
        align-items: center;
         pointer-events: none;
      }
    }

     &9 {
      width: 130px;
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
      width: 610px;
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


}

.sort-button {
      position: absolute;
    width: 15px;
    height: 15px;
    right: 0;
    top: 6px;
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
    width: 165px;
  }
}

@media screen and (min-width: 1100px) {
  .call-list10  {
    width: 215px;
  }
}

@media screen and (min-width: 1150px) {
  .call-list10  {
    width: 265px;
  }
}


</style>
