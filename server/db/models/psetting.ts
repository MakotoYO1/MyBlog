import {Schema,model,models,Model} from 'mongoose'
import {PSetting} from '@/types/schema'

export class personSetting {
  private _model:Model<PSetting>;

  constructor(){
    const schema=new Schema<PSetting>({
      // 昵称
      name:{
        type:String
      },
      // 头像
      avatar:{
        type:String
      },
      // 自我介绍
      introduction:{
        type:String
      },
      // github地址
      github:{
        type:String
      },
      // 邮箱
      email:{
        type:String
      },
      // 微信
      wx:{
        type:String
      },
      // 创建时间
      create_time:{
        type:Date,
        default:new Date()
      },
      // 修改时间
      modify_time:{
        type:Date,
        default:new Date()
      }
    });

    if(models.psetting){
      this._model=models.psetting
    }else{
      this._model=model<PSetting>('psetting',schema,'psetting')
    }
  }

  public get model():Model<PSetting>{
    return this._model
  }
}
