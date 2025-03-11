import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useApplicationStore } from '@/store/modules/applicationModule'
import  HomeView  from '@/views/MainPage.vue'
import Vue from "vue";
import { defineComponent, ref, computed, reactive, onMounted, onUpdated, onUnmounted, watch,nextTick } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/CallTop',
    name: 'CallTop',
    component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/Call/Top.vue'),
     props: (route) => ({
       date: String(route.query.date),
      }),
  },

   {
    path: '/CallTopDetail',
    name: 'CallTopDetail',
    component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/Call/TopDetail.vue'),
    props: (route) => ({
      id: String(route.query.id),
      date: String(route.query.date),
      }),
  },

    {
    path: '/CallDetailRank',
    name: 'CallDetailRank',
    component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/Call/CallDetailRank.vue'),
    props: (route) => ({
      id: String(route.query.id),
      screen: String(route.query.screen),
      date: String(route.query.date),
      }),
  },


  {
    path: '/SentEmailTop',
    name: 'SentEmailTop',
     props: (route) => ({
       date: String(route.query.date),
      }),
  component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/Email/Top.vue')
  },

   {
    path: '/SentEmailDetail',
    name: 'SentEmailDetail',
     component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/Email/SentEmailDetail.vue'),
    props: (route) => ({
      id: String(route.query.id),
        date: String(route.query.date),
      }),
  },
   
   {
    path: '/CallKeyMessageTop',
     name: 'CallKeyMessageTop',
     props: (route) => ({
       date: String(route.query.date),
      }),
  component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/CallKeyMessage/Top.vue')
  },
   
      {
    path: '/CallKeyMessage',
        name: 'CallKeyMessage',
     props: (route) => ({
       date: String(route.query.date),
      }),
  component: () => import(/* webpackChunkName: "CallTop" */ '@/components/container/CallKeyMessage/CallKeyMessage.vue')
  },

   
   
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async(to, from, next) => {

   const ApplicationStore = useApplicationStore()


  ApplicationStore.isLoadComplete = false

  console.log("beforeach");

next();
});

router.afterEach( async (to, from) => {
  const ApplicationStore = useApplicationStore()
  
  
   await nextTick()
  



    

  console.log("aftereach");
   ApplicationStore.isLoadComplete = true

});


router.onError(error => {
  if (error.name === 'ChunkLoadError') window.location.reload()
})

export default router
