
import request from '@/utils/request'
import { Article ,RegForm } from './data'

  
  export function getPostsByWeek(time:string) {
    return request({
      url: '/article/selectAllReports',
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
      url: '/selectAllUsers',
      method: 'get',
     
    })
  }
  export function getPostsByUid(uid:number) {
    return request({
      url: '/article/select/'+uid,
      method: 'get',
      params:{uid},
    })
  }
  export function login(password:string,username:string) {
    return request({
      url: '/login',
      method: 'post',
      params:{password,username},
    })
  }
  export function register(data:RegForm) {
    return request({
      url: '/register',
      method: 'post',
      data
    })
  }
  

  