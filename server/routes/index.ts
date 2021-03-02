import { Router } from 'express';
import jwt from 'express-jwt';
import config from '../../server.config'
import {Resp} from '@/types/index'
import * as blog from '../operations/index'

const router=Router()

router.use(
  jwt({
    secret: config.jwtSecret,
    algorithms:['HS256'],
    credentialsRequired: false
  })
);

router.get('/settings',async function(req,res){
  let resp:Resp
  try {
    const settings=await blog.getSettings()
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

export default router
