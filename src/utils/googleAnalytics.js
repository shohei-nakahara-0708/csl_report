/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */

export class GoogleAnalytics {
  /**
   * https://developers.google.com/analytics/devguides/collection/protocol/v1/?hl=ja
   * https://ga-dev-tools.appspot.com/hit-builder/
   * @param {*} _env
   * @param {*} _debug
   */

  // constructor (_userName, _bu, _debug) {
    
  // }

  postingLogData (args) {
    // GA4送信
    // window.gtag("event", "view_item_list", {
    //   item_list_id: this.GA_IS_PRODUCTION,
    //   item_list_name: "CxO",
    //   items: [
    //     {
    //       item_id: args.ec,
    //       affiliation: "Event",
    //       coupon: args.uid,
    //       creative_name:args.cd2,
    //     }
    //   ]
    // });
    // console.log('onTapOutside')
  }

  _appendToLocalStorage (_postParam) {
    /** ローカルストレージよりデータを取得 */
    const restoreLocalStorage = window.localStorage.getItem(this.googleAnalyticsLocalStorageKey)
    /** 登録データ格納変数 */
    const insData = []

    if (restoreLocalStorage) {
      /** ローカルストレージよりデータが取得できた場合 */
      Array.prototype.push.apply(insData, JSON.parse(restoreLocalStorage))
    }

    Array.prototype.push.apply(insData, [_postParam])

    /** 一旦削除 */
    window.localStorage.removeItem(this.googleAnalyticsLocalStorageKey)

    /** 登録 */
    window.localStorage.setItem(this.googleAnalyticsLocalStorageKey, JSON.stringify(insData))
  }
}
