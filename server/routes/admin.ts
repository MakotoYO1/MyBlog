import {Router} from 'express'
import jwt from 'express-jwt'
import moment from 'moment'
import * as admin from '../operations/admin'
import {Resp} from '@/types/index'
import config from '../../server.config'

const router=Router()

router.use(jwt({
  secret:config.jwtSecret,
  algorithms:['HS256']
}))

// 博客设置
router.put('/bsetting/edit',async (req,res)=>{
  let resp:Resp
  try {
    const settings=await admin.editBSetting(req.body)
    resp={
      code:0,
      data:settings
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// 个人简介设置
router.put('/psetting/save',async(req,res)=>{
  let resp:Resp
  try {
    const settings=await admin.savePSetting(req.body)
    resp={
      code:0,
      data:settings
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

//  分类
// add
router.post('/category/add',async(req,res)=>{
  let resp:Resp
  try {
    const category=await admin.newCategory(req.body)
    resp={
      code:0,
      data:category
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// edit
router.put('/category/edit',async(req,res)=>{
  let resp:Resp
  try {
    const category=await admin.editCategory(req.query.id,req.body)
    resp={
      code:0,
      data:category
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// get
router.get('/category/get',async (req,res)=>{
  let resp:Resp
  try {
    const category=await admin.getCategories()
    resp={
      code:0,
      data:category
    }
  } catch (error) {
    resp={
      code:-1
    }
  }
  res.json(resp)
})

// delete

router.delete('/category/delete',async (req,res)=>{
  let resp:Resp
  try {
    const data=await admin.deleteCategory(req.body.ids)
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
