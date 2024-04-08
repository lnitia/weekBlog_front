import axios from 'axios'
import { Message, MessageBox } from 'element-ui';
import router from '../router'

let baseURL = "/api"
if(process.env.NODE_ENV === "development"){
  baseURL = "http://127.0.0.1:3007"
}else if (process.env.NODE_ENV === "production"){
  baseURL = "http://yhli.work/api"
}
// create an axios instance
// 默认情况下浏览器对跨域请求不会携带 Cookie
//axios.defaults.withCredentials=true;//让ajax携带cookie
const request = axios.create({
  baseURL,
// baseURL: "http://192.168.196.22:8082", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
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
  const res = data.data

  if (res === '尚未登录，请先登录'||res==="session失效，请重新登录") {
    Message({
      message: res || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      confirmButtonText: 'Re-Login',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      localStorage.clear()
      location.reload()

    })
  }

    return res
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
