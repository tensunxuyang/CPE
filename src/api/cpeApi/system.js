import request from '@/utils/request'

//获取服务器信息 
export function getDataInfo(data) {
  return request({
    headers: {
      isToken: true
    },
    method: 'post',
    data: data
  })
}

// // 获取用户详细信息
// export function getInfo() {
//   return request({
//     url: '/getInfo',
//     method: 'get'
//   })
// }




