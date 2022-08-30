import $http from 'api';

export default {
  namespace: 'common',
  state: {},
  subscriptions: {
    setup({ history, dispatch }) {
      dispatch({ type: 'queryUserLogin', payload: { history } });
    },
  },
  effects: {
    *queryUserLogin({ payload }, { put, call }) {
      const {
        history,
        history: {
          location: { pathname },
        },
      } = payload;
      if (pathname !== '/user/login' || pathname !== '/user/forgotPassword') {
        if (
          !sessionStorage.getItem('user') ||
          !sessionStorage.getItem('routeList') ||
          !sessionStorage.getItem('token')
        ) {
          history.replace('/users/login');
        } else {
          const res = yield call($http.queryLoginStatus);
          if (res.code !== 0) return;
          const { data: routeList } = yield call($http.getRouteList);
          sessionStorage.setItem('routeList', JSON.stringify(routeList));
        }
      } else {
        sessionStorage.clear();
      }
    },
  },
};
