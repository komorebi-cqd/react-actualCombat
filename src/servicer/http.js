import qs from 'qs';
import { message } from 'antd';
import { history } from 'umi';
const fetch = require('dva').fetch;

// 响应状态处理函数
const checkStatus = (res) => {
  if (200 >= res.status < 300) {
    return res;
  }
  message.error(`网络请求错误${res.status}`);
  throw new Error(res.statusText);
};

const isOkState = async (res) => {
  const cloneRes = await res.clone().json();
  if (cloneRes.code !== 0) {
    message.error(`${cloneRes.msg}`);
    history.replace('/users/login');
    sessionStorage.removeItem('token');
  }
  return res;
};

const handleError = (err) => {
  if (err instanceof TypeError) {
    message.error(`网络请求错误${err}`);
  }
  return {
    code: -1,
    data: false,
  };
};

class Http {
  static async staticFetch(url = '', options = {}) {
    url = '/api' + url;
    const defaultOptions = {
      mode: 'cors', //- 支持跨域处理，以cors的形式进行跨域
      headers: {
        Authorization: sessionStorage.getItem('token') || null,
      },
    };

    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-type'] = 'application/json;charset=utf-8';
    }

    const newOptions = { ...defaultOptions, ...options };

    return fetch(url, newOptions)
      .then(checkStatus)
      .then(isOkState)
      .then((res) => {
        const token = res.headers.get('Authorization');
        token && sessionStorage.setItem('token', token);
        return res.json();
      })
      .catch(handleError);
  }

  //- post请求处理
  post(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'POST' }, option);
    options.body = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  //- put请求处理
  put(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'PUT' }, option);
    options.body = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  //- get请求处理
  get(url, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    Object.keys(option) && (url += '?' + qs.stringify(option));
    return Http.staticFetch(url, options);
  }
  //- delete请求处理
  del(url, option = {}) {
    const options = Object.assign({ method: 'DELETE' }, option);
    Object.keys(option) && (url += '?' + qs.stringify(option));
    return Http.staticFetch(url, options);
  }
}

const resFun = new Http();

export default resFun;
