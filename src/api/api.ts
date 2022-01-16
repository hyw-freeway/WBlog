
import request from '@/utils/request'
import { Article } from './data'

  
  export function getPostsByWeek(time:string) {
    return request({
      url: '/api/article/selectAllReports',
      method: 'get',
      params:{time},
    })
  }
  export function getUsers() {
    return request({
      url: '/api/article/selectAllUser',
      method: 'get',
     
    })
  }
  export function getPostsByUid(uid:number) {
    return request({
      url: '/api/article/select/'+uid,
      method: 'get',
      params:{uid},
    })
  }
  export function login(password:string,username:string) {
    return request({
      url: '/api/login',
      method: 'post',
      params:{password,username},
    })
  }

  