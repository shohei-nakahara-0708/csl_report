import { defineStore, acceptHMRUpdate } from 'pinia'
import {
  SET_ERROR_DETAIL,
  UPD_ERROR_DETAIL,
  UPD_TOP_PANEL,
  UPD_HELP_POPUP,
  UPD_EMAIL_SALSES
} from '@/constants'


interface ApplicationState {
  googleAnalytics: any
  isLoadComplete: boolean
  errorDetail: Array<string>
  shouldShowTopPanel: boolean
  shouldShowHelpPopup: boolean
  shouldShowDetailsPanel: boolean
  shouldShowAccountNoteHospPopup: boolean
  shouldShowD2DCalendarPopup: boolean
  shouldShowCalendarEventDetailPopup: boolean
  shouldShowPreferenceHelpPopup: boolean
  shouldShowAllAcademicInfoPopup: boolean
  shouldShowPmsCaseCardPopup: boolean
  selectEmailSalses: any
}

export const useApplicationStore = defineStore({
  id: 'ApplicationStore',
  state: (): ApplicationState => ({
    googleAnalytics: null,
    isLoadComplete: false,
    errorDetail: [],
    shouldShowTopPanel: true,
    shouldShowHelpPopup: false,
    shouldShowDetailsPanel: false,
    shouldShowAccountNoteHospPopup: false,
    shouldShowD2DCalendarPopup: false,
    shouldShowCalendarEventDetailPopup: false,
    shouldShowPreferenceHelpPopup: false,
    shouldShowAllAcademicInfoPopup: false,
    shouldShowPmsCaseCardPopup: false,
    selectEmailSalses:null,
  }),
  getters: {
    /**
     * エラー内容を返却する
     */
    ErrorDetail: (state): Array<string> => state.errorDetail,
    /**
     * TOPパネル表示フラグを返却する
     */
    getShouldShowTopPanel: (state): boolean => state.shouldShowTopPanel,
    /**
     * HELPポップアップ表示フラグを返却する
     */
    getShouldShowHelpPopup: (state): boolean => state.shouldShowHelpPopup,
    /**
     * 詳細パネル表示フラグを返却する
     */
    getShouldShowdetailsPanel: (state): boolean => state.shouldShowDetailsPanel,
    /**
     * 施設Suggestionポップアップ表示フラグを返却する
     */
    getShouldShowAccountNoteHospPopup: (state): boolean => state.shouldShowAccountNoteHospPopup,

    /**
     * D2Dカレンダー表示フラグを返却する
     */
    getShouldShowD2DCalendarPopup: (state): boolean => state.shouldShowD2DCalendarPopup,

    /**
     * カレンダーのイベント詳細表示フラグを返却する
     */
    getShouldShowCalendarEventDetailPopup: (state): boolean => state.shouldShowCalendarEventDetailPopup,

    /**
     * カレンダーのイベント詳細表示フラグを返却する
     */
    getShouldShowPreferenceHelpPopup: (state): boolean => state.shouldShowPreferenceHelpPopup,

    /**
     * 学会発表情報表示フラグを返却する
     */
    getShouldShowAllAcademicInfoPopup: (state): boolean => state.shouldShowAllAcademicInfoPopup,

    /**
     * PMS調査状況表示フラグを返却する
     */
    getShouldShowPmsCaseCardPopup: (state): boolean => state.shouldShowPmsCaseCardPopup,

    /**
     * PMS調査状況表示フラグを返却する
     */
    getSelectEmailSalses: (state): any => state.selectEmailSalses,

    
  },
  actions: {
 
    /**
     * エラー内容の設定
     */
    [SET_ERROR_DETAIL](payload: any) {
      this.errorDetail.push(payload)
    },
    [UPD_ERROR_DETAIL]() {
      this.errorDetail = []
    },
    /**
     * TOPパネル表示フラグ反映
     */
    [UPD_TOP_PANEL](flag: boolean) {
      this.shouldShowTopPanel = flag
    },

    /**
     * TOPパネル表示フラグ反映
     */
    [UPD_HELP_POPUP](flag: boolean) {
      this.shouldShowHelpPopup = flag
    },

    /**
     * TOPパネル表示フラグ反映
     */
    [UPD_EMAIL_SALSES](flag: any) {
      this.selectEmailSalses = flag
    },

  },
})

if (module.hot) {
  module.hot.accept(acceptHMRUpdate(useApplicationStore, module.hot))
}
