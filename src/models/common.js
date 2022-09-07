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
      if (pathname !== '/users/login' && pathname !== '/users/forgotPassword') {
        if (
          !localStorage.getItem('user') ||
          !localStorage.getItem('routeList') ||
          !localStorage.getItem('token')
        ) {
          history.replace('/users/login');
        } else {
          const res = yield call($http.queryLoginStatus);
          if (res.code !== 0) return;
          const { data: routeList } = yield call($http.getRouteList);
          localStorage.setItem('routeList', JSON.stringify(routeList));
        }
      } else {
        console.log(6666);
        if (localStorage.getItem('user') && localStorage.getItem('token')) {
          const res = yield call($http.queryLoginStatus);
          if (res.code !== 0) {
            localStorage.clear();
            return;
          }
          const { data: routeList } = yield call($http.getRouteList);
          localStorage.setItem('routeList', JSON.stringify(routeList));
          history.replace(routeList[0].route);
        } else {
          localStorage.clear();
        }
      }
    },
  },
};
