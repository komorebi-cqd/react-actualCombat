import $http from 'api';
import { message } from 'antd';
import { history } from 'umi';

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
      const { data: routeList } = yield call($http.getRouteList);
      sessionStorage.setItem('routeList', JSON.stringify(routeList));
      sessionStorage.setItem('user', JSON.stringify(data));
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
