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
      url: '/api/article/add',
      method: 'post',
      data
    })
  }
  
  export function getMarkdownArticleByAid(id:number) {
    return request({
      url: '/api/article/show/'+id,
      method: 'get',
      params:{id}
    })
  }
  export function uploadImg(data:string) {
    return request({
      url: '/api/article/uploading',
      method: 'post',
      data:{data},
      // headers:{'Content-Type':"application/x-www-form-urlencoded"}
      
    })
  }
  export function getImg(msg:string) {
    return request({
      url: '/api/article/image/'+msg,
      method: 'get',
      params:{msg},
      // headers:{'Content-Type':"application/x-www-form-urlencoded"}
      
    })
  }