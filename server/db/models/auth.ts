import {Schema,model,models,Model} from 'mongoose'
import {Account} from '@/types/schema'

export class Auth{
  private _model:Model<Account>;

  constructor(){
    const schema=new Schema<Account>(
      {
        // 用户名
        name:{type:String},
        // 密码
        pwd:{type:String},
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
      },
      {
        // 查询时默认返回虚拟字段
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
      }
    );
    // 看已有models中是否有auth，已有则不会再新建model
    if(models.auth){
      this._model=models.auth;
    }else{
      this._model=model<Account>('auth',schema,'auth')
    }
  }
  // 若访问model也会访问到_model
  public get model():Model<Account>{
    return this._model
  }
}
