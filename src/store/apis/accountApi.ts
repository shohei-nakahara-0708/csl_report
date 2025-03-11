import { ACCOUNT__GET_ACCOUNT, ACCOUNT__GET_CHILD_ACCOUNT, ACCOUNT__GET_ACADEMY, ACCOUNT__GET_SPECIALIST, ACCOUNT__GET_WORK_HISTORY } from '@/constants'

export default {
  /**
   * 施設医師の取得処理
   */
  [ACCOUNT__GET_ACCOUNT](): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      window.ds
        .queryRecord('ContentVersion', ['Id'].join(','), null, ['Id,ASC'])
        .then((result) => {
          console.info(result)
          if (result.success) {
            resolve(result.ContentVersion)
          } else {
            const err = Error('ContentVersionの取得に失敗しました。')
            reject(err)
          }
        })
        .catch((result) => {
          reject(result)
        })
    })
  },

}
