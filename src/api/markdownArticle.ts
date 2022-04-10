// import request from '@/utils/request'

// export function saveMarkdownArticle(data) {
//     return request({
//       url: '/edu/markdown/article',
//       method: 'post',
//       data
//     })
//   }
  
//   export function getMarkdownArticle(id) {
//     return request({
//       url: '/edu/markdown/article/'+id,
//       method: 'get'
//     })
//   }
import request from '@/utils/request'
import { Article } from './data'

export function saveMarkdownArticle(data:Article) {
    return request({
      url: '/article/updateArticle',
      method: 'put',
      data
    })
  }
  
  export function getMarkdownArticleByAid(id:number) {
    return request({
      url: '/article/show/'+id,
      method: 'get',
      params:{id}
    })
  }
  export function createMarkdownArticle(data:Article) {
    return request({
      url: '/article/add',
      method: 'post',
      data
    })
  }
  export function uploadImg(data:string) {
    return request({
      url: '/article/uploading',
      method: 'post',
      data:{data},
      // headers:{'Content-Type':"application/x-www-form-urlencoded"}
      
    })
  }
  export function getImg(msg:string) {
    return request({
      url: '/article/image/'+msg,
      method: 'get',
      params:{msg},
      // headers:{'Content-Type':"application/x-www-form-urlencoded"}
      
    })
  }
