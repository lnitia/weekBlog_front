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
import { Article, Pic } from './data'

export function saveMarkdownArticle(data:Article) {
    return request({
      url: '/my/article/update',
      method: 'post',
      data
    })
  }
  
  export function getMarkdownArticleByAid(id:number) {
    return request({
      url: 'my/article/info',
      method: 'get',
      params:{id}
    })
  }
  export function createMarkdownArticle(data:Article) {
    return request({
      url: '/my/article/add',
      method: 'post',
      data
    })
  }
  export function uploadImg(data:Pic) {
    return request({
      url: '/my/article/uploadpic',
      method: 'post',
      data,
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
