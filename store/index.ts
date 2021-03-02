import { ActionTree, MutationTree } from 'vuex';
import {BSetting} from '@/types/schema'

export const state=()=>({
  settings:{} as BSetting
})

type RootState=ReturnType<typeof state>

export const mutations:MutationTree<RootState>={
  SET(state,settings){
    state.settings=settings;
  }
}

export const actions:ActionTree<RootState,RootState>={
  async nuxtServerInit({commit},{$axios}){
    const res=await $axios.get('/api/settings')
    if(res.code===0){
      commit('SET',res.data.settings)
      // console.log(res.data.settings)
    }
  }
}
