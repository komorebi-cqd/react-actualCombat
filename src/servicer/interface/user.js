import $http from '../http';

//用户登录接口
export const userLogin = (params) => $http.post('/login', params);

//获取手机验证码
export const getCode = (params) => $http.get('/getCode', params);

//重置密码-验证码检测
export const checkSmCode = (params) => $http.get('/checkSmCode', params);

//重置密码-新密码设置
export const resetPassword = (params) => $http.post('/resetPassword', params);

//检测用户是否登录
export const queryLoginStatus = () => $http.get('/queryLoginStatus');

//前端路由表
export const getRouteList = (params) => $http.get('/getRouteList', params);

//检测手机号码或账户名是否有效
export const checkIsExists = (params) => $http.post('/checkIsExists', params);
