import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'


// create an axios instance
const request = axios.create({
 //baseURL: "http://192.168.196.22:8082", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
request.interceptors.request.use(
 config=>{
   const token = localStorage.getItem('token');
   if(token){
     config.headers.common['Authorization']= token;
   }
   return config
 },
 error=>{
   return Promise.reject(error);
   
 }
 
 
)

// response interceptor
request.interceptors.response.use(data=>{
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
//==============  错误处理  ====================
   if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
  Message.warning( {message: err.message } )
  return Promise.resolve(err);
})

export default request