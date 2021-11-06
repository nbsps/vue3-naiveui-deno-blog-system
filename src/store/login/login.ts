import { Module } from 'vuex';
import { ILoginState } from './type';
import { IBaseState } from '../type';

import { LoginRequest } from '@/service/login/login';
import sessionCache from '@/utils/cache/sessionCache';

const login: Module<ILoginState, IBaseState> = {
  namespaced: true,
  state() {
    return {
      token: sessionCache.getCache('token') || '',
    };
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.accessToken;
      sessionCache.setCache('token', payload.accessToken);
    },
  },
  actions: {
    LoginAction({ commit }, payload: any) {
      return new Promise((resolve, reject) => {
        LoginRequest('/api/login', payload)
          .then((res: any) => {
            commit('setToken', res.data.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    VerifyAction({ commit }, payload: any) {
      return new Promise((resolve, reject) => {
        LoginRequest('/api/verify', payload)
          .then((res: any) => {
            commit('setToken', res.data.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export default login;
