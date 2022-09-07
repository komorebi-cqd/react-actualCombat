import $http from 'api';
import { message } from 'antd';
import { history } from 'umi';

export default {
  namespace: 'user',
  state: {
    userInfo: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
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
      const { data: routeList } = yield call($http.getRouteList);
      localStorage.setItem('routeList', JSON.stringify(routeList));
      localStorage.setItem('user', JSON.stringify(data));
      yield put({
        type: 'changeUserInfo',
        payload: {
          userInfo: data,
        },
      });

      history.replace(routeList[0].route);
    },
  },
};
