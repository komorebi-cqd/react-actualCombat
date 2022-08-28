import $http from 'api';
import { message } from 'antd';

export default {
  namespace: 'user',
  state: {
    userInfo: sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : null,
  },
  reducers: {
    changeUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      const { data, msg } = yield call($http.userLogin, payload);
      if (!data) {
        message.error(msg);
        return;
      }
      sessionStorage.setItem('user', JSON.stringify(data));
      yield put({
        type: 'changeUserInfo',
        payload: {
          userInfo: data,
        },
      });
    },
  },
};
