import {MyBlogConfig} from '@/types'

const config:MyBlogConfig={
  host:'0.0.0.0',
  port:8000,
  // 暂定为myblogtest，测试完成后更换数据库
  mongoUrl:'mongodb://localhost:27017/myblogtest',
  jwtSecret:'myblogjwtsecret'
}

export default config
