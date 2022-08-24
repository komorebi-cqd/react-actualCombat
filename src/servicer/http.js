import { qs } from 'qs';
import { message } from 'antd';
import { history } from 'umi';
const fetch = require('dva').fetch;

// 响应状态处理函数
const checkStatus = (res) => {
  console.log(res, 'checkStatus');
  if (res.status === 200) {
    return res;
  }
  message.error(`网络请求错误${res.status}`);
  throw new Error(res.statusText);
};

const isOkState = async (res) => {
  console.log(res, 'isOkState');
  const cloneRes = await res.clone().json();
  if (cloneRes.code !== 0) {
    message.error(`${cloneRes.msg}`);
    history.replace('/users/login');
    sessionStorage.clear();
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
      mode: 'cors',
      headers: {
        Authorization: sessionStorage.get('token') || null,
      },
    };

    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-type'] = 'aoolication/json;charset=utf-8';
    }
    const newOptions = { ...defaultOptions, options };
    return fetch(url, newOptions)
      .then(checkStatus)
      .then(isOkState)
      .then((res) => {
        const token = res.headers.get('Authorization');
        token && sessionStorage.set('token', token);
        return res.json();
      })
      .catch(handleError);
  }

  post(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'POST' }, option);
    options.body = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  put(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'PUT' }, option);
    options.body = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  get(url, query = {}, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    Object.keys(query) && (url = url + qs.stringify(query));
    return Http.staticFetch(url, options);
  }
  del(url, query = {}, option = {}) {
    const options = Object.assign({ method: 'DELETE' }, option);
    Object.keys(query) && (url = url + qs.stringify(query));
    return Http.staticFetch(url, options);
  }
}

const resFun = new Http();

export default resFun;
