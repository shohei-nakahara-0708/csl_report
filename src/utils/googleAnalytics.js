/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class GoogleAnalytics {
  /**
   * https://developers.google.com/analytics/devguides/collection/protocol/v1/?hl=ja
   * https://ga-dev-tools.appspot.com/hit-builder/
   * @param {*} _env
   * @param {*} _debug
   */

  // constructor (_userName, _bu, _debug) {
    
  // }

  postingLogData(args) {
    const currentDate = new Date()
    // 日時の情報を取得
    let year = currentDate.getFullYear() // 年
    let month = currentDate.getMonth() + 1 // 月（0から始まるため、+1する）
    let day = currentDate.getDate() // 日
    let hours = currentDate.getHours() // 時
    let minutes = currentDate.getMinutes() // 分
    let seconds = currentDate.getSeconds() // 秒

    // 数値が1桁の場合に頭に0をつける関数
    const addLeadingZero = (value) => {
      return value < 10 ? '0' + value : value
    }

    // 1桁の場合に頭に0をつける
    month = addLeadingZero(month)
    day = addLeadingZero(day)
    hours = addLeadingZero(hours)
    minutes = addLeadingZero(minutes)
    seconds = addLeadingZero(seconds)

    // 数字として足されないように、各変数を文字列として連結する
    let savedCurrentDate = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds
    
    // GA4送信
    window.gtag('event', 'Veeva_CRM_Report', {
        user_sfid: args.userID,
        report_page_name: args.pageName,
        display_time: savedCurrentDate
    });
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
