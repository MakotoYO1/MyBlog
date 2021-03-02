import * as auth from '../operations/auth'
import config from '../../server.config'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import {Router} from 'express'
import {Resp} from '@/types/index'

const router=Router()

// 判断是否存在auth
router.get('/exist',async(req,res)=>{
  let resp:Resp
  try {
    const data=await auth.exist()
    resp={
      code:0,
      data
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// 创建账户
router.post('/create',async(req,res)=>{
  let resp:Resp
  try {
    const data=await auth.create(req.body)
    resp={
      code:0,
      data
    }
  } catch (error) {
    resp={
      code:-1,
      message:'创建失败，请检查是否已存在'
    }
  }
  res.json(resp)
})

// 查看账户
router.post('/find',async(req,res)=>{
  let resp:Resp
  try {
    const data=await auth.find(req.body)
    resp={
      code:0,
      data
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// 修改账号信息
// 需要签名密钥,即需要token
router.post('/update',jwt({secret:config.jwtSecret,algorithms:['HS256']}),async(req,res)=>{
  let resp:Resp
  try {
    resp=(await auth.update(req.body)) as Resp;
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// 获取当前用户
router.get('/user',jwt({secret:config.jwtSecret,algorithms:['HS256']}),(req,res)=>{
  res.json({
    user:(req as any).user
  })
})

// 登录
router.post('/login',async(req,res)=>{
  try {
    const data=await auth.find(req.body)

    if(!data.account){
      res.sendStatus(401)
      return
    }
    const token=jsonwebtoken.sign(
      {
        username:'makotoyo',
        role:'admin'
      },
      config.jwtSecret,
      {
        // token有效期
        expiresIn:60*60*24*5
      }
    )

    res.json({token})
  } catch (error) {
    res.sendStatus(500)
  }
})

// 退出
router.post('/logout',jwt({secret:config.jwtSecret,algorithms:['HS256']}),(req,res)=>{
  res.end()
})



export default router
