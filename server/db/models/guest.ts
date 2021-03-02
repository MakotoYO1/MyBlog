// 访客信息

import { Schema, model, models, Model } from 'mongoose';
import {Comment} from '@/types/schema'


export const schema=new Schema<Comment>({
  // 评论人昵称
  username:{
    type:String
  },
  // 评论人邮箱
  email:{
    type:String
  },
  // 评论内容
  content:{
    type:String
  },
  // 创建时间
  create_time:{
    type:Date,
    default:new Date()
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
)

export class Guest{
  private _model:Model<Comment>

  constructor(){
    if(models.guest){
      this._model=models.guest
    }else{
      this._model=model<Comment>('guest',schema,'guest')
    }
  }

  public get model():Model<Comment>{
    return this._model
  }
}
