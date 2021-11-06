import { createStore } from 'vuex';
import { IBaseState } from './type';
import login from './login/login';
import { BaseInfo, setBaseInfo } from '@/service/info/baseInfo';

export default createStore<IBaseState>({
  state() {
    return {
      // 默认数据
      nickname: 'Silvensn',
      email: '2467214168@qq.com',
      qq: '2467214168',
      description: '前端工程师',
      github: 'https://github.com/nbsps',
      avatar: 'preset/avatar-my1.png',
      cover: 'preset/cover-my.png',
      about: 'preset/header-my.png',
      motto: '人生如逆旅，我亦是行人。',
      aboutMotto: '人活着就是为了樱岛麻衣！',
    };
  },
  mutations: {
    updateBaseInfo(state, payload) {
      for (const key in payload) {
        (state as { [index: string]: any })[key] = payload[key];
      }
    },
    setBaseInfo(state, payload) {
      (state as { [index: string]: any })[payload.key] = payload.value;
    },
  },
  actions: {
    getBaseInfo({ commit }) {
      return new Promise((resolve, reject) => {
        BaseInfo()
          .then((res: any) => {
            commit('updateBaseInfo', res.data.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setBaseInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        setBaseInfo(payload).then((res) => {
          commit('setBaseInfo', payload);
        });
      });
    },
  },
  modules: {
    login: login,
  },
});
