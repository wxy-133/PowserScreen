import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
// 创建类
class HYRequest {
  // 执行构造器方法
  constructor(baseURL = BASE_URL, timeout= TIMEOUT) {
    // 创建实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }
  // 请求
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 方法
  get(config) {
    return this.request({ ...config, method: "get" })
  }
  post(config) {
    return this.request({ ...config, method: "post" })
  }
}
export default new HYRequest()


