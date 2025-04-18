import {
  USER__GET_CURRENT_USER,
  USER__GET_CURRENT_USER_PROFILE,
  USER__GET_USER,
  USER__GET_ALL_USER,
} from '@/constants'
import { User, } from '@/models/user'

export default {
  /**
   * カレントユーザーの取得処理
   */
  [USER__GET_CURRENT_USER](): Promise<string> {
    return new Promise((resolve, reject) => {
      window.ds.getDataForCurrentObject('User', 'ID').then((result) => {
        if (result.success) {
          resolve(result.User.ID)
        } else {
          const err = Error('カレントユーザーの取得に失敗しました。')
          reject(err)
        }
      })
    })
  },

  /**
   * カレントユーザーのプロファイル名取得処理
   */
  [USER__GET_CURRENT_USER_PROFILE](): Promise<string> {
    return new Promise((resolve) => {
      window.ds.getDataForCurrentObject('User', 'Profile_Name_vod__c').then((result) => {
        if (result.success) {
          resolve(result.User.Profile_Name_vod__c)
        } else {
          resolve('JP_MR')
        }
      })
    })
  },

  /**
   * ユーザーの取得処理
   */
  [USER__GET_USER](_id: string): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      window.ds
        .queryRecord(
          'User',
          ['ID', 'Name', 'IsActive', 'EmployeeNumber', 'Username', 'ManagerId', 'Profile_Name_vod__c'].join(','),
          `IsActive = 1 AND (ID = "${_id}" OR ManagerId = "${_id}")`,
        )
        .then((result) => {
          if (result.success) {
            resolve(result.User)
          } else {
            const err = Error('ユーザーの取得に失敗しました。')
            reject(err)
          }
        })
        .catch((result) => {
          reject(result)
        })
    })
  },
  /**
   * ユーザーの取得処理
   */
  [USER__GET_ALL_USER](): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      window.ds
        .queryRecord('User', ['ID', 'Name', 'IsActive', 'EmployeeNumber', 'Username', 'ManagerId', 'Profile_Name_vod__c','MSD_CORE_Preferred_Name__c'].join(','), `IsActive = 1`, [

        ])
        .then((result) => {
          // console.info(result)
          if (result.success) {
            resolve(result.User)
          } else {
            const err = Error('ユーザーの取得に失敗しました。')
            reject(err)
          }
        })
        .catch((result) => {
          reject(result)
        })
    })
  },
}
