import { Schema, model, models, Model, Types } from 'mongoose';
import {Category} from '@/types/schema'
import { number } from 'echarts';


// 全部分类
export const allCategory={
  _id:'all123',
  // 分类名称
  cname:'全部',
  // 分类图片
  img:'',
  // 排序值
  sequence:-1
}
// 未分类
export const otherCategory={
  _id:new Types.ObjectId('603686d46aa7e61abc3210e8'),
  cname:'未分类',
  img:'',
  // 未分类默认在最后
  sequence:100000
}

export class blogCategory{
  private _model:Model<Category>;

  public get model():Model<Category>{
    return this._model
  }

  constructor() {
    const schema=new Schema<Category>({
      // 分类名称
      cname:{
        type:String
      },
      // 分类图片
      img:{
        type:String
      },
      // 排序值
      sequence:{
        type:number
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
    },{
      toJSON:{virtuals:true},
      toObject:{virtuals:true}
    })

    // 初始化未分类
    schema.statics.initData=()=>{
      this.model.exists({}).then(exist=>{
        if(!exist){
          this.model.create((otherCategory as any))
        }
      })
    }

    if(models.category){
      this._model=models.category
    }else{
      this._model=model<Category>('category',schema,'category')
    }
  }
}
