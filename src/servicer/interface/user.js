import $http from '../http';

//用户登录接口
export const userLogin = (params) => $http.post('/login', params);

//获取手机验证码
export const getCode = (params) => $http.get('/getCode', params);

//重置密码-验证码检测
export const checkSmCode = (params) => $http.get('/checkSmCode', params);

//重置密码-新密码设置
export const resetPassword = (params) => $http.post('/resetPassword', params);
