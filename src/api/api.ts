
import request from '@/utils/request'
import { Article ,RegForm } from './data'

  
  export function getPostsByWeek(time:string) {
    return request({
      url: '/my/article/listbytime',
      method: 'get',
      params:{time},
    })
  }
  export function getSession() {
    return request({
      url: '/getSessionId',
      method: 'get'
  
    })
  }
  export function getUsers() {
    return request({
      url: '/my/userall',
      method: 'get',
     
    })
  }
  export function getPostsByUid(uid:number) {
    return request({
      url: '/my/article/listbyuid',
      method: 'get',
      params:{uid},
    })
  }
  export function login(password:string,username:string) {
    return request({
      url: '/api/login',
      method: 'post',
      data:{password,username},
    })
  }
  export function register(data:RegForm) {
    return request({
      url: '/api/reguser',
      method: 'post',
      data
    })
  }
  

  