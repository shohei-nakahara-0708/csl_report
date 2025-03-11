import { defineStore, acceptHMRUpdate } from 'pinia'
import {
  ACCOUNT__GET_WORK_HISTORY,
  ACCOUNT__USER_MASTER,
  JSON__CALL_DATA,
  JSON__CALL_DATA_NEW,
  JSON__EMAIL_DATA,
  JSON__EMAIL_DATA2,
  JSON__EMAIL_DATA_NEW,
  JSON__EMAIL_DATA_NEW2,
  JSON__MEDIA_DATA,
   JSON__MEDIA_DATA_NEW,
  ACCOUNT__GET_ACCOUNT
} from '@/constants'
import account from '@/store/apis/accountApi'

  

import { useApplicationStore } from '@/store/modules/applicationModule'
import dayjs from 'dayjs'
import { NULL } from 'sass';

interface AccountState {
  currentAccountId: string
  currentfacilityAccountId: string
  sentEmailList: any
  sentEmailListDetail: any
  sentEmailAccountList: any
   MRListOrg: any
  MRList: any
  MRListById:any
  DrList: any
  CallList: any
  CallListNew: any
  CallListOrg: any
  CallListOrgNew: any
  EmailList: any
  EmailListNew: any
  EmailList2: any
  EmailListNew2: any
  MediaList: any
  MediaListNew: any
  EmailListContent: any
  EmailListContentNew: any
  EmailAccountList: any
  EmailAccountObj: any
}

export const useAccountStore = defineStore({
  id: 'Account',
  state: (): AccountState => ({
    currentAccountId: null,
    currentfacilityAccountId: null,
    sentEmailList: {},
    sentEmailListDetail: {},
    sentEmailAccountList: [],
    MRListOrg: [],
    MRList: {},
    MRListById: {},
    DrList: {},
    CallList: {},
    CallListNew: {},
    CallListOrg: [],
    CallListOrgNew: [],
    EmailList: {},
    EmailList2: {},
    EmailListNew: {},
    EmailListNew2: {},
    MediaList: null,
    MediaListNew: null,
    EmailListContent: {},
    EmailListContentNew: {},
    EmailAccountList: [],
    EmailAccountObj:{}
  }),
  getters: {
    /**
     * 選択中の施設医師のID（Child Account）を返却する
     */
    getCurrentAccountId: (state) => {
      return state.MRList
    },

    getCallKeyMessageList: (state) =>{
      return state.MediaList
    },

    getCallKeyMessageListNew: (state) =>{
      return state.MediaListNew
    },

     getsentCallListOrg: (state) =>{
      return state.CallListOrg
    },
     
    getsentCallListOrgNew: (state) =>{
      return state.CallListOrgNew
    },

    getsentCallList: (state) =>{
      return state.CallList
    },

      getsentCallListByKey: (state) => (key) =>{
      return state.CallList[key]
    },
       getsentCallListByKeyNew: (state) => (key) =>{
      return state.CallListNew[key]
    },
      
      getsentEmailListByKey: (state) => (key) =>{
      return state.EmailList[key]
    },
      
        getsentEmailList2ByKey: (state) => (key) =>{
      return state.EmailList2[key]
    },
        
      
        getsentEmailListContentByKey: (state) => (key) =>{
      return state.EmailListContent[key]
    },
        
          getsentEmailListByKeyNew: (state) => (key) =>{
      return state.EmailListNew[key]
    },
      
        getsentEmailList2ByKeyNew: (state) => (key) =>{
      return state.EmailListNew2[key]
    },
        
      
        getsentEmailListContentByKeyNew: (state) => (key) =>{
      return state.EmailListContentNew[key]
    },

    getsentEmailList: (state) => {
      return state.sentEmailList
    },

     getsentEmailListDetail: (state) => (key) =>{
      return state.sentEmailListDetail[key]
    },

    getsentEmailAccountList: (state) => {
      return state.EmailAccountList.sort((a, b) => {
        return a.localeCompare(b, 'ja');
      })
    },
    getsentEmailAccountObj: (state) => {
      return state.EmailAccountObj
    },

    
  },
  actions: {


  async [ACCOUNT__GET_ACCOUNT](): Promise<void> {
      const ret = await account[ACCOUNT__GET_ACCOUNT]()

      console.log(ret);
      
    },



    async [ACCOUNT__USER_MASTER](masterDataUser, masterData): Promise<void> {
    

      const masterDatamasterDataUser = []


      // const masterDataListSrt = JSON.stringify(masterData)
      // const masterDataList = JSON.parse(masterDataListSrt)

      // const masterDataUserListStr = JSON.stringify(masterDataUser)
      // const masterDataUserList = JSON.parse(masterDataUserListStr)

      //  const masterDataContact = masterDataList.filter(ary1row=>masterDataUserList.filter(
      // ary2row=>
      //      ary2row.MR_ID === ary1row.MR_ID).filter(
      //        (x) => {
      //       return ary1row.VeevaId = x.VeevaId
               
      //       }
      //     ));
      


      // for (const element of masterDataList) {
      //   if (!this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]) {

      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`] = {};
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["営業部"] = element["営業部"]
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["エリア"] = element["エリア"]
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["テリトリー名"] = element["テリトリー名"]
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["MR"] = element["MR"]
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["Dr_name"] = element["Dr_name"]
      //     this.MRListOrg[`${element["VeevaId"]}_${element["テリトリー名"]}`]["HP_name"] = element["HP_name"]
      //   }
      // }

      // console.log(this.MRListOrg);
      
      
      

      for (const element in masterDataUser) {
        if (!this.MRList[masterDataUser[element]["VeevaId"]]) {
          this.MRList[masterDataUser[element]["VeevaId"]] = {};
          
          this.MRList[masterDataUser[element]["VeevaId"]]["営業部"] = masterDataUser[element]["営業部"]
          this.MRList[masterDataUser[element]["VeevaId"]]["エリア"] = masterDataUser[element]["エリア名"]
          this.MRList[masterDataUser[element]["VeevaId"]]["テリトリー名"] = masterDataUser[element]["テリトリー名"]
           this.MRList[masterDataUser[element]["VeevaId"]]["MR"] = masterDataUser[element]["MR name"]
        }

      }
      
      console.log(this.MRList);
      

      for (const element in masterData) {

         if (!this.DrList[masterData[element]["Dr_name"]]) {
          this.DrList[masterData[element]["Dr_name"]] = {};
          
          this.DrList[masterData[element]["Dr_name"]]["HP_name"] = masterData[element]["HP_name"]
        }
        

       
      }


      

      
    },


    async [JSON__CALL_DATA](callData): Promise<void> {

      console.log(callData);
      


       const ApplicationStore = useApplicationStore()


      ApplicationStore.isLoadComplete = false

      

      
      

      

      // console.log('a');
      


      // const parentCall = callList3.filter((x) => {
      //       if (x.Is_Parent_Call_vod__c === "1") {
      //         return true;
      //       } else {
      //         return false
      //       }
      // })
      // .filter((x) => {
      //       if (x.Attendee_Type_vod__c === "Person_Account_vod") {
      //         return true;
      //       } else {
      //         return false
      //       }
      // })

      // const childCall = callList3.filter((x) => {
      //       if (x.Is_Parent_Call_vod__c === "0") {
      //         return true;
      //       } else {
      //         return false
      //       }
      // })
      // .filter((x) => {
      //       if (!x["Account_vod__r.CSLB_National_ID_1__c"]) {
      //         return false;
      //       } else {
      //         return true
      //       }
      // })
      // .filter((x) => {
      //       if (x.Attendee_Type_vod__c === "Person_Account_vod") {
      //         return true
      //       } else {
      //         return false
      //       }
      // })

      // const childCall2 = callList3.filter((x) => {
      //       if (x.Is_Parent_Call_vod__c === "0") {
      //         return true;
      //       } else {
      //         return false
      //       }
      // })
      // .filter((x) => {
      //       if (!x["Account_vod__r.CSLB_National_ID_1__c"]) {
      //         return false;
      //       } else {
      //         return true
      //       }
      // })
      // .filter((x) => {
      //       if (x.Attendee_Type_vod__c === "Group_Account_vod") {
      //         return true
      //       } else {
      //         return false
      //       }
      // })

      


      // const parentCallchildCall2 = parentCall.filter(ary1row=>childCall2.filter(
      // ary2row=>
      //     ary2row.Parent_Call_vod__c === ary1row.Id).length > 0);
      

      
      //    const childCallchildCall2 = childCall.filter(ary1row=>childCall2.filter(
      // ary2row=>
      //     ary2row.Parent_Call_vod__c === ary1row.Parent_Call_vod__c).length > 0);
      
      // const callData2 = parentCallchildCall2.concat(childCallchildCall2);



    // const test = callData2.filter(ary1row=>this.MRListOrg.filter(
    //   ary2row=>
    //        ary2row.MR_ID === ary1row.OwnerId && ary2row["Account_vod__r.CSLB_National_ID_1__c"] === ary1row.Dr_DCF).filter(
    //          (x) => {
    //         return ary1row.MR = x.MR , ary1row.営業部 = x.営業部
               
    //         }
    //       ));
      
      //   console.log(test);

      

      for (const element of callData) {
           
        const target = element["CSLB_Channel_Type__c"]
           

           if (!target) {
             element["CSLB_Channel_Type__c"] = "NULL"
           }
         




         

      if (!this.CallList[element["営業部"].trim()]) {
        this.CallList[element["営業部"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = {};
      }
         
         const date = `${dayjs(element["Call_Date_vod__c"]).format('YYYY/M')}`

      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date] = [];
      }
        

        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date].push(element)
         this.CallListOrg.push(element)
         }
      
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.CallList);
      
    },

        async [JSON__CALL_DATA_NEW](callData): Promise<void> {

      console.log(callData);
      


       const ApplicationStore = useApplicationStore()


      ApplicationStore.isLoadComplete = false

      
      

      for (const element of callData) {
           
        const target = element["CSLB_Channel_Type__c"]
           

           if (!target) {
             element["CSLB_Channel_Type__c"] = "NULL"
           }
         




         

      if (!this.CallListNew[element["営業部"].trim()]) {
        this.CallListNew[element["営業部"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = {};
      }
         
         const date = `${dayjs(element["Call_Date_vod__c"]).format('YYYY/M')}`

      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date] = [];
      }
        

        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date].push(element)
         this.CallListOrgNew.push(element)
         }
      
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.CallListNew);
      
    },
    


        async [JSON__EMAIL_DATA](emailData): Promise<void> {


       const ApplicationStore = useApplicationStore()


      ApplicationStore.isLoadComplete = false

 



    
      
      

         for (const element of emailData) {
         
    // if (!element['Dr_DCF'] ||!element['Dr_Target_Status'] ) {
    //         continue
           //        }

           let target = element["Dr_name"]
           

           if (!target) {
            target = "NULL"
           }

           if (!element["Email_Fragments_vod__r.Name"]) {
            element["Email_Fragments_vod__r.Name"] =  "NULL"
           }

          //  if (!element["Last_Open_Date_vod__c"]) {
          //   element["Last_Open_Date_vod__c"] =  "NULL"
          //  }

          //  if (!element["Last_Click_Date_vod__c"]) {
          //   element["Last_Click_Date_vod__c"] =  "NULL"
          //  }

            if (!this.EmailAccountObj[target]) {
            this.EmailAccountObj[target] = target;
            }
           
           
          if (!this.EmailAccountList.includes(target)) {
            this.EmailAccountList.push(target)
          }
         
      

      if (!this.EmailList[element["営業部"].trim()]) {
        this.EmailList[element["営業部"].trim()] = {};
      }
           
        if (!this.EmailList2[element["営業部"].trim()]) {
        this.EmailList2[element["営業部"].trim()] = [];
      }
         
      if (!this.EmailList[element["営業部"].trim()][element["エリア"].trim()]) {
        this.EmailList[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.EmailList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.EmailList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.EmailList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.EmailList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = [];
      }
           

           


        this.EmailList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()].push(element)
           this.EmailList2[element["営業部"].trim()].push(element)
           

          //       if (!element["Dr_DCF"] || !element["Dr_Target_Status"]) {
          //        continue
          //  }

      if (!this.CallList[element["営業部"].trim()]) {
        this.CallList[element["営業部"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = {};
      }
         
         const date = `${dayjs(element["Email_Sent_Date_vod__c"]).subtract(9, "h").format('YYYY/M')}`

      if (!this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date]) {
        this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date] = [];
      }
           
           element.CSLB_Channel_Type__c = "OnetoOne" 
           
      
            this.CallList[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date].push(element)

       
           
         }
      
    
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.EmailList);
      
    },
        
        
        async [JSON__EMAIL_DATA_NEW](emailData): Promise<void> {


       const ApplicationStore = useApplicationStore()


      ApplicationStore.isLoadComplete = false

 



    
      
      

         for (const element of emailData) {
         
    // if (!element['Dr_DCF'] ||!element['Dr_Target_Status'] ) {
    //         continue
           //        }

           let target = element["Dr_name"]
           

           if (!target) {
            target = "NULL"
           }

           if (!element["Email_Fragments_vod__r.Name"]) {
            element["Email_Fragments_vod__r.Name"] =  "NULL"
           }

          //  if (!element["Last_Open_Date_vod__c"]) {
          //   element["Last_Open_Date_vod__c"] =  "NULL"
          //  }

          //  if (!element["Last_Click_Date_vod__c"]) {
          //   element["Last_Click_Date_vod__c"] =  "NULL"
          //  }

            if (!this.EmailAccountObj[target]) {
            this.EmailAccountObj[target] = target;
            }
           
           
          if (!this.EmailAccountList.includes(target)) {
            this.EmailAccountList.push(target)
          }
         
      

      if (!this.EmailListNew[element["営業部"].trim()]) {
        this.EmailListNew[element["営業部"].trim()] = {};
      }
           
        if (!this.EmailListNew2[element["営業部"].trim()]) {
        this.EmailListNew2[element["営業部"].trim()] = [];
      }
         
      if (!this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()]) {
        this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = [];
      }
           

           


        this.EmailListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()].push(element)
           this.EmailListNew2[element["営業部"].trim()].push(element)
           

          //       if (!element["Dr_DCF"] || !element["Dr_Target_Status"]) {
          //        continue
          //  }

      if (!this.CallListNew[element["営業部"].trim()]) {
        this.CallListNew[element["営業部"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()] = {};
      }
         
      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()] = {};
      }
         
         const date = `${dayjs(element["Email_Sent_Date_vod__c"]).subtract(9, "h").format('YYYY/M')}`

      if (!this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date]) {
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date] = [];
      }
           
           element.CSLB_Channel_Type__c = "OnetoOne" 
           
      
        this.CallListNew[element["営業部"].trim()][element["エリア"].trim()][element["テリトリー名"].trim()][element["MR"].trim()][date].push(element)

       
           
      }
      
    
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.EmailListNew2);
      
    },
        
        async [JSON__EMAIL_DATA2](emailData): Promise<void> {





    
      
      

         for (const element of emailData) {


           let target = element["Dr_name"]

           if (!target) {
            target = "NULL"
           }

           
         element["Total"] = element["Id"]
      

      if (!this.EmailListContent[element["営業部"].trim()]) {
        this.EmailListContent[element["営業部"].trim()] = [];
      }
         
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()] = [];
      // }
           
      this.EmailListContent[element["営業部"].trim()].push(element)
           
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()] = [];
      // }
         
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()] = {};
      // }
      
      //      if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()];
      //      }



        //    this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()] = {
        //     Total: element.Id,
        //      Dr_name: element.Dr_name,
        //      HP_name: element.HP_name,
        //      MR: element.MR,
        // }
         
        }
      
    
      

      
      console.log(this.EmailListContent);
      
    },
        
        async [JSON__EMAIL_DATA_NEW2](emailData): Promise<void> {





    
      
      

         for (const element of emailData) {


           let target = element["Dr_name"]

           if (!target) {
            target = "NULL"
           }

           
         element["Total"] = element["Id"]
      

      if (!this.EmailListContentNew[element["営業部"].trim()]) {
        this.EmailListContentNew[element["営業部"].trim()] = [];
      }
         
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()] = [];
      // }
           
      this.EmailListContentNew[element["営業部"].trim()].push(element)
           
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()] = [];
      // }
         
      // if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()] = {};
      // }
      
      //      if (!this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()]) {
      //   this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()];
      //      }



        //    this.EmailListContent[element["営業部"].trim()][element["MR"].trim()][element["HP_name"].trim()][element["Dr_name"].trim()] = {
        //     Total: element.Id,
        //      Dr_name: element.Dr_name,
        //      HP_name: element.HP_name,
        //      MR: element.MR,
        // }
         
        }
      
    
      

      
      console.log(this.EmailListContentNew);
      
    },
        
        async [JSON__MEDIA_DATA](mediaData): Promise<void> {


       const ApplicationStore = useApplicationStore()


          ApplicationStore.isLoadComplete = false
          this.MediaList = mediaData
 



    
    
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.MediaList);
      
    },

               
        async [JSON__MEDIA_DATA_NEW](mediaData): Promise<void> {


       const ApplicationStore = useApplicationStore()


          ApplicationStore.isLoadComplete = false
          this.MediaListNew = mediaData
 



    
    
      
      ApplicationStore.isLoadComplete = true


      
      console.log(this.MediaListNew);
      
    }, 
    
    /**
     * 過去勤務先の取得処理
     */
    async [ACCOUNT__GET_WORK_HISTORY](sentEmailData): Promise<void> {

      
      const emailList = {}
       const emailListByAccount = {}

    let i = 0;

      for (const element in sentEmailData) {
      

       if (!this.MRList[sentEmailData[element]["OwnerId"]]) {
          continue
        } 
        
      if (!emailList[sentEmailData[element]["OwnerId"]]) {
        emailList[sentEmailData[element]["OwnerId"]] = {};
        emailList[sentEmailData[element]["OwnerId"]]["詳細"] = [];
      }
      

      if (this.DrList[sentEmailData[element]["Account_vod__r.Name"]]) {
         sentEmailData[element]["施設名"] = this.DrList[sentEmailData[element]["Account_vod__r.Name"]]["HP_name"]
      } else {
         sentEmailData[element]["施設名"] = "NULL"
      }

      sentEmailData[element]["営業部"] = this.MRList[sentEmailData[element]["OwnerId"]]["営業部"]
      sentEmailData[element]["エリア"] = this.MRList[sentEmailData[element]["OwnerId"]]["エリア"]
      sentEmailData[element]["テリトリー名"] = this.MRList[sentEmailData[element]["OwnerId"]]["テリトリー名"]
      
     
      //   if (!emailListByAccount[sentEmailData[element]["Account_vod__r.Name"]]) {
      //   emailListByAccount[sentEmailData[element]["Account_vod__r.Name"]] = {};
      //   emailListByAccount[sentEmailData[element]["Account_vod__r.Name"]]["詳細"] = [];
      // }

      emailList[sentEmailData[element]["OwnerId"]]["詳細"].push(
        sentEmailData[element]
      );

    }

    i = 0;

      for (const element in emailList) {
      
       
      emailList[element]["送付数"] =
      emailList[element]["詳細"].length;
      emailList[element]["MR"] = this.MRList[element]["MR"];
      
      emailList[element]["営業部"] = this.MRList[element]["営業部"]
      emailList[element]["エリア"] = this.MRList[element]["エリア"]
      emailList[element]["テリトリー名"] = this.MRList[element]["テリトリー名"]
      


      emailList[element]["詳細2"] = {}

        for (const element2 of emailList[element]["詳細"]) {
        

        
        if (!emailList[element]["詳細2"][element2["Account_vod__r.Name"]]) {
        emailList[element]["詳細2"][element2["Account_vod__r.Name"]] = [];
        
        }

        emailList[element]["詳細2"][element2["Account_vod__r.Name"]].push(element2)
        
      }

      i += 1;
    }
      
      console.log(emailList);
      

      for (const element in emailList) {
        
      
      if (!this.sentEmailList[emailList[element]["営業部"]]) {
        this.sentEmailList[emailList[element]["営業部"]] = {};
      }
        
      if (!this.sentEmailListDetail[emailList[element]["営業部"]]) {
        this.sentEmailListDetail[emailList[element]["営業部"]] = [];
      }
        
        this.sentEmailListDetail[emailList[element]["営業部"]].push(emailList[element]);


      if (
        !this.sentEmailList[emailList[element]["営業部"]][
          emailList[element]["エリア"]
        ]
      ) {
        this.sentEmailList[emailList[element]["営業部"]][
          emailList[element]["エリア"]
        ] = [];
      }

      this.sentEmailList[emailList[element]["営業部"]][
        emailList[element]["エリア"]
      ].push(emailList[element]);

      this.sentEmailAccountList.push(emailList[element]);
    }
      console.log('a');
      

      // for (const key in this.sentEmailListDetail) {
      //   console.log(key);

      //   for (const element of this.sentEmailListDetail[key]) {
      //     console.log(element);
          
      //   }
        
      // }
  
    console.log(this.sentEmailListDetail);

    this.sentEmailAccountList.sort((a, b) => {
      if (dayjs(a.送付数) < dayjs(b.送付数)) return 1;
      if (dayjs(a.送付数) > dayjs(b.送付数)) return -1;
    });

    // const test2 = this.sentEmailAccountList.map((p) => p["送付数"]);
    // let maxIndex = Math.max(...test2);

    // const numberDigit = String(maxIndex).length;

    // console.log(numberDigit);

    // let maxIndexCe;
    // let girdNum;
    // let girdNumPulus;

    // if (numberDigit >= 4) {
    //   maxIndex += 100;
    //   maxIndexCe = Math.ceil(maxIndex / 100) * 100;
    //   girdNum = maxIndexCe / 100;
    //   girdNumPulus = 100;
    // } else if (numberDigit === 3) {
    //   maxIndex += 10;
    //   maxIndexCe = Math.ceil(maxIndex / 10) * 10;
    //   girdNum = maxIndexCe / 10;
    //   girdNumPulus = 10;
    // } else if (numberDigit <= 2) {
    //   if (maxIndex <= 20) {
    //     maxIndexCe = maxIndex + 1;
    //     girdNum = maxIndexCe / 1;
    //     girdNumPulus = 1;
    //   } else if (maxIndex <= 40) {
    //     maxIndex += 2;
    //     maxIndexCe = Math.ceil(maxIndex / 2) * 2;
    //     girdNum = maxIndexCe / 2;
    //     girdNumPulus = 2;
    //   } else {
    //     maxIndex += 5;
    //     maxIndexCe = Math.ceil(maxIndex / 5) * 5;
    //     girdNum = maxIndexCe / 5;
    //     girdNumPulus = 5;
    //   }
    // }

    // for (let index = girdNumPulus; index <= maxIndexCe; index += girdNumPulus) {
    //   state.girdArry.push(index);
    // }

    // state.girdArry.unshift(0);

    // console.log(maxIndexCe);
    // console.log(girdNum);
    // console.log(state.girdArry);

    // const girdNum2 = girdNum - 1;

    // for (const element of this.sentEmailAccountList) {
    //   element["ratio"] = {
    //     "--size": `calc( ${(element["送付数"] / maxIndexCe) * 100} / 100 )`,
    //   };
    // }
    // console.log(this.sentEmailAccountList);

    // const tt = 16.6666;

    // const style = {
    //   "background-size": `calc(100% / ${girdNum}) 100%`,
    // };

    // const style2 = {
    //   width: `calc(1405px / 12)`,
    // };
    },
  },
})

if (module.hot) {
  module.hot.accept(acceptHMRUpdate(useAccountStore, module.hot))
}
