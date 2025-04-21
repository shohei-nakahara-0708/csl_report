import { defineStore, acceptHMRUpdate } from 'pinia'
import user from '@/store/apis/userApi'
import {
  USER__GET_CURRENT_USER,
  USER__GET_CURRENT_USER_PROFILE,
  USER__GET_USER,
  USER__GET_ALL_USER,
} from '@/constants'
import { UserList } from '@/models/user'

interface UserState {
  currentProfileName: string
  currentUserId: string
  selectUserId: string
  userList: UserList
  userAllList: UserList
}

export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => ({
    /** ユーザー系 */
    currentProfileName: null,
    currentUserId: null,
    selectUserId: null,
    userList: {},
    userAllList: {},
  }),
  getters: {
    /**
     * カレントユーザーIDを返却する
     */
    getCurrentUserId: (state): string => {
      return state.currentUserId
    },
    /**
     * カレントユーザーIDを返却する
     */
    getAllUser: (state) => (id) => {
      return state.userAllList[id] || {}
    },

  },
  actions: {
    /**
     * カレントユーザープロファイル名の取得処理
     */
    async [USER__GET_CURRENT_USER_PROFILE](): Promise<void> {
      const ret = await user[USER__GET_CURRENT_USER_PROFILE]()
      this.currentProfileName = ret
    },

    /**
     * カレントユーザーの取得処理
     */
    async [USER__GET_CURRENT_USER](): Promise<void> {
      const ret = await user[USER__GET_CURRENT_USER]()
      this.currentUserId = ret
    },

    /**
     * ユーザーデータの取得処理
     */
    async [USER__GET_USER](): Promise<void> {
      const ret = await user[USER__GET_USER](this.currentUserId)
      const ret2 = await user[USER__GET_ALL_USER]()
      for (const rec of ret) {
        this.userList[rec.ID] = rec
      }
      for (const rec of ret2) {
        this.userAllList[rec.ID] = rec
      }
      this.selectUserId = Object.values(this.userList as UserList)[0].ID
    },
  },
})

if (module.hot) {
  module.hot.accept(acceptHMRUpdate(useUserStore, module.hot))
}
