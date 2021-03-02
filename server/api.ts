import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import adminRoute from './routes/admin';
import authRoute from './routes/auth'
import indexRoute from './routes/index'

const app=express()

app.use(cookieParser())
// bodyParser处理请求数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use('/admin',adminRoute)
app.use('/auth',authRoute)
app.use(indexRoute)
//  test route

app.use((err:any, req:any, res:any, next:any) => {
  // 如果token解析失败
  if (err.name === 'UnauthorizedError') {
    console.log('UnauthorizedError')
    return res.sendStatus(401);
  }
  console.error('api route error', err);
  res.sendStatus(err.statusCode || 500);
});

module.exports={
  path:'/api',
  handler:app
}
