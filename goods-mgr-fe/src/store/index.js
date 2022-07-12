import { createStore } from 'vuex';
import { character, user, goodClassify } from '@/service'
import { result } from '@/helpers/utils'
import { getCharacterInfoById } from '@/helpers/character'

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter: {},
    goodClassifyList: [],
  },
  mutations: {
    // 参数(state对象, ...参数)
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo
    },
    setUserInfo(state, setUserInfo) {
      state.userInfo = setUserInfo
    },
    setUserCharacter(state, setUserCharacter) {
      state.userCharacter = setUserCharacter
    },
    setGoodClassify(state, setGoodClassify) {
      state.goodClassifyList = setGoodClassify
    },
  },
  actions: {
    // 获取分类信息
    async getGoodClassify(context) {
      const res = await goodClassify.list()

      result(res)
        .success(({data}) => {
          context.commit('setGoodClassify', data)
        })
    },

    // 参数(context->具有和store一样的属性和方法)
    async getCharacterInfo(context) {
      // 获取角色列表
      const res = await character.list()
      result(res)
        // 拿到角色里面的数据
        .success(({ data }) => {
          context.commit('setCharacterInfo', data)
        })
    },
    async getUserInfo(context) {
      // 获取用户token    此时token已设置在axios的头部中, 发送请求带过去服务端
      const res = await user.info()

      result(res)
        .success(({ data }) => {
          // 在新页面重新获取到data数据和角色
          context.commit('setUserInfo', data)
          // 给userCharacter赋值真正的角色
          context.commit('setUserCharacter', getCharacterInfoById(data.character))

        })
    },

  },

});
